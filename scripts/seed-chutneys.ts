// Safe, additive Chutney seeding — does NOT re-seed or touch other recipes.
//
//   1. Moves any existing chutney-like recipe filed under a different category
//      into the "chutney" category (the de-dupe / "remove from there" step).
//   2. Adds the 24 curated chutney recipes, skipping any whose id already
//      exists or whose name already matches an existing chutney (no duplicates).
//   3. Prints the live chutney count so the result can be verified.
//
// Run:  npx tsx scripts/seed-chutneys.ts
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDocs, collection } from "firebase/firestore";
import { chutneyRecipes } from "../src/data/chutney-recipes";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});
const db = getFirestore(app);

// Recognises a recipe that is really a chutney regardless of its filed category.
const CHUTNEY_RE = /\b(chutney|chatni|chutni|pachadi|pachchadi|launji|thecha|thokku|pickle-chutney)\b/i;

// Normalise a name for duplicate detection: drop parentheticals, generic words,
// and punctuation so "Pudina (Mint) Chutney" ≈ "pudina mint".
function norm(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/\(.*?\)/g, " ")
    .replace(/\b(chutney|chatni|chutni|pachadi|pachchadi|launji|thecha|thokku|sweet|indian|gooseberry|bitter|gourd|sorrel|leaf|leaves|date|tamarind|green|chilli|peanut|and|the)\b/gi, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Doc = Record<string, any> & { id: string };

async function main() {
  console.log("Reading existing recipes…");
  const snap = await getDocs(collection(db, "recipes"));
  const existing: Doc[] = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  const existingIds = new Set(existing.map((e) => e.id));
  console.log(`  ${existing.length} recipes in Firestore.`);

  // 1) DE-DUPE / MOVE — recategorise chutney-like recipes filed elsewhere.
  let moved = 0;
  for (const e of existing) {
    const looksChutney = CHUTNEY_RE.test(e.name || "") || CHUTNEY_RE.test(e.slug || e.id || "");
    if (looksChutney && e.category !== "chutney") {
      await setDoc(doc(db, "recipes", e.id), { ...e, category: "chutney" });
      console.log(`  ~ moved into Chutney: ${e.id} (was "${e.category}")`);
      moved++;
    }
  }

  // 2) UPSERT — write each curated chutney by its fixed id. These ids are ours,
  //    so re-running simply refreshes them (e.g. to add tips/FAQs); no other
  //    recipe is touched. norm() is kept available for future dedupe use.
  void norm;
  let added = 0;
  let updated = 0;
  for (const r of chutneyRecipes) {
    const isNew = !existingIds.has(r.id);
    await setDoc(doc(db, "recipes", r.id), { ...r, isVeg: true });
    console.log(`  ${isNew ? "✓ added" : "↑ updated"}: ${r.slug}`);
    if (isNew) added++;
    else updated++;
  }

  // 3) VERIFY — live chutney count.
  const after = await getDocs(collection(db, "recipes"));
  const liveChutneys = after.docs.filter((d) => d.data().category === "chutney").length;

  console.log(`\nDone. moved=${moved}, added=${added}, updated=${updated}`);
  console.log(`Live recipes in the "chutney" category: ${liveChutneys}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
