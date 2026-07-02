"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { Recipe, AnveshanProduct, CartLine } from "@/types";
import IngredientList from "@/components/recipes/IngredientList";
import AddToCartButton from "@/components/ui/AddToCartButton";
import StickyCartBar from "@/components/recipes/StickyCartBar";
import ProductInfoTabs from "@/components/recipes/ProductInfoTabs";
import FaqAccordion from "@/components/recipes/FaqAccordion";
import RecipeActions from "@/components/recipes/RecipeActions";
import ReadMore from "@/components/recipes/ReadMore";
import HScrollDots from "@/components/ui/HScrollDots";
import RelatedRecipes from "@/components/recipes/RelatedRecipes";
import ProductInfoCard from "@/components/recipes/ProductInfoCard";
import {
  highlightProductMentions,
  PRODUCT_HANDLES,
  pdpUrl,
  pdpUrlForProduct,
  ATTA_PRODUCT_IDS,
  ATTA_VARIETY,
} from "@/lib/product-highlight";
import { PRODUCT_PDP } from "@/data/product-pdp";
import { PRODUCT_SIZES } from "@/data/product-variants";
import { ClockIcon, UsersIcon, GaugeIcon, UtensilsIcon } from "@/components/ui/icons";

// Reverse lookup: a selected variantId -> its product handle, so the cart panel
// can show the right size options for ghee/atta even though the type/variety is
// picked in the ingredient list. Covers size variants + each default type/variety.
const VARIANT_TO_HANDLE: Record<string, string> = {};
for (const [handle, sizes] of Object.entries(PRODUCT_SIZES)) {
  for (const s of sizes) VARIANT_TO_HANDLE[s.variantId] = handle;
}
for (const v of Object.values(ATTA_VARIETY)) VARIANT_TO_HANDLE[v.variantId] = v.handle;

interface Props {
  recipe: Recipe;
  products: AnveshanProduct[];
  categoryLabel: string;
  related?: Recipe[];
  relatedProducts?: Record<string, AnveshanProduct>;
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

export default function RecipeView({ recipe, products, categoryLabel, related = [], relatedProducts = {} }: Props) {
  // Per-product chosen pack: variant id + price + image + name (drives cart, totals, art).
  type Sel = { variantId: string; price: number; image?: string; name?: string };
  const [selection, setSelection] = useState<Record<string, Sel>>(() => {
    const map: Record<string, Sel> = {};
    products.forEach((p) => {
      map[p.id] = p.variants
        ? { variantId: p.variants[0].shopifyVariantId, price: p.variants[0].price, image: p.image }
        : { variantId: p.shopifyVariantId, price: p.price, image: p.image };
    });
    return map;
  });

  function handleSelect(
    productId: string,
    variantId: string,
    price: number,
    image?: string,
    name?: string
  ) {
    setSelection((prev) => ({
      ...prev,
      [productId]: {
        variantId,
        price,
        image: image ?? prev[productId]?.image,
        name: name ?? prev[productId]?.name,
      },
    }));
  }

  // Which product's size popup is open in the "Shop the Anveshan products" panel.
  const [openProduct, setOpenProduct] = useState<string | null>(null);

  // Serving multiplier (1x/2x/3x) — owned here so the header chip's popover and
  // the ingredient amounts share one source of truth.
  const [multiplier, setMultiplier] = useState(1);

  // Collapse the method to the first few steps, with a "See all steps" toggle.
  const COLLAPSED_STEPS = 3;
  const [showAllSteps, setShowAllSteps] = useState(false);

  // Collapse tips to the first couple, with a "Load more" toggle.
  const COLLAPSED_TIPS = 2;
  const [showAllTips, setShowAllTips] = useState(false);

  const priceFor = (p: AnveshanProduct) => selection[p.id]?.price ?? p.price ?? 0;
  const imageFor = (p: AnveshanProduct) => selection[p.id]?.image ?? p.image;
  const nameFor = (p: AnveshanProduct) => selection[p.id]?.name ?? p.name;

  const cartLines: CartLine[] = products
    .map((p) => ({
      variantId: selection[p.id]?.variantId ?? p.shopifyVariantId,
      name: nameFor(p),
      image: imageFor(p),
      price: priceFor(p),
      quantity: 1,
    }))
    .filter((l) => l.variantId);
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
    <div className="max-w-6xl mx-auto px-4 pt-4 md:pt-6 pb-28">
      {/* Breadcrumb — parent hierarchy only (no current recipe name) */}
      <nav className="flex flex-wrap text-xs text-gray-400 mb-3 md:mb-5">
        <span>Recipes</span>
        <span className="mx-1.5">/</span>
        <span className="text-gray-600">{categoryLabel}</span>
      </nav>

      <div className="grid lg:grid-cols-[1fr_350px] gap-6 md:gap-8 items-start">
        {/* ── Main column: header + all sections (keeps text at a readable width) ── */}
        <div className="min-w-0">
          {/* Header: thumbnail + title + meta chips */}
          <header className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-6 md:mb-10">
            <div className="relative w-full h-40 sm:w-44 sm:h-44 shrink-0 rounded-2xl overflow-hidden bg-anv-cream/40">
              <Image
                src={recipe.image || "/placeholder-recipe.jpg"}
                alt={recipe.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 176px"
                priority
                unoptimized={/upload\.wikimedia\.org/.test(recipe.image || "")}
              />
            </div>
            <div className="flex-1 min-w-0">
              {/* Title left, Share pinned to the top-right corner */}
              <div className="flex items-start justify-between gap-3">
                <h1 className="recipe-title break-words">{recipe.name}</h1>
                <RecipeActions name={recipe.name} className="shrink-0" />
              </div>
              <ReadMore
                text={recipe.intro || recipe.description}
                lines={3}
                expandLabel="See full recipe"
                collapseLabel="Hide recipe"
                className="recipe-body mt-2"
              />
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <TimingChip prepTime={recipe.prepTime} cookTime={recipe.cookTime} total={formatMinutes(totalMin)} />
                <ServingsChip servings={recipe.servings} multiplier={multiplier} onChange={setMultiplier} />
                <Chip><GaugeIcon /> {difficulty}</Chip>
                <Chip><UtensilsIcon /> {categoryLabel}</Chip>
              </div>
            </div>
          </header>

          {/* Sticky in-page jump nav */}
          <JumpNav hasTips={hasTips} hasFaq={hasFaq} hasProducts={products.length > 0} />

        {/* ── All sections on one page ── */}
        <section className="space-y-7 md:space-y-10">
          {/* Ingredients */}
          <div id="ingredients" className="scroll-mt-24">
            <h2 className="recipe-heading">Ingredients</h2>
            <IngredientList
              ingredients={recipe.ingredients}
              products={products}
              selection={selection}
              onSelect={handleSelect}
              multiplier={multiplier}
            />
          </div>

          {/* Instructions */}
          <div id="instructions" className="scroll-mt-24">
            <h2 className="recipe-heading">How to Make {recipe.name}</h2>
            <ol className="space-y-4">
              {(showAllSteps ? recipe.steps : recipe.steps.slice(0, COLLAPSED_STEPS)).map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-anv-green text-white font-bold text-sm flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="recipe-body pt-1">
                    {renderStep(step, recipe.anveshanProducts)}
                  </p>
                </li>
              ))}
            </ol>
            {recipe.steps.length > COLLAPSED_STEPS && (
              <button
                type="button"
                onClick={() => setShowAllSteps((v) => !v)}
                aria-expanded={showAllSteps}
                className="mt-3 inline-block rounded-sm text-[13.5px] font-medium text-anv-green no-underline hover:underline focus-visible:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-anv-green/30"
              >
                {showAllSteps ? "Show fewer steps" : `See all ${recipe.steps.length} steps`}
              </button>
            )}
          </div>

          {/* Tips */}
          {hasTips && (
            <div id="tips" className="scroll-mt-24">
              <h2 className="recipe-heading">Tips for the Best {recipe.name}</h2>
              <ul className="space-y-3">
                {(showAllTips ? recipe.tips! : recipe.tips!.slice(0, COLLAPSED_TIPS)).map((tip, i) => (
                  <li key={i} className="recipe-body flex gap-3">
                    <span className="text-anv-green font-bold">✓</span>
                    <span>{highlightProductMentions(tip, recipe.anveshanProducts)}</span>
                  </li>
                ))}
              </ul>
              {recipe.tips!.length > COLLAPSED_TIPS && (
                <button
                  type="button"
                  onClick={() => setShowAllTips((v) => !v)}
                  aria-expanded={showAllTips}
                  className="mt-3 inline-block rounded-sm text-[13.5px] font-medium text-anv-green no-underline hover:underline focus-visible:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-anv-green/30"
                >
                  {showAllTips ? "Show less" : `Load more (${recipe.tips!.length - COLLAPSED_TIPS})`}
                </button>
              )}
            </div>
          )}

          {/* FAQ — same accordion format as the product FAQs */}
          {hasFaq && (
            <div id="faq" className="scroll-mt-24">
              <h2 className="recipe-heading">Frequently Asked Questions</h2>
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
          <aside id="products" className="scroll-mt-24 lg:sticky lg:top-6 space-y-4">
            <div className="bg-white rounded-2xl border border-anv-cream-dark shadow-sm overflow-hidden">
              <div className="bg-anv-green text-white px-5 py-4">
                <h3 className="font-bold text-base">Shop the Anveshan products</h3>
                <p className="text-xs text-white/70 mt-0.5">
                  The healthy swaps in this recipe — pure, traceable, farmer-direct.
                </p>
              </div>

              <div className="p-4 space-y-3">
                {products.map((p) => {
                  // Ghee & atta can switch size from here. Resolve the current
                  // handle from the selected variant, then offer its sizes.
                  const isGhee = !!p.variants?.length;
                  const isAtta = ATTA_PRODUCT_IDS.includes(p.id);
                  const currentVariantId =
                    selection[p.id]?.variantId ??
                    (p.variants ? p.variants[0].shopifyVariantId : p.shopifyVariantId);
                  const handle = VARIANT_TO_HANDLE[currentVariantId];
                  const sizes = handle ? PRODUCT_SIZES[handle] ?? [] : [];
                  const canChooseSize = (isGhee || isAtta) && sizes.length > 0;
                  const currentSize = sizes.find((s) => s.variantId === currentVariantId);
                  const open = openProduct === p.id;

                  const rowInner = (
                    <>
                      <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-anv-cream/40">
                        {imageFor(p) ? (
                          <Image src={imageFor(p)!} alt={p.name} fill className="object-cover" sizes="64px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-anv-green font-bold">
                            {p.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 leading-tight">{nameFor(p)}</p>
                        {canChooseSize ? (
                          <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-anv-green">
                            {currentSize?.label ?? "Choose size"}
                            <svg
                              viewBox="0 0 24 24"
                              className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </p>
                        ) : (
                          <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{p.whyAnveshan}</p>
                        )}
                      </div>
                      <span className="font-bold text-anv-green text-sm shrink-0">₹{priceFor(p)}</span>
                    </>
                  );

                  return (
                    <div key={p.id} className="relative">
                      {canChooseSize ? (
                        <button
                          type="button"
                          onClick={() => setOpenProduct((cur) => (cur === p.id ? null : p.id))}
                          aria-expanded={open}
                          aria-label={`Change size for ${nameFor(p)}`}
                          className="flex w-full items-center gap-3 rounded-xl border border-gray-100 p-2.5 text-left transition-colors hover:border-anv-green/40"
                        >
                          {rowInner}
                        </button>
                      ) : (
                        <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-2.5">
                          {rowInner}
                        </div>
                      )}

                      {canChooseSize && open && (
                        <ProductInfoCard
                          name={nameFor(p)}
                          image={imageFor(p)}
                          about={p.whyAnveshan}
                          pdpUrl={handle ? pdpUrl(handle) : pdpUrlForProduct(p.id)}
                          sizes={sizes}
                          selectedVariantId={currentVariantId}
                          onSelectSize={(s) => handleSelect(p.id, s.variantId, s.price, imageFor(p), nameFor(p))}
                          onClose={() => setOpenProduct(null)}
                        />
                      )}
                    </div>
                  );
                })}

                <div className="flex items-center justify-between px-1 pt-1">
                  <span className="text-sm text-gray-500">
                    {products.length} {products.length === 1 ? "product" : "products"}
                  </span>
                  <span className="text-sm font-bold text-gray-900">Total ₹{total}</span>
                </div>

                <AddToCartButton lines={cartLines} />

                <p className="text-center text-xs text-gray-400">
                  Secure checkout on anveshan.farm — you&apos;ll be redirected after adding.
                </p>
              </div>

              {/* Trust signals — compact strip under the products */}
              <div className="border-t border-gray-100 px-4 py-3 grid grid-cols-2 gap-x-3 gap-y-2">
                {TRUST.map((t) => (
                  <div key={t.label} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="text-anv-green shrink-0">{t.icon}</span>
                    {t.label}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Footer: real Shelf Life / Benefits / FAQs for the recipe's primary Anveshan product */}
      {primaryPdp && (
        <ProductInfoTabs productName={primaryPdp.name} pdp={primaryPdp.pdp} />
      )}

      <RelatedRecipes recipes={related} products={relatedProducts} />

      <StickyCartBar products={products} lines={cartLines} total={total} recipeName={recipe.name} />
    </div>
  );
}

// Sticky in-page jump nav — a segmented pill box (styled like the Ghee/Atta
// selectors: active pill is theme-green, the rest light). Smooth-scrolls to each
// section and the active pill follows the scroll position. "Products" jumps to
// the Anveshan products cart (which stacks at the bottom on mobile).
function JumpNav({
  hasTips,
  hasFaq,
  hasProducts,
}: {
  hasTips: boolean;
  hasFaq: boolean;
  hasProducts: boolean;
}) {
  const links = [
    { id: "ingredients", label: "Ingredients" },
    { id: "instructions", label: "Method" },
    ...(hasTips ? [{ id: "tips", label: "Tips" }] : []),
    ...(hasFaq ? [{ id: "faq", label: "FAQ" }] : []),
    ...(hasProducts ? [{ id: "products", label: "Products" }] : []),
  ];

  const [active, setActive] = useState(links[0]?.id);
  const linkKey = links.map((l) => l.id).join(",");

  // Scroll-spy: highlight the section currently crossing a band near the top.
  useEffect(() => {
    const els = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkKey]);

  function jump(id: string) {
    setActive(id); // instant feedback; scroll-spy keeps it in sync afterwards
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav className="no-print sticky top-14 z-20 -mx-4 mb-6 md:mb-8 px-4 py-2 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <HScrollDots
        className="flex w-max max-w-full gap-1 overflow-x-auto rounded-full border border-anv-green/20 bg-white p-1 no-scrollbar"
        activeIndex={Math.max(0, links.findIndex((l) => l.id === active))}
      >
        {links.map((l) => {
          const isActive = active === l.id;
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => jump(l.id)}
              aria-current={isActive ? "true" : undefined}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                isActive ? "bg-anv-green text-white" : "text-anv-green hover:bg-anv-green/10"
              }`}
            >
              {l.label}
            </button>
          );
        })}
      </HScrollDots>
    </nav>
  );
}

// Servings chip with a floating 1x/2x/3x scaler (mirrors the TimingChip popover).
// The number reflects the scaled servings and shows the active multiplier badge.
function ServingsChip({
  servings,
  multiplier,
  onChange,
}: {
  servings: number | string;
  multiplier: number;
  onChange: (m: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const hovering = useRef(false);

  const base = typeof servings === "number" ? servings : parseInt(String(servings).match(/\d+/)?.[0] ?? "", 10);
  const scaled = Number.isFinite(base) ? base * multiplier : null;
  const label = scaled !== null ? `${scaled} Servings` : `${servings} Servings`;

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
        aria-expanded={open}
        aria-label="Adjust servings"
        className="inline-flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 rounded-full px-3 py-1 hover:bg-gray-200 transition-colors cursor-pointer"
      >
        <UsersIcon /> {label}
        {multiplier !== 1 && (
          <span className="ml-0.5 rounded-full bg-anv-green px-1.5 py-px text-[10px] font-bold leading-none text-white">
            {multiplier}x
          </span>
        )}
      </button>
      <div
        className={`absolute top-full left-0 mt-2 z-30 w-56 bg-white rounded-xl shadow-lg border border-gray-200 p-3.5 space-y-3 transition-all duration-150 ${
          open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1"
        }`}
      >
        <p className="text-xs font-semibold text-anv-green">Scale recipe</p>
        <div className="inline-flex w-full overflow-hidden rounded-full border border-anv-green/30">
          {[1, 2, 3].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onChange(m)}
              aria-pressed={multiplier === m}
              className={`flex-1 px-3 py-2 text-sm font-semibold transition-colors ${
                multiplier === m ? "bg-anv-green text-white" : "bg-white text-anv-green hover:bg-anv-green/10"
              }`}
            >
              {m}x
            </button>
          ))}
        </div>
        {scaled !== null && (
          <p className="text-xs text-gray-500">
            Ingredient amounts scaled for{" "}
            <span className="font-semibold text-gray-700">{scaled} servings</span>.
          </p>
        )}
      </div>
    </span>
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
