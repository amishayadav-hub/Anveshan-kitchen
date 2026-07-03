// Design tokens + menu config for the "My Account" section — the single source
// of truth for inline styles and the menu list. The same colors are also used
// directly as Tailwind arbitrary values (e.g. bg-[#2F7D64]) in the components.
//
// Breakpoints (per spec) are applied via arbitrary Tailwind variants so they
// don't disturb the site-wide config:
//   mobile  < 750px   → base classes
//   tablet  750px+    → min-[750px]:
//   desktop 990px+    → min-[990px]:  (sidebar + panel)
//   large   1200px+   → min-[1200px]: (max content 1140px, extra spacing)

export const ACCOUNT = {
  colors: {
    primaryGreen: "#2F7D64", // hero bg
    darkGreen: "#00584B", // primary buttons
    accentGreen: "#235A49", // coins / icons
    softMint: "#F1F8F5", // cards / active row
    body: "rgba(36,36,36,0.75)",
    heading: "#242424",
    whiteSoft: "rgba(255,255,255,0.85)",
    red: "#C0392B",
  },
  font: {
    heading: "var(--font-roboto-slab), serif",
    body: "var(--font-figtree), sans-serif",
  },
  cardShadow: "0 2px 10px rgba(35,90,73,0.06)",
} as const;

export type AccountIconKey = "user" | "bag" | "coin" | "pin" | "truck" | "help";

export interface AccountMenuItem {
  key: string;
  label: string;
  href: string;
  icon: AccountIconKey;
}

export const ACCOUNT_MENU: AccountMenuItem[] = [
  { key: "details", label: "Account Details", href: "/account/details", icon: "user" },
  { key: "orders", label: "Order History", href: "/account/orders", icon: "bag" },
  { key: "addresses", label: "Address Book", href: "/account/addresses", icon: "pin" },
  { key: "track", label: "Track Your Order", href: "/account/track", icon: "truck" },
  { key: "support", label: "Help & Support", href: "/account/support", icon: "help" },
];

export const WHATSAPP_NUMBER = "919999999999"; // TODO: replace with the real support number
