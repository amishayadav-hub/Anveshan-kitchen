"use client";

import { useState } from "react";
import Image from "next/image";
import { GeneratedRecipe } from "@/lib/ai-providers";
import ReadMore from "@/components/recipes/ReadMore";
import { useCart } from "@/components/cart/CartProvider";
import { generatedShopLines } from "@/lib/generated-cart";
import { highlightProductMentions } from "@/lib/product-highlight";
import { track } from "@/lib/analytics";
import { ClockIcon, FlameIcon, UsersIcon, UtensilsIcon, SparklesIcon } from "@/components/ui/icons";

// How many ingredients / steps to show before the "See all" toggle.
const INGREDIENT_PREVIEW = 5;
const STEP_PREVIEW = 3;

function brandName(name: string): string {
  const t = name.trim();
  return /^anveshan\b/i.test(t) ? t : `Anveshan ${t}`;
}

export default function GeneratedRecipeCard({
  recipe,
  index,
  total,
  onEngage,
}: {
  recipe: GeneratedRecipe;
  index?: number;
  total?: number;
  // Fired when the visitor engages this specific variation (e.g. adds it to
  // cart) — powers the per-user generator funnel analytics.
  onEngage?: (action: "add_to_cart") => void;
}) {
  const providerLabel = /anveshan/i.test(recipe.provider) ? "Anveshan Collection" : "AI-crafted";

  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const [showAllSteps, setShowAllSteps] = useState(false);

  // Footer Add-to-Cart bar: resolves this variant's Anveshan products to cart
  // lines, so the products + subtotal differ per generated recipe variation.
  const { addLines, open } = useCart();
  const [added, setAdded] = useState(false);
  const { lines: cartLines, total: cartTotal } = generatedShopLines(recipe.anveshanProducts || []);

  function handleAddToCart() {
    onEngage?.("add_to_cart"); // funnel: which generated variation was chosen
    track("add_to_cart", { source: "generated_recipe", items: cartLines.length, value: cartTotal });
    addLines(cartLines);
    open();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const visibleIngredients = showAllIngredients
    ? recipe.ingredients
    : recipe.ingredients.slice(0, INGREDIENT_PREVIEW);
  const visibleSteps = showAllSteps ? recipe.steps : recipe.steps.slice(0, STEP_PREVIEW);

  return (
    <div className="bg-white rounded-2xl border-2 sm:border border-gray-200 sm:border-gray-100 shadow-md sm:shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-anv-green/[0.07] via-white to-anv-gold/[0.06] border-b border-gray-100 p-6 sm:p-7">
        {typeof index === "number" && typeof total === "number" && (
          <p className="text-xs font-bold uppercase tracking-wider text-anv-green/70 mb-2">
            Recipe {index + 1} of {total}
          </p>
        )}
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <h2 className="text-2xl font-bold text-gray-900 leading-tight break-words min-w-0">{recipe.name || "Recipe"}</h2>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full border bg-anv-green/[0.07] text-anv-green border-anv-green/20 shrink-0 inline-flex items-center gap-1">
            <SparklesIcon className="w-3 h-3" /> {providerLabel}
          </span>
        </div>
        {recipe.description && (
          <div className="mt-2 max-w-2xl">
            <ReadMore
              text={recipe.description}
              lines={3}
              expandLabel="…see full description"
              collapseLabel="Show less"
              className="text-gray-500 text-sm leading-relaxed"
            />
          </div>
        )}

        {/* Meta chips: stay on a single row (scrolls if needed) on mobile. */}
        <div className="flex flex-nowrap gap-1.5 sm:gap-2 mt-4 text-xs sm:text-sm text-gray-600 overflow-x-auto no-scrollbar">
          {recipe.prepTime && recipe.prepTime !== "—" && (
            <span className="inline-flex shrink-0 whitespace-nowrap items-center gap-1.5 bg-white border border-gray-100 rounded-full px-2.5 sm:px-3 py-1"><ClockIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Prep {recipe.prepTime}</span>
          )}
          {recipe.cookTime && recipe.cookTime !== "—" && (
            <span className="inline-flex shrink-0 whitespace-nowrap items-center gap-1.5 bg-white border border-gray-100 rounded-full px-2.5 sm:px-3 py-1"><FlameIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Cook {recipe.cookTime}</span>
          )}
          <span className="inline-flex shrink-0 whitespace-nowrap items-center gap-1.5 bg-white border border-gray-100 rounded-full px-2.5 sm:px-3 py-1"><UsersIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {recipe.servings} servings</span>
        </div>
      </div>

      <div className="p-6 sm:p-7">
        {/* Ingredients + method, side by side (stacked on phones) */}
        <div className="min-w-0 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Ingredients</h3>
            <ul className="space-y-2">
              {visibleIngredients.map((ing, i) => {
                const measure = [ing.quantity, ing.unit].filter(Boolean).join(" ");
                return (
                  <li key={`${ing.name}-${i}`} className="flex items-start gap-2.5 text-sm">
                    <span className={`mt-[7px] w-1.5 h-1.5 rounded-full shrink-0 ${ing.anveshan ? "bg-anv-green" : "bg-gray-300"}`} />
                    <span className={ing.anveshan ? "font-semibold text-anv-green" : "text-gray-700"}>
                      {measure && <span className="text-gray-400 font-normal">{measure} </span>}
                      {ing.anveshan ? brandName(ing.name) : ing.name}
                    </span>
                  </li>
                );
              })}
            </ul>
            {recipe.ingredients.length > INGREDIENT_PREVIEW && (
              <button
                type="button"
                onClick={() => setShowAllIngredients((v) => !v)}
                aria-expanded={showAllIngredients}
                className="mt-3 text-sm font-semibold text-anv-green hover:underline"
              >
                {showAllIngredients
                  ? "Show fewer ingredients"
                  : `See all ${recipe.ingredients.length} ingredients`}
              </button>
            )}
          </div>

          {recipe.steps.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Method</h3>
            <ol className="space-y-3">
              {visibleSteps.map((step, i) => (
                <li key={`${i}-${step.slice(0, 16)}`} className="flex gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-anv-green text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed pt-1">{highlightProductMentions(step, recipe.anveshanProducts)}</p>
                </li>
              ))}
            </ol>
            {recipe.steps.length > STEP_PREVIEW && (
              <button
                type="button"
                onClick={() => setShowAllSteps((v) => !v)}
                aria-expanded={showAllSteps}
                className="mt-3 text-sm font-semibold text-anv-green hover:underline"
              >
                {showAllSteps ? "Show fewer steps" : `See all ${recipe.steps.length} steps`}
              </button>
            )}

            {recipe.servingSuggestion && (
              <p className="mt-5 text-sm text-anv-green bg-anv-green/[0.06] border border-anv-green/15 rounded-lg p-3 flex items-start gap-2">
                <UtensilsIcon className="w-4 h-4 mt-0.5 shrink-0" />
                <span><span className="font-semibold">Serve:</span> {recipe.servingSuggestion}</span>
              </p>
            )}
          </div>
          )}
        </div>
      </div>

      {/* Footer Add-to-Cart bar — round product images + subtotal, per variant */}
      {cartLines.length > 0 && (
        <div className="border-t border-gray-100 bg-anv-cream/20 px-4 sm:px-7 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex -space-x-3 shrink-0">
              {cartLines.slice(0, 3).map((l, i) => (
                <div
                  key={l.variantId}
                  className={`relative w-10 h-10 rounded-full ring-2 ring-white overflow-hidden bg-anv-cream/40 ${
                    i === 2 ? "hidden sm:block" : ""
                  }`}
                >
                  {l.image ? (
                    <Image src={l.image} alt={l.name} fill className="object-cover" sizes="40px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-anv-green text-xs font-bold">
                      {l.name.charAt(0)}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-gray-900 truncate">{recipe.name || "Recipe"}</p>
              <p className="text-xs text-gray-500">
                {cartLines.length} Anveshan product{cartLines.length !== 1 ? "s" : ""} ·{" "}
                <span className="font-bold text-anv-green">₹{cartTotal}</span>
              </p>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="shrink-0 bg-anv-green text-white font-semibold text-sm px-5 sm:px-7 py-2.5 rounded-full hover:bg-anv-green-dark transition-colors whitespace-nowrap"
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      )}
    </div>
  );
}
