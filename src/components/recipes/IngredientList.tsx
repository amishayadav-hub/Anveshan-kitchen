"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Ingredient, AnveshanProduct, GheeVariant } from "@/types";
import GheeSelector from "@/components/ui/GheeSelector";
import AttaSelector from "@/components/ui/AttaSelector";
import ProductInfoCard from "@/components/recipes/ProductInfoCard";
import {
  pdpUrl,
  pdpUrlForProduct,
  PRODUCT_HANDLES,
  GHEE_VARIETY,
  ATTA_VARIETY,
  ATTA_PRODUCT_IDS,
  attaDefaultVariety,
  type AttaVariety,
} from "@/lib/product-highlight";
import { PRODUCT_SIZES } from "@/data/product-variants";

const ATTA_VARIETIES: AttaVariety[] = ["khapli", "multigrain"];

interface Props {
  ingredients: Ingredient[];
  products: AnveshanProduct[];
  selection: Record<string, { variantId: string; price: number; image?: string; name?: string }>;
  onSelect: (
    productId: string,
    variantId: string,
    price: number,
    image?: string,
    name?: string
  ) => void;
  /** Serving multiplier (1/2/3) — controlled by the Servings chip in the header. */
  multiplier: number;
}

const TYPE_LABEL: Record<GheeVariant, string> = {
  "gir-cow": "Gir Cow",
  "desi-cow": "Desi Cow",
  "buffalo": "Buffalo",
};

export default function IngredientList({ ingredients, products, selection, onSelect, multiplier }: Props) {
  const [gheeType, setGheeType] = useState<Record<string, GheeVariant>>({});
  const [attaType, setAttaType] = useState<Record<string, AttaVariety>>({});
  const [openCard, setOpenCard] = useState<number | null>(null);
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const pathname = usePathname();
  const slug = pathname?.split("/").filter(Boolean).pop() ?? "recipe";
  const storageKey = `anveshan-checked-${slug}`;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setChecked(new Set(JSON.parse(raw) as number[]));
    } catch {}
  }, [storageKey]);

  function persist(next: Set<number>) {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...next]));
    } catch {}
  }

  function toggleCheck(i: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      persist(next);
      return next;
    });
  }

  function clearChecks() {
    setChecked(new Set());
    persist(new Set());
  }

  const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

  function handleGheeType(productId: string, variant: GheeVariant) {
    const opt = productMap[productId]?.variants?.find((v) => v.type === variant);
    if (!opt) return;
    setGheeType((prev) => ({ ...prev, [productId]: variant }));
    // switch image + name to the chosen variety
    onSelect(productId, opt.shopifyVariantId, opt.price, GHEE_VARIETY[variant]?.image, `${TYPE_LABEL[variant]} Ghee`);
  }

  function handleAttaType(productId: string, variety: AttaVariety) {
    const v = ATTA_VARIETY[variety];
    setAttaType((prev) => ({ ...prev, [productId]: variety }));
    onSelect(productId, v.variantId, v.price, v.image, `${v.label} Atta`);
  }

  return (
    <div>
      {checked.size > 0 && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={clearChecks}
            className="text-sm font-medium text-anv-green underline decoration-anv-green/30 underline-offset-2 hover:decoration-anv-green"
          >
            Clear ({checked.size})
          </button>
        </div>
      )}

      <ul className="space-y-1">
      {ingredients.map((ing, i) => {
        const pid = ing.anveshanProductId;
        const product = pid ? productMap[pid] : null;
        const label = ing.anveshan ? brandName(ing.name) : ing.name;

        const isGhee = !!product?.variants;
        const isAtta = !!pid && ATTA_PRODUCT_IDS.includes(pid);
        const type = pid && isGhee ? gheeType[pid] ?? product!.variants![0].type : undefined;
        const attaV = pid && isAtta ? attaType[pid] ?? attaDefaultVariety(pid) : undefined;

        const handle =
          isGhee && type
            ? GHEE_VARIETY[type].handle
            : isAtta && attaV
              ? ATTA_VARIETY[attaV].handle
              : pid
                ? PRODUCT_HANDLES[pid]
                : "";
        const sizes = handle ? PRODUCT_SIZES[handle] ?? [] : [];
        const pdp = handle ? pdpUrl(handle) : pid ? pdpUrlForProduct(pid) : null;
        const hasCard = ing.anveshan && (sizes.length > 0 || !!pdp);
        const cardImage =
          isGhee && type
            ? GHEE_VARIETY[type].image
            : isAtta && attaV
              ? ATTA_VARIETY[attaV].image
              : product?.image;
        const cardName =
          isGhee && type
            ? `${TYPE_LABEL[type]} Ghee`
            : isAtta && attaV
              ? `${ATTA_VARIETY[attaV].label} Atta`
              : product?.name ?? label;

        const isChecked = checked.has(i);
        const qty = scaleQuantity(ing.quantity, multiplier);

        return (
          <li key={i} className="flex items-start gap-2">
            <button
              onClick={() => toggleCheck(i)}
              aria-pressed={isChecked}
              aria-label={`Mark ${ing.name} as done`}
              className="flex h-11 w-9 shrink-0 items-center justify-center"
            >
              <span
                className={`flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border transition-colors ${
                  isChecked ? "border-anv-green bg-anv-green text-white" : "border-anv-green/40 bg-white"
                }`}
              >
                {isChecked && (
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3.5}>
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </button>
            <div className="min-w-0 flex-1 py-2.5">
              <span className={`transition-colors ${isChecked ? "text-gray-400 line-through" : "text-gray-700"}`}>
                <button onClick={() => toggleCheck(i)} className="text-left">
                  {qty} {ing.unit}
                </button>{" "}
                {ing.anveshan ? (
                  hasCard ? (
                    <span className="relative inline-block">
                      <button
                        onClick={() => setOpenCard(openCard === i ? null : i)}
                        className="font-bold text-anv-green underline decoration-anv-green/30 underline-offset-2 hover:decoration-anv-green transition-colors"
                      >
                        {label}
                      </button>
                      {openCard === i && (
                        <ProductInfoCard
                          name={cardName}
                          image={cardImage}
                          about={product?.whyAnveshan}
                          pdpUrl={pdp}
                          sizes={sizes}
                          selectedVariantId={pid ? selection[pid]?.variantId : undefined}
                          onSelectSize={(s) =>
                            pid && onSelect(pid, s.variantId, s.price, cardImage, isGhee || isAtta ? cardName : undefined)
                          }
                          onClose={() => setOpenCard(null)}
                        />
                      )}
                    </span>
                  ) : (
                    <span className="font-bold text-anv-green">{label}</span>
                  )
                ) : (
                  label
                )}
              </span>

              {isGhee && product?.variants && (
                <div className="mt-1.5">
                  <GheeSelector
                    variants={product.variants}
                    selected={type!}
                    onChange={(v) => pid && handleGheeType(pid, v)}
                  />
                </div>
              )}

              {isAtta && attaV && (
                <div className="mt-1.5">
                  <AttaSelector
                    varieties={ATTA_VARIETIES}
                    selected={attaV}
                    onChange={(v) => pid && handleAttaType(pid, v)}
                  />
                </div>
              )}
            </div>
          </li>
        );
      })}
      </ul>
    </div>
  );
}

// "Groundnut Oil" → "Anveshan Groundnut Oil" (don't double an existing prefix)
function brandName(name: string): string {
  const t = name.trim();
  return /^anveshan\b/i.test(t) ? t : `Anveshan ${t}`;
}

const UNICODE_FRAC: Record<string, number> = {
  "½": 0.5, "¼": 0.25, "¾": 0.75, "⅓": 1 / 3, "⅔": 2 / 3, "⅛": 0.125,
};

// Parse one numeric token: "1.5", "1/2", "½", "1½" → number, else null
function parseNum(tok: string): number | null {
  const t = tok.trim();
  if (!t) return null;
  // leading whole number before a unicode fraction e.g. "1½"
  const m = t.match(/^(\d+(?:\.\d+)?)\s*([½¼¾⅓⅔⅛])$/);
  if (m) return parseFloat(m[1]) + UNICODE_FRAC[m[2]];
  if (t in UNICODE_FRAC) return UNICODE_FRAC[t];
  const frac = t.match(/^(\d+)\s*\/\s*(\d+)$/);
  if (frac) return parseFloat(frac[1]) / parseFloat(frac[2]);
  if (/^\d+(?:\.\d+)?$/.test(t)) return parseFloat(t);
  return null;
}

// Format a scaled number cleanly: nice halves where possible, ≤2 decimals, no trailing zeros
function fmtNum(n: number): string {
  const rounded = Math.round(n * 100) / 100;
  const whole = Math.floor(rounded);
  const dec = rounded - whole;
  if (Math.abs(dec - 0.5) < 0.01) return whole === 0 ? "½" : `${whole}½`;
  if (Math.abs(dec - 0.25) < 0.01) return whole === 0 ? "¼" : `${whole}¼`;
  if (Math.abs(dec - 0.75) < 0.01) return whole === 0 ? "¾" : `${whole}¾`;
  return String(rounded);
}

// Scale a quantity string by `mult`. Handles ints, decimals, fractions, unicode
// fractions and ranges ("2-3"). Non-numeric ("a pinch") returned unchanged.
export function scaleQuantity(quantity: string, mult: number): string {
  const q = (quantity ?? "").trim();
  if (!q || mult === 1) return quantity;
  const range = q.match(/^(.+?)\s*[-–]\s*(.+)$/);
  if (range) {
    const a = parseNum(range[1]);
    const b = parseNum(range[2]);
    if (a !== null && b !== null) return `${fmtNum(a * mult)}-${fmtNum(b * mult)}`;
  }
  const single = parseNum(q);
  if (single !== null) return fmtNum(single * mult);
  return quantity;
}
