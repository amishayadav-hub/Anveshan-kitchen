# Anveshan Kitchen — NON-VEG Dish Authoring Spec (for authoring agents)

You are authoring publication-quality Indian NON-VEGETARIAN recipe content for Anveshan Kitchen (a D2C brand selling bilona ghee, wood-pressed oils, khapli atta, jaggery, honey). You write every recipe YOURSELF from your own culinary knowledge — do NOT call any external API, do NOT run scripts. Only Read your input shard and Write output files.

These are NON-VEG dishes (chicken, mutton, fish, prawn, egg). Author the definitive recipe plus distinct variations, in the EXACT same JSON shape as the rest of the catalog.

## Input
Your shard file (path in the task prompt) is an array of up to 8 dish briefs: `{ slug, name, note }`.

## Output
For EACH dish, author **exactly 4 variations** (a definitive Classic + 3 distinct takes) and write ONE file per dish at:
`C:\Users\HP\OneDrive\Desktop\Anveshan_Kitchen\anveshan-recipes\data\new-dish-shards\<slug>.json`

with EXACTLY this shape (no extra keys, no markdown):
```json
{
 "slug": "<slug>",
 "baseDish": "<name>",
 "variations": [
  {"name":"Classic <Dish>","axis":"Classic","description":"2-3 sentences.","servings":4,"prepTime":"20 min","cookTime":"40 min",
   "ingredients":[{"name":"Anveshan Ghee","quantity":"2","unit":"tbsp","anveshan":true,"anveshanProductId":"ghee","note":"unique note"},{"name":"Chicken, curry-cut","quantity":"750","unit":"g","anveshan":false}],
   "steps":["..."],"tips":["..."],"servingSuggestion":"...","anveshanProducts":["ghee"]}
 ]
}
```
Write each file as soon as you finish it (do not batch all writes to the very end).

## Variations
First is the definitive **Classic**; the other 3 are materially distinct — a regional style (Punjabi/Hyderabadi/Bengali/Chettinad/Kolhapuri…), a technique (tandoori/dhaba/bhuna/dum), or a format (dry/gravy/roast). Set `axis` to a short label. No two variations may share ≥85% of ingredient names, and none may be an ingredient-subset of another.

## Hard rules (a merge script mechanically rejects violations)
1. Every variation: ≥5 ingredients (realistically 8–16), ≥5 steps, 2–4 tips.
2. Every ingredient `quantity` is digits/fractions ONLY ("2","0.5","¾","750"); the unit goes in `unit` ("g","kg","tbsp","cup","pieces","medium"). Never words, never "to taste". Scale to `servings`.
3. Every step is 1–3 sentences (each ≥40 chars) with exact amounts, heat level, timing, and a sensory cue. Meat/fish doneness must be explicit (e.g. "until the chicken is cooked through and juices run clear, about 15 minutes").
4. **Anveshan hook:** every variation cooks or finishes in an Anveshan fat — **Anveshan Ghee** or an **Anveshan wood-pressed oil** (mustard-oil for Bengali/Punjabi/Kashmiri, groundnut/sesame/coconut oil for South/coastal). Set `anveshan:true`, the exact `anveshanProductId`, and a unique note; use the "Anveshan" prefix in BOTH the ingredient name and the steps. Where a genuine second swap fits (khapli-atta to thicken/dust, honey/jaggery-powder in a glaze), add it. List every used id in `anveshanProducts`.
5. VALID anveshanProductId values (ONLY these): khandsari, jaggery-powder, honey, ghee, groundnut-oil, mustard-oil, sunflower-oil, sesame-oil, coconut-oil, olive-oil, khapli-atta, multigrain-atta, moringa-powder, sattu, saffron, turmeric-latte-mix, amlaprash, dry-fruit-paak. Chicken/mutton/fish/egg/spices/yogurt are NOT Anveshan products (anveshan:false).
6. CORRECT TECHNIQUE: marinate meat in yogurt/spices where authentic; mustard oil heated to smoking then cooled before use; whole spices bloomed in hot fat; onions browned properly for gravies; fish handled gently and not overcooked; biryani rice par-boiled (70%) before dum; bone-in cuts simmered until tender; eggs boiled/fried to the right stage. Realistic prep/cook times; `servings` matches what the steps yield.
7. "description" = 2–3 specific appetizing sentences. "tips" = genuinely useful (marination time, doneness, substitution). "servingSuggestion" adds NEW pairing info. Never write the word "Axis" in prose.
8. Author the RIGHT dish per the brief. These ARE non-vegetarian — use the named protein. Keep egg dishes egg-based, seafood dishes seafood-based.

## Final report
Write one file per dish. Reply ONLY with: the slugs written, and any dish you could not complete with the reason.
