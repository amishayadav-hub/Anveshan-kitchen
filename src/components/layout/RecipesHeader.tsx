"use client";

import Link from "next/link";
import VegToggle from "@/components/recipes/VegToggle";
import NonVegToggle from "@/components/recipes/NonVegToggle";
import { useDiet } from "@/components/recipes/DietProvider";

// Green action stripe above the recipe pages. Veg / Non-Veg diet symbols stack
// in the left corner; Recipes Generator + Share sit on the right.
export default function RecipesHeader() {
  const { vegOnly, nonVegOnly, toggleVeg, toggleNonVeg } = useDiet();

  return (
    <header className="bg-anv-green text-white">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-4 text-sm">
        {/* Diet symbols, side by side, at the left corner */}
        <div className="flex shrink-0 items-center gap-2">
          <VegToggle on={vegOnly} onChange={toggleVeg} />
          <NonVegToggle on={nonVegOnly} onChange={toggleNonVeg} />
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/recipes/generate"
            className="shrink-0 whitespace-nowrap font-medium text-white/90 hover:text-white transition-colors"
          >
            ✨ Recipes Generator
          </Link>
          <Link
            href="/recipes/share"
            className="shrink-0 whitespace-nowrap bg-anv-cream text-anv-green px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-white transition-colors shadow-sm"
          >
            + Share Recipe
          </Link>
        </div>
      </div>
    </header>
  );
}
