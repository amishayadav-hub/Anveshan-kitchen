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

(async () => {
  const snap = await getDocs(collection(db, "recipes"));
  const recipes = snap.docs.map((d) => {
    const r = d.data();
    return {
      id: d.id,
      name: r.name,
      category: r.category,
      servings: r.servings,
      ingredients: (r.ingredients || []).map((i) =>
        [i.quantity, i.unit, i.name].filter(Boolean).join(" ").trim()
      ),
    };
  });
  recipes.sort((a, b) => a.id.localeCompare(b.id));
  const out = process.argv[2] || "recipes-servings.json";
  writeFileSync(out, JSON.stringify(recipes, null, 2));
  console.log(`Wrote ${recipes.length} recipes to ${out}`);
})();
