"use client";

import { useState } from "react";
import Image from "next/image";
import { AnveshanProduct, CartItem } from "@/types";
import { addToCart } from "@/lib/shopify-cart";

interface Props {
  products: AnveshanProduct[];
  items: CartItem[];
}

// Card buy row: overlapping product-image circles + an "Add to Cart" pill.
// Lives inside the card <Link>, so the click is stopped from navigating.
export default function BuyRecipeButton({ products, items }: Props) {
  const [added, setAdded] = useState(false);
  if (products.length === 0) return null;

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (items.length === 0) return;
    setAdded(true);
    addToCart(items);
  }

  return (
    <div className="flex items-center justify-between gap-2 mt-3">
      <div className="flex -space-x-2 shrink-0">
        {products.slice(0, 4).map((p) => (
          <div
            key={p.id}
            className="relative w-8 h-8 rounded-full ring-2 ring-white overflow-hidden bg-anv-cream/40"
            title={p.name}
          >
            {p.image ? (
              <Image src={p.image} alt={p.name} fill className="object-cover" sizes="32px" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-anv-green text-[10px] font-bold">
                {p.name.charAt(0)}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="shrink-0 bg-anv-green text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-anv-green-dark transition-colors whitespace-nowrap"
      >
        {added ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
}
