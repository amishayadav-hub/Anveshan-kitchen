"use client";

import { useState, useMemo, useDeferredValue, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Recipe, AnveshanProduct } from "@/types";
import { CATEGORIES, getCategory } from "@/lib/categories";
import RecipeCard from "@/components/recipes/RecipeCard";
import { CategoryIcon } from "@/components/recipes/CategoryIcon";
import { useDiet } from "@/components/recipes/DietProvider";
import HScrollDots from "@/components/ui/HScrollDots";
import { track } from "@/lib/analytics";

// Short label for the icon chips — drop the " Recipes" suffix.
const shortLabel = (label: string) => label.replace(/\s+Recipes$/i, "");

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
  const { vegOnly, nonVegOnly, toggleVeg, toggleNonVeg } = useDiet();

  const activeCategory = category === "all" ? null : getCategory(category);
  const subs = activeCategory?.subs ?? null;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Controlled, live search box. `query` is the raw input; `q` drives filtering.
  const [query, setQuery] = useState(initialQuery ?? "");
  const q = query.trim().toLowerCase();

  // Keep ?q= in sync, debounced, preserving other params (category, diet).
  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const trimmed = query.trim();
      if (trimmed) {
        params.set("q", trimmed);
        track("search", { search_term: trimmed, source: "plp" });
      } else params.delete("q");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

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
    track("filter_category", { category: key });
  }

  // Clear every filter (q + category + sub + diet) and wipe the URL params.
  function resetFilters() {
    setQuery("");
    setCategory("all");
    setSub("all");
    if (vegOnly) toggleVeg(false);
    if (nonVegOnly) toggleNonVeg(false);
  }

  // Infinite scroll: render in batches, grow as a sentinel scrolls into view.
  const PAGE = 16;
  const [visible, setVisible] = useState(PAGE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setVisible(PAGE), [dCategory, dSub, dVeg, dNonVeg, q]); // reset on filter change

  useEffect(() => {
    if (visible >= filtered.length) return;
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible((v) => Math.min(v + PAGE, filtered.length)),
      { rootMargin: "800px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible, filtered.length]);

  const shown = filtered.slice(0, visible);

  return (
    <div>
      {/* Top-level filter row — single scrollable row. Bleeds to the screen
          edge on mobile so it's clear it scrolls sideways. */}
      <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
        <HScrollDots variant="bar" className="flex gap-4 sm:gap-8 lg:gap-12 overflow-x-auto no-scrollbar pb-1 pt-1">
          <FilterChip iconKey="all" label="All" active={category === "all"} onClick={() => selectCategory("all")} />
          {CATEGORIES.map((c) => (
            <FilterChip
              key={c.key}
              iconKey={c.key}
              label={shortLabel(c.label)}
              active={category === c.key}
              onClick={() => selectCategory(c.key)}
            />
          ))}
        </HScrollDots>
      </div>

      {/* Second-level sub-product row (only for product groups) — also one scroll row */}
      {subs && (
        <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar rounded-xl bg-anv-cream/30 border border-anv-cream-dark p-3">
          <span className="shrink-0 text-xs font-semibold text-anv-green uppercase tracking-wide mr-1">
            {activeCategory?.label}:
          </span>
          <SubChip label="All" active={sub === "all"} onClick={() => setSub("all")} />
          {subs.map((s) => (
            <SubChip key={s.key} label={s.label} active={sub === s.key} onClick={() => setSub(s.key)} />
          ))}
        </div>
      )}

      {/* Count */}
      <p className="mt-2 text-sm text-gray-500" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "recipe" : "recipes"}
        {q && (
          <>
            {" "}for &ldquo;<span className="text-anv-green font-medium">{query.trim()}</span>&rdquo;
          </>
        )}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-gray-600">
            No recipes found
            {q && (
              <>
                {" "}for &ldquo;<span className="font-medium text-anv-green">{query.trim()}</span>&rdquo;
              </>
            )}
            {" "}— try a different term or browse all recipes.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 rounded-full bg-anv-green px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-anv-green/90"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {shown.map((r, i) => (
              <RecipeCard key={r.id} recipe={r} productMap={productMap} priority={i < 4} />
            ))}
          </div>
          {visible < filtered.length && (
            <div ref={sentinelRef} className="flex justify-center py-8" aria-hidden="true">
              <span className="w-6 h-6 border-2 border-anv-green/30 border-t-anv-green rounded-full animate-spin" />
            </div>
          )}
        </>
      )}
    </div>
  );
}

function FilterChip({
  iconKey,
  label,
  active,
  onClick,
}: {
  iconKey: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className="group shrink-0 flex flex-col items-center gap-1.5"
    >
      <span
        className={`flex h-8 w-8 sm:h-14 sm:w-14 items-center justify-center rounded-full ring-1 transition-all duration-200 ${
          active
            ? "bg-anv-green text-white ring-anv-green shadow-md shadow-anv-green/20"
            : "bg-anv-cream/40 text-anv-green/80 ring-anv-cream-dark group-hover:bg-anv-green/10 group-hover:text-anv-green group-hover:ring-anv-green/30"
        }`}
      >
        <CategoryIcon name={iconKey} className="h-4 w-4 sm:h-6 sm:w-6" />
      </span>
      <span
        className={`whitespace-nowrap text-xs transition-colors ${
          active ? "font-semibold text-anv-green" : "font-medium text-gray-500 group-hover:text-anv-green"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

function SubChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
        active
          ? "bg-anv-green text-white border-anv-green"
          : "bg-white text-anv-green border-anv-cream-dark hover:border-anv-green"
      }`}
    >
      {label}
    </button>
  );
}
