"use client";

import { useState } from "react";
import Image from "next/image";
import { AnveshanProduct, CartLine } from "@/types";
import { useCart } from "@/components/cart/CartProvider";

interface Props {
  products: AnveshanProduct[];
}

// Card buy row: overlapping product-image circles + an "Add to Cart" pill.
// Lives inside the card <Link>, so the click is stopped from navigating.
export default function BuyRecipeButton({ products }: Props) {
  const { addLines, open } = useCart();
  const [added, setAdded] = useState(false);
  if (products.length === 0) return null;

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const lines: CartLine[] = products
      .map((p) => ({
        variantId: p.variants ? p.variants[0].shopifyVariantId : p.shopifyVariantId,
        name: p.name,
        image: p.image,
        price: p.variants ? p.variants[0].price : p.price,
        quantity: 1,
      }))
      .filter((l) => l.variantId);
    if (lines.length === 0) return;
    addLines(lines);
    open();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const maxCircles = 3;
  const shown = products.slice(0, maxCircles);
  const overflow = products.length - shown.length;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-3">
      <div className="flex -space-x-2 shrink-0">
        {shown.map((p) => (
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
        {overflow > 0 && (
          <div className="relative w-8 h-8 rounded-full ring-2 ring-white flex items-center justify-center bg-anv-cream/40 text-anv-green text-[10px] font-bold">
            +{overflow}
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="w-full sm:w-auto shrink-0 min-h-[40px] bg-anv-green text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-anv-green-dark transition-colors whitespace-nowrap"
      >
        {added ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
}
