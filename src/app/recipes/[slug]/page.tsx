import { notFound } from "next/navigation";
import Image from "next/image";
import { getRecipeBySlug, getProductsByIds } from "@/lib/recipes";
import { getCategoryLabel, getSubLabel } from "@/lib/categories";
import RecipeDetailClient from "./RecipeDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
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
      {/* Hero Image */}
      <div className="relative h-72 md:h-96 w-full bg-anv-cream/30">
        <Image
          src={recipe.image || "/placeholder-recipe.jpg"}
          alt={recipe.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white">
          <span className="text-xs bg-anv-green px-2.5 py-1 rounded-full font-medium">
            {categoryLabel}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">{recipe.name}</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-white/80">
            <span>Prep {recipe.prepTime}</span>
            <span>Cook {recipe.cookTime}</span>
            <span>{recipe.servings} servings</span>
          </div>
        </div>
      </div>

      {/* Body — extra bottom padding so the sticky cart bar never covers content */}
      <div className="max-w-4xl mx-auto px-4 pt-10 pb-28 grid md:grid-cols-[1fr_340px] gap-10">
        {/* Left — Steps */}
        <section>
          <p className="text-gray-600 mb-8 text-base leading-relaxed">{recipe.description}</p>

          <h2 className="text-xl font-bold text-gray-900 mb-4">Instructions</h2>
          <ol className="space-y-4">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-anv-cream text-anv-green font-bold text-sm flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-gray-700 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Right — Ingredients + Cart */}
        <RecipeDetailClient recipe={recipe} products={products} />
      </div>
    </main>
  );
}
