"use client";

import { useEffect } from "react";
import RecipesHeader from "@/components/layout/RecipesHeader";
import DietProvider from "@/components/recipes/DietProvider";

export default function RecipesLayout({ children }: { children: React.ReactNode }) {
  // Notify parent Shopify page of content height for iframe auto-resize
  useEffect(() => {
    function sendHeight() {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: "anveshan-resize", height }, "*");
    }
    sendHeight();
    const observer = new ResizeObserver(sendHeight);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  return (
    <DietProvider>
      <div className="min-h-screen bg-[#FAFAF7]">
        <RecipesHeader />
        {children}
      </div>
    </DietProvider>
  );
}
