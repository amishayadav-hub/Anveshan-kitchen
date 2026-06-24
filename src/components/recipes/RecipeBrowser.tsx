"use client";

import { useState, useMemo } from "react";
import { Recipe, AnveshanProduct } from "@/types";
import { CATEGORIES, getCategory } from "@/lib/categories";
import RecipeCard from "@/components/recipes/RecipeCard";

interface Props {
  recipes: Recipe[];
  productMap: Record<string, AnveshanProduct>;
}

export default function RecipeBrowser({ recipes, productMap }: Props) {
  const [category, setCategory] = useState<string>("all");
  const [sub, setSub] = useState<string>("all");

  const activeCategory = category === "all" ? null : getCategory(category);
  const subs = activeCategory?.subs ?? null;

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      if (category !== "all" && r.category !== category) return false;
      if (sub !== "all" && r.subCategory !== sub) return false;
      return true;
    });
  }, [recipes, category, sub]);

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
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <p>No recipes in this category yet.</p>
        </div>
      ) : (
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((r) => (
            <RecipeCard key={r.id} recipe={r} productMap={productMap} />
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
