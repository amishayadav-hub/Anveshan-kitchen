"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // On mount, prefer the URL (?diet=) over localStorage so links are shareable.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fromUrl = searchParams.get("diet");
    const mode = fromUrl ?? localStorage.getItem(DIET_KEY);
    if (mode === "veg") setVegOnly(true);
    else if (mode === "nonveg") setNonVegOnly(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync diet -> URL, preserving other params (q, category, sub).
  function syncUrl(mode: "veg" | "nonveg" | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (mode) params.set("diet", mode);
    else params.delete("diet");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  // Veg and Non-Veg are mutually exclusive.
  function toggleVeg(on: boolean) {
    setVegOnly(on);
    if (on) setNonVegOnly(false);
    if (typeof window !== "undefined") localStorage.setItem(DIET_KEY, on ? "veg" : "all");
    syncUrl(on ? "veg" : null);
  }
  function toggleNonVeg(on: boolean) {
    setNonVegOnly(on);
    if (on) setVegOnly(false);
    if (typeof window !== "undefined") localStorage.setItem(DIET_KEY, on ? "nonveg" : "all");
    syncUrl(on ? "nonveg" : null);
  }

  return (
    <DietContext.Provider value={{ vegOnly, nonVegOnly, toggleVeg, toggleNonVeg }}>
      {children}
    </DietContext.Provider>
  );
}
