"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { GHEE_VARIETY, ATTA_VARIETY } from "@/lib/product-highlight";
import { PRODUCT_CATALOG } from "@/data/product-catalog";
import { track } from "@/lib/analytics";

const STORE = "https://www.anveshan.farm";

// ── Icons ────────────────────────────────────────────────────────────────────
// Each menu item's icon is a plain ReactNode rendered at 24px. To use your own
// logo, swap any icon below for an <img>, e.g.:
//   icon: <img src="/menu-icons/ghee.svg" alt="" className="h-6 w-6" />
function Svg({ children }: { children: ReactNode }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6"
    >
      {children}
    </svg>
  );
}
const GheeIcon = () => (
  <Svg>
    <path d="M5 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2" />
    <path d="M6 8h12l-1 11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8z" />
  </Svg>
);
const OilIcon = () => (
  <Svg>
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5S12.5 5.5 12 3c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z" />
  </Svg>
);
const AttaIcon = () => (
  <Svg>
    <path d="M5 8l2-4h10l2 4" />
    <path d="M5 8h14v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8z" />
  </Svg>
);
const SuperfoodIcon = () => (
  <Svg>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </Svg>
);
const RecipesIcon = () => (
  <Svg>
    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
    <path d="M6 17h12" />
  </Svg>
);
const AiIcon = () => (
  <Svg>
    <path d="M9.94 14.06 8 20l-1.94-5.94L0 12l6.06-2.06L8 4l1.94 5.94L16 12z" />
    <path d="M18 4v4M21 6h-4M19 16v2M20 17h-2" />
  </Svg>
);
const PublishIcon = () => (
  <Svg>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M17 8l-5-5-5 5" />
    <path d="M12 3v12" />
  </Svg>
);
function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-anv-green/70">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

// ── Menu data ────────────────────────────────────────────────────────────────
interface Chip {
  label: string;
  href: string;
  image?: string;
}
interface MenuItem {
  title: string;
  href: string;
  icon: ReactNode;
  chips?: Chip[];
}

const PRODUCTS: MenuItem[] = [
  {
    title: "Bilona-Churned Ghee",
    href: `${STORE}/collections/desi-ghee`,
    icon: <GheeIcon />,
    chips: [
      { label: "Gir Cow Ghee", href: `${STORE}/products/gir-cow-ghee`, image: GHEE_VARIETY["gir-cow"].image },
      { label: "Buffalo Ghee", href: `${STORE}/products/desi-buffalo-ghee`, image: GHEE_VARIETY.buffalo.image },
      { label: "Desi Cow Ghee", href: `${STORE}/products/a2-desi-ghee`, image: GHEE_VARIETY["desi-cow"].image },
    ],
  },
  {
    title: "Wood-Pressed Oil",
    href: `${STORE}/collections/wood-cold-pressed-oils`,
    icon: <OilIcon />,
    chips: [
      { label: "Groundnut Oil", href: `${STORE}/products/wood-pressed-groundnut-oil`, image: PRODUCT_CATALOG["groundnut-oil"]?.image },
      { label: "Coconut Oil", href: `${STORE}/products/wood-pressed-coconut-oil`, image: PRODUCT_CATALOG["coconut-oil"]?.image },
      { label: "Mustard Oil", href: `${STORE}/products/wood-pressed-mustard-oil`, image: PRODUCT_CATALOG["mustard-oil"]?.image },
      { label: "Sesame Oil", href: `${STORE}/products/wood-pressed-black-sesame-oil`, image: PRODUCT_CATALOG["sesame-oil"]?.image },
      { label: "Sunflower Oil", href: `${STORE}/products/sunflower-oil`, image: PRODUCT_CATALOG["sunflower-oil"]?.image },
      { label: "Olive Oil", href: `${STORE}/products/extra-virgin-olive-oil`, image: PRODUCT_CATALOG["olive-oil"]?.image },
    ],
  },
  {
    title: "Cold-Pressed Atta",
    href: `${STORE}/collections/menu-atta`,
    icon: <AttaIcon />,
    chips: [
      { label: "Protein Atta", href: `${STORE}/collections/menu-atta`, image: PRODUCT_CATALOG["protein-atta"]?.image },
      { label: "Multigrain Atta", href: `${STORE}/products/khapli-multigrain-atta`, image: ATTA_VARIETY.multigrain.image },
      {
        label: "Khapli Atta",
        href: `${STORE}/products/cold-pressed-khapli-atta-low-100-emmer-wheat-gi-high-fiber-stone-ground-flour`,
        image: ATTA_VARIETY.khapli.image,
      },
    ],
  },
  {
    title: "Superfoods",
    href: `${STORE}/collections/superfoods`,
    icon: <SuperfoodIcon />,
    chips: [
      { label: "Wild Forest Honey", href: `${STORE}/products/wild-forest-honey`, image: PRODUCT_CATALOG["honey"]?.image },
      { label: "Turmeric Latte", href: `${STORE}/products/turmeric-latte`, image: PRODUCT_CATALOG["turmeric-latte-mix"]?.image },
      { label: "Saffron", href: `${STORE}/products/kashmiri-mongra-saffron`, image: PRODUCT_CATALOG["saffron"]?.image },
      { label: "Amlaprash", href: `${STORE}/products/amlaprash`, image: PRODUCT_CATALOG["amlaprash"]?.image },
      { label: "Dry Fruit Paak", href: `${STORE}/products/dry-fruit-paak-bites`, image: PRODUCT_CATALOG["dry-fruit-paak"]?.image },
    ],
  },
];

const PAGES: MenuItem[] = [
  { title: "Recipes", href: "/recipes", icon: <RecipesIcon /> },
  { title: "Recipes Generator", href: "/recipes/generate", icon: <AiIcon /> },
  { title: "Publish Your Recipe", href: "/recipes/share", icon: <PublishIcon /> },
];

const ROW =
  "flex items-center gap-3 px-4 py-3.5 text-gray-900 transition-colors hover:bg-anv-green/[0.06] active:bg-anv-green/10 focus-visible:bg-anv-green/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-anv-green/40";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // While open: lock scroll, close on Escape, trap Tab focus inside the panel,
  // and restore focus to the trigger on close.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const trigger = triggerRef.current; // captured for focus-restore in cleanup
    const focusables = () =>
      panel
        ? Array.from(
            panel.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          )
        : [];

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          track("menu_open");
          setOpen(true);
        }}
        aria-label="Open navigation menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-anv-green transition-colors hover:bg-anv-green/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-anv-green/40"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      {mounted &&
        createPortal(
          <>
            {/* Overlay — click to close */}
            <div
              onClick={close}
              aria-hidden="true"
              className={`fixed inset-0 z-[90] bg-black/40 transition-opacity duration-300 ${
                open ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            />

            {/* Slide-in panel */}
            <aside
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className={`fixed inset-y-0 left-0 z-[100] flex h-full w-[320px] max-w-[86vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
                open ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                <span className="flex items-baseline gap-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://cdn.shopify.com/s/files/1/0270/3346/9006/files/anveshan-logo-updates-register-mark.png?v=1728463199"
                    alt="Anveshan"
                    className="h-4 w-auto"
                  />
                  <span className="text-anv-green font-medium text-sm lowercase tracking-tight">kitchen</span>
                </span>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-anv-green/40"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto" aria-label="Explore Anveshan Products">
                <h2 className="px-4 pt-4 pb-2 text-xs font-bold uppercase tracking-wider text-anv-green/70">
                  Explore Anveshan Products
                </h2>

                <ul className="divide-y divide-gray-100 border-y border-gray-100">
                  {PRODUCTS.map((item) => (
                    <li key={item.title}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          track("menu_click", { item: item.title, type: "product" });
                          close();
                        }}
                        className={ROW}
                      >
                        <span className="shrink-0 text-anv-green">{item.icon}</span>
                        <span className="flex-1 text-sm font-semibold">{item.title}</span>
                        <ArrowRight />
                      </a>
                      {item.chips && (
                        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 pl-[3.25rem] pr-4">
                          {item.chips.map((c) => (
                            <a
                              key={c.label}
                              href={c.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={close}
                              className="group flex w-14 shrink-0 flex-col items-center gap-1 text-center focus:outline-none"
                            >
                              <span className="relative h-11 w-11 overflow-hidden rounded-full border border-anv-green/20 bg-anv-cream/40 transition-colors group-hover:border-anv-green group-focus-visible:ring-2 group-focus-visible:ring-anv-green/40">
                                {c.image ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={c.image} alt={c.label} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                                ) : (
                                  <span className="flex h-full w-full items-center justify-center font-bold text-anv-green">
                                    {c.label.charAt(0)}
                                  </span>
                                )}
                              </span>
                              <span className="text-[11px] leading-tight text-gray-600 group-hover:text-anv-green">
                                {c.label}
                              </span>
                            </a>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>

                <ul className="mt-4 divide-y divide-gray-100 border-y border-gray-100">
                  {PAGES.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        onClick={() => {
                          track("menu_click", { item: item.title, type: "page" });
                          close();
                        }}
                        className={ROW}
                      >
                        <span className="shrink-0 text-anv-green">{item.icon}</span>
                        <span className="flex-1 text-sm font-semibold">{item.title}</span>
                        <ArrowRight />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </>,
          document.body
        )}
    </>
  );
}
