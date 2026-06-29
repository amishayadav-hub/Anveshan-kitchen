"use client";

import { useMemo, useState } from "react";
import { GeneratedRecipe } from "@/lib/ai-providers";
import { CartLine, GheeVariant, GheeVariantOption } from "@/types";
import AddToCartButton from "@/components/ui/AddToCartButton";
import GheeSelector from "@/components/ui/GheeSelector";
import AttaSelector from "@/components/ui/AttaSelector";
import {
  highlightProductMentions,
  GHEE_VARIETY,
  ATTA_VARIETY,
  ATTA_PRODUCT_IDS,
  attaDefaultVariety,
  pdpUrl,
  pdpUrlForProduct,
  type AttaVariety,
} from "@/lib/product-highlight";
import { PRODUCT_CATALOG, GHEE_VARIANT_INFO } from "@/data/product-catalog";
import { ClockIcon, FlameIcon, UsersIcon, UtensilsIcon, LeafIcon, SparklesIcon, ExternalLinkIcon } from "@/components/ui/icons";

const ATTA_VARIETIES: AttaVariety[] = ["khapli", "multigrain"];

const GHEE_OPTIONS: GheeVariantOption[] = (Object.keys(GHEE_VARIANT_INFO) as GheeVariant[]).map((t) => ({
  type: t,
  label: GHEE_VARIANT_INFO[t].label,
  shopifyVariantId: GHEE_VARIANT_INFO[t].variantId,
  price: GHEE_VARIANT_INFO[t].price,
}));

type ShopItem = { id: string; kind: "ghee" | "atta" | "plain"; name: string; price: number; image?: string; variantId: string; pdp: string | null };

function brandName(name: string): string {
  const t = name.trim();
  return /^anveshan\b/i.test(t) ? t : `Anveshan ${t}`;
}

function prettify(id: string): string {
  return id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function GeneratedRecipeCard({ recipe, index, total }: { recipe: GeneratedRecipe; index?: number; total?: number }) {
  const [gheeVariant, setGheeVariant] = useState<GheeVariant>("gir-cow");
  const [attaVariety, setAttaVariety] = useState<Record<string, AttaVariety>>({});

  const attaFor = (id: string) => attaVariety[id] ?? attaDefaultVariety(id);

  const shopItems: ShopItem[] = useMemo(() => {
    const ids = [...new Set(recipe.anveshanProducts)];
    return ids
      .map((id): ShopItem => {
        if (id === "ghee") {
          const g = GHEE_VARIANT_INFO[gheeVariant];
          return { id, kind: "ghee", name: brandName(`${g.label} Ghee`), price: g.price, image: GHEE_VARIETY[gheeVariant]?.image, variantId: g.variantId, pdp: pdpUrl(GHEE_VARIETY[gheeVariant].handle) };
        }
        if (ATTA_PRODUCT_IDS.includes(id)) {
          const variety = attaFor(id);
          const v = ATTA_VARIETY[variety];
          return { id, kind: "atta", name: brandName(`${v.label} Atta`), price: v.price, image: v.image, variantId: v.variantId, pdp: pdpUrl(v.handle) };
        }
        const info = PRODUCT_CATALOG[id];
        return { id, kind: "plain", name: brandName(prettify(id)), price: info?.price ?? 0, image: info?.image, variantId: info?.variantId ?? "", pdp: pdpUrlForProduct(id) };
      })
      .filter((s) => s.variantId);
  }, [recipe.anveshanProducts, gheeVariant, attaVariety]);

  const cartLines: CartLine[] = useMemo(
    () => shopItems.map((s) => ({ variantId: s.variantId, name: s.name, image: s.image, price: s.price, quantity: 1 })),
    [shopItems]
  );
  const subtotal = cartLines.reduce((sum, l) => sum + l.price, 0);
  const providerLabel = /anveshan/i.test(recipe.provider) ? "Anveshan Collection" : "AI-crafted";

  return (
    <div className="bg-white rounded-2xl border-2 sm:border border-gray-200 sm:border-gray-100 shadow-md sm:shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-anv-green/[0.07] via-white to-anv-gold/[0.06] border-b border-gray-100 p-6 sm:p-7">
        {typeof index === "number" && typeof total === "number" && (
          <p className="text-xs font-bold uppercase tracking-wider text-anv-green/70 mb-2">
            Recipe {index + 1} of {total}
          </p>
        )}
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <h2 className="text-2xl font-bold text-gray-900 leading-tight break-words min-w-0">{recipe.name}</h2>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full border bg-anv-green/[0.07] text-anv-green border-anv-green/20 shrink-0 inline-flex items-center gap-1">
            <SparklesIcon className="w-3 h-3" /> {providerLabel}
          </span>
        </div>
        {recipe.description && <p className="text-gray-500 mt-2 text-sm leading-relaxed max-w-2xl">{recipe.description}</p>}

        <div className="flex flex-wrap gap-2 mt-4 text-sm text-gray-600">
          <span className="inline-flex items-center gap-1.5 bg-white border border-gray-100 rounded-full px-3 py-1"><ClockIcon /> Prep {recipe.prepTime}</span>
          <span className="inline-flex items-center gap-1.5 bg-white border border-gray-100 rounded-full px-3 py-1"><FlameIcon /> Cook {recipe.cookTime}</span>
          <span className="inline-flex items-center gap-1.5 bg-white border border-gray-100 rounded-full px-3 py-1"><UsersIcon /> {recipe.servings} servings</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-8 p-6 sm:p-7 items-start">
        {/* Content: ingredients + method */}
        <div className="min-w-0 space-y-7">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Ingredients</h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <span className={`mt-[7px] w-1.5 h-1.5 rounded-full shrink-0 ${ing.anveshan ? "bg-anv-green" : "bg-gray-300"}`} />
                  <span className={ing.anveshan ? "font-semibold text-anv-green" : "text-gray-700"}>
                    {(ing.quantity || ing.unit) && (
                      <span className="text-gray-400 font-normal">{ing.quantity} {ing.unit} </span>
                    )}
                    {ing.anveshan ? brandName(ing.name) : ing.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {recipe.steps.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Method</h3>
            <ol className="space-y-3">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-anv-green text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed pt-1">{highlightProductMentions(step, recipe.anveshanProducts)}</p>
                </li>
              ))}
            </ol>

            {recipe.servingSuggestion && (
              <p className="mt-5 text-sm text-anv-green bg-anv-green/[0.06] border border-anv-green/15 rounded-lg p-3 flex items-start gap-2">
                <UtensilsIcon className="w-4 h-4 mt-0.5 shrink-0" />
                <span><span className="font-semibold">Serve:</span> {recipe.servingSuggestion}</span>
              </p>
            )}
          </div>
          )}
        </div>

        {/* Commerce sidebar */}
        {shopItems.length > 0 && (
          <aside className="lg:sticky lg:top-20">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-anv-green text-white px-5 py-4">
                <p className="font-bold text-base flex items-center gap-1.5"><LeafIcon className="w-4 h-4" /> Shop the Anveshan products</p>
                <p className="text-xs text-white/70 mt-0.5">Cook it the pure, farm-direct way</p>
              </div>

              <div className="p-4 space-y-3">
                {shopItems.map((s) => (
                  <div key={s.id} className="rounded-xl border border-gray-100 p-3 hover:border-anv-green/30 transition-colors">
                    <a
                      href={s.pdp ?? undefined}
                      target={s.pdp ? "_blank" : undefined}
                      rel={s.pdp ? "noopener noreferrer" : undefined}
                      className="flex gap-3 items-center group/prod"
                    >
                      <div className="w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {s.image ? (
                          <img src={s.image} alt="" width={56} height={56} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-anv-green font-bold text-lg">{s.name.replace(/^Anveshan\s+/i, "").charAt(0)}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 leading-tight break-words group-hover/prod:text-anv-green transition-colors">{s.name}</p>
                        <p className="text-anv-green font-bold text-sm mt-0.5">₹{s.price}</p>
                      </div>
                    </a>
                    {s.kind === "ghee" && (
                      <div className="mt-2.5">
                        <GheeSelector variants={GHEE_OPTIONS} selected={gheeVariant} onChange={setGheeVariant} showInfo={false} />
                        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 rounded-lg bg-anv-green/[0.05] border border-anv-green/15 p-2.5">
                          <Attr label="Flavour" value={GHEE_VARIETY[gheeVariant].flavour} />
                          <Attr label="Texture" value={GHEE_VARIETY[gheeVariant].texture} />
                          <Attr label="Best for" value={GHEE_VARIETY[gheeVariant].bestFor} />
                          <Attr label="Ayurvedic" value={GHEE_VARIETY[gheeVariant].ayurvedic} />
                        </dl>
                      </div>
                    )}
                    {s.kind === "atta" && (
                      <div className="mt-2.5">
                        <AttaSelector
                          varieties={ATTA_VARIETIES}
                          selected={attaFor(s.id)}
                          onChange={(v) => setAttaVariety((prev) => ({ ...prev, [s.id]: v }))}
                        />
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold text-gray-900">₹{subtotal}</span>
                </div>

                <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-gray-500">
                  <span className="inline-flex items-center gap-1.5"><LeafIcon className="w-3.5 h-3.5 text-anv-green" /> Farm-direct</span>
                  <span className="inline-flex items-center gap-1.5"><LeafIcon className="w-3.5 h-3.5 text-anv-green" /> Chemical-free</span>
                  <span className="inline-flex items-center gap-1.5"><LeafIcon className="w-3.5 h-3.5 text-anv-green" /> Wood-pressed &amp; bilona</span>
                </div>

                <AddToCartButton lines={cartLines} label={`Add to Cart · ₹${subtotal}`} />

                <a
                  href="https://www.anveshan.farm/collections/all-products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 text-xs font-medium text-anv-green hover:underline"
                >
                  Shop all Anveshan products <ExternalLinkIcon className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

function Attr({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-gray-400">{label}</dt>
      <dd className="font-semibold text-anv-green">{value}</dd>
    </div>
  );
}
