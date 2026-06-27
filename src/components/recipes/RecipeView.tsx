"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { Recipe, AnveshanProduct, CartItem } from "@/types";
import IngredientList from "@/components/recipes/IngredientList";
import AddToCartButton from "@/components/ui/AddToCartButton";
import StickyCartBar from "@/components/recipes/StickyCartBar";
import ProductInfoTabs from "@/components/recipes/ProductInfoTabs";
import FaqAccordion from "@/components/recipes/FaqAccordion";
import { highlightProductMentions, PRODUCT_HANDLES } from "@/lib/product-highlight";
import { PRODUCT_PDP } from "@/data/product-pdp";
import { ClockIcon, UsersIcon, GaugeIcon, UtensilsIcon } from "@/components/ui/icons";

interface Props {
  recipe: Recipe;
  products: AnveshanProduct[];
  categoryLabel: string;
}

// Anveshan trust signals shown beside every recipe's products (icon + label).
const TRUST: { label: string; icon: ReactNode }[] = [
  { label: "100% Natural", icon: <LeafIcon /> },
  { label: "Cold Pressed", icon: <DropletIcon /> },
  { label: "No Chemicals", icon: <FlaskIcon /> },
  { label: "Rich in Nutrients", icon: <SproutIcon /> },
  { label: "Good for Heart Health", icon: <HeartIcon /> },
];

function parseMinutes(s?: string): number {
  if (!s) return 0;
  const hr = s.match(/(\d+)\s*(?:h\b|hr|hour)/i);
  const min = s.match(/(\d+)\s*(?:m\b|min|minute)/i);
  if (!hr && !min) {
    const n = s.match(/\d+/);
    return n ? parseInt(n[0], 10) : 0;
  }
  return (hr ? parseInt(hr[1], 10) * 60 : 0) + (min ? parseInt(min[1], 10) : 0);
}

function formatMinutes(total: number): string {
  if (!total) return "—";
  const h = Math.floor(total / 60);
  const m = total % 60;
  return [h ? `${h} hr` : "", m ? `${m} min` : ""].filter(Boolean).join(" ");
}

// Bold a leading "Label:" lead-in (e.g. "Make the dough:") like the mockup.
function renderStep(step: string, productIds: string[]): ReactNode {
  const idx = step.indexOf(":");
  if (idx > 0 && idx <= 28 && !/\d$/.test(step.slice(0, idx))) {
    return (
      <>
        <strong className="font-semibold text-gray-900">{step.slice(0, idx + 1)}</strong>{" "}
        {highlightProductMentions(step.slice(idx + 1).trim(), productIds)}
      </>
    );
  }
  return highlightProductMentions(step, productIds);
}

export default function RecipeView({ recipe, products, categoryLabel }: Props) {
  // Per-product chosen pack: variant id + its price (drives the cart + totals).
  const [selection, setSelection] = useState<Record<string, { variantId: string; price: number }>>(() => {
    const map: Record<string, { variantId: string; price: number }> = {};
    products.forEach((p) => {
      map[p.id] = p.variants
        ? { variantId: p.variants[0].shopifyVariantId, price: p.variants[0].price }
        : { variantId: p.shopifyVariantId, price: p.price };
    });
    return map;
  });

  function handleSelect(productId: string, variantId: string, price: number) {
    setSelection((prev) => ({ ...prev, [productId]: { variantId, price } }));
  }

  const priceFor = (p: AnveshanProduct) => selection[p.id]?.price ?? p.price ?? 0;

  const cartItems: CartItem[] = products.map((p) => ({
    shopifyVariantId: selection[p.id]?.variantId ?? p.shopifyVariantId,
    quantity: 1,
    productName: p.name,
  }));
  const total = products.reduce((sum, p) => sum + priceFor(p), 0);

  const totalMin = parseMinutes(recipe.prepTime) + parseMinutes(recipe.cookTime);
  const difficulty =
    totalMin <= 30 && recipe.steps.length <= 8
      ? "Easy"
      : totalMin <= 60
        ? "Medium"
        : "Advanced";

  const hasTips = !!recipe.tips?.length;
  const hasFaq = !!recipe.faqs?.length;

  // The recipe's primary Anveshan product that has live PDP info (Shelf Life / Benefits / FAQs).
  const primaryPdp = products
    .map((p) => ({ name: p.name, pdp: PRODUCT_PDP[PRODUCT_HANDLES[p.id]] }))
    .find((x) => x.pdp);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-6 pb-28">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-5">
        <span>Recipes</span>
        <span className="mx-1.5">/</span>
        <span>{categoryLabel}</span>
        <span className="mx-1.5">/</span>
        <span className="text-gray-600">{recipe.name}</span>
      </nav>

      <div className="grid lg:grid-cols-[1fr_350px] gap-8 items-start">
        {/* ── Main column: header + all sections (keeps text at a readable width) ── */}
        <div className="min-w-0">
          {/* Header: thumbnail + title + meta chips */}
          <header className="flex flex-col sm:flex-row gap-5 mb-10">
            <div className="relative w-full sm:w-44 h-44 shrink-0 rounded-2xl overflow-hidden bg-anv-cream/40">
              <Image
                src={recipe.image || "/placeholder-recipe.jpg"}
                alt={recipe.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 176px"
                priority
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900">{recipe.name}</h1>
              <p className="text-gray-600 mt-2 leading-relaxed">
                {recipe.intro || recipe.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <TimingChip prepTime={recipe.prepTime} cookTime={recipe.cookTime} total={formatMinutes(totalMin)} />
                <Chip><UsersIcon /> {recipe.servings} Servings</Chip>
                <Chip><GaugeIcon /> {difficulty}</Chip>
                <Chip><UtensilsIcon /> {categoryLabel}</Chip>
              </div>
            </div>
          </header>

        {/* ── All sections on one page ── */}
        <section className="space-y-12">
          {/* Ingredients */}
          <div id="ingredients" className="grid md:grid-cols-[1fr_240px] gap-6 scroll-mt-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h2>
              <IngredientList
                ingredients={recipe.ingredients}
                products={products}
                selection={selection}
                onSelect={handleSelect}
              />
            </div>
            <div className="space-y-4">
              {hasTips && (
                <div className="bg-[#EDF3EF] border border-[#D9E5DE] rounded-xl p-4">
                  <p className="font-semibold text-anv-green text-sm mb-1.5 flex items-center gap-1.5">
                    <SproutIcon /> Chef&apos;s Tip
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">{recipe.tips![0]}</p>
                </div>
              )}
              {/* Trust signals (moved here from the sidebar) */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3.5">
                {TRUST.map((t) => (
                  <div key={t.label} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="text-anv-green shrink-0">{t.icon}</span>
                    {t.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div id="instructions" className="scroll-mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">How to Make {recipe.name}</h2>
            <ol className="space-y-4">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-anv-green text-white font-bold text-sm flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed pt-1">
                    {renderStep(step, recipe.anveshanProducts)}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Tips */}
          {hasTips && (
            <div id="tips" className="scroll-mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tips for the Best {recipe.name}</h2>
              <ul className="space-y-3">
                {recipe.tips!.map((tip, i) => (
                  <li key={i} className="flex gap-3 text-gray-700 leading-relaxed">
                    <span className="text-anv-green font-bold">✓</span>
                    <span>{highlightProductMentions(tip, recipe.anveshanProducts)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* FAQ — same accordion format as the product FAQs */}
          {hasFaq && (
            <div id="faq" className="scroll-mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <FaqAccordion
                faqs={recipe.faqs!}
                renderAnswer={(a) => highlightProductMentions(a, recipe.anveshanProducts)}
              />
            </div>
          )}
        </section>
        </div>

        {/* ── Right: Anveshan products (image-2 style) ── */}
        {products.length > 0 && (
          <aside className="lg:sticky lg:top-6 space-y-4">
            <div className="bg-white rounded-2xl border border-anv-cream-dark shadow-sm overflow-hidden">
              <div className="bg-anv-green text-white px-5 py-4">
                <h3 className="font-bold text-base">Shop the Anveshan products</h3>
                <p className="text-xs text-white/70 mt-0.5">
                  The healthy swaps in this recipe — pure, traceable, farmer-direct.
                </p>
              </div>

              <div className="p-4 space-y-3">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="flex gap-3 items-center rounded-xl border border-gray-100 p-2.5 hover:border-anv-green/30 transition-colors"
                  >
                    <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-anv-cream/40">
                      {p.image ? (
                        <Image src={p.image} alt={p.name} fill className="object-cover" sizes="64px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-anv-green font-bold">
                          {p.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900 leading-tight">{p.name}</p>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{p.whyAnveshan}</p>
                    </div>
                    <span className="font-bold text-anv-green text-sm shrink-0">₹{priceFor(p)}</span>
                  </div>
                ))}

                <div className="flex items-center justify-between px-1 pt-1">
                  <span className="text-sm text-gray-500">
                    {products.length} {products.length === 1 ? "product" : "products"}
                  </span>
                  <span className="text-sm font-bold text-gray-900">Total ₹{total}</span>
                </div>

                <AddToCartButton items={cartItems} />

                <p className="text-center text-xs text-gray-400">
                  Secure checkout on anveshan.farm — you&apos;ll be redirected after adding.
                </p>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Footer: real Shelf Life / Benefits / FAQs for the recipe's primary Anveshan product */}
      {primaryPdp && (
        <ProductInfoTabs productName={primaryPdp.name} pdp={primaryPdp.pdp} />
      )}

      <StickyCartBar products={products} items={cartItems} total={total} recipeName={recipe.name} />
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 rounded-full px-3 py-1">
      {children}
    </span>
  );
}

// Total-time chip with a floating time breakdown. Auto-previews once on load,
// then hides; re-opens on hover or click.
function TimingChip({ prepTime, cookTime, total }: { prepTime?: string; cookTime?: string; total: string }) {
  const [open, setOpen] = useState(false);
  const hovering = useRef(false);

  useEffect(() => {
    setOpen(true); // preview the breakdown on first visit…
    const t = setTimeout(() => {
      if (!hovering.current) setOpen(false); // …then hide it
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => {
        hovering.current = true;
        setOpen(true);
      }}
      onMouseLeave={() => {
        hovering.current = false;
        setOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 rounded-full px-3 py-1 hover:bg-gray-200 transition-colors cursor-pointer"
      >
        <ClockIcon /> {total}
      </button>
      <div
        className={`absolute top-full left-0 mt-2 z-30 w-56 bg-white rounded-xl shadow-lg border border-gray-200 p-3.5 space-y-2.5 transition-all duration-150 ${
          open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1"
        }`}
      >
        <p className="text-xs font-semibold text-anv-green">Time breakdown</p>
        <TimeRow label="Prep Time" value={prepTime} />
        <TimeRow label="Cook Time" value={cookTime} />
        <TimeRow label="Total Time" value={total} bold />
      </div>
    </span>
  );
}

function TimeRow({ label, value, bold }: { label: string; value?: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className={bold ? "font-bold text-anv-green" : "font-medium text-gray-800"}>
        {value || "—"}
      </span>
    </div>
  );
}

// ── Line icons (Lucide paths), inherit color via currentColor ──────────────
function Svg({ children }: { children: ReactNode }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function LeafIcon() {
  return (
    <Svg>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </Svg>
  );
}

function DropletIcon() {
  return (
    <Svg>
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </Svg>
  );
}

function FlaskIcon() {
  return (
    <Svg>
      <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
      <path d="M6.453 15h11.094" />
      <path d="M8.5 2h7" />
    </Svg>
  );
}

function SproutIcon() {
  return (
    <Svg>
      <path d="M7 20h10" />
      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
    </Svg>
  );
}

function HeartIcon() {
  return (
    <Svg>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </Svg>
  );
}
