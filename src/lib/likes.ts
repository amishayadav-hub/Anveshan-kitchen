// Shared shape for a liked recipe. Just enough to render the Liked page and the
// heart buttons without an extra recipe fetch. Storage + live sync live in the
// per-user LikesProvider (Firestore: users/{uid}/likedRecipes/{slug}).

export interface LikedRecipe {
  slug: string;
  name: string;
  image?: string;
}
