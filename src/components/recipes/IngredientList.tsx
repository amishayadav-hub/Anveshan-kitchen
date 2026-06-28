"use client";

import { useState } from "react";
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
  selection: Record<string, { variantId: string; price: number; image?: string }>;
  onSelect: (productId: string, variantId: string, price: number, image?: string) => void;
}

const TYPE_LABEL: Record<GheeVariant, string> = {
  "gir-cow": "Gir Cow",
  "desi-cow": "Desi Cow",
  "buffalo": "Buffalo",
};

export default function IngredientList({ ingredients, products, selection, onSelect }: Props) {
  const [gheeType, setGheeType] = useState<Record<string, GheeVariant>>({});
  const [attaType, setAttaType] = useState<Record<string, AttaVariety>>({});
  const [openCard, setOpenCard] = useState<number | null>(null);

  const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

  function handleGheeType(productId: string, variant: GheeVariant) {
    const opt = productMap[productId]?.variants?.find((v) => v.type === variant);
    if (!opt) return;
    setGheeType((prev) => ({ ...prev, [productId]: variant }));
    // also switch the image to the chosen variety's product photo
    onSelect(productId, opt.shopifyVariantId, opt.price, GHEE_VARIETY[variant]?.image);
  }

  function handleAttaType(productId: string, variety: AttaVariety) {
    const v = ATTA_VARIETY[variety];
    setAttaType((prev) => ({ ...prev, [productId]: variety }));
    onSelect(productId, v.variantId, v.price, v.image);
  }

  return (
    <ul className="space-y-2.5">
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

        return (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-anv-green shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-gray-700">
                {ing.quantity} {ing.unit}{" "}
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
                          onSelectSize={(s) => pid && onSelect(pid, s.variantId, s.price, cardImage)}
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
  );
}

// "Groundnut Oil" → "Anveshan Groundnut Oil" (don't double an existing prefix)
function brandName(name: string): string {
  const t = name.trim();
  return /^anveshan\b/i.test(t) ? t : `Anveshan ${t}`;
}
