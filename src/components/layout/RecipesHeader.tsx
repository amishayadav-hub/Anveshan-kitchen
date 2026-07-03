"use client";

import Link from "next/link";
import VegToggle from "@/components/recipes/VegToggle";
import NonVegToggle from "@/components/recipes/NonVegToggle";
import { useDiet } from "@/components/recipes/DietProvider";
import { FEATURES } from "@/lib/features";

// Green action stripe above the recipe pages. Veg / Non-Veg diet symbols stack
// in the left corner; Recipes Generator + Share sit on the right.
export default function RecipesHeader() {
  const { vegOnly, nonVegOnly, toggleVeg, toggleNonVeg } = useDiet();

  return (
    <header className="bg-anv-green text-white">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-4 text-sm">
        {/* Diet symbols, side by side, at the left corner. Hidden while non-veg
            recipes are frozen (FEATURES.nonVegRecipes); the empty div preserves
            the justify-between spacing so the right-side actions stay put. */}
        <div className="flex shrink-0 items-center gap-2">
          {FEATURES.nonVegRecipes && (
            <>
              <VegToggle on={vegOnly} onChange={toggleVeg} />
              <NonVegToggle on={nonVegOnly} onChange={toggleNonVeg} />
            </>
          )}
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Flagship action — refined cream pill with a subtle gold accent so it
              leads the eye without a loud banner. Share is demoted to a ghost. */}
          <Link
            href="/recipes/generate"
            className="group shrink-0 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-anv-cream px-3 sm:px-4 py-1.5 text-xs font-semibold text-anv-green shadow-sm ring-1 ring-anv-gold/50 transition-all hover:shadow-md hover:ring-anv-gold"
          >
            Recipe Generator
            <span className="rounded-full bg-anv-gold/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-anv-green">
              AI
            </span>
          </Link>
          <Link
            href="/recipes/share"
            className="shrink-0 whitespace-nowrap rounded-full border border-white/40 px-3 sm:px-4 py-1.5 text-xs font-semibold text-white/90 transition-colors hover:bg-white/10"
          >
            + Share Recipe
          </Link>
        </div>
      </div>
    </header>
  );
}
