"use client";

import { useState } from "react";
import { Language, GeneratedRecipeSet } from "@/lib/ai-providers";
import IngredientTagInput from "@/components/ui/IngredientTagInput";
import GeneratedRecipeCard from "@/components/recipes/GeneratedRecipeCard";
import Link from "next/link";

const SUGGESTIONS = {
  en: ["paneer", "tomato", "onion", "garlic", "ghee", "rice", "dal", "potato", "spinach", "coconut milk"],
  hi: ["paneer", "tamatar", "pyaaz", "lehsun", "ghee", "chawal", "dal", "aloo", "palak"],
};

const inputCls =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 outline-none focus:border-anv-green transition-colors";

export default function GenerateRecipePage() {
  const [language, setLanguage] = useState<Language>("en");
  const [query, setQuery] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [result, setResult] = useState<GeneratedRecipeSet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canGenerate = query.trim().length > 0 || ingredients.length > 0;

  async function handleGenerate() {
    if (!canGenerate) {
      setError(language === "hi" ? "Dish ka naam ya ek ingredient toh daalo" : "Enter a dish name or at least one ingredient");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, ingredients, language }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function addSuggestion(item: string) {
    if (!ingredients.includes(item)) setIngredients([...ingredients, item]);
  }

  const heading = result
    ? result.query && result.query.toLowerCase() !== "recipe"
      ? language === "hi"
        ? `${result.query} banane ke ${result.variations.length} tareeke`
        : `${result.variations.length} ways to make ${result.query}`
      : language === "hi"
      ? `${result.variations.length} recipe variations`
      : `${result.variations.length} recipe variations`
    : "";

  return (
    <main>
      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-12 px-4 text-center">
        <Link href="/recipes" className="text-anv-green text-sm font-medium hover:underline">
          ← Back to Recipes
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">
          {language === "hi" ? "AI se Recipe Banao" : "AI Recipe Generator"}
        </h1>
        <p className="mt-3 text-gray-500 max-w-lg mx-auto text-base">
          {language === "hi"
            ? "Dish ka naam likho (jaise Aloo Paratha) — AI 4-5 variations banayega, har ek mein Anveshan ke healthy swaps."
            : "Type a dish (e.g. Aloo Paratha) — AI builds 4-5 full variations, each with Anveshan's healthy swaps."}
        </p>

        {/* Language Toggle */}
        <div className="mt-5 inline-flex bg-white border border-gray-200 rounded-full p-1 shadow-sm">
          <button
            onClick={() => { setLanguage("en"); setResult(null); }}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${language === "en" ? "bg-anv-green text-white" : "text-gray-500 hover:text-gray-700"}`}
          >
            English
          </button>
          <button
            onClick={() => { setLanguage("hi"); setResult(null); }}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${language === "hi" ? "bg-purple-600 text-white" : "text-gray-500 hover:text-gray-700"}`}
          >
            Hinglish
          </button>
        </div>

        {language === "hi" && (
          <p className="mt-2 text-xs text-purple-600 font-medium">
            Hinglish mode — Hindi in English letters, the way we actually talk 😋
          </p>
        )}
      </section>

      {/* Input Section */}
      <section className="max-w-2xl mx-auto px-4 py-10">
        <div className="space-y-5">
          {/* Dish search */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              {language === "hi" ? "Konsi dish banani hai?" : "Which dish do you want to make?"}
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleGenerate(); }}
              placeholder={language === "hi" ? "jaise: Aloo Paratha, Besan Ladoo, Dal Tadka..." : "e.g. Aloo Paratha, Besan Ladoo, Dal Tadka..."}
              className={inputCls}
            />
          </div>

          {/* Ingredients (optional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              {language === "hi" ? "Aapke paas jo hai (optional)" : "Ingredients you have (optional)"}
            </label>
            <IngredientTagInput
              tags={ingredients}
              onChange={setIngredients}
              placeholder={language === "hi" ? "Ingredient type karo aur Enter dabao..." : "Type ingredient and press Enter..."}
            />
            <div className="mt-2">
              <p className="text-xs text-gray-400 mb-2">Quick add:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS[language].map((s) => (
                  <button
                    key={s}
                    onClick={() => addSuggestion(s)}
                    disabled={ingredients.includes(s)}
                    className={`text-xs px-3 py-1 rounded-full border transition-all ${
                      ingredients.includes(s)
                        ? "bg-anv-cream/30 border-anv-cream-dark text-anv-green/40 cursor-default"
                        : "bg-white border-gray-200 text-gray-600 hover:border-anv-green hover:text-anv-green"
                    }`}
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
              {error}
            </p>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || !canGenerate}
            className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all ${
              loading || !canGenerate
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : language === "hi"
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-anv-green hover:bg-anv-green-dark text-white"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {language === "hi" ? "Variations ban rahe hain..." : "Generating variations..."}
              </span>
            ) : (
              language === "hi" ? "Recipe Variations Banao ✨" : "Generate Variations ✨"
            )}
          </button>
        </div>
      </section>

      {/* Generated variations */}
      {result && result.variations.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{heading}</h2>
            <p className="text-sm text-gray-400 mt-1">via {result.provider} · 2-3 servings each</p>
          </div>
          <div className="space-y-8">
            {result.variations.map((v, i) => (
              <GeneratedRecipeCard key={i} recipe={v} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
