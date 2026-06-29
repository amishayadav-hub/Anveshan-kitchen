"use client";

import Link from "next/link";
import VegToggle from "@/components/recipes/VegToggle";
import NonVegToggle from "@/components/recipes/NonVegToggle";
import { useDiet } from "@/components/recipes/DietProvider";

// Green action stripe above the recipe pages — AI Generator, Share, and the
// Veg / Non-Veg diet toggles (kept on a white capsule so their colours read
// clearly against the green background).
export default function RecipesHeader() {
  const { vegOnly, nonVegOnly, toggleVeg, toggleNonVeg } = useDiet();

  return (
    <header className="bg-anv-green text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 text-sm">
        <div className="flex items-center justify-center gap-3 sm:gap-4 bg-white rounded-full px-3 sm:px-4 py-1.5 shadow-sm w-full sm:w-auto">
          <VegToggle on={vegOnly} onChange={toggleVeg} />
          <NonVegToggle on={nonVegOnly} onChange={toggleNonVeg} />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-4 sm:ml-auto">
          <Link
            href="/recipes/generate"
            className="text-center font-medium text-white/90 hover:text-white transition-colors whitespace-nowrap rounded-full border border-white/30 py-1.5 sm:border-0 sm:py-0 sm:rounded-none"
          >
            ✨ AI Generator
          </Link>
          <Link
            href="/recipes/share"
            className="bg-anv-cream text-anv-green text-center px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-white transition-colors shadow-sm whitespace-nowrap"
          >
            + Share Your Recipe
          </Link>
        </div>
      </div>
    </header>
  );
}
