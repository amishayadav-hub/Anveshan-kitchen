"use client";

import { useState } from "react";
import { CartItem } from "@/types";
import { addToCart } from "@/lib/shopify-cart";

interface Props {
  items: CartItem[];
}

type State = "idle" | "loading" | "success" | "error";

export default function AddToCartButton({ items }: Props) {
  const [state, setState] = useState<State>("idle");

  function handleClick() {
    if (items.length === 0) return;
    try {
      setState("success");
      addToCart(items); // navigates the shopper to their anveshan.farm cart
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 2500);
    }
  }

  const labels: Record<State, string> = {
    idle: "Add Anveshan Products to Cart",
    loading: "Adding...",
    success: "Opening your cart...",
    error: "Something went wrong. Try again.",
  };

  const styles: Record<State, string> = {
    idle: "bg-anv-green hover:bg-anv-green-dark text-white",
    loading: "bg-anv-green opacity-70 text-white cursor-wait",
    success: "bg-anv-green text-white",
    error: "bg-red-600 text-white",
  };

  return (
    <button
      onClick={handleClick}
      disabled={state === "loading" || state === "success"}
      className={`w-full py-3.5 px-6 rounded-xl font-semibold text-base transition-all ${styles[state]}`}
    >
      {state === "loading" && (
        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 align-middle" />
      )}
      {labels[state]}
    </button>
  );
}
