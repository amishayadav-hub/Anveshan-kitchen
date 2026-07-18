// Validates and merges NEW-dish authored files (data/new-dish-shards/<slug>.json)
// into data/indian-recipes-enriched.json — the same bundle the generator serves.
// Pure Node, no AI, no network. Re-runnable; existing families are skipped
// unless --force. New dishes require ≥3 valid variations (vs ≥4 for the
// templated families) since these are authored with 4 variations.
//
// Usage: node scripts/merge-new-shards.mjs [--force]

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "fs";
import path from "path";

const ROOT = process.cwd();
const SHARD_DIR = path.join(ROOT, "data", "new-dish-shards");
const OUT_PATH = path.join(ROOT, "data", "indian-recipes-enriched.json");
const CANDIDATES = path.join(ROOT, "data", "new-dishes-candidates.json");
const FORCE = process.argv.includes("--force");
const MIN_VARIATIONS = 3;

const VALID_PRODUCT_IDS = new Set([
  "khandsari", "jaggery-powder", "honey", "ghee", "groundnut-oil", "mustard-oil",
  "sunflower-oil", "sesame-oil", "coconut-oil", "olive-oil", "khapli-atta",
  "multigrain-atta", "moringa-powder", "sattu", "saffron",
  "turmeric-latte-mix", "amlaprash", "dry-fruit-paak",
]);
const QTY_RE = /^[\d.,/\s½¼¾⅓⅔⅛-]+$/;
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const slugify = (s) => norm(s).replace(/\s+/g, "-");

function jaccard(a, b) {
  if (!a.size && !b.size) return 1;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

// Same quality gate as the templated merge — returns [errors, cleanedVariations].
function validate(famData) {
  const errors = [];
  const out = [];
  const seenNames = new Set();
  const seenIngSets = [];
  for (const v of Array.isArray(famData?.variations) ? famData.variations : []) {
    const label = v?.name || "(unnamed)";
    const ingredients = (Array.isArray(v?.ingredients) ? v.ingredients : [])
      .filter((i) => i && typeof i.name === "string" && i.name.trim())
      .map((i) => {
        const validId = i.anveshanProductId && VALID_PRODUCT_IDS.has(i.anveshanProductId) ? i.anveshanProductId : undefined;
        if (i.anveshanProductId && !validId) errors.push(`${label}: invalid productId "${i.anveshanProductId}" stripped`);
        return {
          name: i.name.trim(),
          quantity: String(i.quantity ?? "").trim(),
          unit: String(i.unit ?? "").trim(),
          anveshan: !!validId,
          ...(validId ? { anveshanProductId: validId } : {}),
          ...(i.note ? { note: String(i.note).trim() } : {}),
        };
      });
    const steps = (Array.isArray(v?.steps) ? v.steps : []).map((s) => String(s).trim()).filter(Boolean);
    const tips = (Array.isArray(v?.tips) ? v.tips : []).map((s) => String(s).trim()).filter(Boolean).slice(0, 6);

    if (ingredients.length < 5) { errors.push(`${label}: only ${ingredients.length} ingredients — DROPPED`); continue; }
    if (steps.length < 4) { errors.push(`${label}: only ${steps.length} steps — DROPPED`); continue; }
    const unmeasured = ingredients.filter((i) => !i.quantity || !QTY_RE.test(i.quantity));
    if (unmeasured.length) { errors.push(`${label}: non-numeric quantity: ${unmeasured.map((i) => i.name).join(", ")} — DROPPED`); continue; }
    const thin = steps.filter((s) => s.length < 40);
    if (thin.length > 1) { errors.push(`${label}: ${thin.length} thin steps — DROPPED`); continue; }
    const products = [...new Set(ingredients.filter((i) => i.anveshanProductId).map((i) => i.anveshanProductId))];
    if (!products.length) { errors.push(`${label}: no Anveshan product — DROPPED`); continue; }
    const nkey = norm(v.name || "");
    if (!nkey || seenNames.has(nkey)) { errors.push(`${label}: duplicate/empty name — DROPPED`); continue; }
    const ingSet = new Set(ingredients.map((i) => norm(i.name)));
    if (seenIngSets.some((p) => jaccard(p, ingSet) >= 0.85)) { errors.push(`${label}: near-identical to another variation — DROPPED`); continue; }
    seenNames.add(nkey);
    seenIngSets.push(ingSet);

    out.push({
      name: String(v.name).trim(),
      axis: v.axis ? String(v.axis).trim() : undefined,
      description: String(v.description ?? "").trim(),
      servings: Math.min(12, Math.max(1, Math.round(Number(v.servings)) || 4)),
      prepTime: String(v.prepTime ?? "").trim() || "—",
      cookTime: String(v.cookTime ?? "").trim() || "—",
      ingredients, steps, tips,
      ...(v.servingSuggestion ? { servingSuggestion: String(v.servingSuggestion).trim() } : {}),
      anveshanProducts: products,
    });
  }
  return [errors, out];
}

// baseDish display name comes from the candidate list (proper casing).
const candByslug = new Map();
if (existsSync(CANDIDATES)) {
  for (const c of JSON.parse(readFileSync(CANDIDATES, "utf8"))) candByslug.set(slugify(c.name), c.name);
}

const out = existsSync(OUT_PATH)
  ? JSON.parse(readFileSync(OUT_PATH, "utf8"))
  : { version: 1, families: {}, nameToFamily: {} };

if (!existsSync(SHARD_DIR)) { console.error("No data/new-dish-shards/ directory — nothing to merge."); process.exit(1); }

let merged = 0, skipped = 0, failed = 0;
const report = [];
for (const f of readdirSync(SHARD_DIR).filter((f) => f.endsWith(".json")).sort()) {
  let famData;
  try { famData = JSON.parse(readFileSync(path.join(SHARD_DIR, f), "utf8")); }
  catch (e) { report.push(`✗ ${f}: unparseable JSON (${e.message})`); failed++; continue; }

  const slug = famData.slug || f.replace(/\.json$/, "");
  if (!FORCE && out.families[slug]?.variations?.length) { skipped++; continue; }

  const [errors, variations] = validate(famData);
  if (variations.length < MIN_VARIATIONS) {
    report.push(`✗ ${slug}: only ${variations.length} valid variations — NOT merged\n    ${errors.join("\n    ")}`);
    failed++;
    continue;
  }
  const baseDish = candByslug.get(slug) || famData.baseDish || slug;
  out.families[slug] = { baseDish, members: [baseDish], variations };
  // searchable names: the dish name + every variation name → this family
  out.nameToFamily[norm(baseDish)] = slug;
  for (const v of variations) out.nameToFamily[norm(v.name)] = slug;
  merged++;
  if (errors.length) report.push(`⚠ ${slug}: merged (${variations.length} variations); issues: ${errors.join(" | ")}`);
}

out.generatedAt = new Date().toISOString();
mkdirSync(path.dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, JSON.stringify(out, null, 1));
console.log(report.join("\n"));
console.log(`\nMerged: ${merged}, skipped (already present): ${skipped}, failed: ${failed}`);
console.log(`Total families in enriched file: ${Object.keys(out.families).length}`);
