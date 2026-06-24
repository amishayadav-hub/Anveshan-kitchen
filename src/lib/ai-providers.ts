import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

export type Language = "en" | "hi";

export interface GeneratedIngredient {
  name: string;
  quantity: string;
  unit: string;
  anveshan: boolean;
  anveshanProductId?: string;
  note?: string;
}

export interface GeneratedRecipe {
  name: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: GeneratedIngredient[];
  steps: string[];
  anveshanProducts: string[];
  provider: string;
  language: Language;
}

// Anveshan product catalog injected into every prompt
const ANVESHAN_CATALOG = `
Anveshan sells these products (use productId exactly as shown):
- productId "khandsari"    → Khandsari (unrefined cane sugar) — replaces white/refined sugar
- productId "ghee"         → Bilona Ghee (Gir Cow A2 / Desi Cow A2 / Buffalo) — replaces butter, dalda, refined oil in Indian cooking
- productId "groundnut-oil"→ Wood-Pressed Groundnut Oil — replaces refined sunflower/vegetable oil for frying
- productId "honey"        → Wild Forest Honey — replaces refined sugar in drinks, dressings, marinades
- productId "coconut-oil"  → Wood-Pressed Coconut Oil — replaces refined coconut/vegetable oil
- productId "khapli-atta"  → Cold-Pressed Khapli Atta (Emmer wheat) — replaces maida or regular atta
- productId "mustard-oil"  → Wood-Pressed Black Mustard Oil — replaces refined mustard oil
`;

function buildPrompt(ingredients: string[], language: Language): string {
  const langInstruction =
    language === "hi"
      ? "Respond ENTIRELY in Hindi (Devanagari script). Recipe name, description, ingredient names, steps — all in Hindi."
      : "Respond in English.";

  return `You are Anveshan Kitchen's AI recipe assistant.
${langInstruction}

User has these ingredients: ${ingredients.join(", ")}

${ANVESHAN_CATALOG}

Generate ONE complete recipe using these ingredients. Where possible, suggest Anveshan products as healthier replacements for common ingredients (sugar→khandsari, refined oil→groundnut-oil, butter→ghee, maida→khapli-atta, etc).

Return ONLY valid JSON matching this exact structure (no markdown, no explanation):
{
  "name": "Recipe name",
  "description": "2-3 sentence description",
  "prepTime": "X min",
  "cookTime": "X min",
  "servings": 4,
  "ingredients": [
    {
      "name": "ingredient name",
      "quantity": "amount",
      "unit": "cup/tsp/g/etc",
      "anveshan": true,
      "anveshanProductId": "khandsari",
      "note": "Why Anveshan version is better"
    }
  ],
  "steps": ["Step 1...", "Step 2..."],
  "anveshanProducts": ["khandsari", "ghee"]
}

For non-Anveshan ingredients set "anveshan": false and omit anveshanProductId and note.`;
}

// ─── GEMINI (Primary) ────────────────────────────────────────────────────────

async function generateWithGemini(ingredients: string[], language: Language): Promise<GeneratedRecipe> {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

  const result = await model.generateContent(buildPrompt(ingredients, language));
  const text = result.response.text();
  const parsed = JSON.parse(text);
  return { ...parsed, provider: "Gemini", language };
}

// ─── GROQ (English Fallback) ─────────────────────────────────────────────────

async function generateWithGroq(ingredients: string[], language: Language): Promise<GeneratedRecipe> {
  const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY!,
    baseURL: "https://api.groq.com/openai/v1",
  });

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: buildPrompt(ingredients, language) }],
    response_format: { type: "json_object" },
    temperature: 0.7,
  });

  const text = completion.choices[0].message.content ?? "{}";
  const parsed = JSON.parse(text);
  return { ...parsed, provider: "Groq", language };
}

// ─── NVIDIA NIM / SARVAM-M (Hindi) ───────────────────────────────────────────

async function generateWithSarvam(ingredients: string[]): Promise<GeneratedRecipe> {
  const nvidia = new OpenAI({
    apiKey: process.env.NVIDIA_API_KEY!,
    baseURL: "https://integrate.api.nvidia.com/v1",
  });

  const completion = await nvidia.chat.completions.create({
    model: "sarvam-ai/sarvam-m",
    messages: [{ role: "user", content: buildPrompt(ingredients, "hi") }],
    temperature: 0.7,
    max_tokens: 2048,
  });

  const text = completion.choices[0].message.content ?? "{}";
  // Sarvam-M may wrap JSON in markdown — strip it
  const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const parsed = JSON.parse(cleaned);
  return { ...parsed, provider: "Sarvam-M", language: "hi" };
}

// ─── PUBLIC ENTRY POINT ───────────────────────────────────────────────────────

export async function generateRecipe(
  ingredients: string[],
  language: Language
): Promise<GeneratedRecipe> {
  // Hindi → dedicated Sarvam-M lane, with Groq Hindi as fallback
  if (language === "hi") {
    try {
      return await generateWithSarvam(ingredients);
    } catch (e) {
      console.warn("Sarvam-M failed, falling back to Groq Hindi:", e);
      return await generateWithGroq(ingredients, "hi");
    }
  }

  // English → Gemini primary, Groq fallback on any failure
  try {
    return await generateWithGemini(ingredients, "en");
  } catch (e: unknown) {
    console.warn("Gemini failed, switching to Groq:", (e as Error).message);
    return await generateWithGroq(ingredients, "en");
  }
}
