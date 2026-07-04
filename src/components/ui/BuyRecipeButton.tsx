"use client";

import { useState } from "react";
import Image from "next/image";
import { AnveshanProduct, CartLine } from "@/types";
import { useCart } from "@/components/cart/CartProvider";
import { variantMetaFor } from "@/lib/cart-variants";
import { track } from "@/lib/analytics";

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
      .map((p) => {
        const variantId = p.variants ? p.variants[0].shopifyVariantId : p.shopifyVariantId;
        return {
          variantId,
          name: p.name,
          image: p.image,
          price: p.variants ? p.variants[0].price : p.price,
          quantity: 1,
          ...variantMetaFor(variantId, p.id), // size options for the in-cart selector
        };
      })
      .filter((l) => l.variantId);
    if (lines.length === 0) return;
    track("add_to_cart", {
      source: "recipe_card",
      items: lines.length,
      value: lines.reduce((s, l) => s + l.price * l.quantity, 0),
    });
    addLines(lines);
    open();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const maxCircles = 3;
  const shown = products.slice(0, maxCircles);
  const overflow = products.length - shown.length;

  return (
    <div className="flex flex-row items-center justify-between gap-2 mt-3">
      <div className="flex -space-x-1.5 shrink-0">
        {shown.map((p) => (
          <div
            key={p.id}
            className="relative w-6 h-6 rounded-full ring-2 ring-white overflow-hidden bg-anv-cream/40"
            title={p.name}
          >
            {p.image ? (
              <Image src={p.image} alt={p.name} fill className="object-cover" sizes="24px" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-anv-green text-[9px] font-bold">
                {p.name.charAt(0)}
              </div>
            )}
          </div>
        ))}
        {overflow > 0 && (
          <div className="relative w-6 h-6 rounded-full ring-2 ring-white flex items-center justify-center bg-anv-cream/40 text-anv-green text-[9px] font-bold">
            +{overflow}
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={handleClick}
        aria-label="Add to cart"
        className="shrink-0 inline-flex items-center gap-1 bg-anv-green text-white text-[11px] font-semibold px-3 py-1.5 rounded-full hover:bg-anv-green-dark transition-colors whitespace-nowrap"
      >
        {added ? (
          <>Added <CheckIcon /></>
        ) : (
          <>ADD <CartIcon /></>
        )}
      </button>
    </div>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
