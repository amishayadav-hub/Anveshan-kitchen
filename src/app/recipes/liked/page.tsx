import type { Metadata } from "next";
import { getAllRecipes, getAllProducts } from "@/lib/recipes";
import { AnveshanProduct } from "@/types";
import LikedClient from "./LikedClient";

export const metadata: Metadata = {
  title: "Liked Recipes",
  description: "Recipes you've saved to your Anveshan Kitchen collection.",
};

// Fetch all recipes + products (same cached loaders the listing uses) so the
// Liked page can render the exact same RecipeCard. The client filters this down
// to the signed-in user's liked slugs.
export default async function LikedPage() {
  const [recipes, products] = await Promise.all([getAllRecipes(), getAllProducts()]);
  const productMap: Record<string, AnveshanProduct> = Object.fromEntries(
    products.map((p) => [p.id, p])
  );
  return <LikedClient recipes={recipes} productMap={productMap} />;
}
