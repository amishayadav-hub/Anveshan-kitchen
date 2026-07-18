# Anveshan Kitchen — Recipe Authoring Spec (for authoring agents)

You are authoring publication-quality Indian recipe content for Anveshan Kitchen (a D2C brand selling bilona ghee, wood-pressed oils, khapli atta, jaggery, honey). You write every recipe YOURSELF from your own culinary knowledge — do NOT call any external API, do NOT run scripts. Only Read your input shard and Write output files.

## Input

Your assigned shard file (path given in your task prompt) is an array of up to 8 dish-family briefs:
`{ slug, baseDish, coreIngredients, takes: [{name, region, signature}], referenceSteps }`.
The briefs come from a thin templated dataset; you are replacing it with rich content.

## Output

For EACH family in the array, author exactly 5 recipe variations and write ONE file per family at:
`C:\Users\HP\OneDrive\Desktop\Anveshan_Kitchen\anveshan-recipes\data\enrich-shards\<slug>.json`

with EXACTLY this JSON shape (no extra keys, no markdown):

```json
{
 "slug": "<slug from brief>",
 "baseDish": "<baseDish from brief>",
 "variations": [
  {
   "name": "Classic <Base Dish>",
   "axis": "Classic",
   "description": "2-3 appetizing, specific sentences.",
   "servings": 4,
   "prepTime": "15 min",
   "cookTime": "30 min",
   "ingredients": [
    {"name": "Anveshan Ghee", "quantity": "2", "unit": "tbsp", "anveshan": true, "anveshanProductId": "ghee", "note": "unique ingredient-specific note"},
    {"name": "Onion", "quantity": "1", "unit": "medium", "anveshan": false}
   ],
   "steps": ["..."],
   "tips": ["..."],
   "servingSuggestion": "...",
   "anveshanProducts": ["ghee"]
  }
 ]
}
```

## Variations

The first is the definitive "Classic" (axis "Classic"); the other 4 are the MOST distinctive regional takes from the brief's `takes` array — pick regions whose signature ingredients genuinely change the dish; set axis to the region label (e.g. "Punjabi", "Bengali", "Kerala"). Each variation must be MATERIALLY different — signature ingredient, spice profile, technique or format — with steps written in distinct wording (never copy sentences between variations). No two variations in a family may share ≥85% of their ingredient names.

## Hard validation rules (a merge script mechanically rejects violations)

1. Every variation: ≥5 ingredients (realistically 8–15), ≥5 steps, 2–4 tips.
2. Every ingredient "quantity" contains ONLY digits/fractions ("2", "0.5", "1/2", "¾") — no words, never empty, never "to taste". The unit goes in "unit" ("cups", "tsp", "tbsp", "g", "ml", "medium", "cloves", "inch"). Quantities must be correct and consistent for the stated "servings".
3. Every step is 1–3 full sentences (each step ≥40 characters) with the exact amounts woven in ("add 1 tsp roasted cumin powder"), heat level, timing, and a sensory cue ("until golden, about 3 minutes"). A first-time cook must never have to guess.
4. Every variation uses ≥1 Anveshan product: cook or finish in an Anveshan fat (Anveshan Ghee or an Anveshan wood-pressed oil), and add a second natural swap where it truly fits (maida→khapli-atta, white sugar→jaggery-powder or khandsari, refined oil→a wood-pressed oil, sugar in drinks→honey). Branded ingredients get "anveshan": true, the exact "anveshanProductId", and a unique dish-specific "note"; use the "Anveshan" prefix in BOTH the ingredient name and the steps. Everything else is "anveshan": false with no productId. List every used id in "anveshanProducts".
5. VALID anveshanProductId values (ONLY these): khandsari, jaggery-powder, honey, ghee, groundnut-oil, mustard-oil, sunflower-oil, sesame-oil, coconut-oil, olive-oil, khapli-atta, multigrain-atta, moringa-powder, sattu, saffron, turmeric-latte-mix, amlaprash, dry-fruit-paak. Plain besan, paneer, dal, rice, spices etc. are NOT Anveshan products.
6. CORRECT TECHNIQUE, non-negotiable: kneaded flatbread dough uses about ¾–1 cup water per 2 cups atta (soft, non-sticky); pourable batters ≈ 1:1 flour:water; NEVER put raw whole spice seeds (cumin/mustard/ajwain) into a filling or mixture that is not cooked again — bloom them in hot ghee/oil first or use roasted ground powder; dal must be pressure-cooked/simmered fully soft before tempering; portion fillings with concrete amounts ("2 tbsp per ball"). prepTime/cookTime realistic; "servings" matches what the steps actually yield.
7. "description" = 2–3 specific sentences (origin, texture, what makes this take special — no generic filler). "tips" = genuinely useful and dish-specific (make-ahead, texture rescue, substitution). "servingSuggestion" adds NEW plating/pairing info, never a restated step. Never write the word "Axis" in any prose field.

## Final report

Write one JSON file per family. When done, reply ONLY with: the list of slugs successfully written, and any family you could not complete with the reason.
