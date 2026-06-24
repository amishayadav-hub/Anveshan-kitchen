"use client";

import { useState } from "react";
import { Ingredient, AnveshanProduct, GheeVariant } from "@/types";
import GheeSelector from "@/components/ui/GheeSelector";

interface Props {
  ingredients: Ingredient[];
  products: AnveshanProduct[];
  onVariantChange: (productId: string, variantId: string) => void;
}

export default function IngredientList({ ingredients, products, onVariantChange }: Props) {
  const [gheeSelections, setGheeSelections] = useState<Record<string, GheeVariant>>({});

  const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

  function handleGheeChange(productId: string, variant: GheeVariant) {
    const product = productMap[productId];
    if (!product?.variants) return;
    const selected = product.variants.find((v) => v.type === variant);
    if (!selected) return;
    setGheeSelections((prev) => ({ ...prev, [productId]: variant }));
    onVariantChange(productId, selected.shopifyVariantId);
  }

  return (
    <ul className="space-y-3">
      {ingredients.map((ing, i) => {
        const product = ing.anveshanProductId ? productMap[ing.anveshanProductId] : null;

        return (
          <li key={i} className={`rounded-xl p-3 ${ing.anveshan ? "bg-anv-cream/40 border border-anv-cream-dark" : "bg-gray-50"}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-gray-800">
                    {ing.quantity} {ing.unit} {ing.name}
                  </span>
                  {ing.anveshan && (
                    <span className="text-xs bg-anv-green text-white px-2 py-0.5 rounded-full">
                      Anveshan
                    </span>
                  )}
                </div>
                {ing.note && (
                  <p className="text-xs text-anv-green mt-1">{ing.note}</p>
                )}
                {product?.whyAnveshan && (
                  <p className="text-xs text-gray-500 mt-1 italic">{product.whyAnveshan}</p>
                )}
              </div>
            </div>

            {product?.variants && (
              <div className="mt-2.5">
                <p className="text-xs text-gray-500 mb-1.5">Choose variety:</p>
                <GheeSelector
                  variants={product.variants}
                  selected={gheeSelections[product.id] ?? product.variants[0].type}
                  onChange={(v) => handleGheeChange(product.id, v)}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
