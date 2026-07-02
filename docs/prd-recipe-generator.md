# PRD — AI Recipe Generator

**Surface:** `/recipes/generate`
**Status:** Live
**Last updated:** 2026-07

---

## 1. What it is

A visitor types a dish they want to cook (or just the ingredients sitting in their
kitchen) and gets 4–5 complete, cookable recipe variations back in a few seconds.
Every variation swaps in Anveshan products (ghee, oils, attas, jaggery, etc.) where
they naturally fit, and each one can be added to the cart in a click.

## 2. Why it exists

The recipes on this site are a way to sell Anveshan products, not an end in
themselves. A fixed recipe library only covers the dishes we've written up. The
generator removes that ceiling: whatever a visitor wants to cook, we can show them
how to cook it *with Anveshan products*, and give them a direct path to buy those
products. It turns "I don't have a recipe for that" into a sale.

## 3. Goals

- Turn any dish name or ingredient list into recipes that are actually correct and
  cookable (right ingredients, real measurements, sensible steps).
- Make Anveshan products the natural hero of every recipe — used in the ingredients
  and the method, with a working add-to-cart.
- Feel instant and reliable, in both English and Hinglish.
- Cost effectively nothing to run.

## 4. Non-goals

- Not a nutrition calculator or macro tracker.
- Not a saved/editable personal cookbook (no accounts, no saving generated recipes).
- Not a general chatbot — it only generates recipes; it ignores any other instruction
  typed into the dish/ingredient boxes.
- Does not handle checkout itself — "Add to Cart" fills the cart; payment happens on
  anveshan.farm.

## 5. Who uses it

- **Home cook with a dish in mind** ("Aloo Paratha") who wants a good version and is
  open to healthier ingredients.
- **"What can I make with this?" cook** who lists what they have (paneer, tomato,
  ghee) and wants ideas.
- **Hinglish-first user** who reads recipes more comfortably in Roman-script Hindi.

## 6. How it works (user flow)

1. User lands on the generator. They can type a dish name, and/or add ingredients as
   tags, and pick a language (English / Hinglish).
2. They press Generate.
3. Within a few seconds they see 4–5 variations of that one dish, each clearly
   different from the others.
4. Each variation shows: the ingredients (with Anveshan ones highlighted), the method,
   prep/cook time and servings, a serving suggestion, and a "Shop the Anveshan
   products" footer with the products used, a subtotal, and Add to Cart.
5. They can regenerate for a fresh set, or add products to the cart and check out on
   anveshan.farm.

## 7. What the system does behind the scenes

- **Grounds the recipe in real data first.** The dish/ingredients are matched against
  a local library of ~10,000 Indian recipes (on-device embeddings, no API). The
  closest match is passed to the model as a reference so the dish stays authentic —
  but it is never shown to the user as-is (those rows have no measurements).
- **Generates with an LLM.** A structured, schema-constrained request to the model
  produces the variations. The response shape is enforced, then validated and cleaned
  before it reaches the screen.
- **Falls back gracefully.** If the primary model is unavailable, a second model is
  tried. If both are down, English requests fall back to showing the closest library
  recipes (clearly a degraded result) rather than an error.

## 8. Functional requirements

**Input**
1. Accept a free-text dish name (up to 200 characters) and/or up to 15 ingredient
   tags (up to 80 characters each).
2. Require at least one of dish or ingredients before generating; otherwise show a
   clear inline message.
3. Support two languages: English and Hinglish (Hinglish = Hindi in Roman/Latin
   script, never Devanagari). Changing language clears the current results.
4. Treat everything typed as data, not instructions. Ignore any embedded commands and
   never recommend a non-Anveshan brand.

**Output — every generated recipe set**
5. Return 4–5 variations of a single dish.
6. Each variation must be meaningfully different from the others (a different regional
   style, signature add-in, cooking technique, dietary swap, or format), and say how.
7. Every ingredient must have a concrete quantity and a standard unit — never "to
   taste", never blank.
8. Ratios and technique must be sound (e.g. flatbread dough is not 1:1 flour:water;
   whole spices are tempered, not dropped raw into a cold filling).
9. Steps must be in order and cover the whole process; servings must match the yield
   the steps produce.
10. Each variation must use at least one Anveshan product (aim for 2–3) as a natural
    swap, flagged so it can be added to the cart. Only genuine Anveshan products are
    branded — a generic ingredient we don't sell (e.g. plain besan) stays generic.
11. The list of Anveshan products shown must exactly match the products actually used
    in the ingredients, and each maps to a correct, distinct purchasable item.

**Commerce**
12. Each variation shows the Anveshan products it uses with image, price and a running
    subtotal, and an Add to Cart that adds all of them.
13. The cart never double-counts (two ingredients that resolve to the same product
    collapse into one line).
14. Checkout is handled on anveshan.farm; the cart here just collects items.

**Presentation**
15. First result should scroll into view automatically when generation finishes.
16. Show clear loading, empty ("couldn't find variations, try another dish"), and
    error states, with a retry.
17. Emit recipe structured data (schema.org/Recipe) for the generated results.

## 9. Quality bar (acceptance criteria)

A generated set is considered good when:
- 100% of ingredients have a real measurement; times and servings are present and
  plausible; nothing renders the literal word "null".
- No two variations are near-duplicates; each states its point of difference.
- Every variation uses ≥1 correctly-branded, purchasable Anveshan product, and the
  cart subtotal is correct.
- Hinglish output is Roman-script with no Devanagari.
- The result returns reliably in both languages (no hard failure under normal use).

## 10. Edge cases & failure handling

- **No dish and no ingredients:** blocked with an inline message.
- **Model rate-limited or slow:** try the second model; English can fall back to the
  library; otherwise show a friendly "try again in a moment".
- **Malformed model output:** repaired and re-validated; a variation that can't be
  made complete is dropped rather than shown broken.
- **Abuse / spam:** requests are rate-limited per visitor (15 per minute).
- **A product we don't actually sell:** never invented or mis-linked; left as a plain
  ingredient.

## 11. Success metrics

- Generation success rate (a usable set returned) — target near 100% under normal load.
- Add-to-Cart rate from a generated recipe (the number that matters — this is a
  sales tool).
- Median time to first result.
- Regenerate rate (a proxy for "the first set wasn't good enough").

## 12. Dependencies & constraints

- Runs on free API tiers (primary + fallback model) plus a local, on-device embedding
  model for retrieval — so ongoing cost is effectively zero at current volume.
- Free tiers are rate-limited; sustained high traffic would need paid keys.
- Deployed on Vercel (serverless) — a self-hosted local model is not an option there.
- Product prices/links mirror the Anveshan store and must be kept in sync.

## 13. Open questions / future

- Should generated recipes be saveable or shareable by link?
- Add real product SKUs for hero ingredients we don't yet sell (e.g. besan), so
  product-heavy dishes can brand their star ingredient.
- Optional "regenerate just this one variation" instead of the whole set.
- Widen the grounding library and log misses to grow coverage over time.
