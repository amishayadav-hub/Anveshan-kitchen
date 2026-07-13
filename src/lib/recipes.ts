import { cache } from "react";
import { collection, getDocs, query, where, limit as fbLimit } from "firebase/firestore";
import { db } from "./firebase";
import { Recipe, AnveshanProduct } from "@/types";
import { FEATURES } from "./features";

// Whether a recipe is hidden by the non-veg freeze flag.
function hiddenByFlag(r: Recipe): boolean {
  return !FEATURES.nonVegRecipes && r.isVeg === false;
}

// Build-time memo: fetch each collection at most ONCE per build worker.
// The recipe pages are statically prerendered, so building 100+ pages used to
// re-read the whole `recipes`/`products` collections several times PER page
// across many parallel workers — hundreds of full-collection reads that
// crashed the build worker. Sharing a single in-flight promise collapses that
// to one read per collection per worker. (react `cache()` only dedupes within
// a single request/page, not across the whole build.)
//
// IMPORTANT: this memo is BUILD-ONLY. At runtime it would pin a stale snapshot
// for the life of the server process, so admin edits (surfaced via
// revalidatePath from /api/revalidate) would never appear. At runtime we read
// fresh on each render instead — react `cache()` still dedupes within a single
// request, and prerendered pages only re-render on revalidation, so this stays
// cheap while letting edits go live.
const IS_BUILD = process.env.NEXT_PHASE === "phase-production-build";
let recipesPromise: Promise<Recipe[]> | null = null;
let productsPromise: Promise<AnveshanProduct[]> | null = null;

function fetchRecipes(): Promise<Recipe[]> {
  return getDocs(collection(db, "recipes")).then((snap) =>
    snap.docs.map((d) => ({ id: d.id, ...d.data() } as Recipe))
  );
}

async function loadRecipes(): Promise<Recipe[]> {
  let all: Recipe[];
  if (IS_BUILD) {
    if (!recipesPromise) recipesPromise = fetchRecipes();
    all = await recipesPromise;
  } else {
    all = await fetchRecipes();
  }
  // Freeze non-veg recipes site-wide when the flag is off. Every consumer
  // (listing, detail pages, related, liked, sitemap) reads through here, so
  // non-veg recipes vanish everywhere and their URLs 404 — no code removed.
  return FEATURES.nonVegRecipes ? all : all.filter((r) => r.isVeg !== false);
}

export const getAllRecipes = cache(loadRecipes);
// Client-safe variant (no react cache(), which is Server-Component only).
export const getAllRecipesClient = loadRecipes;

// Single-doc lookup by slug — ONE read via a where() query instead of scanning
// the whole `recipes` collection.
export const getRecipeBySlug = cache(async (slug: string): Promise<Recipe | null> => {
  const snap = await getDocs(query(collection(db, "recipes"), where("slug", "==", slug), fbLimit(1)));
  if (snap.empty) return null;
  const r = { id: snap.docs[0].id, ...snap.docs[0].data() } as Recipe;
  return hiddenByFlag(r) ? null : r; // frozen non-veg recipes 404
});

// Related recipes for a detail page: read only a small slice of the same
// category (a few reads) instead of the entire collection.
export const getRecipesByCategory = cache(
  async (category: string, excludeSlug: string, n: number): Promise<Recipe[]> => {
    const snap = await getDocs(
      query(collection(db, "recipes"), where("category", "==", category), fbLimit(n + 6))
    );
    return snap.docs
      .map((d) => ({ id: d.id, ...d.data() } as Recipe))
      .filter((r) => r.slug !== excludeSlug && !hiddenByFlag(r))
      .slice(0, n);
  }
);

function fetchProducts(): Promise<AnveshanProduct[]> {
  return getDocs(collection(db, "products")).then((snap) =>
    snap.docs.map((d) => ({ id: d.id, ...d.data() } as AnveshanProduct))
  );
}

async function loadProducts(): Promise<AnveshanProduct[]> {
  if (IS_BUILD) {
    if (!productsPromise) productsPromise = fetchProducts();
    return productsPromise;
  }
  return fetchProducts();
}

export const getAllProducts = cache(loadProducts);
// Client-safe variant (no react cache(), which is Server-Component only).
export const getAllProductsClient = loadProducts;

export const getProductsByIds = cache(async (ids: string[]): Promise<AnveshanProduct[]> => {
  const all = await getAllProducts();
  const byId = new Map(all.map((p) => [p.id, p]));
  return ids.map((id) => byId.get(id)).filter(Boolean) as AnveshanProduct[];
});
