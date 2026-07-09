// Safe, additive seeding for the extra snacks/starters + podi chutneys.
// Does NOT re-seed or clobber other recipes.
//
//   1. Upserts each recipe by its own fixed id (ids are ours, so re-running just
//      refreshes them). All are stored isVeg:true.
//   2. Guards against duplicates: if a recipe's normalised NAME already matches
//      an EXISTING recipe under a DIFFERENT id, it is skipped and logged.
//   3. Prints live counts to verify the result.
//
// Run:  npx tsx scripts/seed-more.ts
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDocs, collection } from "firebase/firestore";
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

// Normalise for dup detection. "chutney" is filler here, but "podi", "namkeen",
// "sticks", "tacos" and "sev" are kept as real tokens so a dry podi never
// collides with an existing wet chutney of the same base ingredient.
const STOP = new Set(["chutney", "dry", "and", "the", "masala", "coated", "gunpowder"]);
function norm(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/\(.*?\)/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((w) => w && !STOP.has(w))
    .sort()
    .join(" ")
    .trim();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Doc = Record<string, any> & { id: string };

async function main() {
  console.log(`Recipes to seed: ${moreRecipes.length}`);

  const snap = await getDocs(collection(db, "recipes"));
  const existing: Doc[] = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  const existingIds = new Set(existing.map((e) => e.id));
  const existingByNorm = new Map<string, string>();
  for (const e of existing) existingByNorm.set(norm(e.name || e.id), e.id);
  console.log(`  ${existing.length} recipes in Firestore.`);

  let added = 0;
  let updated = 0;
  const skipped: string[] = [];

  for (const r of moreRecipes) {
    const clashId = existingByNorm.get(norm(r.name));
    if (clashId && clashId !== r.id) {
      skipped.push(`${r.name} (≈ existing "${clashId}")`);
      continue;
    }
    const isNew = !existingIds.has(r.id);
    await setDoc(doc(db, "recipes", r.id), { ...r, isVeg: true });
    console.log(`  ${isNew ? "✓ added" : "↑ updated"}: ${r.slug}  [${r.category}]`);
    if (isNew) added++;
    else updated++;
  }

  if (skipped.length) {
    console.log(`\nSkipped as duplicates (${skipped.length}):`);
    skipped.forEach((s) => console.log(`   - ${s}`));
  }

  const after = await getDocs(collection(db, "recipes"));
  const byCategory: Record<string, number> = {};
  after.docs.forEach((d) => {
    const c = d.data().category;
    byCategory[c] = (byCategory[c] || 0) + 1;
  });

  console.log(`\nDone. added=${added}, updated=${updated}, skipped=${skipped.length}`);
  console.log(`Live recipes in Firestore: ${after.size}`);
  console.log(`By category: ${JSON.stringify(byCategory)}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
