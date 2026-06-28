"use client";

import { useState } from "react";
import Image from "next/image";
import { AnveshanProduct, CartLine } from "@/types";
import { useCart } from "@/components/cart/CartProvider";

interface Props {
  products: AnveshanProduct[];
  lines: CartLine[];
  total: number;
  recipeName: string;
}

// Sticky bottom bar on the recipe detail page — adds the recipe's Anveshan
// products to the cart drawer. Lines reflect the chosen ghee variety/size.
export default function StickyCartBar({ products, lines, total, recipeName }: Props) {
  const { addLines, open } = useCart();
  const [added, setAdded] = useState(false);
  if (products.length === 0) return null;

  function handleClick() {
    if (lines.length === 0) return;
    addLines(lines);
    open();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-2px_12px_rgba(0,0,0,0.08)]">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex -space-x-3 shrink-0">
            {lines.slice(0, 3).map((l) => (
              <div
                key={l.variantId}
                className="relative w-10 h-10 rounded-full ring-2 ring-white overflow-hidden bg-anv-cream/40"
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
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
