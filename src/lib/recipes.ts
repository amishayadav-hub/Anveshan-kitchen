import { cache } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Recipe, AnveshanProduct } from "@/types";
import { FEATURES } from "./features";

// Module-level memo: fetch each collection at most ONCE per server/build worker.
// The recipe pages are statically prerendered, so building 100+ pages used to
// re-read the whole `recipes`/`products` collections several times PER page
// across many parallel workers — hundreds of full-collection reads that
// crashed the build worker. Sharing a single in-flight promise collapses that
// to one read per collection per worker. (react `cache()` only dedupes within
// a single request/page, not across the whole build.)
let recipesPromise: Promise<Recipe[]> | null = null;
let productsPromise: Promise<AnveshanProduct[]> | null = null;

async function loadRecipes(): Promise<Recipe[]> {
  if (!recipesPromise) {
    recipesPromise = getDocs(collection(db, "recipes")).then((snap) =>
      snap.docs.map((d) => ({ id: d.id, ...d.data() } as Recipe))
    );
  }
  const all = await recipesPromise;
  // Freeze non-veg recipes site-wide when the flag is off. Every consumer
  // (listing, detail pages, related, liked, sitemap) reads through here, so
  // non-veg recipes vanish everywhere and their URLs 404 — no code removed.
  return FEATURES.nonVegRecipes ? all : all.filter((r) => r.isVeg !== false);
}

export const getAllRecipes = cache(loadRecipes);
// Client-safe variant (no react cache(), which is Server-Component only).
export const getAllRecipesClient = loadRecipes;

export const getRecipeBySlug = cache(async (slug: string): Promise<Recipe | null> => {
  const recipes = await getAllRecipes();
  return recipes.find((r) => r.slug === slug) ?? null;
});

async function loadProducts(): Promise<AnveshanProduct[]> {
  if (!productsPromise) {
    productsPromise = getDocs(collection(db, "products")).then((snap) =>
      snap.docs.map((d) => ({ id: d.id, ...d.data() } as AnveshanProduct))
    );
  }
  return productsPromise;
}

export const getAllProducts = cache(loadProducts);
// Client-safe variant (no react cache(), which is Server-Component only).
export const getAllProductsClient = loadProducts;

export const getProductsByIds = cache(async (ids: string[]): Promise<AnveshanProduct[]> => {
  const all = await getAllProducts();
  const byId = new Map(all.map((p) => [p.id, p]));
  return ids.map((id) => byId.get(id)).filter(Boolean) as AnveshanProduct[];
});
