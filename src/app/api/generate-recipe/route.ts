import { NextRequest, NextResponse } from "next/server";
import { generateRecipes, Language, GeneratedRecipe, GroundingHit } from "@/lib/ai-providers";
import { searchRecipes } from "@/lib/semantic-search";
import { findEnrichedByQuery, findEnrichedByHitName, getEnrichedSet } from "@/lib/enriched-recipes";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { getGeneratorSettings } from "@/lib/settings";

export const runtime = "nodejs";

const MAX_QUERY = 200;
const MAX_INGREDIENT = 80;
const MAX_INGREDIENTS = 15;

// Strip control characters and collapse whitespace from user-supplied text.
function sanitize(s: string): string {
  return s.replace(/\p{Cc}/gu, " ").replace(/\s+/g, " ").trim();
}

// Cosine floor for a dataset row to be trusted enough to GROUND generation is
// now admin-configurable via settings.groundingThreshold (see getGeneratorSettings).

// Branded dataset ingredient → our internal productId (for the degraded fallback).
const BRAND_TO_PID: Record<string, string> = {
  "Anveshan Ghee": "ghee",
  "Anveshan Khapli Atta": "khapli-atta",
  "Anveshan Multigrain Atta": "multigrain-atta",
  "Anveshan Jaggery": "jaggery-powder",
  "Anveshan Wood-Pressed Oil": "groundnut-oil",
  "Anveshan Groundnut Oil": "groundnut-oil",
  "Anveshan Mustard Oil": "mustard-oil",
  "Anveshan Coconut Oil": "coconut-oil",
  "Anveshan Sesame Oil": "sesame-oil",
  "Anveshan Wild Forest Honey": "honey",
  "Anveshan Kashmiri Saffron": "saffron",
};

// Degraded last-resort only: map a raw dataset row into the render shape when
// BOTH AI providers are unavailable. Measurements are absent by design here.
function hitToDegradedRecipe(
  hit: { name: string; description?: string; ingredients: string[]; steps?: string[] },
  language: Language
): GeneratedRecipe {
  const ingredients = hit.ingredients.map((s) => {
    const pid = BRAND_TO_PID[s];
    return { name: s, quantity: "", unit: "", anveshan: !!pid, ...(pid ? { anveshanProductId: pid } : {}) };
  });
  const anveshanProducts = [...new Set(hit.ingredients.map((s) => BRAND_TO_PID[s]).filter(Boolean) as string[])];
  return {
    name: hit.name,
    description: hit.description ?? "",
    prepTime: "—",
    cookTime: "—",
    servings: 4,
    ingredients,
    steps: hit.steps ?? [],
    anveshanProducts,
    provider: "Anveshan Collection",
    language,
  };
}

export async function POST(req: NextRequest) {
  // Admin-editable generator settings (enable/disable, rate limit, grounding).
  const settings = await getGeneratorSettings();
  if (!settings.enabled) {
    return NextResponse.json(
      { error: "The recipe generator is temporarily unavailable." },
      { status: 503 }
    );
  }

  const limit = rateLimit(`gen:${clientIp(req)}`, settings.rateLimitPerMin, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  try {
    const body = (await req.json().catch(() => ({}))) as {
      query?: unknown;
      ingredients?: unknown;
      language?: unknown;
    };

    const dish = sanitize(typeof body.query === "string" ? body.query : "").slice(0, MAX_QUERY);
    const items = (Array.isArray(body.ingredients) ? body.ingredients : [])
      .filter((x): x is string => typeof x === "string")
      .slice(0, MAX_INGREDIENTS)
      .map((s) => sanitize(s).slice(0, MAX_INGREDIENT))
      .filter(Boolean);
    const lang: Language = body.language === "hi" ? "hi" : "en";

    if (!dish && items.length === 0) {
      return NextResponse.json({ error: "Enter a dish name or at least one ingredient" }, { status: 400 });
    }

    // 0) SERVE-FIRST (zero AI): if the user NAMES a dish that exists in the
    //    pre-authored enriched dataset, serve that rich variation set directly.
    //    English-only (the enriched content is English), and only when the user
    //    didn't list their own ingredients — ingredient-driven requests go to AI
    //    so their pantry is honored.
    const canServeEnriched = lang === "en" && items.length === 0;
    if (canServeEnriched && dish) {
      const slug = findEnrichedByQuery(dish);
      const set = slug ? getEnrichedSet(slug, lang) : null;
      if (set) return NextResponse.json({ ...set, source: "dataset-enriched" });
    }

    // 1) RETRIEVE (RAG): find the closest dataset recipe to GROUND generation —
    //    the dish name is the primary signal. Any index failure just means we
    //    generate ungrounded. Applies to both English and Hinglish.
    let grounding: GroundingHit | undefined;
    let topHits: { name: string; description?: string; ingredients: string[]; steps?: string[]; score: number }[] = [];
    try {
      const q = (dish || items.join(" ")).trim();
      topHits = await searchRecipes(q, 5);
      if (topHits.length && topHits[0].score >= settings.groundingThreshold) {
        const h = topHits[0];
        grounding = { name: h.name, ingredients: h.ingredients, steps: h.steps, location: (h as { location?: string }).location };
      }
    } catch (e) {
      console.warn("Semantic index unavailable, generating ungrounded:", (e as Error).message);
    }

    // 1b) SERVE-FIRST via semantic match (zero AI): a high-confidence hit whose
    //     family is already enriched is served directly. Stricter threshold than
    //     grounding — a wrong grounding still gets rewritten by the model, a
    //     wrong direct serve doesn't.
    if (canServeEnriched && topHits.length && topHits[0].score >= settings.exactMatchThreshold) {
      const slug = findEnrichedByHitName(topHits[0].name);
      const set = slug ? getEnrichedSet(slug, lang) : null;
      if (set) return NextResponse.json({ ...set, source: "dataset-enriched" });
    }

    // 2) GENERATE — grounded when we have a good dataset match. Runs when no
    //    enriched family matched (unknown dish, custom ingredients, or Hinglish).
    try {
      const result = await generateRecipes(dish, items, lang, grounding);
      if (result.variations.length > 0) {
        return NextResponse.json({ ...result, source: grounding ? "ai+grounded" : "ai" });
      }
    } catch (e) {
      console.error("AI generation failed:", (e as Error).message);
    }

    // 3) DEGRADED LAST RESORT — both providers unavailable. Prefer any enriched
    //    family among the hits (rich, measured) over raw dataset rows.
    if (lang !== "hi" && topHits.length) {
      for (const h of topHits) {
        const slug = findEnrichedByHitName(h.name);
        const set = slug ? getEnrichedSet(slug, lang) : null;
        if (set) return NextResponse.json({ ...set, source: "dataset-enriched" });
      }
      const variations = topHits.slice(0, 3).map((h) => hitToDegradedRecipe(h, lang));
      if (variations.length) {
        return NextResponse.json({
          query: dish || topHits[0].name,
          variations,
          provider: "Anveshan Collection",
          language: lang,
          source: "dataset-degraded",
        });
      }
    }

    return NextResponse.json({ error: "Couldn't generate recipes right now. Please try again in a moment." }, { status: 502 });
  } catch (e) {
    console.error("Recipe generation failed:", e);
    return NextResponse.json({ error: "Failed to generate recipes. Please try again." }, { status: 500 });
  }
}
