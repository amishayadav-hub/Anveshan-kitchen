"use client";

import { useState, useMemo, useDeferredValue, useEffect, useRef, Suspense } from "react";
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

// ── Search helpers ───────────────────────────────────────────────────────────
// Normalise text for matching: lowercase, strip accents/punctuation, collapse
// whitespace. Used for both the recipe haystack and the query.
function normalizeText(s: string): string {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// Bounded Levenshtein — good enough for short recipe words; returns early once
// the distance provably exceeds `max` so it stays cheap.
function editDistance(a: string, b: string, max: number): number {
  const al = a.length;
  const bl = b.length;
  if (Math.abs(al - bl) > max) return max + 1;
  let prev = Array.from({ length: bl + 1 }, (_, i) => i);
  for (let i = 1; i <= al; i++) {
    const curr = [i];
    let rowMin = i;
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const v = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      curr[j] = v;
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1; // whole row already over budget
    prev = curr;
  }
  return prev[bl];
}

// A query token "hits" a recipe if it's a substring of the haystack, or is a
// near-match (typo/spelling variant like "baigan" → "baingan") to any word.
function tokenHits(token: string, haystack: string, words: string[]): boolean {
  if (haystack.includes(token)) return true;
  // Allow a small typo budget, but keep it tight so short tokens don't collide
  // with common words (e.g. "misal" must NOT fuzzy-match "masala").
  const max = token.length >= 8 ? 2 : token.length >= 4 ? 1 : 0;
  if (max === 0) return false;
  return words.some((w) => editDistance(w, token, max) <= max);
}

interface Props {
  recipes: Recipe[];
  productMap: Record<string, AnveshanProduct>;
}

export default function RecipeBrowser({ recipes, productMap }: Props) {
  const [category, setCategory] = useState<string>("all");
  const [sub, setSub] = useState<string>("all");
  // Veg / Non-Veg now live in the green stripe (shared via DietProvider).
  const { vegOnly, nonVegOnly, toggleVeg, toggleNonVeg } = useDiet();

  const activeCategory = category === "all" ? null : getCategory(category);
  const subs = activeCategory?.subs ?? null;

  const router = useRouter();
  const pathname = usePathname();

  // Search term. `query` is the raw value shown; `q` drives filtering. It starts
  // empty so the server renders the full grid (good for LCP + SEO); the URL's
  // ?q= (set by the header search) is synced into it on the client by the
  // <SearchParamSync> child below — which keeps it reactive even when the user
  // is already on this page (the previous mount-only read did not re-fire).
  const [query, setQuery] = useState("");
  const rawQ = query;
  const q = rawQ.trim().toLowerCase();

  // Read ?category= from the URL on mount so category deep-links work. Category
  // is otherwise driven by the chip buttons (local state), so a one-time read is
  // correct here.
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("category");
    if (c && CATEGORIES.some((x) => x.key === c)) setCategory(c);
  }, []);

  // Analytics: record a search whenever the term changes.
  useEffect(() => {
    if (q) track("search", { search_term: rawQ.trim(), source: "plp" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  // Defer the heavy 102-card re-filter so filter clicks stay responsive (INP).
  const dCategory = useDeferredValue(category);
  const dSub = useDeferredValue(sub);
  const dVeg = useDeferredValue(vegOnly);
  const dNonVeg = useDeferredValue(nonVegOnly);

  // Search index: one normalised haystack per recipe (name + tags + category +
  // region + description) plus its word list, built once per recipe set.
  const searchIndex = useMemo(() => {
    const idx = new Map<string, { hay: string; words: string[] }>();
    for (const r of recipes) {
      const rec = r as Recipe & { region?: string };
      const hay = normalizeText(
        [r.name, (r.tags ?? []).join(" "), r.category, rec.region ?? "", r.description ?? ""].join(" ")
      );
      idx.set(r.id, { hay, words: hay.split(" ").filter(Boolean) });
    }
    return idx;
  }, [recipes]);

  // Query tokens (normalised). Every token must hit for a recipe to match — so
  // "aloo baigan" finds "Aloo Baingan" (fuzzy) across name/tags/description.
  const tokens = useMemo(() => normalizeText(q).split(" ").filter(Boolean), [q]);

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      if (tokens.length) {
        const entry = searchIndex.get(r.id);
        if (!entry) return false;
        if (!tokens.every((t) => tokenHits(t, entry.hay, entry.words))) return false;
      }
      if (dVeg && r.isVeg === false) return false; // hide non-veg
      if (dNonVeg && r.isVeg !== false) return false; // hide veg
      if (dCategory !== "all" && r.category !== dCategory) return false;
      if (dSub !== "all" && r.subCategory !== dSub) return false;
      return true;
    });
  }, [recipes, searchIndex, tokens, dCategory, dSub, dVeg, dNonVeg]);

  function selectCategory(key: string) {
    setCategory(key);
    setSub("all"); // reset sub whenever top-level changes
    // Tapping a category is a "browse" intent — clear any active text search so
    // the user isn't left staring at a stale zero-result list.
    if (q) {
      setQuery("");
      router.replace(pathname, { scroll: false });
    }
    track("filter_category", { category: key });
  }

  // Clear every filter (q + category + sub + diet) and wipe the URL params.
  function resetFilters() {
    setCategory("all");
    setSub("all");
    if (vegOnly) toggleVeg(false);
    if (nonVegOnly) toggleNonVeg(false);
    // Drop ?q= (and any other params) from the URL so the search term clears.
    router.replace(pathname, { scroll: false });
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
      {/* Reactively mirror the URL's ?q= into local state. Isolated in its own
          Suspense boundary so the useSearchParams() call doesn't force the whole
          grid out of static prerendering (the grid still SSRs with query=""). */}
      <Suspense fallback={null}>
        <SearchParamSync value={query} onChange={setQuery} />
      </Suspense>

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
            {" "}for &ldquo;<span className="text-anv-green font-medium">{rawQ.trim()}</span>&rdquo;
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
                {" "}for &ldquo;<span className="font-medium text-anv-green">{rawQ.trim()}</span>&rdquo;
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

// Mirrors the URL's ?q= param into the parent's search state. Renders nothing.
// Kept separate so the useSearchParams() dependency is contained to a subtree
// under a Suspense boundary, letting the recipe grid still prerender/SSR.
function SearchParamSync({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const searchParams = useSearchParams();
  const urlQ = searchParams.get("q") ?? "";
  useEffect(() => {
    if (urlQ !== value) onChange(urlQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlQ]);
  return null;
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
