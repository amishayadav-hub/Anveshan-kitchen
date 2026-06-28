"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { CartLine } from "@/types";

const STORAGE_KEY = "anveshan-cart";

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  addLines: (lines: CartLine[]) => void;
  setQty: (variantId: string, qty: number) => void;
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

  function addLines(incoming: CartLine[]) {
    setLines((prev) => {
      const next = [...prev];
      for (const line of incoming) {
        if (!line.variantId) continue;
        const i = next.findIndex((l) => l.variantId === line.variantId);
        if (i >= 0) next[i] = { ...next[i], quantity: next[i].quantity + (line.quantity || 1) };
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
  }

  const remove = (variantId: string) =>
    setLines((prev) => prev.filter((l) => l.variantId !== variantId));
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
