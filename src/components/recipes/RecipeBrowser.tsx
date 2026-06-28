"use client";

import { useState, useMemo, useEffect } from "react";
import { Recipe, AnveshanProduct } from "@/types";
import { CATEGORIES, getCategory } from "@/lib/categories";
import RecipeCard from "@/components/recipes/RecipeCard";
import VegToggle from "@/components/recipes/VegToggle";
import NonVegToggle from "@/components/recipes/NonVegToggle";
import { SearchIcon } from "@/components/ui/icons";

interface Props {
  recipes: Recipe[];
  productMap: Record<string, AnveshanProduct>;
}

const DIET_KEY = "anveshan-diet-mode"; // "veg" | "nonveg" | (absent = all)

export default function RecipeBrowser({ recipes, productMap }: Props) {
  const [category, setCategory] = useState<string>("all");
  const [sub, setSub] = useState<string>("all");
  const [vegOnly, setVegOnly] = useState(false);
  const [nonVegOnly, setNonVegOnly] = useState(false);
  const [query, setQuery] = useState("");

  // Restore the shopper's diet choice (persisted, like Swiggy).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mode = localStorage.getItem(DIET_KEY);
    if (mode === "veg") setVegOnly(true);
    else if (mode === "nonveg") setNonVegOnly(true);
  }, []);

  // Veg and Non-Veg are mutually exclusive — turning one on turns the other off.
  function toggleVeg(on: boolean) {
    setVegOnly(on);
    if (on) setNonVegOnly(false);
    if (typeof window !== "undefined") localStorage.setItem(DIET_KEY, on ? "veg" : "all");
  }
  function toggleNonVeg(on: boolean) {
    setNonVegOnly(on);
    if (on) setVegOnly(false);
    if (typeof window !== "undefined") localStorage.setItem(DIET_KEY, on ? "nonveg" : "all");
  }

  const activeCategory = category === "all" ? null : getCategory(category);
  const subs = activeCategory?.subs ?? null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter((r) => {
      if (q && !r.name.toLowerCase().includes(q)) return false; // search by name
      if (vegOnly && r.isVeg === false) return false; // hide non-veg
      if (nonVegOnly && r.isVeg !== false) return false; // hide veg
      if (category !== "all" && r.category !== category) return false;
      if (sub !== "all" && r.subCategory !== sub) return false;
      return true;
    });
  }, [recipes, category, sub, vegOnly, nonVegOnly, query]);

  function selectCategory(key: string) {
    setCategory(key);
    setSub("all"); // reset sub whenever top-level changes
  }

  return (
    <div>
      {/* Top bar: search by name (left) + Veg / Non-Veg toggles (right) */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mb-4 pb-3 border-b border-gray-100">
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes by name…"
            className="w-full rounded-full border border-gray-200 pl-9 pr-4 py-2 text-sm text-gray-700 focus:border-anv-green focus:outline-none focus:ring-1 focus:ring-anv-green/30"
          />
        </div>
        <div className="flex items-center gap-5 shrink-0 sm:ml-auto">
          <VegToggle on={vegOnly} onChange={toggleVeg} />
          <NonVegToggle on={nonVegOnly} onChange={toggleNonVeg} />
        </div>
      </div>

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
          <p>No recipes found. Try a different search or filter.</p>
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
