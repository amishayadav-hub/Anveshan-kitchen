import type { ReactNode } from "react";

// Refined line icons for the top recipe-category filter tiles. Keyed by the
// category `key` from lib/categories (plus "all"). Inherit color via currentColor.
function I({ children, className = "h-6 w-6" }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const ICONS: Record<string, ReactNode> = {
  // All — chef hat
  all: (
    <>
      <path d="M6.5 16a3.5 3.5 0 0 1-1-6.85A4 4 0 0 1 12 5.2 4 4 0 0 1 18.5 9.15 3.5 3.5 0 0 1 17.5 16z" />
      <path d="M7 16v4h10v-4" />
      <path d="M9.5 17.5h.01M12 17.5h.01M14.5 17.5h.01" />
    </>
  ),
  // Ghee — jar with a dollop
  ghee: (
    <>
      <rect x="6" y="9" width="12" height="11" rx="2.5" />
      <path d="M8.5 9V7.5a3.5 3.5 0 0 1 7 0V9" />
      <path d="M12 13.3c-1 1-1.5 1.8-1.5 2.5a1.5 1.5 0 0 0 3 0c0-.7-.5-1.5-1.5-2.5z" />
    </>
  ),
  // Oil — bottle with droplet
  oil: (
    <>
      <path d="M10.5 3h3" />
      <path d="M10.5 3v2.2a2 2 0 0 1-.3 1.05L9 8.4A2 2 0 0 0 8.7 9.5V19a2 2 0 0 0 2 2h2.6a2 2 0 0 0 2-2V9.5a2 2 0 0 0-.3-1.1l-1.2-2.15A2 2 0 0 1 13.5 5.2V3" />
      <path d="M12 12.4c-.9.9-1.4 1.6-1.4 2.3a1.4 1.4 0 0 0 2.8 0c0-.7-.5-1.4-1.4-2.3z" />
    </>
  ),
  // Atta — flour sack with wheat
  atta: (
    <>
      <path d="M6.5 8.5C6.5 6.5 8.7 5 12 5s5.5 1.5 5.5 3.5" />
      <path d="M6 9.3c0-.5.4-.8.9-.8h10.2c.5 0 .9.3.9.8V18a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 6 18z" />
      <path d="M12 11.5v5" />
      <path d="M12 13c.7-.6 1.5-.6 2 0M12 15c.7-.6 1.5-.6 2 0M12 13c-.7-.6-1.5-.6-2 0M12 15c-.7-.6-1.5-.6-2 0" />
    </>
  ),
  // Superfood — mortar & pestle
  superfood: (
    <>
      <path d="M4.5 11h15" />
      <path d="M6 11a6 6 0 0 0 12 0" />
      <path d="M12 17v2.5" />
      <path d="M8.5 21.5h7" />
      <path d="M16.8 3.2 11.5 8.5" />
    </>
  ),
  // Sweet — laddu on a plate
  sweet: (
    <>
      <path d="M5 18.5h14" />
      <circle cx="12" cy="12" r="5" />
      <path d="M10.3 10.7h.01M13.3 11.2h.01M11.6 13.3h.01" />
    </>
  ),
  // Dessert — cupcake
  dessert: (
    <>
      <path d="M7 11.5h10l-1.15 7.7a1.5 1.5 0 0 1-1.5 1.3H9.65a1.5 1.5 0 0 1-1.5-1.3z" />
      <path d="M6.5 11.5a5.5 5.5 0 0 1 11 0z" />
      <path d="M12 4.5v2.2" />
      <circle cx="12" cy="4" r="1" />
    </>
  ),
  // Main Course — plate with fork & knife
  "main-course": (
    <>
      <circle cx="12" cy="12.5" r="5" />
      <circle cx="12" cy="12.5" r="2" />
      <path d="M4.2 4v4a1.2 1.2 0 0 0 2.4 0V4M5.4 4v16" />
      <path d="M19.8 4c-1.1 0-1.7 1.9-1.7 4.3 0 1 .7 1.5 1.7 1.5V20" />
    </>
  ),
  // Snack — samosa
  snack: (
    <>
      <path d="M12 5 4.7 18.3a1 1 0 0 0 .87 1.5h12.86a1 1 0 0 0 .87-1.5z" />
      <path d="M12 5v14.8" />
      <path d="M9 19.8l3-1.6 3 1.6" />
    </>
  ),
  // Starter — skewer
  starter: (
    <>
      <path d="M21 3.5 4 20.5" />
      <circle cx="14.2" cy="9.6" r="2" />
      <circle cx="10.4" cy="13.4" r="2" />
    </>
  ),
  // Drink / Smoothie — cup with straw
  drink: (
    <>
      <path d="M7 6.5h10l-1.35 12.8a1.8 1.8 0 0 1-1.8 1.6h-3.7a1.8 1.8 0 0 1-1.8-1.6z" />
      <path d="M15 6.5 17 3" />
      <path d="M8.3 10.5h7.4" />
    </>
  ),
};

export function CategoryIcon({ name, className }: { name: string; className?: string }) {
  return <I className={className}>{ICONS[name] ?? ICONS.all}</I>;
}
