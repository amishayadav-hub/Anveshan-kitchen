// Removes every non-veg dish family from the enriched database, drops all of
// their lookup keys, re-points generic aliases to veg equivalents, and
// re-asserts the canonical-name invariant.
//
// Usage: node scripts/remove-nonveg.mjs

import { readFileSync, writeFileSync, existsSync, rmSync } from "fs";
import path from "path";

const P = "data/indian-recipes-enriched.json";
const CAND = "data/new-dishes-candidates.json";
const SHARDS = "data/new-dish-shards";

const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const slugify = (s) => norm(s).replace(/\s+/g, "-");

const d = JSON.parse(readFileSync(P, "utf8"));
const cands = JSON.parse(readFileSync(CAND, "utf8"));

// 1) Slugs flagged non-veg when the candidates were added.
const nonvegSlugs = new Set(cands.filter((c) => c.nonveg).map((c) => slugify(c.name)));

// 2) Safety net: catch any family whose name reads non-veg (excluding eggless/egg-free).
const MEAT = /\b(chicken|murgh|murg|mutton|lamb|goat|beef|pork|bacon|ham|fish|machli|macher|pomfret|surmai|rohu|prawn|prawns|shrimp|crab|seafood|anda|nihari|paya)\b/;
const EGG = /\begg(s)?\b/;
const EGG_OK = /(eggless|egg free|egg-free)/;
for (const [slug, f] of Object.entries(d.families)) {
  const n = norm(f.baseDish);
  const isEggDish = EGG.test(n) && !EGG_OK.test(n);
  if (MEAT.test(n) || isEggDish || /\bomelette?\b/.test(n)) nonvegSlugs.add(slug);
}

// 3) Delete the families.
let removedFamilies = 0;
const removed = new Set();
for (const slug of nonvegSlugs) {
  if (d.families[slug]) { delete d.families[slug]; removed.add(slug); removedFamilies++; }
}

// 4) Drop every lookup key that pointed at a removed family.
let removedKeys = 0;
for (const [k, slug] of Object.entries(d.nameToFamily)) {
  if (removed.has(slug)) { delete d.nameToFamily[k]; removedKeys++; }
}

// 5) Re-point generic aliases to veg equivalents (only if the target survives).
const REPOINT = {
  biryani: "veg-biryani", keema: "veg-keema", kebab: "hara-bhara-kebab", kabab: "hara-bhara-kebab",
  tikka: "paneer-tikka-masala", pulao: "veg-pulao", curry: "mixed-veg-curry", seekh: "veg-seekh-kabab",
};
let repointed = 0;
for (const [q, slug] of Object.entries(REPOINT)) {
  if (d.families[slug]) { d.nameToFamily[norm(q)] = slug; repointed++; }
}

// 6) Re-assert the invariant: every surviving dish's own name maps to itself.
let fixed = 0;
for (const [slug, f] of Object.entries(d.families)) {
  const bk = norm(f.baseDish);
  if (d.nameToFamily[bk] !== slug) { d.nameToFamily[bk] = slug; fixed++; }
  for (const v of f.variations) { const vk = norm(v.name); if (d.nameToFamily[vk] === undefined) d.nameToFamily[vk] = slug; }
}

writeFileSync(P, JSON.stringify(d, null, 1));

// 7) Delete the non-veg shard files so a future merge can't re-add them.
let shardsDeleted = 0;
for (const slug of removed) {
  const f = path.join(SHARDS, slug + ".json");
  if (existsSync(f)) { rmSync(f); shardsDeleted++; }
}

// 8) Strip non-veg entries from the candidate list so the pipeline won't re-brief them.
const keptCands = cands.filter((c) => !c.nonveg && !nonvegSlugs.has(slugify(c.name)));
writeFileSync(CAND, JSON.stringify(keptCands, null, 2));

console.log("families removed:", removedFamilies);
console.log("lookup keys removed:", removedKeys);
console.log("generic aliases re-pointed to veg:", repointed);
console.log("canonical mappings re-asserted:", fixed);
console.log("non-veg shard files deleted:", shardsDeleted);
console.log("candidates stripped:", cands.length - keptCands.length, "| candidates left:", keptCands.length);
console.log("REMAINING families:", Object.keys(d.families).length, "| searchable names:", Object.keys(d.nameToFamily).length);
