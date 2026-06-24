import Link from "next/link";
import { getAllProducts } from "@/lib/recipes";
import ShareRecipeForm from "@/components/recipes/ShareRecipeForm";

export const metadata = {
  title: "Share Your Recipe | Anveshan Kitchen",
  description: "Share a recipe you made with Anveshan products. The best ones get featured on Anveshan Kitchen.",
};

export default async function ShareRecipePage() {
  const products = await getAllProducts();
  // Sort alphabetically for a tidy chip list
  products.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main>
      {/* Hero */}
      <section className="bg-white border-b border-gray-100 py-12 px-4 text-center">
        <Link href="/recipes" className="text-anv-green text-sm font-medium hover:underline">
          ← Back to Recipes
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 leading-tight">
          Share Your Recipe
        </h1>
        <p className="mt-3 text-gray-500 max-w-lg mx-auto text-sm">
          Made something delicious with Anveshan products? Share it with the community — the best recipes
          get <span className="text-anv-green font-semibold">featured on Anveshan Kitchen</span>.
        </p>
      </section>

      <ShareRecipeForm products={products} />
    </main>
  );
}
