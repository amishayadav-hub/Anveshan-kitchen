"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { Language, GeneratedRecipeSet } from "@/lib/ai-providers";
import IngredientTagInput from "@/components/ui/IngredientTagInput";
import GeneratedRecipeCard from "@/components/recipes/GeneratedRecipeCard";
import JsonLd from "@/components/JsonLd";
import { buildGeneratedRecipesJsonLd } from "@/lib/seo";
import { track } from "@/lib/analytics";
import { useAuth } from "@/components/auth/AuthProvider";
import { generatedShopLines } from "@/lib/generated-cart";
import Link from "next/link";
import {
  SparklesIcon,
  SearchIcon,
  ChefHatIcon,
  LeafIcon,
  WandIcon,
  ArrowLeftIcon,
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
  // True when the dish/ingredients changed since the last successful generation.
  // Keeps the Generate action available (esp. the mobile bar) so a NEW dish can
  // always be generated after a result is already on screen.
  const [dirty, setDirty] = useState(false);

  // Update input + flag it dirty so the Generate action reappears.
  function updateQuery(value: string) {
    setQuery(value);
    setDirty(true);
  }
  function updateIngredients(next: string[]) {
    setIngredients(next);
    setDirty(true);
  }

  const hi = language === "hi";
  const canGenerate = query.trim().length > 0 || ingredients.length > 0;
  const resultsRef = useRef<HTMLDivElement | null>(null);

  // Per-user funnel tracking: a stable visitor uid (anonymous or signed in) +
  // a per-tab session id, linking the keyword searched to the variation clicked.
  const { uid } = useAuth();
  const sessionIdRef = useRef<string>("");
  if (!sessionIdRef.current) {
    sessionIdRef.current =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `s-${Math.random().toString(36).slice(2)}`;
  }
  const generateEventIdRef = useRef<string | null>(null);

  function postEvent(payload: Record<string, unknown>) {
    return fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: uid ?? "anon", sessionId: sessionIdRef.current, ...payload }),
      keepalive: true,
    });
  }

  // Logs which generated variation the visitor engaged, linked to the generate
  // event that produced it.
  function logVariationClick(
    v: GeneratedRecipeSet["variations"][number],
    index: number,
    action: "add_to_cart" | "expand"
  ) {
    const products = v.anveshanProducts ?? [];
    const { total } = generatedShopLines(products);
    postEvent({
      type: "variation_click",
      generateEventId: generateEventIdRef.current,
      variationIndex: index,
      variationName: v.name,
      products,
      subtotal: total,
      action,
    }).catch(() => {});
  }

  // Slide to the generated recipes as soon as they arrive.
  useEffect(() => {
    if (result && result.variations.length > 0) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  async function handleGenerate() {
    if (loading) return; // guard against double-submit / repeated Regenerate
    if (!canGenerate) {
      setError(hi ? "Dish ka naam ya ek ingredient toh daalo" : "Enter a dish name or at least one ingredient");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    track("generate_recipe", { query: query.trim() || undefined, ingredients: ingredients.length, language });

    const fallback = hi ? "Kuch galat ho gaya — dobara try karo." : "Something went wrong. Try again.";
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 60_000);
    try {
      const res = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim(), ingredients, language }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data) throw new Error(data?.error || fallback);
      setResult(data);
      setDirty(false); // input now matches the on-screen result

      // Log the funnel "generate" event (the keyword the visitor searched) and
      // remember its id so variation clicks can link back to it.
      generateEventIdRef.current = null;
      try {
        const evRes = await postEvent({
          type: "generate",
          query: query.trim(),
          ingredients,
          language,
          variationsReturned: (data.variations ?? []).map(
            (v: GeneratedRecipeSet["variations"][number]) => v.name
          ),
        });
        const ev = await evRes.json().catch(() => null);
        if (ev?.id) generateEventIdRef.current = ev.id;
      } catch {
        /* funnel logging is best-effort */
      }
    } catch (e) {
      setError(e instanceof Error && e.message && e.name !== "AbortError" ? e.message : fallback);
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  }

  function addSuggestion(item: string) {
    if (!ingredients.includes(item)) updateIngredients([...ingredients, item]);
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

        <div className="relative max-w-3xl mx-auto px-4 pt-6 pb-10 md:pt-8 md:pb-16 text-center">
          {/* Top bar: back link (left) and language toggle (right) */}
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/recipes"
              aria-label="Back to recipes"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-anv-green hover:bg-anv-green/10 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>

            <div role="group" aria-label="Language" className="inline-flex items-center h-8 bg-white border border-gray-200 rounded-full p-1 shadow-sm">
              <button
                aria-pressed={language === "en"}
                onClick={() => { setLanguage("en"); setResult(null); }}
                className={`flex items-center h-full px-3.5 rounded-full text-[13px] font-medium transition-all ${language === "en" ? "bg-anv-green text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                English
              </button>
              <button
                aria-pressed={hi}
                onClick={() => { setLanguage("hi"); setResult(null); }}
                className={`flex items-center h-full px-3.5 rounded-full text-[13px] font-medium transition-all ${hi ? "bg-anv-green text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                Hinglish
              </button>
            </div>
          </div>

          <h1 className="text-3xl md:text-[3.25rem] font-bold text-gray-900 mt-6 md:mt-10 leading-[1.1] md:leading-[1.08] tracking-tight">
            {hi ? (
              <>Koi bhi dish banao,<br className="hidden sm:block" /> <span className="text-anv-green">Anveshan</span> ke saath</>
            ) : (
              <>Cook any dish,<br className="hidden sm:block" /> the <span className="text-anv-green">Anveshan</span> way</>
            )}
          </h1>

        </div>
      </section>

      {/* Input card */}
      <section className="max-w-2xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_12px_40px_-12px_rgba(35,90,73,0.18)] p-5 sm:p-8 space-y-4 sm:space-y-6">
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
                onChange={(e) => updateQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleGenerate(); }}
                placeholder={hi ? "jaise: Aloo Paratha, Besan Ladoo..." : "e.g. Aloo Paratha, Besan Ladoo, Dal Tadka..."}
                className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-base text-gray-900 outline-none focus:border-anv-green focus:ring-2 focus:ring-anv-green/15 transition-all"
              />
            </div>

            <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar sm:flex-wrap sm:overflow-visible">
              <span className="text-xs text-gray-400 font-medium shrink-0">Popular:</span>
              {POPULAR.map((d) => (
                <button
                  key={d}
                  aria-pressed={query === d}
                  onClick={() => updateQuery(query === d ? "" : d)}
                  className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all ${
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
              onChange={updateIngredients}
              placeholder={hi ? "Ingredient type karo aur Enter dabao..." : "Type an ingredient and press Enter..."}
            />
            <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar sm:flex-wrap sm:overflow-visible">
              {SUGGESTIONS[language].map((s) => (
                <button
                  key={s}
                  onClick={() => addSuggestion(s)}
                  disabled={ingredients.includes(s)}
                  className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all ${
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
            <div role="alert" className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5 flex items-center justify-between gap-3">
              <span>{error}</span>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading || !canGenerate}
                className="shrink-0 font-semibold text-red-700 underline underline-offset-2 hover:text-red-900 disabled:opacity-50"
              >
                {hi ? "Phir se" : "Try again"}
              </button>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || !canGenerate}
            className={`group w-full py-4 rounded-xl font-semibold text-base transition-all hidden sm:flex items-center justify-center gap-2 ${
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
        <section className="max-w-4xl mx-auto px-4 pt-8 pb-28 md:pt-12 md:pb-16">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {[
              { icon: <SearchIcon className="w-5 h-5" />, title: hi ? "Dish batao" : "Name your dish", desc: hi ? "Dish ka naam ya jo ingredients paas hain wo daalo." : "Type a dish, or just the ingredients in your kitchen." },
              { icon: <WandIcon className="w-5 h-5" />, title: hi ? "AI variations banata hai" : "AI cooks up variations", desc: hi ? "4-5 alag styles, har ek mein step-by-step instructions." : "4–5 distinct styles, each with full step-by-step instructions." },
              { icon: <LeafIcon className="w-5 h-5" />, title: hi ? "Anveshan swaps add karo" : "Add the Anveshan swaps", desc: hi ? "Pure ghee, oils, attas — ek click mein cart mein." : "Pure ghee, oils & attas — straight to your cart in a click." },
            ].map((s, i) => (
              <HowItWorksCard key={i} icon={s.icon} title={s.title} desc={s.desc} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Loading skeleton */}
      {loading && (
        <section role="status" aria-live="polite" className="max-w-4xl mx-auto px-4 pt-8 pb-28 md:pt-12 md:pb-16">
          <div className="flex items-center gap-3 mb-6 text-anv-green">
            <ChefHatIcon className="w-5 h-5 animate-pulse" />
            <p className="text-sm font-medium text-gray-500">
              {hi ? "Aapki recipes pak rahi hain..." : "Cooking up your recipes..."}
            </p>
          </div>
          <div className="space-y-8" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
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
        <section ref={resultsRef} aria-live="polite" className="max-w-5xl mx-auto px-4 pt-12 pb-24 scroll-mt-20">
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
          <div className="space-y-4 sm:space-y-8">
            {result.variations.map((v, i) => (
              <div key={`${v.name}-${i}`}>
                <VariantBlock
                  recipe={v}
                  index={i}
                  total={result.variations.length}
                  first={i === 0}
                  onEngage={(action) => logVariationClick(v, i, action)}
                />
              </div>
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

      {/* Mobile sticky Generate bar. Shows when there's no result yet, OR when the
          input changed since the last result — so a NEW dish can always be
          generated on mobile (the inline button covers desktop). */}
      {(!result || dirty) && (
        <div className="sm:hidden fixed inset-x-0 bottom-14 z-40 border-t border-gray-100 bg-white/95 backdrop-blur px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
          <button
            onClick={handleGenerate}
            disabled={loading || !canGenerate}
            className={`w-full py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all ${
              loading ? "bg-anv-green text-white" : !canGenerate ? "bg-gray-100 text-gray-400" : "bg-anv-green text-white shadow-sm"
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
      )}
    </main>
  );
}

// First variation shows in full. On mobile the rest collapse behind a clear
// "Try another variation" tap-to-open header; on desktop (sm+) all stay open.
function VariantBlock({
  recipe,
  index,
  total,
  first,
  onEngage,
}: {
  recipe: GeneratedRecipeSet["variations"][number];
  index: number;
  total: number;
  first: boolean;
  onEngage: (action: "add_to_cart" | "expand") => void;
}) {
  const [open, setOpen] = useState(false);
  if (first)
    return (
      <GeneratedRecipeCard
        recipe={recipe}
        index={index}
        total={total}
        onEngage={() => onEngage("add_to_cart")}
      />
    );

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          setOpen((o) => {
            const next = !o;
            if (next) onEngage("expand"); // opening a variation is engagement
            return next;
          })
        }
        aria-expanded={open}
        className="sm:hidden w-full flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm text-left"
      >
        <span className="min-w-0">
          <span className="block text-xs font-bold uppercase tracking-wider text-anv-green/70">Try another variation</span>
          <span className="block font-bold text-gray-900 truncate">{recipe.name}</span>
        </span>
        <ChevronDownIcon className={`shrink-0 h-5 w-5 text-anv-green transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`${open ? "block mt-4" : "hidden"} sm:block sm:mt-0`}>
        <GeneratedRecipeCard
          recipe={recipe}
          index={index}
          total={total}
          onEngage={() => onEngage("add_to_cart")}
        />
      </div>
    </div>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// "How it works" step: only the heading shows; the description is revealed on
// hover (desktop) or tap (mobile, toggles open).
function HowItWorksCard({ icon, title, desc, index }: { icon: ReactNode; title: string; desc: string; index: number }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);
  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      className="group cursor-pointer bg-white rounded-2xl border border-gray-100 p-3 sm:p-5 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-anv-green/30"
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-anv-green/10 text-anv-green flex items-center justify-center shrink-0">
          {icon}
        </span>
        <span className="hidden sm:inline text-xs font-bold text-anv-green/40">0{index + 1}</span>
      </div>
      <h3 className="font-bold text-gray-900 text-xs sm:text-sm">{title}</h3>
      <p className={`text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed ${open ? "block" : "hidden group-hover:block"}`}>
        {desc}
      </p>
    </div>
  );
}
