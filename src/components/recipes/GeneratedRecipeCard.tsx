"use client";

import { useState } from "react";
import { GeneratedRecipe } from "@/lib/ai-providers";
import { CartItem, GheeVariant } from "@/types";
import AddToCartButton from "@/components/ui/AddToCartButton";
import { highlightProductMentions } from "@/lib/product-highlight";
import { ClockIcon, FlameIcon, UsersIcon, UtensilsIcon } from "@/components/ui/icons";

// Real Shopify variant IDs from the Anveshan Products API.
// moringa-powder & sattu have no live SKU → "" (skipped in cart).
const PRODUCT_VARIANT_MAP: Record<string, string> = {
  khandsari: "47070925095104", // → Jaggery Powder (no live khandsari SKU)
  "jaggery-powder": "47070925095104",
  "groundnut-oil": "43150198866112",
  honey: "46476687114432",
  "coconut-oil": "30393637404750",
  "khapli-atta": "46719452676288",
  "mustard-oil": "30393367396430",
  "sunflower-oil": "43077260607680",
  "sesame-oil": "30393241829454",
  "olive-oil": "45426734530752",
  "multigrain-atta": "48130399207616",
  "protein-atta": "48130399207616", // → Khapli Multigrain Atta (no live protein-atta SKU)
  "turmeric-latte-mix": "47258532577472",
  "ashwagandha-mix": "47258532577472",
  saffron: "43376001122496",
  amlaprash: "46033354064064",
  "dry-fruit-paak": "47258508755136",
  "moringa-powder": "",
  sattu: "",
};

const GHEE_VARIANTS: Record<GheeVariant, string> = {
  "gir-cow": "43355933212864",
  "desi-cow": "32459662557262",
  buffalo: "45791842533568",
};

const PROVIDER_BADGE: Record<string, string> = {
  "Gemini": "bg-blue-50 text-blue-700 border-blue-200",
  "Groq": "bg-orange-50 text-orange-700 border-orange-200",
  "NVIDIA": "bg-green-50 text-green-700 border-green-200",
  "Sarvam-M": "bg-purple-50 text-purple-700 border-purple-200",
};

// "Ghee" → "Anveshan Ghee" (leave as-is if already branded)
function brandName(name: string): string {
  const t = name.trim();
  return /^anveshan\b/i.test(t) ? t : `Anveshan ${t}`;
}

interface Props {
  recipe: GeneratedRecipe;
}

export default function GeneratedRecipeCard({ recipe }: Props) {
  const [gheeVariant, setGheeVariant] = useState<GheeVariant>("gir-cow");

  const cartItems: CartItem[] = recipe.anveshanProducts.map((id) => ({
    shopifyVariantId: id === "ghee" ? GHEE_VARIANTS[gheeVariant] : PRODUCT_VARIANT_MAP[id] ?? id,
    quantity: 1,
    productName: id,
  }));

  const badgeStyle = PROVIDER_BADGE[recipe.provider] ?? "bg-gray-50 text-gray-600 border-gray-200";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-anv-cream/30 border-b border-anv-cream-dark p-6">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{recipe.name}</h2>
            <p className="text-gray-500 mt-1 text-sm leading-relaxed">{recipe.description}</p>
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${badgeStyle} shrink-0`}>
            via {recipe.provider}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
          <span className="inline-flex items-center gap-1.5"><ClockIcon /> Prep {recipe.prepTime}</span>
          <span className="inline-flex items-center gap-1.5"><FlameIcon /> Cook {recipe.cookTime}</span>
          <span className="inline-flex items-center gap-1.5"><UsersIcon /> {recipe.servings} servings</span>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_300px] gap-0">
        {/* Steps */}
        <div className="p-6 border-r border-gray-50">
          <h3 className="font-semibold text-gray-800 mb-4">Instructions</h3>
          <ol className="space-y-3">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-anv-cream text-anv-green text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <p className="text-gray-600 text-sm leading-relaxed">{highlightProductMentions(step, recipe.anveshanProducts)}</p>
              </li>
            ))}
          </ol>

          {recipe.servingSuggestion && (
            <p className="mt-4 text-sm text-anv-green bg-anv-cream/40 border border-anv-cream-dark rounded-lg p-3 flex items-start gap-2">
              <UtensilsIcon className="w-4 h-4 mt-0.5 shrink-0" />
              <span><span className="font-semibold">Serve:</span> {recipe.servingSuggestion}</span>
            </p>
          )}
        </div>

        {/* Ingredients + Cart */}
        <div className="p-6 space-y-5">
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Ingredients</h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className={`rounded-lg p-2.5 text-sm ${ing.anveshan ? "bg-anv-cream/40 border border-anv-cream-dark" : "bg-gray-50"}`}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={ing.anveshan ? "text-anv-green font-bold" : "text-gray-700 font-medium"}>
                      {ing.quantity} {ing.unit} {ing.anveshan ? brandName(ing.name) : ing.name}
                    </span>
                  </div>
                  {ing.note && (
                    <p className="text-xs text-anv-green mt-1">{ing.note}</p>
                  )}
                  {ing.anveshanProductId === "ghee" && (
                    <div className="mt-2 flex gap-1.5 flex-wrap">
                      {(["gir-cow", "desi-cow", "buffalo"] as GheeVariant[]).map((v) => (
                        <button
                          key={v}
                          onClick={() => setGheeVariant(v)}
                          className={`text-xs px-2 py-0.5 rounded-full border transition-all ${
                            gheeVariant === v
                              ? "bg-anv-green text-white border-anv-green"
                              : "bg-white text-anv-green border-anv-cream-dark"
                          }`}
                        >
                          {v === "gir-cow" ? "Gir Cow" : v === "desi-cow" ? "Desi Cow" : "Buffalo"}
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {recipe.anveshanProducts.length > 0 && (
            <div className="bg-anv-cream/40 rounded-xl border border-anv-cream-dark p-4">
              <p className="text-xs font-semibold text-anv-green mb-3">
                {recipe.anveshanProducts.length} Anveshan product{recipe.anveshanProducts.length !== 1 ? "s" : ""} in this recipe
              </p>
              <AddToCartButton items={cartItems} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
