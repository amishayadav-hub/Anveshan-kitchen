import { Recipe, AnveshanProduct } from "@/types";
import RecipeCard from "@/components/recipes/RecipeCard";

interface Props {
  recipes: Recipe[];
  products: Record<string, AnveshanProduct>;
}

export default function RelatedRecipes({ recipes, products }: Props) {
  if (!recipes.length) return null;

  return (
    <section className="mt-12 md:mt-16">
      <h2 className="text-xl font-bold text-gray-900 mb-4">You might also like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {recipes.map((r) => (
          <RecipeCard key={r.slug} recipe={r} productMap={products} />
        ))}
      </div>
    </section>
  );
}
