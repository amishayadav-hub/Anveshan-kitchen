import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { writeFileSync } from "fs";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});
const db = getFirestore(app);

const PRODUCT_TERMS = {
  ghee: ["ghee"], khandsari: ["khandsari"], "jaggery-powder": ["jaggery"], honey: ["honey"],
  "groundnut-oil": ["groundnut oil", "groundnut"], "mustard-oil": ["mustard oil"],
  "sunflower-oil": ["sunflower oil", "sunflower"], "sesame-oil": ["sesame oil", "til oil", "sesame"],
  "coconut-oil": ["coconut oil"], "olive-oil": ["olive oil"],
  "khapli-atta": ["khapli", "atta", "flour"], "multigrain-atta": ["multigrain", "atta", "flour"],
  "protein-atta": ["protein atta", "atta", "flour"], "moringa-powder": ["moringa"], sattu: ["sattu"],
  saffron: ["saffron", "kesar"], "turmeric-latte-mix": ["turmeric latte", "turmeric"],
  "ashwagandha-mix": ["ashwagandha"], amlaprash: ["amlaprash", "amla"], "dry-fruit-paak": ["dry fruit paak", "paak"],
};
const DISPLAY = {
  ghee: "Anveshan Ghee", khandsari: "Anveshan Khandsari (jaggery)", "jaggery-powder": "Anveshan Jaggery Powder",
  honey: "Anveshan Wild Forest Honey", "groundnut-oil": "Anveshan Groundnut Oil", "mustard-oil": "Anveshan Mustard Oil",
  "sunflower-oil": "Anveshan Sunflower Oil", "sesame-oil": "Anveshan Sesame Oil", "coconut-oil": "Anveshan Coconut Oil",
  "olive-oil": "Anveshan Olive Oil", "khapli-atta": "Anveshan Khapli Atta", "multigrain-atta": "Anveshan Multigrain Atta",
  "protein-atta": "Anveshan Protein Atta", "moringa-powder": "Anveshan Moringa Powder", sattu: "Anveshan Sattu",
  saffron: "Anveshan Kashmiri Saffron", "turmeric-latte-mix": "Anveshan Turmeric Latte", "ashwagandha-mix": "Anveshan Ashwagandha",
  amlaprash: "Anveshan Amlaprash", "dry-fruit-paak": "Anveshan Dry Fruit Paak",
};

(async () => {
  const snap = await getDocs(collection(db, "recipes"));
  const recipes = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  recipes.sort((a, b) => a.id.localeCompare(b.id));

  const out = [];
  for (const r of recipes) {
    const steps = (r.steps || []).join(" \n ").toLowerCase();
    const ids = new Set(r.anveshanProducts || []);
    (r.ingredients || []).forEach((i) => { if (i.anveshan && i.anveshanProductId) ids.add(i.anveshanProductId); });
    const missing = [...ids].filter((id) => !(PRODUCT_TERMS[id] || [id]).some((t) => steps.includes(t.toLowerCase())));
    if (missing.length) {
      out.push({
        id: r.id,
        name: r.name,
        ingredients: (r.ingredients || []).map((i) => `${i.quantity ?? ""} ${i.unit ?? ""} ${i.name}`.trim()),
        steps: r.steps || [],
        missingProducts: missing.map((id) => ({ id, display: DISPLAY[id] || id })),
      });
    }
  }
  const path = process.argv[2] || "mismatches.json";
  writeFileSync(path, JSON.stringify(out, null, 2));
  console.log(`Wrote ${out.length} recipes to ${path}`);
})();
