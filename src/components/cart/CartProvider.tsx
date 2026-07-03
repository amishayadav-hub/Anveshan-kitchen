"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { CartLine, CartLineVariant } from "@/types";

const STORAGE_KEY = "anveshan-cart";

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  addLines: (lines: CartLine[]) => void;
  setQty: (variantId: string, qty: number) => void;
  changeVariant: (currentVariantId: string, next: CartLineVariant) => void;
  remove: (variantId: string) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  // Persist on change (after hydration so we don't overwrite with []).
  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const MAX_QTY = 99;

  function addLines(incoming: CartLine[]) {
    setLines((prev) => {
      const next = [...prev];
      for (const line of incoming) {
        if (!line.variantId) continue;
        // Some product ids share one Shopify SKU, so merge by variantId and
        // adopt the latest name/image rather than keeping a stale first write.
        const i = next.findIndex((l) => l.variantId === line.variantId);
        if (i >= 0)
          next[i] = {
            ...next[i],
            name: line.name,
            image: line.image,
            // Adopt the latest variant metadata so an in-cart size list stays available.
            variantLabel: line.variantLabel ?? next[i].variantLabel,
            variants: line.variants ?? next[i].variants,
            quantity: Math.min(next[i].quantity + (line.quantity || 1), MAX_QTY),
          };
        else next.push({ ...line, quantity: line.quantity || 1 });
      }
      return next;
    });
  }

  function setQty(variantId: string, qty: number) {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.variantId !== variantId)
        : prev.map((l) => (l.variantId === variantId ? { ...l, quantity: qty } : l))
    );
    if (qty <= 0 && lines.length <= 1) setIsOpen(false); // emptied → close drawer
  }

  // Swap a line's size/pack in place. If the target variant is already in the
  // cart, merge the two lines (summing quantity) instead of creating a duplicate.
  function changeVariant(currentVariantId: string, next: CartLineVariant) {
    if (currentVariantId === next.variantId) return;
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.variantId === currentVariantId);
      if (idx < 0) return prev;
      const line = prev[idx];
      const dupIdx = prev.findIndex((l) => l.variantId === next.variantId);
      const updated: CartLine = {
        ...line,
        variantId: next.variantId,
        price: next.price,
        variantLabel: next.label,
      };
      if (dupIdx >= 0 && dupIdx !== idx) {
        const merged = [...prev];
        merged[dupIdx] = {
          ...merged[dupIdx],
          quantity: Math.min(merged[dupIdx].quantity + line.quantity, MAX_QTY),
        };
        merged.splice(idx, 1);
        return merged;
      }
      const copy = [...prev];
      copy[idx] = updated;
      return copy;
    });
  }

  function remove(variantId: string) {
    setLines((prev) => prev.filter((l) => l.variantId !== variantId));
    if (lines.length <= 1) setIsOpen(false); // removed the last item → close drawer
  }
  const clear = () => setLines([]);

  const count = lines.reduce((n, l) => n + l.quantity, 0);
  const subtotal = lines.reduce((s, l) => s + l.price * l.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        lines,
        count,
        subtotal,
        addLines,
        setQty,
        changeVariant,
        remove,
        clear,
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
