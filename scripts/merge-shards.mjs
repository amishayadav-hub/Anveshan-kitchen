// Validates and merges Claude-authored per-family recipe files
// (data/enrich-shards/<slug>.json) into data/indian-recipes-enriched.json.
// Pure Node — no AI, no network. Re-runnable; already-merged families are
// overwritten by a newer shard file only with --force.
//
// Usage: node scripts/merge-shards.mjs [--force]

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "fs";
import path from "path";

const ROOT = process.cwd();
const SHARD_DIR = path.join(ROOT, "data", "enrich-shards");
const OUT_PATH = path.join(ROOT, "data", "indian-recipes-enriched.json");
const FORCE = process.argv.includes("--force");

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

// Same quality gate as scripts/enrich-recipes.mjs — returns [errors, cleanedVariations]
function validateFamily(famData) {
  const errors = [];
  const out = [];
  const seenNames = new Set();
  const seenIngSets = [];
  const variations = Array.isArray(famData?.variations) ? famData.variations : [];

  for (const v of variations) {
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
    if (unmeasured.length) { errors.push(`${label}: non-numeric quantity on: ${unmeasured.map((i) => i.name).join(", ")} — DROPPED`); continue; }
    const thin = steps.filter((s) => s.length < 40);
    if (thin.length > 1) { errors.push(`${label}: ${thin.length} thin steps (<40 chars) — DROPPED`); continue; }
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

// Rebuild family membership from the original dataset (source of truth).
const rows = JSON.parse(readFileSync(path.join(ROOT, "indian-recipes.json"), "utf8"));
const familyMembers = new Map();
for (const r of rows) {
  const parts = r.name.split(" ");
  const base = parts.length > 1 ? parts.slice(1).join(" ") : r.name;
  const slug = slugify(base);
  if (!familyMembers.has(slug)) familyMembers.set(slug, { baseDish: base, members: [] });
  familyMembers.get(slug).members.push(r.name);
}

const out = existsSync(OUT_PATH)
  ? JSON.parse(readFileSync(OUT_PATH, "utf8"))
  : { version: 1, model: "claude-authored", families: {}, nameToFamily: {} };

if (!existsSync(SHARD_DIR)) { console.error("No data/enrich-shards/ directory — nothing to merge."); process.exit(1); }

let merged = 0, skipped = 0, failed = 0;
const report = [];
for (const f of readdirSync(SHARD_DIR).filter((f) => f.endsWith(".json")).sort()) {
  let famData;
  try { famData = JSON.parse(readFileSync(path.join(SHARD_DIR, f), "utf8")); }
  catch (e) { report.push(`✗ ${f}: unparseable JSON (${e.message})`); failed++; continue; }

  const slug = famData.slug || f.replace(/\.json$/, "");
  const known = familyMembers.get(slug);
  if (!known) { report.push(`✗ ${f}: slug "${slug}" not found in dataset`); failed++; continue; }
  if (!FORCE && out.families[slug]?.variations?.length) { skipped++; continue; }

  const [errors, variations] = validateFamily(famData);
  if (variations.length < 4) {
    report.push(`✗ ${slug}: only ${variations.length} valid variations — NOT merged\n    ${errors.join("\n    ")}`);
    failed++;
    continue;
  }
  out.families[slug] = { baseDish: known.baseDish, members: known.members, variations };
  for (const name of known.members) out.nameToFamily[norm(name)] = slug;
  merged++;
  if (errors.length) report.push(`⚠ ${slug}: merged with ${variations.length} variations; issues: ${errors.join(" | ")}`);
}

out.generatedAt = new Date().toISOString();
mkdirSync(path.dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, JSON.stringify(out, null, 1));
console.log(report.join("\n"));
console.log(`\nMerged: ${merged}, skipped (already present): ${skipped}, failed: ${failed}`);
console.log(`Total families in enriched file: ${Object.keys(out.families).length}/${familyMembers.size}`);
