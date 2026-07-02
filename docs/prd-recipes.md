# PRD — Recipes (Browse & Recipe Page)

**Surfaces:** `/recipes` (browse) and `/recipes/[slug]` (recipe page)
**Status:** Live
**Last updated:** 2026-07

---

## 1. What it is

The curated recipe catalogue. `/recipes` lets a visitor browse and filter the full
set of recipes; each recipe has its own page with the ingredients, method, tips, FAQ,
and — the point of the whole thing — the Anveshan products the recipe uses, ready to
add to the cart.

## 2. Why it exists

Recipes are the hook; Anveshan products are the sale. A good recipe page earns trust
("this is a real, well-written recipe") and then makes it effortless to buy the exact
ghee, oil, atta or superfood the recipe calls for. Browse exists to get people from
"I want to cook something" to the right recipe page quickly.

## 3. Goals

- Let people find a relevant recipe fast — by dish type, by Anveshan product, by
  veg/non-veg, or by searching a name.
- Make every recipe page genuinely useful to cook from.
- On every recipe page, surface the Anveshan products it uses and make them one tap to
  add to cart.
- Load fast and be fully usable on a phone.

## 4. Non-goals

- No user accounts, ratings, comments, or user-submitted recipes on these surfaces.
- No on-site checkout — Add to Cart collects items; payment happens on anveshan.farm.
- Not a nutrition/calorie tool.
- Recipe content is editorial/seeded, not user-generated here.

## 5. Who uses it

- **Browser** — has a vague intent ("something with ghee", "a paratha") and wants to
  scan options.
- **Searcher** — knows the dish name and wants it directly.
- **Cook on the page** — is actually making the dish and needs clear ingredients,
  scalable quantities, and steps.
- **Shopper** — likes the recipe and wants to buy the ingredients.

## 6. Browse — how it works

1. The page shows a grid of recipe cards (image, name, short description, how many
   Anveshan products it uses and their combined price, veg/non-veg mark).
2. A single scrollable row of category filters sits on top: "All Recipes" plus product
   groups (Ghee, Oil, Atta, Superfood) and dish types (Sweet, Dessert, Main Course,
   Snack, Starter, Drink).
3. Choosing a product group reveals a second row of sub-filters (e.g. Oil → Groundnut,
   Mustard, Sesame…).
4. A Veg / Non-Veg toggle (in the green bar) filters the grid.
5. Search by recipe name filters live; the query is reflected in the URL (`?q=`) so a
   search is shareable and survives refresh/back.
6. A result count is shown; if nothing matches, an empty state offers "Reset filters".
7. The grid loads in batches and grows as the visitor scrolls (infinite scroll), so
   the first screen is fast even with a large catalogue.
8. Each card's "Add to Cart" adds that recipe's Anveshan products directly from the
   grid, without opening the recipe.

## 7. Recipe page — how it works

1. **Header:** recipe image, title, a short intro that expands ("See full recipe"),
   and Share.
2. **At-a-glance chips:** total time (tap to see prep vs cook breakdown), servings,
   difficulty, and category.
3. **Serving scaler:** the servings chip lets the cook pick 1×/2×/3×, which rescales
   every ingredient quantity on the page.
4. **Jump nav:** a sticky bar to jump to Ingredients / Method / Tips / Products / FAQ.
5. **Ingredients:** a checkable list. Anveshan ingredients are highlighted and, where
   the product has variants (ghee variety, atta variety), the cook can pick the
   variety, which updates the price/image used for the cart.
6. **Method:** numbered steps (long recipes show the first few with "See all steps").
   Anveshan products mentioned in steps are branded and linked.
7. **Tips & FAQ:** tips (collapsed with "Load more") and an FAQ accordion, when present.
8. **Shop the Anveshan products:** a panel listing each product the recipe uses with
   image, chosen variant, price, a subtotal, trust signals (cold-pressed, no
   chemicals, etc.), and Add to Cart.
9. **More about the product:** shelf life and benefits for the recipe's main product,
   with benefit details shown on tap/hover.
10. **Related recipes** at the bottom, and a **sticky Add-to-Cart bar** so buying is
    always one tap away while scrolling.

## 8. Functional requirements

**Browse**
1. List all published recipes as cards; each card shows image, name, short text,
   count + combined price of its Anveshan products, and a veg/non-veg mark.
2. Filter by top-level category and by sub-product; filters combine with search and
   the veg/non-veg toggle.
3. Search filters by recipe name and syncs to `?q=` (shareable, restorable). Category
   also reflects in the URL (`?category=`).
4. Show a live result count and a friendly empty state with a reset action.
5. Render the grid in batches and extend on scroll; keep filter changes responsive
   even with a large list.
6. Add a recipe's Anveshan products to the cart from the card.

**Recipe page**
7. Show image, title, intro (expandable), time (with prep/cook breakdown), servings,
   difficulty and category.
8. Serving scaler (1×/2×/3×) rescales all ingredient quantities consistently.
9. Ingredients are checkable; Anveshan ingredients are branded and, where applicable,
   offer a variety selector that drives the cart line.
10. Steps are ordered and numbered; product mentions in steps link to the product.
11. Show tips and FAQ when the recipe has them.
12. Show a products panel with per-product variant/price/image, a correct subtotal,
    and Add to Cart; plus a persistent sticky Add-to-Cart bar.
13. Cart never double-counts a product; checkout redirects to anveshan.farm.
14. Show related recipes (same category) and a breadcrumb to the category.
15. Emit recipe structured data (schema.org/Recipe) and correct page metadata for SEO.

**Both**
16. Fully responsive; usable and legible on phones without horizontal scrolling.
17. Images that a remote optimiser rejects are loaded directly so nothing appears
    broken.

## 9. Content & data

- Recipes and products come from the database, seeded from the recipe/product source
  data. Each recipe carries: name, intro/description, image, category (+ sub-category),
  veg flag, prep/cook time, servings, ingredients (with which ones are Anveshan and
  their product id), steps, optional tips and FAQs, and the list of Anveshan products.
- Categories are a fixed taxonomy: product groups (Ghee, Oil, Atta, Superfood — some
  with sub-varieties) and dish types.
- Product price/image/variant data mirrors the Anveshan store and must be kept in sync.

## 10. Edge cases & failure handling

- **No results for a filter/search:** empty state + "Reset filters".
- **Recipe with no Anveshan products:** the products panel and Add-to-Cart are hidden;
  the recipe still reads fine.
- **Missing tips/FAQ:** those sections are omitted, not shown empty.
- **Broken/blocked image:** falls back so the layout never shows a broken image.
- **Direct link with a bad `?category=`/`?q=`:** ignored gracefully (defaults to all).

## 11. Success metrics

- Add-to-Cart rate from recipe pages and from browse cards (primary — this is a sales
  surface).
- Browse → recipe-page click-through.
- Search usage and search→result rate.
- Core Web Vitals (load speed, interaction responsiveness), especially on mobile.

## 12. Dependencies & constraints

- Database for recipe/product content; product data must match the live store.
- Cart hands off to anveshan.farm for payment.
- Deployed on Vercel; recipe pages are statically generated for speed, so anything
  that would force per-request rendering (e.g. reading query params during render)
  must be avoided on those pages.

## 13. Open questions / future

- Add sorting (popularity, time, difficulty) and multi-select filters?
- Save/favourite recipes (needs a decision on accounts).
- Surface the AI generator more prominently from browse for "dish not found" moments.
- Show per-recipe popularity/most-added-to-cart to merchandise better.
