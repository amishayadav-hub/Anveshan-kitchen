import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Recipe, AnveshanProduct } from "@/types";

export async function getAllRecipes(): Promise<Recipe[]> {
  const snap = await getDocs(collection(db, "recipes"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Recipe));
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const snap = await getDocs(collection(db, "recipes"));
  const match = snap.docs.find((d) => d.data().slug === slug);
  if (!match) return null;
  return { id: match.id, ...match.data() } as Recipe;
}

export async function getAllProducts(): Promise<AnveshanProduct[]> {
  const snap = await getDocs(collection(db, "products"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as AnveshanProduct));
}

export async function getProductsByIds(ids: string[]): Promise<AnveshanProduct[]> {
  const results = await Promise.all(
    ids.map((id) => getDoc(doc(db, "products", id)))
  );
  return results
    .filter((d) => d.exists())
    .map((d) => ({ id: d.id, ...d.data() } as AnveshanProduct));
}
