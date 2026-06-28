// Flags recipes where an Anveshan product is in the ingredients/anveshanProducts
// but never mentioned in the steps (trust bug). Reads the seeded Firestore data.
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});
const db = getFirestore(app);

// keyword(s) per productId that should appear in the steps
const PRODUCT_TERMS = {
  ghee: ["ghee"],
  khandsari: ["khandsari"],
  "jaggery-powder": ["jaggery"],
  honey: ["honey"],
  "groundnut-oil": ["groundnut oil", "groundnut"],
  "mustard-oil": ["mustard oil"],
  "sunflower-oil": ["sunflower oil", "sunflower"],
  "sesame-oil": ["sesame oil", "til oil", "sesame"],
  "coconut-oil": ["coconut oil"],
  "olive-oil": ["olive oil"],
  "khapli-atta": ["khapli", "atta", "flour"],
  "multigrain-atta": ["multigrain", "atta", "flour"],
  "protein-atta": ["protein atta", "atta", "flour"],
  "moringa-powder": ["moringa"],
  sattu: ["sattu"],
  saffron: ["saffron", "kesar"],
  "turmeric-latte-mix": ["turmeric latte", "turmeric"],
  "ashwagandha-mix": ["ashwagandha"],
  amlaprash: ["amlaprash", "amla"],
  "dry-fruit-paak": ["dry fruit paak", "paak"],
};

(async () => {
  const snap = await getDocs(collection(db, "recipes"));
  const recipes = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  recipes.sort((a, b) => a.id.localeCompare(b.id));

  let bad = 0;
  const rows = [];
  for (const r of recipes) {
    const steps = (r.steps || []).join(" \n ").toLowerCase();
    // products from anveshanProducts + any ingredient flagged anveshan
    const ids = new Set(r.anveshanProducts || []);
    (r.ingredients || []).forEach((i) => {
      if (i.anveshan && i.anveshanProductId) ids.add(i.anveshanProductId);
    });
    const missing = [];
    for (const id of ids) {
      const terms = PRODUCT_TERMS[id] || [id.replace(/-/g, " ")];
      const found = terms.some((t) => steps.includes(t.toLowerCase()));
      if (!found) missing.push(id);
    }
    if (missing.length) {
      bad++;
      rows.push(`${r.id}  →  MISSING in steps: ${missing.join(", ")}   (products: ${[...ids].join(", ")})`);
    }
  }
  console.log(`Recipes scanned: ${recipes.length}`);
  console.log(`Recipes with a product missing from steps: ${bad}\n`);
  rows.forEach((x) => console.log(x));
})();
