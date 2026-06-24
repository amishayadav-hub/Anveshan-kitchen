import { getAllRecipes, getAllProducts } from "@/lib/recipes";
import RecipeBrowser from "@/components/recipes/RecipeBrowser";
import { AnveshanProduct } from "@/types";

export const metadata = {
  title: "Recipes | Anveshan Kitchen",
  description: "Healthy Indian recipes made with Anveshan's pure ghee, wood-pressed oils, attas and superfoods.",
};

export default async function RecipesPage() {
  const [recipes, products] = await Promise.all([getAllRecipes(), getAllProducts()]);

  // productId -> product, so recipe cards can show image circles + build a cart link
  const productMap: Record<string, AnveshanProduct> = {};
  products.forEach((p) => {
    productMap[p.id] = p;
  });

  return (
    <main>
      {/* Recipes (two-level filter + grid) */}
      <section className="max-w-6xl mx-auto px-4 pt-6 pb-10">
        {recipes.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">Recipes coming soon.</p>
          </div>
        ) : (
          <RecipeBrowser recipes={recipes} productMap={productMap} />
        )}
      </section>
    </main>
  );
}
