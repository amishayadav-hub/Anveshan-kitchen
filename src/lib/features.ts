// Feature flags — the single source of truth for freezing/enabling functionality
// without deleting code. Flip a value to turn a feature on/off site-wide.
//
// LATER: an admin panel will read/write these from a Firestore `settings` doc
// instead of the hardcoded values here — no other code needs to change.

export const FEATURES = {
  // When false: all non-veg recipes are hidden everywhere (listing, related,
  // liked, sitemap) and their direct URLs 404, and the Veg/Non-Veg toggle is
  // hidden. Flip to true to bring non-veg recipes + the toggle back.
  nonVegRecipes: false,
};
