// Shared shape for the regional recipe sets (Rajasthani, Punjabi, Haryanvi,
// Bihari, Maharashtrian). Mirrors the entries in seed.ts. Images are blank so
// the UI falls back to the site placeholder; real photos can be added in admin.

export interface RegionalIngredient {
  name: string;
  quantity: string;
  unit: string;
  anveshan: boolean;
  anveshanProductId?: string;
  note?: string;
}

export interface RegionalFaq {
  question: string;
  answer: string;
}

export type MealCategory = "breakfast" | "lunch" | "sweet" | "drink" | "chutney" | "snack" | "starter";

export interface RegionalRecipe {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  category: MealCategory;
  region: string;
  tags: string[];
  anveshanProducts: string[];
  ingredients: RegionalIngredient[];
  steps: string[];
  tips: string[];
  faqs: RegionalFaq[];
}
