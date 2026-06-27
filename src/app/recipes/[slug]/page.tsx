import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRecipeBySlug, getProductsByIds, getAllRecipes } from "@/lib/recipes";
import { getCategoryLabel, getSubLabel } from "@/lib/categories";
import {
  buildRecipeJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  recipeUrl,
  SITE_NAME,
} from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import RecipeView from "@/components/recipes/RecipeView";

interface Props {
  params: Promise<{ slug: string }>;
}

// Prerender every recipe at build time → static HTML with metadata + JSON-LD
// in the initial <head>, which crawlers and answer engines read most reliably.
export async function generateStaticParams() {
  const recipes = await getAllRecipes();
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) return { title: "Recipe not found" };

  const products = await getProductsByIds(recipe.anveshanProducts);
  const productNames = products.map((p) => p.name);
  // Answer-engine friendly: lead with the dish, the yield/time and the Anveshan hook.
  const description =
    `${recipe.description} Ready in ${recipe.prepTime} prep + ${recipe.cookTime} cook, serves ${recipe.servings}.` +
    (productNames.length ? ` Made with Anveshan ${productNames.slice(0, 3).join(", ")}.` : "");
  const title = `${recipe.name} Recipe`;
  const keywords = [
    recipe.name,
    `${recipe.name} recipe`,
    `how to make ${recipe.name}`,
    getCategoryLabel(recipe.category),
    ...(recipe.tags ?? []),
    ...productNames,
  ];

  return {
    title,
    description: description.slice(0, 300),
    keywords,
    alternates: { canonical: recipeUrl(recipe.slug) },
    openGraph: {
      type: "article",
      title: `${recipe.name} Recipe | ${SITE_NAME}`,
      description: recipe.description,
      url: recipeUrl(recipe.slug),
      siteName: SITE_NAME,
      images: recipe.image ? [{ url: recipe.image, alt: recipe.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${recipe.name} Recipe`,
      description: recipe.description,
      images: recipe.image ? [recipe.image] : undefined,
    },
  };
}

export default async function RecipeDetailPage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) notFound();

  const products = await getProductsByIds(recipe.anveshanProducts);
  const categoryLabel =
    getSubLabel(recipe.category, recipe.subCategory) ?? getCategoryLabel(recipe.category);

  return (
    <main>
      <JsonLd
        data={[
          buildRecipeJsonLd(recipe, products),
          buildBreadcrumbJsonLd(recipe),
          ...(buildFaqJsonLd(recipe) ? [buildFaqJsonLd(recipe)!] : []),
        ]}
      />
      <RecipeView recipe={recipe} products={products} categoryLabel={categoryLabel} />
    </main>
  );
}
