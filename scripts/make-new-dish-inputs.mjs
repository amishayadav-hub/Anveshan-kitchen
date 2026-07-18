// Dedupes the new-dish candidate list against the existing enriched DB
// (synonym-aware) and splits the unique survivors into authoring shards.
//
// Uniqueness is enforced on a CANONICAL form of each name: normalized +
// Hindi/English synonyms folded to one token (aloo→potato, nariyal→coconut …).
// A candidate is dropped if its canonical name matches any existing family's
// baseDish, any member, OR any variation name — and duplicates within the
// candidate list itself are removed too.
//
// Usage: node scripts/make-new-dish-inputs.mjs

import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from "fs";
import path from "path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "data", "new-dish-inputs");
const ENRICHED = path.join(ROOT, "data", "indian-recipes-enriched.json");
const CANDIDATES = path.join(ROOT, "data", "new-dishes-candidates.json");
const CHUNK = 8;
const ORIGINAL_FAMILIES = 520; // the templated catalog before new dishes
const TARGET_NEW = 500;        // total NEW dishes to add on top of the original

// Fold Hindi/English synonyms to a single canonical token so "potato paratha"
// and "aloo paratha" collapse to the same key.
const SYN = {
  aloo: "potato", batata: "potato", bateta: "potato",
  gobi: "cauliflower", phulkopi: "cauliflower",
  pyaaz: "onion", pyaz: "onion", kanda: "onion",
  baingan: "brinjal", eggplant: "brinjal", vangi: "brinjal", begun: "brinjal", ringan: "brinjal", ringna: "brinjal",
  palak: "spinach",
  nariyal: "coconut", thengai: "coconut", narkel: "coconut", kopra: "coconut",
  matar: "peas", mutter: "peas",
  methi: "fenugreek",
  bhindi: "okra", bhinda: "okra",
  gajar: "carrot",
  lauki: "bottlegourd", dudhi: "bottlegourd", ghia: "bottlegourd",
  karela: "bittergourd",
  chawal: "rice", bhat: "rice", bhaat: "rice", anna: "rice", sadam: "rice", rotti: "rice",
  doodh: "milk", dudh: "milk",
  dahi: "yogurt", curd: "yogurt",
  chana: "chickpea", chhole: "chickpea", chole: "chickpea", chana_masala: "chickpea",
  rajma: "kidneybean",
  moong: "greengram", mung: "greengram",
  aloor: "potato", tamatar: "tomato", tameta: "tomato",
  paneer: "paneer", chhena: "paneer", chenna: "paneer",
  gud: "jaggery", gur: "jaggery",
  atta: "wheat", godhuma: "wheat",
  til: "sesame", ellu: "sesame",
  kaddu: "pumpkin", petha: "ashgourd",
  arbi: "colocasia",
  sabzi: "", shaak: "", nu: "", ki: "", ka: "", ke: "", er: "", wale: "", wala: "", wali: "",
  curry: "", masala: "", recipe: "", style: "", dish: "",
};

const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const slugify = (s) => norm(s).replace(/\s+/g, "-");

// canonical key: normalize, drop filler, fold synonyms, sort tokens so word
// order doesn't matter ("paneer matar" == "matar paneer").
function canon(name) {
  const toks = norm(name)
    .split(" ")
    .map((t) => (t in SYN ? SYN[t] : t))
    .filter(Boolean);
  return [...new Set(toks)].sort().join(" ");
}

const enriched = existsSync(ENRICHED) ? JSON.parse(readFileSync(ENRICHED, "utf8")) : { families: {}, nameToFamily: {} };

// Build the set of canonical names already covered.
const taken = new Set();
for (const [slug, fam] of Object.entries(enriched.families)) {
  taken.add(canon(fam.baseDish));
  for (const m of fam.members || []) taken.add(canon(m));
  for (const v of fam.variations || []) taken.add(canon(v.name));
}

const candidates = JSON.parse(readFileSync(CANDIDATES, "utf8"));
const unique = [];
const seen = new Set();
const dropped = [];
for (const c of candidates) {
  const key = canon(c.name);
  if (!key) continue;
  if (taken.has(key) || seen.has(key)) { dropped.push(c.name); continue; }
  seen.add(key);
  unique.push({ slug: slugify(c.name), name: c.name, note: c.note || "" });
}

// Author only enough to reach TARGET_NEW total new dishes (accounts for any
// already merged in earlier sessions), so we never overshoot.
const alreadyNew = Math.max(0, Object.keys(enriched.families).length - ORIGINAL_FAMILIES);
const remainingCap = Math.max(0, TARGET_NEW - alreadyNew);
const pool = unique.slice(0, remainingCap);
rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });
let n = 0;
for (let i = 0; i < pool.length; i += CHUNK) {
  n++;
  writeFileSync(path.join(OUT_DIR, `shard-${String(n).padStart(2, "0")}.json`), JSON.stringify(pool.slice(i, i + CHUNK), null, 1));
}

console.log(`candidates: ${candidates.length} | unique remaining: ${unique.length} | already added: ${alreadyNew} | to author now: ${pool.length} | target new total: ${TARGET_NEW} | dropped as duplicate: ${dropped.length}`);
if (dropped.length) console.log("dropped (already covered):", dropped.slice(0, 40).join(", ") + (dropped.length > 40 ? " …" : ""));
console.log(`→ ${n} authoring shards of ≤${CHUNK} in data/new-dish-inputs/`);
