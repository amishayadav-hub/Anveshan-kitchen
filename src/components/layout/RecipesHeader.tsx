"use client";

import Link from "next/link";
import VegToggle from "@/components/recipes/VegToggle";
import NonVegToggle from "@/components/recipes/NonVegToggle";
import HScroll from "@/components/ui/HScroll";
import { useDiet } from "@/components/recipes/DietProvider";

// Green action stripe above the recipe pages — AI Generator, Share, and the
// Veg / Non-Veg diet toggles (kept on a white capsule so their colours read
// clearly against the green background).
export default function RecipesHeader() {
  const { vegOnly, nonVegOnly, toggleVeg, toggleNonVeg } = useDiet();

  return (
    <header className="bg-anv-green text-white">
      {/* Single row: Veg/Non-Veg + Recipes Generator + Share. Scrolls
          horizontally on narrow screens (can't fit four controls at phone
          widths); fits on one line from sm up, with the actions pushed right. */}
      <HScroll className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar text-sm">
        <div className="flex shrink-0 items-center bg-white rounded-full px-3 py-1.5 shadow-sm">
          <VegToggle on={vegOnly} onChange={toggleVeg} />
        </div>
        <div className="flex shrink-0 items-center bg-white rounded-full px-3 py-1.5 shadow-sm">
          <NonVegToggle on={nonVegOnly} onChange={toggleNonVeg} />
        </div>

        <Link
          href="/recipes/generate"
          className="shrink-0 whitespace-nowrap font-medium text-white/90 hover:text-white transition-colors sm:ml-auto"
        >
          ✨ Recipes Generator
        </Link>
        <Link
          href="/recipes/share"
          className="shrink-0 whitespace-nowrap bg-anv-cream text-anv-green px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-white transition-colors shadow-sm"
        >
          + Share Your Recipe
        </Link>
      </HScroll>
    </header>
  );
}
