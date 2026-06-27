import { NextResponse } from "next/server";

/**
 * GET /embed
 * Returns a JavaScript snippet that Shopify Liquid pastes in via:
 *   <div id="anveshan-recipes-root"></div>
 *   <script src="https://your-app.vercel.app/embed" defer></script>
 *
 * The script injects an <iframe> pointing to /recipes so the full
 * Next.js app runs inside the Shopify page without theme conflicts.
 */
export async function GET(request: Request) {
  const host = request.headers.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const appUrl = `${protocol}://${host}`;

  const js = `
(function () {
  var root = document.getElementById("anveshan-recipes-root");
  if (!root) return;

  var iframe = document.createElement("iframe");
  iframe.src = "${appUrl}/recipes";
  iframe.style.cssText = "width:100%;border:none;min-height:800px;";
  iframe.allow = "same-origin";
  iframe.title = "Anveshan Recipes";

  function refreshCart() {
    // Best-effort: refresh the theme's floating cart / drawer + count bubble.
    fetch("/cart.js")
      .then(function (r) { return r.json(); })
      .then(function (cart) {
        document
          .querySelectorAll(".cart-count-bubble, [data-cart-count], .cart-count, #CartCount")
          .forEach(function (el) { el.textContent = cart.item_count; });
        document.documentElement.dispatchEvent(new CustomEvent("cart:refresh", { bubbles: true }));
        document.dispatchEvent(new CustomEvent("cart:updated", { detail: { cart: cart } }));
        document.dispatchEvent(new CustomEvent("cart:build"));
      })
      .catch(function () {});
  }

  window.addEventListener("message", function (e) {
    if (!e.data) return;
    // Auto-resize iframe to match content height
    if (e.data.type === "anveshan-resize") {
      iframe.style.height = e.data.height + "px";
    }
    // Add-to-cart: add silently via the Shopify AJAX Cart API (this page is
    // same-origin with the cart), then refresh the floating cart — no redirect.
    if (e.data.type === "anveshan-add-to-cart") {
      if (e.data.items && e.data.items.length) {
        fetch("/cart/add.js", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: e.data.items }),
        })
          .then(function (r) { if (!r.ok) throw new Error("add failed"); return r.json(); })
          .then(function () { refreshCart(); })
          .catch(function () { if (e.data.url) window.location.href = e.data.url; });
      } else if (e.data.url) {
        window.location.href = e.data.url; // legacy fallback
      }
    }
  });

  root.appendChild(iframe);
})();
`.trim();

  return new NextResponse(js, {
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
