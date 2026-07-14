"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import CartButton from "@/components/cart/CartButton";
import HamburgerMenu from "@/components/HamburgerMenu";
import { SearchIcon } from "@/components/ui/icons";
import { track } from "@/lib/analytics";
import { getAllRecipesClient } from "@/lib/recipes";
import { searchRecipes } from "@/lib/recipe-search";
import { getCategoryLabel } from "@/lib/categories";
import type { Recipe } from "@/types";

// Slim top header: Anveshan logo + search & cart on the right. The search shows
// live recipe suggestions as you type; picking one jumps straight to it, and
// Enter (or "see all") opens the full filtered listing.
export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimer = useRef<number | null>(null);

  // Focus the field as soon as it expands.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Lazy-load the recipe list the first time the search is used, so the header
  // adds no cost until someone actually searches.
  const ensureRecipes = useCallback(() => {
    if (recipes.length) return;
    getAllRecipesClient()
      .then(setRecipes)
      .catch(() => {});
  }, [recipes.length]);

  const suggestions = useMemo(
    () => (query.trim() ? searchRecipes(recipes, query, 8) : []),
    [recipes, query]
  );

  function go() {
    const q = query.trim();
    if (q) track("search", { search_term: q, source: "header" });
    router.push(q ? `/recipes?q=${encodeURIComponent(q)}` : "/recipes");
    setOpen(false);
    setShowList(false);
  }

  function goToRecipe(r: Recipe) {
    track("select_item", { search_term: query.trim(), item_id: r.id, source: "header_suggestion" });
    setShowList(false);
    setOpen(false);
    setQuery("");
    router.push(`/recipes/${r.slug}`);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    go();
  }

  const dropdownOpen = open && showList && query.trim().length > 0 && suggestions.length > 0;

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Hamburger + logo pinned left; search + cart grouped on the right. */}
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
        <div className="flex shrink-0 items-center gap-1">
          <HamburgerMenu />
          <Link
            href="/recipes"
            aria-label="Anveshan Kitchen"
            onClick={() => track("logo_click", { source: "header" })}
            className={`shrink-0 items-end gap-[3px] ${open ? "hidden" : "flex"}`}
          >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.shopify.com/s/files/1/0270/3346/9006/files/anveshan-logo-updates-register-mark.png?v=1728463199"
            alt="Anveshan"
            width={120}
            height={28}
            className="h-4 w-auto"
          />
            {/* "kitchen" rendered in the brand font to match the "anveshan" wordmark */}
            <span
              className="relative -top-px text-[15px] font-semibold leading-none tracking-tight text-[#235A49]"
              style={{ fontFamily: "var(--font-brand), system-ui, sans-serif" }}
            >
              kitchen
            </span>
          </Link>
        </div>

        <div className={`flex min-w-0 items-center gap-1 ${open ? "flex-1" : ""}`}>
          {/* Search: icon only; expands to fill the whole bar when clicked. The
              suggestions dropdown is anchored to this relative wrapper. */}
          <div className={`relative flex items-center ${open ? "flex-1" : ""}`}>
            <form onSubmit={onSubmit} className={`flex items-center ${open ? "flex-1" : ""}`}>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowList(true);
                  ensureRecipes();
                }}
                onFocus={() => {
                  ensureRecipes();
                  setShowList(true);
                }}
                onBlur={() => {
                  // Delay so a suggestion tap registers before the list closes.
                  blurTimer.current = window.setTimeout(() => {
                    setShowList(false);
                    if (!query.trim()) setOpen(false);
                  }, 140);
                }}
                placeholder="Search recipes…"
                tabIndex={open ? 0 : -1}
                role="combobox"
                aria-expanded={dropdownOpen}
                aria-controls="header-search-suggestions"
                autoComplete="off"
                className={`min-w-0 text-sm text-gray-700 bg-gray-50 rounded-full outline-none transition-all duration-200 ${
                  open
                    ? "flex-1 w-full px-3.5 py-1.5 mr-1 border border-gray-200 focus:border-anv-green"
                    : "w-0 px-0 py-0 border-0"
                }`}
              />
              <button
                type="button"
                onClick={() => {
                  if (open) go();
                  else {
                    setOpen(true);
                    ensureRecipes();
                  }
                }}
                aria-label="Search recipes"
                className="flex h-11 w-11 items-center justify-center text-anv-green hover:text-anv-green-dark transition-colors"
              >
                <SearchIcon />
              </button>
            </form>

            {/* Live suggestions */}
            {dropdownOpen && (
              <ul
                id="header-search-suggestions"
                role="listbox"
                className="absolute left-0 right-1 top-full mt-1 max-h-[70vh] overflow-y-auto overscroll-contain rounded-xl border border-gray-100 bg-white py-1 shadow-xl"
                // Keep focus on the input so the blur timer doesn't fire mid-tap.
                onMouseDown={(e) => e.preventDefault()}
              >
                {suggestions.map((r) => (
                  <li key={r.id} role="option" aria-selected="false">
                    <button
                      type="button"
                      onClick={() => goToRecipe(r)}
                      className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-anv-cream/40"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={r.image || "/placeholder-recipe.jpg"}
                        alt=""
                        loading="lazy"
                        className="h-9 w-9 shrink-0 rounded-md object-cover bg-anv-cream/40"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-gray-800">{r.name}</span>
                        <span className="block truncate text-xs text-gray-400">{getCategoryLabel(r.category)}</span>
                      </span>
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={go}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-anv-green transition-colors hover:bg-anv-cream/40"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-anv-cream/40">
                      <SearchIcon />
                    </span>
                    See all results for &ldquo;{query.trim()}&rdquo;
                  </button>
                </li>
              </ul>
            )}
          </div>

          <CartButton />
        </div>
      </div>
    </header>
  );
}
