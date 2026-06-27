import { Recipe, AnveshanProduct } from "@/types";
import { getCategoryLabel, getSubLabel } from "./categories";

// The crawlable home of the recipe pages. Override per environment.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://anveshan-recipes.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Anveshan Kitchen";
export const BRAND_URL = "https://anveshan.farm";

/** "30 min" / "1 hr 15 min" / "2 hours" → ISO-8601 duration "PT1H15M". */
export function toISODuration(input?: string): string | undefined {
  if (!input) return undefined;
  const hr = input.match(/(\d+)\s*(?:h\b|hr|hour)/i);
  const min = input.match(/(\d+)\s*(?:m\b|min|minute)/i);
  let h = hr ? parseInt(hr[1], 10) : 0;
  let m = min ? parseInt(min[1], 10) : 0;
  if (!hr && !min) {
    const n = input.match(/\d+/); // bare number → assume minutes
    if (n) m = parseInt(n[0], 10);
  }
  if (!h && !m) return undefined;
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}`;
}

/** Sum two "X min"/"X hr" strings into one ISO-8601 duration. */
function totalISODuration(prep?: string, cook?: string): string | undefined {
  const toMin = (s?: string) => {
    if (!s) return 0;
    const hr = s.match(/(\d+)\s*(?:h\b|hr|hour)/i);
    const min = s.match(/(\d+)\s*(?:m\b|min|minute)/i);
    if (!hr && !min) {
      const n = s.match(/\d+/);
      return n ? parseInt(n[0], 10) : 0;
    }
    return (hr ? parseInt(hr[1], 10) * 60 : 0) + (min ? parseInt(min[1], 10) : 0);
  };
  const total = toMin(prep) + toMin(cook);
  if (!total) return undefined;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}`;
}

export function recipeUrl(slug: string): string {
  return `${SITE_URL}/recipes/${slug}`;
}

/**
 * schema.org/Recipe JSON-LD — the single biggest SEO/AEO/GEO signal for a
 * recipe page. Drives Google recipe rich results, AI Overviews and answer
 * engines (they parse this to answer "how do I make X").
 */
export function buildRecipeJsonLd(recipe: Recipe, products: AnveshanProduct[]) {
  const ingredientLines = recipe.ingredients.map((i) =>
    [i.quantity, i.unit, i.name].filter(Boolean).join(" ").trim()
  );

  const keywords = [
    ...(recipe.tags ?? []),
    ...products.map((p) => p.name),
    "Anveshan",
  ];

  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.name,
    description: recipe.description,
    image: recipe.image ? [recipe.image] : undefined,
    author: { "@type": "Organization", name: SITE_NAME, url: BRAND_URL },
    publisher: {
      "@type": "Organization",
      name: "Anveshan",
      url: BRAND_URL,
    },
    recipeCategory:
      getSubLabel(recipe.category, recipe.subCategory) ?? getCategoryLabel(recipe.category),
    recipeCuisine: "Indian",
    keywords: keywords.join(", "),
    prepTime: toISODuration(recipe.prepTime),
    cookTime: toISODuration(recipe.cookTime),
    totalTime: totalISODuration(recipe.prepTime, recipe.cookTime),
    recipeYield: recipe.servings ? `${recipe.servings} servings` : undefined,
    recipeIngredient: ingredientLines,
    recipeInstructions: recipe.steps.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      text: step,
    })),
    mainEntityOfPage: { "@type": "WebPage", "@id": recipeUrl(recipe.slug) },
  };
}

/** BreadcrumbList JSON-LD: Home › Category › Recipe. Helps AEO + breadcrumbs. */
export function buildBreadcrumbJsonLd(recipe: Recipe) {
  const categoryLabel = getCategoryLabel(recipe.category);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Recipes", item: `${SITE_URL}/recipes` },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryLabel,
        item: `${SITE_URL}/recipes?category=${encodeURIComponent(recipe.category)}`,
      },
      { "@type": "ListItem", position: 3, name: recipe.name, item: recipeUrl(recipe.slug) },
    ],
  };
}

/** FAQPage JSON-LD — strongest AEO signal (answer engines lift these Q&As). */
export function buildFaqJsonLd(recipe: Recipe) {
  if (!recipe.faqs || recipe.faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: recipe.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Organization + WebSite JSON-LD for the site root — brand entity for GEO. */
export function buildSiteJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Anveshan",
      url: BRAND_URL,
      sameAs: [
        "https://www.instagram.com/anveshan.farm",
        "https://www.facebook.com/anveshanfarm",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  ];
}
