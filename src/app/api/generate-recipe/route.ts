import { NextRequest, NextResponse } from "next/server";
import { generateRecipe, Language } from "@/lib/ai-providers";

export async function POST(req: NextRequest) {
  try {
    const { ingredients, language } = await req.json() as {
      ingredients: string[];
      language: Language;
    };

    if (!ingredients?.length) {
      return NextResponse.json({ error: "No ingredients provided" }, { status: 400 });
    }

    if (ingredients.length > 15) {
      return NextResponse.json({ error: "Maximum 15 ingredients allowed" }, { status: 400 });
    }

    const recipe = await generateRecipe(ingredients, language ?? "en");
    return NextResponse.json(recipe);
  } catch (e) {
    console.error("Recipe generation failed:", e);
    return NextResponse.json({ error: "Failed to generate recipe. Please try again." }, { status: 500 });
  }
}
