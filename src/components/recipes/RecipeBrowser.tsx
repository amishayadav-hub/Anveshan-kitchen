"use client";

import { useState, useMemo, useDeferredValue } from "react";
import { Recipe, AnveshanProduct } from "@/types";
import { CATEGORIES, getCategory } from "@/lib/categories";
import RecipeCard from "@/components/recipes/RecipeCard";
import { useDiet } from "@/components/recipes/DietProvider";

interface Props {
  recipes: Recipe[];
  productMap: Record<string, AnveshanProduct>;
  initialCategory?: string;
  initialQuery?: string;
}

export default function RecipeBrowser({ recipes, productMap, initialCategory, initialQuery }: Props) {
  // Honor ?category= from the header nav, if it's a real category.
  const validCategory =
    initialCategory && CATEGORIES.some((c) => c.key === initialCategory) ? initialCategory : "all";
  const [category, setCategory] = useState<string>(validCategory);
  const [sub, setSub] = useState<string>("all");
  // Veg / Non-Veg now live in the green stripe (shared via DietProvider).
  const { vegOnly, nonVegOnly } = useDiet();

  const activeCategory = category === "all" ? null : getCategory(category);
  const subs = activeCategory?.subs ?? null;

  const q = (initialQuery ?? "").trim().toLowerCase();

  // Defer the heavy 102-card re-filter so filter clicks stay responsive (INP).
  const dCategory = useDeferredValue(category);
  const dSub = useDeferredValue(sub);
  const dVeg = useDeferredValue(vegOnly);
  const dNonVeg = useDeferredValue(nonVegOnly);

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      if (q && !r.name.toLowerCase().includes(q)) return false; // search by name
      if (dVeg && r.isVeg === false) return false; // hide non-veg
      if (dNonVeg && r.isVeg !== false) return false; // hide veg
      if (dCategory !== "all" && r.category !== dCategory) return false;
      if (dSub !== "all" && r.subCategory !== dSub) return false;
      return true;
    });
  }, [recipes, dCategory, dSub, dVeg, dNonVeg, q]);

  function selectCategory(key: string) {
    setCategory(key);
    setSub("all"); // reset sub whenever top-level changes
  }

  return (
    <div>
      {/* Top-level filter row */}
      <div className="flex flex-wrap gap-2">
        <FilterChip label="All Recipes" active={category === "all"} onClick={() => selectCategory("all")} />
        {CATEGORIES.map((c) => (
          <FilterChip
            key={c.key}
            label={c.label}
            active={category === c.key}
            onClick={() => selectCategory(c.key)}
          />
        ))}
      </div>

      {/* Second-level sub-product row (only for product groups) */}
      {subs && (
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl bg-anv-cream/30 border border-anv-cream-dark p-3">
          <span className="text-xs font-semibold text-anv-green uppercase tracking-wide mr-1">
            {activeCategory?.label}:
          </span>
          <SubChip label="All" active={sub === "all"} onClick={() => setSub("all")} />
          {subs.map((s) => (
            <SubChip key={s.key} label={s.label} active={sub === s.key} onClick={() => setSub(s.key)} />
          ))}
        </div>
      )}

      {/* Count */}
      <p className="mt-4 text-sm text-gray-500">
        {filtered.length} {filtered.length === 1 ? "recipe" : "recipes"}
        {q && (
          <>
            {" "}for &ldquo;<span className="text-anv-green font-medium">{initialQuery}</span>&rdquo;
          </>
        )}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <p>No recipes found. Try a different search or filter.</p>
        </div>
      ) : (
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((r, i) => (
            <RecipeCard key={r.id} recipe={r} productMap={productMap} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${
        active
          ? "bg-anv-green text-white border-anv-green"
          : "bg-white text-gray-600 border-gray-200 hover:border-anv-green hover:text-anv-green"
      }`}
    >
      {label}
    </button>
  );
}

function SubChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
        active
          ? "bg-anv-green text-white border-anv-green"
          : "bg-white text-anv-green border-anv-cream-dark hover:border-anv-green"
      }`}
    >
      {label}
    </button>
  );
}
