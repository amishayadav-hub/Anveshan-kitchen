"use client";

import { useState } from "react";
import { CartLine } from "@/types";
import { useCart } from "@/components/cart/CartProvider";
import { track } from "@/lib/analytics";

interface Props {
  lines: CartLine[];
  label?: string;
}

// Adds the recipe's Anveshan products to the local cart drawer (AJAX, no reload).
export default function AddToCartButton({ lines, label = "Add Anveshan Products to Cart" }: Props) {
  const { addLines, open } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    if (lines.length === 0) return;
    track("add_to_cart", {
      source: "pdp_panel",
      items: lines.length,
      value: lines.reduce((s, l) => s + l.price * l.quantity, 0),
    });
    addLines(lines);
    open();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-live="polite"
      className="w-full py-3.5 px-6 rounded-xl font-semibold text-base transition-all bg-anv-green hover:bg-anv-green-dark text-white"
    >
      {added ? "Added to cart ✓" : label}
    </button>
  );
}
