"use client";

import { useState } from "react";
import Image from "next/image";
import { AnveshanProduct, CartLine } from "@/types";
import { useCart } from "@/components/cart/CartProvider";
import { track } from "@/lib/analytics";

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
    track("add_to_cart", { source: "sticky_bar", items: lines.length, value: total });
    addLines(lines);
    open();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="print:hidden fixed bottom-14 md:bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-2px_12px_rgba(0,0,0,0.08)]">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex -space-x-2 shrink-0">
            {lines.slice(0, 3).map((l, i) => (
              <div
                key={l.variantId}
                className={`relative w-8 h-8 rounded-full ring-2 ring-white overflow-hidden bg-anv-cream/40 ${
                  i === 2 ? "hidden sm:block" : ""
                }`}
              >
                {l.image ? (
                  <Image src={l.image} alt={l.name} fill className="object-cover" sizes="32px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-anv-green text-[10px] font-bold">
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
          aria-label="Add to cart"
          className="shrink-0 inline-flex items-center gap-1.5 bg-anv-green text-white font-semibold text-sm px-5 sm:px-7 py-2.5 rounded-full hover:bg-anv-green-dark transition-colors whitespace-nowrap"
        >
          {added ? (
            <>Added <CheckIcon /></>
          ) : (
            <>ADD <CartIcon /></>
          )}
        </button>
      </div>
    </div>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
