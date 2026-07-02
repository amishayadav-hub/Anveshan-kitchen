import { getAllRecipes, getAllProducts } from "@/lib/recipes";
import RecipeBrowser from "@/components/recipes/RecipeBrowser";
import JsonLd from "@/components/JsonLd";
import { buildRecipeListJsonLd, SITE_URL, SITE_NAME } from "@/lib/seo";
import { AnveshanProduct } from "@/types";

const TITLE = "Healthy Indian Recipes with Ghee, Cold-Pressed Oils & Atta | Anveshan Kitchen";
const DESCRIPTION =
  "Browse healthy Indian recipes made with Anveshan's pure bilona ghee, wood-pressed oils, ancient-grain attas and superfoods. Cook tastier, shop the ingredients in one click.";

// Re-fetch Firestore hourly so newly added recipes/slugs get picked up (ISR).
export const revalidate = 3600;

export const metadata = {
  // `absolute` so the root layout's "%s | Anveshan Kitchen" template doesn't
  // double-append the brand (TITLE already ends in "| Anveshan Kitchen").
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "Indian recipes",
    "healthy recipes",
    "ghee recipes",
    "wood-pressed oil recipes",
    "atta recipes",
    "Anveshan",
  ],
  alternates: { canonical: `${SITE_URL}/recipes` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/recipes`,
    title: TITLE,
    description: DESCRIPTION,
    siteName: SITE_NAME,
  },
};

interface Props {
  searchParams: Promise<{ category?: string; q?: string }>;
}

export default async function RecipesPage({ searchParams }: Props) {
  const sp = await searchParams;
  const initialCategory = typeof sp.category === "string" ? sp.category : "all";
  const initialQuery = typeof sp.q === "string" ? sp.q : "";

  const [recipes, products] = await Promise.all([getAllRecipes(), getAllProducts()]);

  // productId -> product, so recipe cards can show image circles + build a cart link
  const productMap: Record<string, AnveshanProduct> = {};
  products.forEach((p) => {
    productMap[p.id] = p;
  });

  return (
    <main>
      <JsonLd data={buildRecipeListJsonLd(recipes)} />
      {/* Recipes (two-level filter + grid) */}
      <section className="max-w-6xl mx-auto px-4 pt-6 pb-10">
        {recipes.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">Recipes coming soon.</p>
          </div>
        ) : (
          // key forces a fresh filter state when the nav switches ?category=
          <RecipeBrowser
            key={initialCategory}
            recipes={recipes}
            productMap={productMap}
            initialCategory={initialCategory}
            initialQuery={initialQuery}
          />
        )}
      </section>
    </main>
  );
}
