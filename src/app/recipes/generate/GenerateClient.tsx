"use client";

import { useState } from "react";
import { Language, GeneratedRecipeSet } from "@/lib/ai-providers";
import IngredientTagInput from "@/components/ui/IngredientTagInput";
import GeneratedRecipeCard from "@/components/recipes/GeneratedRecipeCard";
import JsonLd from "@/components/JsonLd";
import { buildGeneratedRecipesJsonLd } from "@/lib/seo";
import Link from "next/link";
import {
  SparklesIcon,
  ArrowLeftIcon,
  SearchIcon,
  ChefHatIcon,
  LeafIcon,
  WandIcon,
} from "@/components/ui/icons";

const SUGGESTIONS = {
  en: ["paneer", "tomato", "onion", "garlic", "ghee", "rice", "dal", "potato", "spinach", "coconut milk"],
  hi: ["paneer", "tamatar", "pyaaz", "lehsun", "ghee", "chawal", "dal", "aloo", "palak"],
};

const POPULAR = ["Aloo Paratha", "Paneer Butter Masala", "Besan Ladoo", "Dal Tadka", "Masala Dosa", "Gajar Halwa"];

export default function GenerateClient() {
  const [language, setLanguage] = useState<Language>("en");
  const [query, setQuery] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [result, setResult] = useState<GeneratedRecipeSet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hi = language === "hi";
  const canGenerate = query.trim().length > 0 || ingredients.length > 0;

  async function handleGenerate() {
    if (loading) return; // guard against double-submit / repeated Regenerate
    if (!canGenerate) {
      setError(hi ? "Dish ka naam ya ek ingredient toh daalo" : "Enter a dish name or at least one ingredient");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    const fallback = hi ? "Kuch galat ho gaya — dobara try karo." : "Something went wrong. Try again.";
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 60_000);
    try {
      const res = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, ingredients, language }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data) throw new Error(data?.error || fallback);
      setResult(data);
    } catch (e) {
      setError(e instanceof Error && e.message && e.name !== "AbortError" ? e.message : fallback);
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  }

  function addSuggestion(item: string) {
    if (!ingredients.includes(item)) setIngredients([...ingredients, item]);
  }

  const heading = result
    ? result.query && result.query.toLowerCase() !== "recipe"
      ? hi
        ? `${result.query} banane ke ${result.variations.length} tareeke`
        : `${result.variations.length} ways to make ${result.query}`
      : `${result.variations.length} recipe variations`
    : "";

  return (
    <main className="bg-[#FAFAF7]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EEF4F0] to-[#FAFAF7] border-b border-gray-100">
        <div className="pointer-events-none absolute -top-28 -right-24 w-80 h-80 rounded-full bg-anv-green/10 blur-3xl" />
        <div className="pointer-events-none absolute -top-16 -left-24 w-72 h-72 rounded-full bg-anv-gold/10 blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 pt-8 pb-16 text-center">
          <div>
            <Link
              href="/recipes"
              className="inline-flex items-center gap-1.5 text-gray-400 text-sm font-medium hover:text-anv-green transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" /> Back to Recipes
            </Link>
          </div>

          <div className="mt-6 inline-flex items-center gap-1.5 bg-anv-green/10 text-anv-green text-xs font-semibold uppercase tracking-[0.12em] px-3.5 py-1.5 rounded-full">
            <SparklesIcon className="w-3.5 h-3.5" />
            AI Recipe Studio
          </div>

          <h1 className="text-4xl md:text-[3.25rem] font-bold text-gray-900 mt-5 leading-[1.08] tracking-tight">
            {hi ? (
              <>Koi bhi dish banao,<br className="hidden sm:block" /> <span className="text-anv-green">Anveshan</span> ke saath</>
            ) : (
              <>Cook any dish,<br className="hidden sm:block" /> the <span className="text-anv-green">Anveshan</span> way</>
            )}
          </h1>

          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            {hi
              ? "Dish ka naam likho — AI 4-5 healthy variations banayega, har ek mein Anveshan ke pure ghee, oils aur attas ke swaps."
              : "Name a dish and our AI builds 4–5 full variations — each one swapping in Anveshan's pure ghee, wood-pressed oils and ancient-grain attas."}
          </p>

          <div role="group" aria-label="Language" className="mt-7 inline-flex bg-white border border-gray-200 rounded-full p-1 shadow-sm">
            <button
              aria-pressed={language === "en"}
              onClick={() => { setLanguage("en"); setResult(null); }}
              className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all ${language === "en" ? "bg-anv-green text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              English
            </button>
            <button
              aria-pressed={hi}
              onClick={() => { setLanguage("hi"); setResult(null); }}
              className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all ${hi ? "bg-anv-green text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Hinglish
            </button>
          </div>
        </div>
      </section>

      {/* Input card */}
      <section className="max-w-2xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_12px_40px_-12px_rgba(35,90,73,0.18)] p-6 sm:p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              {hi ? "Konsi dish banani hai?" : "Which dish do you want to make?"}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon className="w-5 h-5" />
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleGenerate(); }}
                placeholder={hi ? "jaise: Aloo Paratha, Besan Ladoo..." : "e.g. Aloo Paratha, Besan Ladoo, Dal Tadka..."}
                className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-base text-gray-900 outline-none focus:border-anv-green focus:ring-2 focus:ring-anv-green/15 transition-all"
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400 font-medium">{hi ? "Popular:" : "Popular:"}</span>
              {POPULAR.map((d) => (
                <button
                  key={d}
                  aria-pressed={query === d}
                  onClick={() => setQuery((q) => (q === d ? "" : d))}
                  className={`text-xs px-3 py-1 rounded-full border transition-all ${
                    query === d
                      ? "bg-anv-green text-white border-anv-green"
                      : "bg-white border-gray-200 text-gray-600 hover:border-anv-green hover:text-anv-green"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              {hi ? "ya, jo paas hai" : "or, what you have"}
            </span>
            <span className="h-px flex-1 bg-gray-100" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              {hi ? "Aapke paas jo hai (optional)" : "Ingredients you have (optional)"}
            </label>
            <IngredientTagInput
              tags={ingredients}
              onChange={setIngredients}
              placeholder={hi ? "Ingredient type karo aur Enter dabao..." : "Type an ingredient and press Enter..."}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {SUGGESTIONS[language].map((s) => (
                <button
                  key={s}
                  onClick={() => addSuggestion(s)}
                  disabled={ingredients.includes(s)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all ${
                    ingredients.includes(s)
                      ? "bg-anv-green/8 border-anv-green/20 text-anv-green/40 cursor-default"
                      : "bg-white border-gray-200 text-gray-600 hover:border-anv-green hover:text-anv-green"
                  }`}
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
              {error}
            </p>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || !canGenerate}
            className={`group w-full py-4 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2 ${
              loading || !canGenerate
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-anv-green text-white shadow-sm hover:shadow-lg hover:-translate-y-0.5"
            }`}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {hi ? "Variations ban rahe hain..." : "Generating variations..."}
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                {hi ? "Recipe Variations Banao" : "Generate Variations"}
              </>
            )}
          </button>
        </div>
      </section>

      {/* How it works (before first result) */}
      {!result && !loading && (
        <section className="max-w-4xl mx-auto px-4 pt-12 pb-16">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: <SearchIcon className="w-5 h-5" />, title: hi ? "Dish batao" : "Name your dish", desc: hi ? "Dish ka naam ya jo ingredients paas hain wo daalo." : "Type a dish, or just the ingredients in your kitchen." },
              { icon: <WandIcon className="w-5 h-5" />, title: hi ? "AI variations banata hai" : "AI cooks up variations", desc: hi ? "4-5 alag styles, har ek mein step-by-step instructions." : "4–5 distinct styles, each with full step-by-step instructions." },
              { icon: <LeafIcon className="w-5 h-5" />, title: hi ? "Anveshan swaps add karo" : "Add the Anveshan swaps", desc: hi ? "Pure ghee, oils, attas — ek click mein cart mein." : "Pure ghee, oils & attas — straight to your cart in a click." },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-10 h-10 rounded-xl bg-anv-green/10 text-anv-green flex items-center justify-center shrink-0">
                    {s.icon}
                  </span>
                  <span className="text-xs font-bold text-anv-green/40">0{i + 1}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{s.title}</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Loading skeleton */}
      {loading && (
        <section role="status" aria-live="polite" className="max-w-4xl mx-auto px-4 pt-12 pb-16">
          <div className="flex items-center gap-3 mb-6 text-anv-green">
            <ChefHatIcon className="w-5 h-5 animate-pulse" />
            <p className="text-sm font-medium text-gray-500">
              {hi ? "Aapki recipes pak rahi hain..." : "Cooking up your recipes..."}
            </p>
          </div>
          <div className="space-y-8" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
                <div className="bg-gradient-to-br from-anv-green/[0.07] via-white to-anv-gold/[0.06] border-b border-gray-100 p-6 sm:p-7">
                  <div className="h-6 w-1/2 bg-gray-200 rounded-md" />
                  <div className="h-3 w-3/4 bg-gray-100 rounded mt-3" />
                  <div className="flex gap-2 mt-4">
                    <div className="h-7 w-24 bg-gray-100 rounded-full" />
                    <div className="h-7 w-24 bg-gray-100 rounded-full" />
                    <div className="h-7 w-24 bg-gray-100 rounded-full" />
                  </div>
                </div>
                <div className="grid lg:grid-cols-[1fr_340px] gap-8 p-6 sm:p-7 items-start">
                  <div className="space-y-3">
                    {[...Array(6)].map((_, k) => (
                      <div key={k} className="h-3 bg-gray-100 rounded" style={{ width: `${90 - k * 7}%` }} />
                    ))}
                  </div>
                  <div className="rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="h-14 bg-anv-green/80" />
                    <div className="p-4 space-y-3">
                      <div className="h-16 bg-gray-100 rounded-xl" />
                      <div className="h-16 bg-gray-100 rounded-xl" />
                      <div className="h-11 bg-gray-200 rounded-xl mt-2" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Results */}
      {result && result.variations.length > 0 && (
        <section aria-live="polite" className="max-w-4xl mx-auto px-4 pt-12 pb-20">
          {(() => {
            const ld = buildGeneratedRecipesJsonLd(result.variations);
            return ld ? <JsonLd data={ld} /> : null;
          })()}
          <div className="mb-6 flex items-end justify-between gap-4 flex-wrap">
            <div className="min-w-0">
              <h2 className="text-3xl font-bold text-gray-900 break-words">{heading}</h2>
              <p className="text-sm text-gray-400 mt-1 flex items-center gap-1.5">
                <SparklesIcon className="w-3.5 h-3.5" /> {hi ? "Har variation mein Anveshan ke healthy swaps" : "Each version built around Anveshan ingredients"}
              </p>
            </div>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="text-sm font-medium text-anv-green border border-anv-green/30 rounded-full px-4 py-1.5 hover:bg-anv-green/5 transition-colors disabled:opacity-50"
            >
              {hi ? "Aur variations" : "Regenerate"}
            </button>
          </div>
          <div className="space-y-8">
            {result.variations.map((v, i) => (
              <GeneratedRecipeCard key={`${v.name}-${i}`} recipe={v} />
            ))}
          </div>
        </section>
      )}

      {/* Empty result */}
      {result && result.variations.length === 0 && !loading && (
        <section className="max-w-2xl mx-auto px-4 pt-16 pb-24 text-center">
          <p className="text-gray-500">
            {hi ? "Is dish ke liye variations nahi mile. Koi aur dish try karo." : "Couldn't find variations for that. Try a different dish."}
          </p>
        </section>
      )}
    </main>
  );
}
