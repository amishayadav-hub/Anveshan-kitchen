import type { MetadataRoute } from "next";
import { getAllRecipes } from "@/lib/recipes";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recipes = await getAllRecipes();

  const recipeUrls: MetadataRoute.Sitemap = recipes.map((r) => ({
    url: `${SITE_URL}/recipes/${r.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/recipes`, changeFrequency: "weekly", priority: 0.9 },
    ...recipeUrls,
  ];
}
