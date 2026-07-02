// Device-local liked-recipes store (localStorage). Enough info is saved per like
// to render the Liked page without a data fetch. Swap for per-user Firestore
// storage once real auth is in place. Dispatches a same-tab event so the heart
// buttons and the Liked page stay in sync live.

export interface LikedRecipe {
  slug: string;
  name: string;
  image?: string;
}

const KEY = "anveshan-liked-recipes";
export const LIKES_EVENT = "anveshan-likes-changed";

export function getLiked(): LikedRecipe[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as LikedRecipe[]) : [];
  } catch {
    return [];
  }
}

export function isLiked(slug: string): boolean {
  return getLiked().some((r) => r.slug === slug);
}

function save(list: LikedRecipe[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* storage full / unavailable — no-op */
  }
  window.dispatchEvent(new Event(LIKES_EVENT));
}

/** Toggle a recipe's liked state. Returns the new state (true = now liked). */
export function toggleLike(recipe: LikedRecipe): boolean {
  const list = getLiked();
  const exists = list.some((r) => r.slug === recipe.slug);
  save(
    exists
      ? list.filter((r) => r.slug !== recipe.slug)
      : [{ slug: recipe.slug, name: recipe.name, image: recipe.image }, ...list]
  );
  return !exists;
}

export function removeLike(slug: string): void {
  save(getLiked().filter((r) => r.slug !== slug));
}
