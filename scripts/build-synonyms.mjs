// Adds spelling-variant + regional-synonym aliases to nameToFamily so dishes
// resolve from the bundle regardless of how the user spells/names them.
// Only ADDS keys — never overwrites an existing mapping, so real dishes stay put.
//
// Usage: node scripts/build-synonyms.mjs

import { readFileSync, writeFileSync } from "fs";
const p = "data/indian-recipes-enriched.json";
const d = JSON.parse(readFileSync(p, "utf8"));
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

// ── 1) Transliteration swap rules (Hindi/English spelling variation) ──
// Each is applied as a GLOBAL replace to a single word to yield one variant.
// Direction matters little — the collision guard makes noisy variants harmless.
const SWAPS = [
  ["oo", "u"], ["u", "oo"],      // poori/puri, aloo/alu
  ["aa", "a"], ["a", "aa"],      // paani/pani, daal/dal, naan/nan
  ["ee", "i"], ["i", "ee"],      // paneer/panir, cheela/chila
  ["w", "v"], ["v", "w"],        // wada/vada, pav/paw
  ["ph", "f"], ["f", "ph"],      // phulka/fulka
  ["z", "j"], ["j", "z"],        // pyaz/pyaj
  ["kh", "k"],                    // khichdi/kichdi
  ["gh", "g"],                    // ghee/gee
  ["sh", "s"], ["s", "sh"],      // sabzi/shabzi
  ["ck", "k"],                    // pakcka -> paka
  ["c", "k"],                     // chana stays (ch handled), but karela/carela
  ["y", "i"],                     // bhaji/bhajee handled via i/ee too
  ["ai", "ei"],
];

// Collapse any doubled consonant (tikka->tika, roll->rol, jaggery->jagery).
function collapseDoubles(w) {
  return w.replace(/([bcdfghjklmnpqrstvwxyz])\1/g, "$1");
}

const PER_WORD = 5;   // max spelling variants per word
const PER_PHRASE = 8; // max variant phrases per dish name

// Produce a bounded set of spelling variants for a single word (BFS depth 2).
function wordVariants(word) {
  const out = new Set([word]);
  let frontier = [word];
  for (let depth = 0; depth < 2 && out.size < PER_WORD; depth++) {
    const next = [];
    for (const w of frontier) {
      for (const [a, b] of SWAPS) {
        if (w.includes(a)) {
          const v = w.split(a).join(b);
          if (v && v !== w && !out.has(v)) { out.add(v); next.push(v); if (out.size >= PER_WORD) break; }
        }
      }
      const c = collapseDoubles(w);
      if (c !== w && !out.has(c)) { out.add(c); next.push(c); }
      if (out.size >= PER_WORD) break;
    }
    frontier = next;
  }
  return [...out];
}

// Cartesian product of per-word variant sets, capped per phrase.
function phraseVariants(phrase) {
  const words = phrase.split(" ").filter(Boolean);
  if (!words.length) return [];
  let combos = [[]];
  for (const w of words) {
    const vs = wordVariants(w);
    const nextCombos = [];
    for (const c of combos) for (const v of vs) { nextCombos.push([...c, v]); if (nextCombos.length >= PER_PHRASE) break; }
    combos = nextCombos;
    if (combos.length >= PER_PHRASE) combos = combos.slice(0, PER_PHRASE);
  }
  return combos.map((c) => c.join(" "));
}

// ── 2) Curated regional-synonym map (semantic, not spelling) ──
const REGIONAL = {
  "golgappe": "pani-puri", "golgappa": "pani-puri", "gol gappe": "pani-puri", "puchka": "pani-puri", "phuchka": "pani-puri", "gupchup": "pani-puri", "pani ke patashe": "pani-puri", "batasha": "pani-puri",
  "aloo puri": "aloo-sabzi-puri", "puri sabzi": "aloo-sabzi-puri", "puri bhaji": "aloo-sabzi-puri", "halwa puri": "aloo-sabzi-puri",
  "murgh makhani": "butter-chicken", "murg makhani": "butter-chicken",
  "biriyani": "chicken-biryani", "biriani": "chicken-biryani", "dum biryani": "chicken-biryani",
  "pao bhaji": "pav-bhaji", "wada pav": "vada-pav", "vada pao": "vada-pav",
  "makai": "bhutta", "bhutte": "bhutta", "corn on the cob": "bhutta", "roasted corn": "bhutta", "bhutta corn": "bhutta",
  "thayir sadam": "curd-rice", "curd bhat": "curd-rice", "dahi bhat": "curd-rice", "dahi chawal": "curd-rice",
  "chana bhatura": "chole-bhature", "chole bhatura": "chole-bhature", "chana bhature": "chole-bhature",
  "jilebi": "jalebi", "jilabi": "jalebi", "jelebi": "jalebi",
  "gulab jamoon": "gulab-jamun", "gulaab jamun": "gulab-jamun",
  "murgh tikka": "chicken-tikka-masala", "murg tikka": "chicken-tikka-masala",
  "anda curry": "egg-curry", "ande ki curry": "egg-curry", "egg masala curry": "egg-curry",
  "chow mein": "hakka-noodles", "chowmein": "hakka-noodles", "chawmin": "hakka-noodles", "veg noodles": "hakka-noodles",
  "gobi manchurian": "gobi-manchurian", "veg manchurian": "veg-manchurian",
  "kathi roll": "veg-roll", "kaathi roll": "veg-roll", "frankie": "veg-frankie",
  "aloo gobhi": "aloo-gobi", "gobhi aloo": "aloo-gobi",
  "matar paneer": "matar-paneer", "mutter paneer": "matar-paneer", "peas paneer": "matar-paneer",
  "chholay": "chole", "chhole": "chole", "chholey": "chole", "chana masala": "chana-masala",
  "roshogolla": "rasgulla", "rosogolla": "rasgulla", "rasgulle": "rasgulla",
  "curd rice south indian": "curd-rice", "thayir saadam": "curd-rice",
  "kaju barfi": "kaju-katli",
  "seekh kebab": "chicken-seekh-kebab", "seekh kabab": "chicken-seekh-kebab", "shami kabab": "shami-kebab", "galouti kabab": "galouti-kebab",
  "macher jhol bengali": "macher-jhol",
  "phirni kheer": "phirni", "sevaiyan": "seviyan-kheer", "semiyan": "seviyan-kheer",
  "chai": "masala-chai", "cutting chai": "cutting-chai", "adrak wali chai": "adrak-chai",
  "poha jalebi": "poha", "kande pohe": "poha",
  "maggie": "masala-maggi", "maggi noodles": "masala-maggi",
  "aloo tikki chaat": "aloo-tikki-chaat", "tikki chaat": "aloo-tikki-chaat",
  "dahi puri": "dahi-puri", "sev batata puri": "sev-puri", "bhel": "bhel-puri", "bhelpuri": "bhel-puri", "jhaal muri": "jhal-muri",
  "paneer tikka": "paneer-tikka-masala", "panir tikka": "paneer-tikka-masala",
  "paneer butter masala": "paneer", "paneer makhani": "paneer", "butter paneer": "paneer",
  "kadhi": "kadhi-pakora", "kadi": "kadhi-pakora", "kadhi pakoda": "kadhi-pakora",
  "gobhi paratha": "gobi-paratha", "gobhi aloo": "aloo-gobi", "gobhi": "gobi-paratha", "gobi": "gobi-paratha",
  "masaala dosa": "masala-dosa", "masala dosai": "masala-dosa", "dosai": "dosa",
  "idlee": "idli", "idly": "idli", "idlee sambar": "idli",
  "uttapam": "onion-uttapam", "uthappam": "onion-uttapam",
  "veg biryani": "veg-biryani", "vegetable biryani": "veg-biryani",
  "chicken biriyani": "chicken-biryani", "mutton biriyani": "mutton-biryani",
  "dal chawal": "dal-tadka", "dal rice": "dal-tadka",
  "rajma chawal rice": "rajma-chawal", "kheer": "rice-kheer",
  "sambar rice": "sambar", "curd rice": "curd-rice",
};

// Trailing style tokens used to split the original 520 families into variants.
// Stripping them lets the bare dish name resolve ("Dal Makhani Tadka" -> "dal makhani").
const STYLE_TAIL = ["tadka", "fry", "home style", "dhaba style", "punjabi", "restaurant", "dhaba", "classic"];
function stripStyle(name) {
  let s = norm(name);
  for (const t of STYLE_TAIL) if (s.endsWith(" " + t)) return s.slice(0, -(t.length + 1)).trim();
  return null;
}

// ── Apply (fill-gap phases first; canonical names re-asserted LAST) ──
let spellingAdded = 0, regionalAdded = 0, styleAdded = 0, skipped = 0;

// canonical name -> slug for spelling seeds
const sources = new Map();
for (const [slug, f] of Object.entries(d.families)) sources.set(norm(f.baseDish), slug);

// (a) spelling variants of canonical names — fill empty keys only
for (const [key, slug] of sources) {
  for (const variant of phraseVariants(key)) {
    const v = norm(variant);
    if (!v || v === key || d.nameToFamily[v] !== undefined) { if (v && v !== key) skipped++; continue; }
    d.nameToFamily[v] = slug; spellingAdded++;
  }
}

// (b) style-stripped base names (+ their spelling variants) — fill empty keys only
for (const [slug, f] of Object.entries(d.families)) {
  const base = stripStyle(f.baseDish);
  if (!base) continue;
  for (const v of [base, ...phraseVariants(base)]) {
    const k = norm(v);
    if (!k || d.nameToFamily[k] !== undefined) continue;
    d.nameToFamily[k] = slug; styleAdded++;
  }
}

// (c) curated regional synonyms — fill empty keys only
for (const [q, slug] of Object.entries(REGIONAL)) {
  const k = norm(q);
  if (!d.families[slug]) continue;
  if (d.nameToFamily[k] === undefined) { d.nameToFamily[k] = slug; regionalAdded++; }
}

// (d) AUTHORITATIVE: every family's own baseDish + variation names map to itself.
// Applied LAST so a real dish's name can never be hijacked by a variant/alias.
let corrected = 0;
for (const [slug, f] of Object.entries(d.families)) {
  const bk = norm(f.baseDish);
  if (d.nameToFamily[bk] !== slug) { if (d.nameToFamily[bk] !== undefined) corrected++; d.nameToFamily[bk] = slug; }
  for (const v of f.variations) { const vk = norm(v.name); if (d.nameToFamily[vk] === undefined) d.nameToFamily[vk] = slug; }
}

writeFileSync(p, JSON.stringify(d, null, 1));
console.log("spelling-variant aliases:", spellingAdded, "| style-stripped:", styleAdded, "| regional:", regionalAdded);
console.log("canonical-name mismappings corrected:", corrected, "| skipped (already mapped):", skipped);
console.log("total searchable names now:", Object.keys(d.nameToFamily).length, "| families:", Object.keys(d.families).length);
