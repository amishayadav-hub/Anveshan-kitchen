// Append campaign UTM params to anveshan.farm links so the STORE's analytics
// (GA4 / Shopify) attributes recipe-site traffic and sales back to this app.
//
// Works on both server and client (uses the URL API). Only tags anveshan.farm
// URLs — any other link is returned unchanged. `content` (utm_content) marks the
// surface the click came from (e.g. "cart", "pdp", "menu").

const UTM: Record<string, string> = {
  utm_source: "anveshan_kitchen", // the recipe app
  utm_medium: "recipe_app",
  utm_campaign: "recipe_to_store",
};

export function withUtm(url: string, content?: string): string {
  try {
    const u = new URL(url);
    // Only tag the Anveshan store (anveshan.farm / www.anveshan.farm).
    if (!/(^|\.)anveshan\.farm$/i.test(u.hostname)) return url;
    for (const [k, v] of Object.entries(UTM)) u.searchParams.set(k, v);
    if (content) u.searchParams.set("utm_content", content);
    return u.toString();
  } catch {
    return url; // malformed URL → leave it alone
  }
}

// UTM for links the user SHARES (recipe page / community post). Tags the shared
// URL — which points back at THIS site — so GA4 attributes the visits that come
// in from those shares (source=share, medium=social). Applies to any URL.
// `content` marks what was shared (e.g. "recipe", "real_peeps").
export function withShareUtm(url: string, content?: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", "share");
    u.searchParams.set("utm_medium", "social");
    u.searchParams.set("utm_campaign", "recipe_share");
    if (content) u.searchParams.set("utm_content", content);
    return u.toString();
  } catch {
    return url;
  }
}
