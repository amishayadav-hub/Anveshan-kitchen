import { CartItem } from "@/types";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "anveshan.farm";

/**
 * Builds a Shopify cart permalink that adds the given variants to the cart
 * and lands the shopper on the cart page, e.g.
 *   https://anveshan.farm/cart/44352:1,44871:2
 * Permalinks work cross-origin (unlike /cart/add.js), so they reliably add to
 * the shopper's real anveshan.farm cart from our embedded app.
 */
export function buildCartPermalink(items: CartItem[]): string {
  const parts = items
    .filter((i) => i.shopifyVariantId)
    .map((i) => `${i.shopifyVariantId}:${i.quantity || 1}`)
    .join(",");
  return `https://${SHOPIFY_DOMAIN}/cart/${parts}`;
}

/**
 * Adds items to the real anveshan.farm cart.
 * - Embedded in an iframe on anveshan.farm → ask the parent page (same origin
 *   as the cart) to navigate to the permalink, so the cart session is shared.
 * - Running standalone → navigate this window directly.
 */
export function addToCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  const url = buildCartPermalink(items);
  const inIframe = window.parent && window.parent !== window;
  if (inIframe) {
    window.parent.postMessage({ type: "anveshan-add-to-cart", url }, "*");
  } else {
    window.location.href = url;
  }
}
