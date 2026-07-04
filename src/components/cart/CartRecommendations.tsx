"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllRecipesClient, getAllProductsClient } from "@/lib/recipes";
import { Recipe, AnveshanProduct, CartLine } from "@/types";
import { useCart } from "./CartProvider";
import { variantMetaFor } from "@/lib/cart-variants";
import { track } from "@/lib/analytics";

// Small "You might also like" recipe strip shown in the cart. Each tiny card
// adds that recipe's Anveshan products to the cart.
export default function CartRecommendations() {
  const { addLines } = useCart();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [productMap, setProductMap] = useState<Record<string, AnveshanProduct>>({});

  // Lazy-load recipes + products once (cached at the module level after).
  useEffect(() => {
    let alive = true;
    Promise.all([getAllRecipesClient(), getAllProductsClient()])
      .then(([rs, ps]) => {
        if (!alive) return;
        setRecipes(rs);
        setProductMap(Object.fromEntries(ps.map((p) => [p.id, p])));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (recipes.length === 0) return null;
  const recs = recipes.slice(0, 8);

  function addRecipe(r: Recipe) {
    const lines: CartLine[] = (r.anveshanProducts ?? [])
      .map((id) => productMap[id])
      .filter(Boolean)
      .map((p) => {
        const variantId = p.variants ? p.variants[0].shopifyVariantId : p.shopifyVariantId;
        return {
          variantId,
          name: p.name,
          image: p.image,
          price: p.variants ? p.variants[0].price : p.price,
          quantity: 1,
          ...variantMetaFor(variantId, p.id),
        };
      })
      .filter((l) => l.variantId);
    if (lines.length) {
      track("add_to_cart", {
        source: "cart_recommendation",
        recipe: r.name,
        items: lines.length,
        value: lines.reduce((s, l) => s + l.price * l.quantity, 0),
      });
      addLines(lines);
    }
  }

  return (
    <div className="border-t border-gray-100 px-4 py-3">
      <p className="mb-2 text-xs font-semibold text-gray-500">You might also like</p>
      <div className="flex gap-2.5 overflow-x-auto no-scrollbar">
        {recs.map((r) => (
          <div key={r.id} className="w-[76px] shrink-0">
            <div className="relative h-14 w-[76px] overflow-hidden rounded-lg bg-anv-cream/40">
              <Image
                src={r.image || "/placeholder-recipe.jpg"}
                alt={r.name}
                fill
                className="object-cover"
                sizes="76px"
                unoptimized={/upload\.wikimedia\.org/.test(r.image || "")}
              />
            </div>
            <p className="mt-1 line-clamp-1 text-[10px] font-medium leading-tight text-gray-800">{r.name}</p>
            <button
              onClick={() => addRecipe(r)}
              aria-label={`Add ${r.name} products to cart`}
              className="mt-1 inline-flex w-full items-center justify-center gap-1 rounded-full bg-anv-green px-2 py-1 text-[10px] font-semibold text-white transition-colors hover:bg-anv-green-dark"
            >
              ADD
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
