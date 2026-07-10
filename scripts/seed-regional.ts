// Safe, additive REGIONAL seeding — does NOT re-seed or clobber other recipes.
//
//   1. Loads the 141 curated regional recipes (Rajasthani, Punjabi, Haryanvi,
//      Bihari, Maharashtrian).
//   2. Upserts each by its own fixed id (ids are ours, so re-running just
//      refreshes them). All are stored isVeg:true.
//   3. Guards against duplicates: if a regional recipe's normalised NAME already
//      matches an EXISTING recipe under a DIFFERENT id, it is skipped and logged
//      (so we never create a second "Puran Poli", etc.). The 7 dishes already in
//      the DB (dal makhani, rajma masala, paneer butter masala, paneer tikka
//      masala, litti chokha, makhana kheer, sabudana vada) were left OUT of the
//      regional data on purpose, so this guard is a belt-and-braces check.
//   4. Prints live counts by category and region to verify the result.
//
// Run:  npx tsx scripts/seed-regional.ts
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDocs, collection } from "firebase/firestore";
import { rajasthaniRecipes } from "../src/data/regional/rajasthani";
import { punjabiRecipes } from "../src/data/regional/punjabi";
import { haryanviRecipes } from "../src/data/regional/haryanvi";
import { bihariRecipes } from "../src/data/regional/bihari";
import { maharashtrianRecipes } from "../src/data/regional/maharashtrian";
import type { RegionalRecipe } from "../src/data/regional/types";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});
const db = getFirestore(app);

const regionalRecipes: RegionalRecipe[] = [
  ...rajasthaniRecipes,
  ...punjabiRecipes,
  ...haryanviRecipes,
  ...bihariRecipes,
  ...maharashtrianRecipes,
];

// Normalise a name for duplicate detection: drop parentheticals, generic filler
// words and punctuation, then sort tokens so word order doesn't matter.
const STOP = new Set([
  "ki", "ka", "ke", "di", "chi", "masala", "sabji", "sabzi", "curry",
  "recipe", "and", "the", "bhaji",
]);
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
  console.log(`Regional recipes to seed: ${regionalRecipes.length}`);

  console.log("Reading existing recipes…");
  const snap = await getDocs(collection(db, "recipes"));
  const existing: Doc[] = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  const existingIds = new Set(existing.map((e) => e.id));
  // name -> id, for detecting a same-name recipe stored under a different id.
  const existingByNorm = new Map<string, string>();
  for (const e of existing) existingByNorm.set(norm(e.name || e.id), e.id);
  // Preserve admin-set images: a blank code image must NOT overwrite a real one.
  const existingImage = new Map(existing.map((e) => [e.id, (e.image as string) || ""]));
  console.log(`  ${existing.length} recipes in Firestore.`);

  let added = 0;
  let updated = 0;
  const skipped: string[] = [];

  for (const r of regionalRecipes) {
    const n = norm(r.name);
    const clashId = existingByNorm.get(n);
    // Skip only if the same name already exists under a DIFFERENT id (would be a
    // genuine duplicate). Re-writing our own id is fine.
    if (clashId && clashId !== r.id) {
      skipped.push(`${r.name} (≈ existing "${clashId}")`);
      continue;
    }

    const isNew = !existingIds.has(r.id);
    // Keep any admin-set image if the code image is blank.
    const image = r.image && r.image.trim() ? r.image : existingImage.get(r.id) || "";
    await setDoc(doc(db, "recipes", r.id), { ...r, image, isVeg: true });
    console.log(`  ${isNew ? "✓ added" : "↑ updated"}: ${r.slug}  [${r.region} · ${r.category}]`);
    if (isNew) added++;
    else updated++;
  }

  if (skipped.length) {
    console.log(`\nSkipped as duplicates (${skipped.length}):`);
    skipped.forEach((s) => console.log(`   - ${s}`));
  }

  // VERIFY — live totals and per-category / per-region breakdown.
  const after = await getDocs(collection(db, "recipes"));
  const byCategory: Record<string, number> = {};
  const byRegion: Record<string, number> = {};
  after.docs.forEach((d) => {
    const data = d.data();
    byCategory[data.category] = (byCategory[data.category] || 0) + 1;
    if (data.region) byRegion[data.region] = (byRegion[data.region] || 0) + 1;
  });

  console.log(`\nDone. added=${added}, updated=${updated}, skipped=${skipped.length}`);
  console.log(`Live recipes in Firestore: ${after.size}`);
  console.log(`By category: ${JSON.stringify(byCategory)}`);
  console.log(`By region:   ${JSON.stringify(byRegion)}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
