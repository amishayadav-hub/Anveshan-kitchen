import { NextRequest, NextResponse } from "next/server";
import { generateRecipes, Language, GeneratedRecipe } from "@/lib/ai-providers";
import { searchRecipes, SearchHit } from "@/lib/semantic-search";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_QUERY = 200;
const MAX_INGREDIENT = 80;
const MAX_INGREDIENTS = 15;

// Strip control characters and collapse whitespace from user-supplied text.
function sanitize(s: string): string {
  return s.replace(/\p{Cc}/gu, " ").replace(/\s+/g, " ").trim();
}

// Minimum cosine score for a dataset match to be served instead of calling AI.
const SEARCH_THRESHOLD = 0.45;

// Branded dataset ingredient → our internal productId (so cart/links work).
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

// Map a 10k dataset hit into the GeneratedRecipe shape the UI already renders.
function hitToRecipe(hit: SearchHit, language: Language): GeneratedRecipe {
  const ingredients = hit.ingredients.map((s) => {
    const pid = BRAND_TO_PID[s];
    return {
      name: s,
      quantity: "",
      unit: "",
      anveshan: !!pid,
      ...(pid ? { anveshanProductId: pid } : {}),
    };
  });
  const anveshanProducts = [
    ...new Set(hit.ingredients.map((s) => BRAND_TO_PID[s]).filter(Boolean) as string[]),
  ];
  return {
    name: hit.name,
    description: hit.description ?? "",
    prepTime: "15 min",
    cookTime: "25 min",
    servings: 4,
    ingredients,
    steps: hit.steps ?? [],
    anveshanProducts,
    provider: "Anveshan Collection",
    language,
  };
}

export async function POST(req: NextRequest) {
  const limit = rateLimit(`gen:${clientIp(req)}`, 15, 60_000);
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
      return NextResponse.json(
        { error: "Enter a dish name or at least one ingredient" },
        { status: 400 }
      );
    }

    // 1) Dataset-first: try the 10k semantic index (English only). Any failure
    //    (index missing / model error) falls through to AI.
    if (lang !== "hi") {
      try {
        const hits = await searchRecipes([dish, ...items].join(" ").trim(), 5);
        if (hits.length && hits[0].score >= SEARCH_THRESHOLD) {
          const variations = hits.slice(0, 3).map((h) => hitToRecipe(h, lang));
          return NextResponse.json({
            query: dish || hits[0].name,
            variations,
            provider: "Anveshan Collection",
            language: lang,
            source: "dataset",
            topScore: hits[0].score,
          });
        }
      } catch (e) {
        console.warn("Dataset search unavailable, using AI:", (e as Error).message);
      }
    }

    // 2) Fallback: live AI generation.
    const result = await generateRecipes(dish, items, lang);
    if (!result.variations.length) {
      return NextResponse.json(
        { error: "Couldn't generate variations. Please try again." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ...result, source: "ai" });
  } catch (e) {
    console.error("Recipe generation failed:", e);
    return NextResponse.json({ error: "Failed to generate recipes. Please try again." }, { status: 500 });
  }
}
