"use client";

import { useState } from "react";
import { Language, GeneratedRecipe } from "@/lib/ai-providers";
import IngredientTagInput from "@/components/ui/IngredientTagInput";
import GeneratedRecipeCard from "@/components/recipes/GeneratedRecipeCard";
import Link from "next/link";

const SUGGESTIONS = {
  en: ["paneer", "tomato", "onion", "garlic", "ghee", "rice", "dal", "potato", "spinach", "coconut milk"],
  hi: ["पनीर", "टमाटर", "प्याज़", "लहसुन", "घी", "चावल", "दाल", "आलू", "पालक"],
};

export default function GenerateRecipePage() {
  const [language, setLanguage] = useState<Language>("en");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<GeneratedRecipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate() {
    if (ingredients.length < 2) {
      setError(language === "hi" ? "कृपया कम से कम 2 सामग्री डालें" : "Please add at least 2 ingredients");
      return;
    }
    setError("");
    setLoading(true);
    setRecipe(null);

    try {
      const res = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients, language }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setRecipe(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  function addSuggestion(item: string) {
    if (!ingredients.includes(item)) setIngredients([...ingredients, item]);
  }

  return (
    <main>
      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-12 px-4 text-center">
        <Link href="/recipes" className="text-anv-green text-sm font-medium hover:underline">
          ← Back to Recipes
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">
          {language === "hi" ? "AI रेसिपी जेनरेटर" : "AI Recipe Generator"}
        </h1>
        <p className="mt-3 text-gray-500 max-w-lg mx-auto text-base">
          {language === "hi"
            ? "अपनी सामग्री डालें — AI एक रेसिपी बनाएगा और Anveshan के स्वस्थ विकल्प सुझाएगा।"
            : "Enter what you have — AI builds a recipe and suggests Anveshan's healthy swaps."}
        </p>

        {/* Language Toggle */}
        <div className="mt-5 inline-flex bg-white border border-gray-200 rounded-full p-1 shadow-sm">
          <button
            onClick={() => { setLanguage("en"); setIngredients([]); setRecipe(null); }}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${language === "en" ? "bg-anv-green text-white" : "text-gray-500 hover:text-gray-700"}`}
          >
            English
          </button>
          <button
            onClick={() => { setLanguage("hi"); setIngredients([]); setRecipe(null); }}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${language === "hi" ? "bg-purple-600 text-white" : "text-gray-500 hover:text-gray-700"}`}
          >
            हिंदी
          </button>
        </div>

        {language === "hi" && (
          <p className="mt-2 text-xs text-purple-600 font-medium">
            Powered by Sarvam-M — India&apos;s language AI
          </p>
        )}
      </section>

      {/* Input Section */}
      <section className="max-w-2xl mx-auto px-4 py-10">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700">
            {language === "hi" ? "आपके पास क्या है?" : "What ingredients do you have?"}
          </label>

          <IngredientTagInput
            tags={ingredients}
            onChange={setIngredients}
            placeholder={language === "hi" ? "सामग्री टाइप करें और Enter दबाएं..." : "Type ingredient and press Enter..."}
          />

          {/* Quick suggestions */}
          <div>
            <p className="text-xs text-gray-400 mb-2">
              {language === "hi" ? "त्वरित सुझाव:" : "Quick suggestions:"}
            </p>
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

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
              {error}
            </p>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || ingredients.length < 2}
            className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all ${
              loading || ingredients.length < 2
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : language === "hi"
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-anv-green hover:bg-anv-green-dark text-white"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {language === "hi" ? "रेसिपी बन रही है..." : "Generating recipe..."}
              </span>
            ) : (
              language === "hi" ? "रेसिपी बनाएं ✨" : "Generate Recipe ✨"
            )}
          </button>
        </div>
      </section>

      {/* Generated Recipe */}
      {recipe && (
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <GeneratedRecipeCard recipe={recipe} />
        </section>
      )}
    </main>
  );
}
