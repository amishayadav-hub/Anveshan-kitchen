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

  window.addEventListener("message", function (e) {
    if (!e.data) return;
    // Auto-resize iframe to match content height
    if (e.data.type === "anveshan-resize") {
      iframe.style.height = e.data.height + "px";
    }
    // Add-to-cart: navigate the Shopify page (same origin as the cart) to the
    // cart permalink so items land in the shopper's real cart.
    if (e.data.type === "anveshan-add-to-cart" && e.data.url) {
      window.location.href = e.data.url;
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
