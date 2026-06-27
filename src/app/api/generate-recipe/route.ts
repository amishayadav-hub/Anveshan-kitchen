import { NextRequest, NextResponse } from "next/server";
import { generateRecipes, Language, GeneratedRecipe } from "@/lib/ai-providers";
import { searchRecipes, SearchHit } from "@/lib/semantic-search";

export const runtime = "nodejs";

// Minimum cosine score for a dataset match to be served instead of calling AI.
// Tunable — raise it to fall back to AI more often, lower it to prefer the 10k.
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
  try {
    const { query, ingredients, language } = (await req.json()) as {
      query?: string;
      ingredients?: string[];
      language?: Language;
    };

    const dish = (query ?? "").trim();
    const items = Array.isArray(ingredients) ? ingredients : [];
    const lang: Language = language ?? "en";

    if (!dish && items.length === 0) {
      return NextResponse.json(
        { error: "Enter a dish name or at least one ingredient" },
        { status: 400 }
      );
    }
    if (items.length > 15) {
      return NextResponse.json({ error: "Maximum 15 ingredients allowed" }, { status: 400 });
    }

    // 1) Dataset-first: try the 10k semantic index (English only — the dataset
    //    is English; Hinglish requests go straight to AI). Any failure (index
    //    missing / model error) falls through to AI.
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
