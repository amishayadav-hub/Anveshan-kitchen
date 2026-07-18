// Prepares input shards for Claude-authored enrichment (no external AI APIs).
// Groups indian-recipes.json into dish families, skips families already present
// in data/indian-recipes-enriched.json, and writes briefs in chunks of 8 to
// data/enrich-inputs/shard-NN.json for authoring agents to consume.
//
// Usage: node scripts/make-enrich-inputs.mjs

import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from "fs";
import path from "path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "data", "enrich-inputs");
const ENRICHED = path.join(ROOT, "data", "indian-recipes-enriched.json");
const CHUNK = 8;

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const slugify = (s) => norm(s).replace(/\s+/g, "-");

const rows = JSON.parse(readFileSync(path.join(ROOT, "indian-recipes.json"), "utf8"));
const done = existsSync(ENRICHED)
  ? new Set(Object.keys(JSON.parse(readFileSync(ENRICHED, "utf8")).families))
  : new Set();

const fam = new Map();
for (const r of rows) {
  const parts = r.name.split(" ");
  const base = parts.length > 1 ? parts.slice(1).join(" ") : r.name;
  if (!fam.has(base)) fam.set(base, []);
  fam.get(base).push(r);
}

const briefs = [];
for (const [baseDish, members] of [...fam.entries()].sort((a, b) => b[1].length - a[1].length)) {
  const slug = slugify(baseDish);
  if (done.has(slug)) continue;
  const sets = members.map((m) => new Set(m.ingredients.map(norm)));
  const core = members[0].ingredients.filter((ing) => sets.every((s) => s.has(norm(ing))));
  const coreSet = new Set(core.map(norm));
  briefs.push({
    slug,
    baseDish,
    coreIngredients: core,
    takes: members.map((m) => ({
      name: m.name,
      region: m.location,
      signature: m.ingredients.filter((ing) => !coreSet.has(norm(ing))),
    })),
    referenceSteps: (members[0].steps ?? []).slice(0, 10),
  });
}

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });
let n = 0;
for (let i = 0; i < briefs.length; i += CHUNK) {
  n++;
  const name = `shard-${String(n).padStart(2, "0")}.json`;
  writeFileSync(path.join(OUT_DIR, name), JSON.stringify(briefs.slice(i, i + CHUNK), null, 1));
}
console.log(`${briefs.length} families to author → ${n} input shards of ≤${CHUNK} in data/enrich-inputs/`);
