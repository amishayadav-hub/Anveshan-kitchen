"use client";

import { useState } from "react";
import Image from "next/image";
import { Recipe, AnveshanProduct, CartItem } from "@/types";
import IngredientList from "@/components/recipes/IngredientList";
import AddToCartButton from "@/components/ui/AddToCartButton";
import StickyCartBar from "@/components/recipes/StickyCartBar";

interface Props {
  recipe: Recipe;
  products: AnveshanProduct[];
}

export default function RecipeDetailClient({ recipe, products }: Props) {
  // Start with default variant IDs for each product
  const [variantMap, setVariantMap] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    products.forEach((p) => {
      map[p.id] = p.variants ? p.variants[0].shopifyVariantId : p.shopifyVariantId;
    });
    return map;
  });

  function handleVariantChange(productId: string, variantId: string) {
    setVariantMap((prev) => ({ ...prev, [productId]: variantId }));
  }

  const cartItems: CartItem[] = products.map((p) => ({
    shopifyVariantId: variantMap[p.id],
    quantity: 1,
    productName: p.name,
  }));

  const total = products.reduce((sum, p) => sum + (p.price || 0), 0);

  return (
    <>
    <aside className="space-y-6">
      {/* Anveshan product showcase — shoppable (placed above the ingredients) */}
      {products.length > 0 && (
        <div className="bg-white rounded-2xl border border-anv-cream-dark shadow-sm overflow-hidden">
          <div className="bg-anv-green text-white px-5 py-4">
            <h3 className="font-bold text-base">Shop the Anveshan products</h3>
            <p className="text-xs text-white/70 mt-0.5">
              The healthy swaps in this recipe — pure, traceable, farmer-direct.
            </p>
          </div>

          <div className="p-4 space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex gap-3 items-center rounded-xl border border-gray-100 p-2.5 hover:border-anv-green/30 transition-colors"
              >
                <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-anv-cream/40">
                  {p.image ? (
                    <Image src={p.image} alt={p.name} fill className="object-cover" sizes="64px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-anv-green font-bold">
                      {p.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900 leading-tight">{p.name}</p>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{p.whyAnveshan}</p>
                </div>
                <span className="font-bold text-anv-green text-sm shrink-0">₹{p.price}</span>
              </div>
            ))}

            <div className="flex items-center justify-between px-1 pt-1">
              <span className="text-sm text-gray-500">
                {products.length} {products.length === 1 ? "product" : "products"}
              </span>
              <span className="text-sm font-bold text-gray-900">Total ₹{total}</span>
            </div>

            <AddToCartButton items={cartItems} />

            <p className="text-center text-xs text-gray-400">
              Secure checkout on anveshan.farm — you&apos;ll be redirected after adding.
            </p>
          </div>
        </div>
      )}

      {/* Ingredients card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Ingredients</h2>
        <IngredientList
          ingredients={recipe.ingredients}
          products={products}
          onVariantChange={handleVariantChange}
        />
      </div>
    </aside>

    <StickyCartBar products={products} items={cartItems} total={total} recipeName={recipe.name} />
    </>
  );
}
