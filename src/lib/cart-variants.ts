// Resolve a variant's sibling sizes so any cart line can offer an in-cart size
// switcher. Shared by every "add to cart" path (recipe cards, detail page,
// sticky bar) so the size selector shows consistently in the cart drawer.

import { PRODUCT_SIZES, ProductSize } from "@/data/product-variants";
import { ATTA_VARIETY, PRODUCT_HANDLES } from "@/lib/product-highlight";
import type { CartLineVariant } from "@/types";

// variantId -> product handle (covers size variants + each atta variety default).
const VARIANT_TO_HANDLE: Record<string, string> = {};
for (const [handle, sizes] of Object.entries(PRODUCT_SIZES)) {
  for (const s of sizes) VARIANT_TO_HANDLE[s.variantId] = handle;
}
for (const v of Object.values(ATTA_VARIETY)) VARIANT_TO_HANDLE[v.variantId] = v.handle;

// Resolve a product's size list. Prefer the handle implied by the exact variant
// id; if that id isn't a known size (e.g. a Firestore default that isn't in the
// size table), fall back to the product's own handle so EVERY product with
// multiple sizes still offers a switcher — not just ghee & atta.
export function sizesForVariant(variantId: string, productId?: string): ProductSize[] {
  let handle = VARIANT_TO_HANDLE[variantId];
  if (!handle && productId) handle = PRODUCT_HANDLES[productId];
  return handle ? PRODUCT_SIZES[handle] ?? [] : [];
}

// Variant metadata for a cart line: the current size label + all sizes (only
// when there's more than one, so single-size products don't show a selector).
export function variantMetaFor(
  variantId: string,
  productId?: string
): {
  variantLabel?: string;
  variants?: CartLineVariant[];
} {
  const sizes = sizesForVariant(variantId, productId);
  const current = sizes.find((s) => s.variantId === variantId);
  return {
    // Fall back to the first size's label when the current id isn't a listed size.
    variantLabel: current?.label ?? sizes[0]?.label,
    variants: sizes.length > 1 ? sizes : undefined,
  };
}
