import { Recipe, AnveshanProduct } from "@/types";
import { getCategoryLabel, getSubLabel } from "./categories";
import type { GeneratedRecipe } from "@/lib/ai-providers";

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

/** CollectionPage + ItemList + BreadcrumbList JSON-LD for the recipes listing page. */
export function buildRecipeListJsonLd(recipes: Recipe[]): object[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Anveshan Kitchen Recipes",
      url: `${SITE_URL}/recipes`,
      description:
        "Healthy Indian recipes made with Anveshan's pure bilona ghee, wood-pressed oils, ancient-grain attas and superfoods.",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      publisher: { "@type": "Organization", name: "Anveshan", url: BRAND_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: recipes.map((recipe, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: recipeUrl(recipe.slug),
        name: recipe.name,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Recipes", item: `${SITE_URL}/recipes` },
      ],
    },
  ];
}

/** WebApplication + BreadcrumbList + FAQPage JSON-LD for the AI generator page. */
export function buildGeneratorPageJsonLd(): object[] {
  const org = { "@type": "Organization", name: "Anveshan", url: BRAND_URL };
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Anveshan AI Recipe Generator",
      url: `${SITE_URL}/recipes/generate`,
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      description:
        "Generate 4–5 healthy Indian recipe variations for any dish, each built around Anveshan's pure bilona ghee, wood-pressed oils and ancient-grain attas — with step-by-step method and one-click shopping.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      provider: org,
      publisher: org,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Recipes", item: `${SITE_URL}/recipes` },
        {
          "@type": "ListItem",
          position: 2,
          name: "AI Recipe Generator",
          item: `${SITE_URL}/recipes/generate`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does the Anveshan AI Recipe Generator work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Enter a dish name or the ingredients you have and the AI creates 4–5 full recipe variations, each built around Anveshan's pure ghee, wood-pressed oils and ancient-grain attas, with step-by-step instructions you can add to your cart in one click.",
          },
        },
        {
          "@type": "Question",
          name: "Is the AI recipe generator free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, generating recipes is completely free. You only pay if you choose to add Anveshan ingredients to your cart.",
          },
        },
        {
          "@type": "Question",
          name: "Can I get recipes in Hindi or Hinglish?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — switch to Hinglish mode to get the same recipes written in Hindi using English letters, the way most Indian kitchens actually talk.",
          },
        },
        {
          "@type": "Question",
          name: "Which Anveshan products do the recipes use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Recipes swap in Anveshan staples like bilona ghee (Gir Cow, Desi Cow, Buffalo), cold/wood-pressed oils, and Khapli or Multigrain attas — so you cook healthier with farm-direct, chemical-free ingredients.",
          },
        },
      ],
    },
  ];
}

/** ItemList of schema.org/Recipe JSON-LD for AI-generated recipe variations. */
export function buildGeneratedRecipesJsonLd(variations: GeneratedRecipe[]): object | null {
  if (!variations || variations.length === 0) return null;
  const org = { "@type": "Organization", name: "Anveshan", url: BRAND_URL };
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: variations.map((v, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Recipe",
        name: v.name,
        description: v.description,
        author: org,
        publisher: org,
        recipeCuisine: "Indian",
        keywords: [...v.anveshanProducts, "Anveshan"].join(", "),
        prepTime: toISODuration(v.prepTime),
        cookTime: toISODuration(v.cookTime),
        recipeYield: v.servings ? `${v.servings} servings` : undefined,
        recipeIngredient: v.ingredients.map((i) =>
          [i.quantity, i.unit, i.name].filter(Boolean).join(" ").trim()
        ),
        recipeInstructions: v.steps.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          text: step,
        })),
      },
    })),
  };
}
