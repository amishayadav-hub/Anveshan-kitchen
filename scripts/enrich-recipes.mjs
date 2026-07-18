// Enriches the 10k synthetic dataset (indian-recipes.json) into rich, measured,
// genuinely-distinct recipe variation sets — one AI call per dish FAMILY.
//
// The dataset is ~520 families: each dish appears ~22-24 times with a regional
// prefix (Punjabi/Gujarati/Bengali/…) differing by one signature ingredient and
// templated steps. This script groups rows into families, asks Gemini (Groq
// fallback) for 4-5 materially different, fully-measured variations per family,
// validates the output, and writes:
//
//   data/indian-recipes-enriched.json
//     { version, model, generatedAt, families: { <slug>: { baseDish, members,
//       variations: [...] } }, nameToFamily: { <normalized member name>: slug } }
//
// The ORIGINAL indian-recipes.json is never modified — recipe-embeddings.bin is
// row-aligned to it, so rewriting it would desync semantic search.
//
// Usage:
//   node scripts/enrich-recipes.mjs --limit 3          # sample run
//   node scripts/enrich-recipes.mjs                    # full run (resumable)
//   node scripts/enrich-recipes.mjs --family "Aloo Paratha" --force
//
// Reads GEMINI_API_KEY / GROQ_API_KEY from .env.local.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import OpenAI from "openai";

// ─── env ─────────────────────────────────────────────────────────────────────
const ROOT = process.cwd();
for (const f of [".env.local", ".env"]) {
  const p = path.join(ROOT, f);
  if (!existsSync(p)) continue;
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

// ─── CLI args ────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? (args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : true) : undefined;
};
const LIMIT = flag("limit") ? Number(flag("limit")) : Infinity;
const ONLY_FAMILY = typeof flag("family") === "string" ? flag("family") : null;
const FORCE = !!flag("force");

// ─── catalog (mirrors src/lib/ai-providers.ts — keep in sync) ────────────────
const ANVESHAN_CATALOG = `
Anveshan sells these products (use the exact productId shown for healthy swaps):
- "khandsari"          → Khandsari unrefined cane sugar (replaces white sugar)
- "jaggery-powder"     → Jaggery (gur) powder (replaces refined sugar)
- "honey"              → Wild Forest Honey (replaces sugar in drinks/dressings)
- "ghee"               → Bilona Ghee, Gir/Desi cow & buffalo (replaces butter/dalda)
- "groundnut-oil"      → Wood-Pressed Groundnut Oil (replaces refined frying oil)
- "mustard-oil"        → Wood-Pressed Mustard Oil
- "sunflower-oil"      → Cold-Pressed Sunflower Oil
- "sesame-oil"         → Wood-Pressed Sesame (til) Oil
- "coconut-oil"        → Wood-Pressed Coconut Oil
- "olive-oil"          → Cold-Pressed Olive Oil
- "khapli-atta"        → Cold-Pressed Khapli (emmer) Atta (replaces maida/regular atta)
- "multigrain-atta"    → Multigrain Atta (replaces plain wheat flour)
- "moringa-powder"     → Moringa leaf powder (green superfood boost)
- "sattu"              → Roasted gram Sattu (protein)
- "saffron"            → Pure Kashmiri Saffron
- "turmeric-latte-mix" → Turmeric Latte mix
- "amlaprash"          → Amla-based herbal jam
- "dry-fruit-paak"     → Dry fruit & nut paak
`;
const VALID_PRODUCT_IDS = new Set([
  "khandsari", "jaggery-powder", "honey", "ghee", "groundnut-oil", "mustard-oil",
  "sunflower-oil", "sesame-oil", "coconut-oil", "olive-oil", "khapli-atta",
  "multigrain-atta", "moringa-powder", "sattu", "saffron",
  "turmeric-latte-mix", "amlaprash", "dry-fruit-paak",
]);

// ─── family grouping ─────────────────────────────────────────────────────────
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const slugify = (s) => norm(s).replace(/\s+/g, "-");

function groupFamilies(rows) {
  const fam = new Map();
  for (const r of rows) {
    const parts = r.name.split(" ");
    const base = parts.length > 1 ? parts.slice(1).join(" ") : r.name;
    if (!fam.has(base)) fam.set(base, []);
    fam.get(base).push(r);
  }
  return fam;
}

// Common core = ingredients present in every member; per-member extras are the
// regional "signature" ingredients that make each take distinct.
function familyBrief(baseDish, members) {
  const sets = members.map((m) => new Set(m.ingredients.map(norm)));
  const core = members[0].ingredients.filter((ing) => sets.every((s) => s.has(norm(ing))));
  const coreSet = new Set(core.map(norm));
  const takes = members.map((m) => {
    const extras = m.ingredients.filter((ing) => !coreSet.has(norm(ing)));
    return `- ${m.name} (${m.location})${extras.length ? ` — signature: ${extras.join(", ")}` : ""}`;
  });
  const ref = members[0];
  return { core, takes, refSteps: (ref.steps ?? []).slice(0, 10) };
}

// ─── prompt ──────────────────────────────────────────────────────────────────
function buildPrompt(baseDish, members, includeShape) {
  const { core, takes, refSteps } = familyBrief(baseDish, members);
  const shapeBlock = includeShape
    ? `

Return ONLY valid JSON (no markdown), shaped exactly as:
{"baseDish":"...","variations":[{"name":"...","axis":"Punjabi","description":"...","servings":4,"prepTime":"25 min","cookTime":"20 min","ingredients":[{"name":"Anveshan Ghee","quantity":"2","unit":"tbsp","anveshan":true,"anveshanProductId":"ghee","note":"..."},{"name":"Onion","quantity":"2","unit":"medium","anveshan":false}],"steps":["..."],"tips":["..."],"servingSuggestion":"...","anveshanProducts":["ghee"]}]}
For non-Anveshan ingredients set "anveshan": false and omit anveshanProductId/note.`
    : "";

  return `You are Anveshan Kitchen's expert Indian recipe developer, writing the DEFINITIVE published recipe set for "${baseDish}" for a food brand's website. Write in clear English.

Our current dataset entries for this dish are thin, templated near-duplicates. You are replacing them with rich, publication-quality content. Here is what the dataset knows:

Core ingredients (all versions): ${core.join(", ")}
Regional takes in the dataset:
${takes.join("\n")}

Templated reference method (thin — improve on it, keep the dish's identity):
${refSteps.map((s, i) => `${i + 1}. ${s}`).join("\n")}
${ANVESHAN_CATALOG}

Write exactly 5 variations of ${baseDish}: one definitive "Classic" version first, then 4 drawn from the MOST distinctive regional takes listed above (pick the regions whose signature ingredients genuinely change the dish). Non-negotiable rules:

1. AXIS: set "axis" to the variation's identity ("Classic", or the region e.g. "Punjabi", "Bengali"). Never write the word "Axis" in the description.
2. MATERIALLY DIFFERENT: each variation must differ in substance — signature ingredient, spice profile, technique, or format — not reworded twins. Steps must be written in distinct wording across variations; never reuse identical sentences.
3. EXACT MEASUREMENTS FOR THE STATED SERVINGS: every ingredient needs a concrete numeric quantity + standard unit (g, ml, cup, tbsp, tsp, piece, clove, medium). Put the number in "quantity" and the unit in "unit" separately (quantity "2", unit "cups" — NOT quantity "2 cups"). NEVER "to taste", "some", or blank. Quantities must be consistent with "servings".
4. RICH, PRECISE STEPS: 5–9 steps per variation. Each step is 1–3 full sentences with the exact amounts woven in ("add 1 tsp roasted cumin powder"), plus heat levels, timings, and sensory cues ("until the raw smell goes, about 2 minutes"). A first-time cook must be able to follow it without guessing. No thin one-liners.
5. CORRECT TECHNIQUE: kneaded flatbread dough uses about ¾–1 cup water per 2 cups atta (soft, non-sticky). Pourable batters ≈ 1:1 flour:water. NEVER put raw whole spice seeds into a filling or mixture that is not cooked again — bloom them in hot ghee/oil first or use roasted ground powder. Dal must be pressure-cooked or simmered until fully soft before tempering. Portion fillings with concrete amounts ("2 tbsp per ball").
6. RICH SUPPORTING CONTENT: "description" is 2–3 appetizing, specific sentences (origin, texture, what makes this take special — no generic filler). "tips" is 2–4 genuinely useful, dish-specific tips (make-ahead, texture rescue, substitution). "servingSuggestion" adds NEW plating/pairing info, not a restated step.
7. SELL ANVESHAN naturally: cook or finish every variation in an Anveshan fat (Anveshan Ghee or an Anveshan wood-pressed oil) and add a second catalog swap where it truly fits (maida→khapli-atta, sugar→jaggery-powder/khandsari, refined oil→wood-pressed oil). Set "anveshan": true with the exact "anveshanProductId" and a unique, ingredient-specific "note". Only brand items that are really in the catalog — plain besan, paneer, dal etc. stay anveshan:false. Refer to branded items with the "Anveshan" prefix in BOTH the ingredient name and the steps. List every used productId in "anveshanProducts".
8. REALISTIC prepTime/cookTime for the stated servings; "servings" must match the yield the steps actually produce.${shapeBlock}`;
}

// ─── Gemini response schema (constrained decoding) ───────────────────────────
const RESPONSE_SCHEMA = {
  type: SchemaType.OBJECT,
  properties: {
    baseDish: { type: SchemaType.STRING },
    variations: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          name: { type: SchemaType.STRING },
          axis: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
          servings: { type: SchemaType.INTEGER },
          prepTime: { type: SchemaType.STRING },
          cookTime: { type: SchemaType.STRING },
          ingredients: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                name: { type: SchemaType.STRING },
                quantity: { type: SchemaType.STRING },
                unit: { type: SchemaType.STRING },
                anveshan: { type: SchemaType.BOOLEAN },
                anveshanProductId: { type: SchemaType.STRING, nullable: true },
                note: { type: SchemaType.STRING, nullable: true },
              },
              required: ["name", "quantity", "unit", "anveshan"],
            },
          },
          steps: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
          tips: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
          servingSuggestion: { type: SchemaType.STRING, nullable: true },
          anveshanProducts: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
        },
        required: ["name", "axis", "description", "servings", "prepTime", "cookTime", "ingredients", "steps", "tips"],
      },
    },
  },
  required: ["baseDish", "variations"],
};

// ─── providers ───────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function callGemini(prompt, temperature) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
      temperature,
      maxOutputTokens: 32768,
      thinkingConfig: { thinkingBudget: 0 },
    },
  });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function callGroq(prompt, temperature) {
  const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
    timeout: 60000,
  });
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature,
    max_tokens: 20000,
  });
  return completion.choices[0].message.content ?? "{}";
}

function parseModelJson(raw) {
  let s = (raw ?? "").trim().replace(/^```(?:json)?/i, "").replace(/```\s*$/i, "").trim();
  const start = s.indexOf("{");
  const end = s.lastIndexOf("}");
  if (start >= 0 && end > start) s = s.slice(start, end + 1);
  try { return JSON.parse(s); } catch { return null; }
}

// ─── validation (JS port of the runtime quality gate) ────────────────────────
const QTY_RE = /^[\d.,/\s½¼¾⅓⅔⅛-]+$/;

function jaccard(a, b) {
  if (!a.size && !b.size) return 1;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

// Returns { variations, problems } — variations that pass, plus reasons dropped.
function validateSet(parsed) {
  const problems = [];
  const out = [];
  const seenNames = new Set();
  const seenIngSets = [];

  for (const v of parsed?.variations ?? []) {
    const label = v?.name || "(unnamed)";
    const ingredients = (Array.isArray(v?.ingredients) ? v.ingredients : [])
      .filter((i) => i && typeof i.name === "string" && i.name.trim())
      .map((i) => {
        const validId = i.anveshanProductId && VALID_PRODUCT_IDS.has(i.anveshanProductId) ? i.anveshanProductId : undefined;
        let quantity = String(i.quantity ?? "").trim();
        const unit = String(i.unit ?? "").trim();
        if (unit && /[a-zA-Z]/.test(quantity)) {
          const num = quantity.match(/^[\d.,/\s½¼¾⅓⅔⅛-]+/)?.[0]?.trim();
          if (num) quantity = num;
        }
        return {
          name: i.name.trim(), quantity, unit,
          anveshan: !!validId,
          ...(validId ? { anveshanProductId: validId } : {}),
          ...(i.note && String(i.note) !== "null" ? { note: String(i.note).trim() } : {}),
        };
      });
    const steps = (Array.isArray(v?.steps) ? v.steps : []).map((s) => String(s).trim()).filter(Boolean).slice(0, 25);
    const tips = (Array.isArray(v?.tips) ? v.tips : []).map((s) => String(s).trim()).filter(Boolean).slice(0, 6);

    if (ingredients.length < 5) { problems.push(`${label}: only ${ingredients.length} ingredients`); continue; }
    if (steps.length < 4) { problems.push(`${label}: only ${steps.length} steps`); continue; }

    const unmeasured = ingredients.filter((i) => !i.quantity || !QTY_RE.test(i.quantity));
    if (unmeasured.length > 0) { problems.push(`${label}: unmeasured: ${unmeasured.map((i) => i.name).join(", ")}`); continue; }

    const thinSteps = steps.filter((s) => s.length < 40);
    if (thinSteps.length > 1) { problems.push(`${label}: ${thinSteps.length} thin steps (<40 chars)`); continue; }

    const products = [...new Set(ingredients.filter((i) => i.anveshanProductId).map((i) => i.anveshanProductId))];
    if (!products.length) { problems.push(`${label}: no Anveshan product used`); continue; }

    const nkey = norm(v.name || "");
    if (!nkey || seenNames.has(nkey)) { problems.push(`${label}: duplicate/empty name`); continue; }
    const ingSet = new Set(ingredients.map((i) => norm(i.name)));
    if (seenIngSets.some((prev) => jaccard(prev, ingSet) >= 0.85)) { problems.push(`${label}: near-identical ingredients to another variation`); continue; }
    seenNames.add(nkey);
    seenIngSets.push(ingSet);

    out.push({
      name: v.name.trim(),
      axis: String(v.axis ?? "").trim() || undefined,
      description: String(v.description ?? "").trim(),
      servings: Math.min(12, Math.max(1, Math.round(Number(v.servings)) || 4)),
      prepTime: String(v.prepTime ?? "").trim() || "—",
      cookTime: String(v.cookTime ?? "").trim() || "—",
      ingredients, steps, tips,
      ...(v.servingSuggestion && String(v.servingSuggestion) !== "null"
        ? { servingSuggestion: String(v.servingSuggestion).trim() } : {}),
      anveshanProducts: products,
    });
  }
  return { variations: out, problems };
}

// ─── main ────────────────────────────────────────────────────────────────────
const OUT_PATH = path.join(ROOT, "data", "indian-recipes-enriched.json");

async function enrichFamily(baseDish, members, providers) {
  let lastProblems = [];
  for (const [provName, call, includeShape] of providers) {
    for (const temperature of [0.5, 0.65]) {
      try {
        const prompt = buildPrompt(baseDish, members, includeShape);
        const raw = await call(prompt, temperature);
        const parsed = parseModelJson(raw);
        if (!parsed) { lastProblems = [`${provName}: unparseable JSON`]; continue; }
        const { variations, problems } = validateSet(parsed);
        if (variations.length >= 4) return { variations, provider: provName, problems };
        lastProblems = problems.length ? problems : [`${provName}: only ${variations.length} variations passed`];
      } catch (e) {
        lastProblems = [`${provName}: ${e.message}`];
        if (/429|quota|rate/i.test(e.message)) { console.log("    rate-limited, waiting 30s…"); await sleep(30000); }
      }
    }
  }
  return { variations: null, problems: lastProblems };
}

async function main() {
  const providers = [];
  if (process.env.GEMINI_API_KEY) providers.push(["Gemini", callGemini, false]);
  if (process.env.GROQ_API_KEY) providers.push(["Groq", callGroq, true]);
  if (!providers.length) { console.error("No GEMINI_API_KEY / GROQ_API_KEY found in .env.local"); process.exit(1); }

  const rows = JSON.parse(readFileSync(path.join(ROOT, "indian-recipes.json"), "utf8"));
  const families = groupFamilies(rows);
  console.log(`${rows.length} rows → ${families.size} families. Providers: ${providers.map((p) => p[0]).join(", ")}`);

  const out = existsSync(OUT_PATH)
    ? JSON.parse(readFileSync(OUT_PATH, "utf8"))
    : { version: 1, model: "gemini-2.5-flash", generatedAt: new Date().toISOString(), families: {}, nameToFamily: {} };

  const failed = [];
  let done = 0, processed = 0;
  const entries = [...families.entries()].sort((a, b) => b[1].length - a[1].length);

  for (const [baseDish, members] of entries) {
    if (processed >= LIMIT) break;
    if (ONLY_FAMILY && norm(baseDish) !== norm(ONLY_FAMILY)) continue;
    const slug = slugify(baseDish);
    if (!FORCE && out.families[slug]?.variations?.length) { done++; continue; }
    processed++;

    process.stdout.write(`[${processed}] ${baseDish} (${members.length} members)… `);
    const t0 = Date.now();
    const { variations, provider, problems } = await enrichFamily(baseDish, members, providers);

    if (!variations) {
      console.log(`FAILED — ${problems.join(" | ")}`);
      failed.push(baseDish);
      continue;
    }
    out.families[slug] = { baseDish, members: members.map((m) => m.name), variations };
    for (const m of members) out.nameToFamily[norm(m.name)] = slug;
    out.generatedAt = new Date().toISOString();
    mkdirSync(path.dirname(OUT_PATH), { recursive: true });
    writeFileSync(OUT_PATH, JSON.stringify(out, null, 1));
    done++;
    console.log(`ok (${variations.length} variations, ${provider}, ${((Date.now() - t0) / 1000).toFixed(1)}s${problems.length ? `, dropped: ${problems.length}` : ""})`);

    await sleep(2000); // stay friendly to rate limits
  }

  console.log(`\nEnriched families in file: ${Object.keys(out.families).length}/${families.size}`);
  if (failed.length) console.log(`Failed this run (${failed.length}): ${failed.join(", ")}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
