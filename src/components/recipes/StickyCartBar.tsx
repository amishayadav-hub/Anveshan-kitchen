"use client";

import { useState } from "react";
import Image from "next/image";
import { AnveshanProduct, CartItem } from "@/types";
import { addToCart } from "@/lib/shopify-cart";

interface Props {
  products: AnveshanProduct[];
  items: CartItem[];
  total: number;
  recipeName: string;
}

// Sticky bottom bar on the recipe detail page — adds the recipe's Anveshan
// ingredients to the cart. Items reflect the chosen ghee variety.
export default function StickyCartBar({ products, items, total, recipeName }: Props) {
  const [added, setAdded] = useState(false);
  if (products.length === 0) return null;

  function handleClick() {
    setAdded(true);
    addToCart(items);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-2px_12px_rgba(0,0,0,0.08)]">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex -space-x-3 shrink-0">
            {products.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="relative w-10 h-10 rounded-full ring-2 ring-white overflow-hidden bg-anv-cream/40"
              >
                {p.image ? (
                  <Image src={p.image} alt={p.name} fill className="object-cover" sizes="40px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-anv-green text-xs font-bold">
                    {p.name.charAt(0)}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-gray-900 truncate">{recipeName}</p>
            <p className="text-xs text-gray-500">
              {products.length} Anveshan product{products.length !== 1 ? "s" : ""} ·{" "}
              <span className="font-bold text-anv-green">₹{total}</span>
            </p>
          </div>
        </div>
        <button
          onClick={handleClick}
          className="shrink-0 bg-anv-green text-white font-semibold text-sm px-5 sm:px-7 py-2.5 rounded-full hover:bg-anv-green-dark transition-colors whitespace-nowrap"
        >
          {added ? "Opening cart..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
