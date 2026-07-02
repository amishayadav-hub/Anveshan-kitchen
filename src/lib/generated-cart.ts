import { CartLine, GheeVariant } from "@/types";
import {
  GHEE_VARIETY,
  ATTA_VARIETY,
  ATTA_PRODUCT_IDS,
  attaDefaultVariety,
} from "@/lib/product-highlight";
import { PRODUCT_CATALOG, GHEE_VARIANT_INFO } from "@/data/product-catalog";

function brandName(name: string): string {
  const t = name.trim();
  return /^anveshan\b/i.test(t) ? t : `Anveshan ${t}`;
}

function prettify(id: string): string {
  return id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// Resolve a generated recipe's Anveshan product ids to cart lines using the
// default variant for each (Gir Cow ghee, default atta). Used by the quick-add
// sticky bar; the in-card panel still lets users switch variants.
export function generatedShopLines(anveshanProducts: string[]): { lines: CartLine[]; total: number } {
  const ids = [...new Set(anveshanProducts ?? [])];
  const resolved: CartLine[] = ids
    .map((id): CartLine => {
      if (id === "ghee") {
        const g = GHEE_VARIANT_INFO["gir-cow" as GheeVariant];
        return { variantId: g.variantId, name: brandName(`${g.label} Ghee`), image: GHEE_VARIETY["gir-cow"].image, price: g.price, quantity: 1 };
      }
      if (ATTA_PRODUCT_IDS.includes(id)) {
        const v = ATTA_VARIETY[attaDefaultVariety(id)];
        return { variantId: v.variantId, name: brandName(`${v.label} Atta`), image: v.image, price: v.price, quantity: 1 };
      }
      const info = PRODUCT_CATALOG[id];
      return { variantId: info?.variantId ?? "", name: brandName(prettify(id)), image: info?.image, price: info?.price ?? 0, quantity: 1 };
    })
    .filter((l) => l.variantId);

  // Dedupe by RESOLVED variantId so two product ids that map to the same SKU
  // never double-count the subtotal.
  const byVariant = new Map<string, CartLine>();
  for (const l of resolved) if (!byVariant.has(l.variantId)) byVariant.set(l.variantId, l);
  const lines = [...byVariant.values()];
  const total = lines.reduce((sum, l) => sum + l.price, 0);
  return { lines, total };
}
