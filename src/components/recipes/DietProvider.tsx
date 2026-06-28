"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const DIET_KEY = "anveshan-diet-mode"; // "veg" | "nonveg" | (absent = all)

interface DietContextValue {
  vegOnly: boolean;
  nonVegOnly: boolean;
  toggleVeg: (on: boolean) => void;
  toggleNonVeg: (on: boolean) => void;
}

const DietContext = createContext<DietContextValue | null>(null);

export function useDiet() {
  const ctx = useContext(DietContext);
  if (!ctx) throw new Error("useDiet must be used within <DietProvider>");
  return ctx;
}

// Shared Veg/Non-Veg filter state so the green-stripe toggles control the listing.
export default function DietProvider({ children }: { children: ReactNode }) {
  const [vegOnly, setVegOnly] = useState(false);
  const [nonVegOnly, setNonVegOnly] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mode = localStorage.getItem(DIET_KEY);
    if (mode === "veg") setVegOnly(true);
    else if (mode === "nonveg") setNonVegOnly(true);
  }, []);

  // Veg and Non-Veg are mutually exclusive.
  function toggleVeg(on: boolean) {
    setVegOnly(on);
    if (on) setNonVegOnly(false);
    if (typeof window !== "undefined") localStorage.setItem(DIET_KEY, on ? "veg" : "all");
  }
  function toggleNonVeg(on: boolean) {
    setNonVegOnly(on);
    if (on) setVegOnly(false);
    if (typeof window !== "undefined") localStorage.setItem(DIET_KEY, on ? "nonveg" : "all");
  }

  return (
    <DietContext.Provider value={{ vegOnly, nonVegOnly, toggleVeg, toggleNonVeg }}>
      {children}
    </DietContext.Provider>
  );
}
