// READ-ONLY audit of every recipe added today (141 regional + 10 extras).
// Validates structure, product-id integrity, category validity, id/name
// uniqueness (against each other AND the full live collection), and consistency
// between each recipe's `anveshanProducts` list and the product ids actually
// used in its ingredients. Writes nothing.
//
// Run:  npx tsx scripts/audit-new.ts
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { rajasthaniRecipes } from "../src/data/regional/rajasthani";
import { punjabiRecipes } from "../src/data/regional/punjabi";
import { haryanviRecipes } from "../src/data/regional/haryanvi";
import { bihariRecipes } from "../src/data/regional/bihari";
import { maharashtrianRecipes } from "../src/data/regional/maharashtrian";
import { moreRecipes } from "../src/data/more-recipes";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});
const db = getFirestore(app);

const VALID_CATEGORIES = new Set([
  "ghee", "oil", "atta", "superfood",
  "chutney", "breakfast", "lunch", "sweet", "dessert", "main-course", "snack", "starter", "drink",
]);
// Product ids we deliberately avoid (decommissioned in the generator for SKU clashes).
const DISCOURAGED = new Set(["protein-atta", "ashwagandha-mix", "moringa-powder"]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRecipe = Record<string, any>;

const NEW: { batch: string; list: AnyRecipe[] }[] = [
  { batch: "Rajasthani", list: rajasthaniRecipes },
  { batch: "Punjabi", list: punjabiRecipes },
  { batch: "Haryanvi", list: haryanviRecipes },
  { batch: "Bihari", list: bihariRecipes },
  { batch: "Maharashtrian", list: maharashtrianRecipes },
  { batch: "Extras", list: moreRecipes },
];

function norm(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/\(.*?\)/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .sort()
    .join(" ")
    .trim();
}

async function main() {
  // Valid product ids from the live products collection.
  const prodSnap = await getDocs(collection(db, "products"));
  const validProducts = new Set(prodSnap.docs.map((d) => d.id));

  // Full live recipe set for cross-collection name/id collision checks.
  const recSnap = await getDocs(collection(db, "recipes"));
  const liveById = new Map(recSnap.docs.map((d) => [d.id, d.data().name as string]));

  const all: AnyRecipe[] = NEW.flatMap((b) => b.list.map((r): AnyRecipe => ({ ...r, __batch: b.batch })));
  console.log(`Auditing ${all.length} new recipes against ${validProducts.size} products / ${liveById.size} live recipes.\n`);

  const errors: string[] = [];
  const warns: string[] = [];

  // id / slug / name uniqueness within the new set.
  const idSeen = new Map<string, string>();
  const nameSeen = new Map<string, string>();

  for (const r of all) {
    const tag = `[${r.__batch}] ${r.id}`;

    // ── structural ──
    if (!r.id) errors.push(`${tag}: missing id`);
    if (r.slug !== r.id) errors.push(`${tag}: slug "${r.slug}" != id`);
    if (!r.name || r.name.length < 2) errors.push(`${tag}: bad name`);
    if (!r.description || r.description.length < 20) errors.push(`${tag}: thin description`);
    if (!VALID_CATEGORIES.has(r.category)) errors.push(`${tag}: invalid category "${r.category}"`);
    if (typeof r.servings !== "number" || r.servings <= 0) errors.push(`${tag}: bad servings ${r.servings}`);
    if (!r.prepTime || !r.cookTime) errors.push(`${tag}: missing prep/cook time`);
    if (r.image !== "") warns.push(`${tag}: image not blank ("${r.image}")`);
    if (!Array.isArray(r.ingredients) || r.ingredients.length < 2) errors.push(`${tag}: <2 ingredients`);
    if (!Array.isArray(r.steps) || r.steps.length < 2) errors.push(`${tag}: <2 steps`);
    if (!Array.isArray(r.tips) || r.tips.length < 1) warns.push(`${tag}: no tips`);
    if (!Array.isArray(r.faqs) || r.faqs.length < 1) warns.push(`${tag}: no faqs`);
    if (!Array.isArray(r.tags) || r.tags.length < 1) warns.push(`${tag}: no tags`);

    // ── uniqueness (new set) ──
    if (idSeen.has(r.id)) errors.push(`${tag}: duplicate id (also ${idSeen.get(r.id)})`);
    else idSeen.set(r.id, r.__batch);
    const n = norm(r.name);
    if (nameSeen.has(n)) warns.push(`${tag}: duplicate-ish name "${r.name}" (≈ ${nameSeen.get(n)})`);
    else nameSeen.set(n, `${r.__batch}/${r.id}`);

    // ── cross-collection collision: same NAME under a DIFFERENT live id ──
    for (const [lid, lname] of liveById) {
      if (lid !== r.id && norm(lname) === n) {
        warns.push(`${tag}: live name clash with "${lid}" ("${lname}")`);
        break;
      }
    }

    // ── product integrity ──
    const declared: string[] = Array.isArray(r.anveshanProducts) ? r.anveshanProducts : [];
    for (const p of declared) {
      if (!validProducts.has(p)) errors.push(`${tag}: anveshanProducts has invalid id "${p}"`);
      if (DISCOURAGED.has(p)) warns.push(`${tag}: uses discouraged product "${p}"`);
    }
    // Product ids used inside ingredients.
    const usedInIng = new Set<string>();
    for (const ing of r.ingredients || []) {
      if (ing.anveshan) {
        if (!ing.anveshanProductId) errors.push(`${tag}: anveshan ingredient "${ing.name}" has no productId`);
        else {
          usedInIng.add(ing.anveshanProductId);
          if (!validProducts.has(ing.anveshanProductId))
            errors.push(`${tag}: ingredient productId invalid "${ing.anveshanProductId}"`);
        }
      }
    }
    // Consistency: every declared product should appear in ingredients and vice-versa.
    for (const p of declared) if (!usedInIng.has(p)) warns.push(`${tag}: declared product "${p}" not used in ingredients`);
    for (const p of usedInIng) if (!declared.includes(p)) warns.push(`${tag}: ingredient product "${p}" missing from anveshanProducts`);

    // ── persisted to Firestore? ──
    if (!liveById.has(r.id)) errors.push(`${tag}: NOT found in live Firestore`);

    // ── literal "null" / empty note leak check ──
    for (const ing of r.ingredients || []) {
      if (typeof ing.note === "string" && (ing.note.trim() === "" || ing.note.trim().toLowerCase() === "null"))
        warns.push(`${tag}: ingredient "${ing.name}" has empty/null note`);
    }
  }

  // Empty product arrays (allowed for savoury drinks, but list them).
  const noProduct = all.filter((r) => !r.anveshanProducts || r.anveshanProducts.length === 0);

  console.log(`ERRORS (${errors.length}):`);
  errors.forEach((e) => console.log("  ✗ " + e));
  console.log(`\nWARNINGS (${warns.length}):`);
  warns.forEach((w) => console.log("  ! " + w));
  console.log(`\nRecipes with NO Anveshan product (${noProduct.length}): ${noProduct.map((r) => r.id).join(", ")}`);

  // Category / product distribution summary.
  const cat: Record<string, number> = {};
  const prodUse: Record<string, number> = {};
  for (const r of all) {
    cat[r.category] = (cat[r.category] || 0) + 1;
    for (const p of r.anveshanProducts || []) prodUse[p] = (prodUse[p] || 0) + 1;
  }
  console.log(`\nNew-recipe categories: ${JSON.stringify(cat)}`);
  console.log(`Product usage across new recipes: ${JSON.stringify(prodUse)}`);
  console.log(`\n${errors.length === 0 ? "✅ No structural/data errors." : "❌ Errors found — see above."}`);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
