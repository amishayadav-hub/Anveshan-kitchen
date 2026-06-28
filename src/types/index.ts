export type GheeVariant = "gir-cow" | "desi-cow" | "buffalo";

export interface AnveshanProduct {
  id: string;
  shopifyVariantId: string; // Shopify variant ID for cart API
  name: string;
  image: string;
  price: number;
  category: "ghee" | "sweetener" | "oil" | "grain" | "spice" | "superfood";
  variants?: GheeVariantOption[]; // only for ghee products
  whyAnveshan: string; // e.g. "Cold-pressed, unrefined — no bleaching agents"
}

export interface GheeVariantOption {
  type: GheeVariant;
  label: string;
  shopifyVariantId: string;
  price: number;
}

export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
  anveshan?: boolean; // true if this ingredient is sold by Anveshan
  anveshanProductId?: string; // links to AnveshanProduct.id
  note?: string; // e.g. "Anveshan's khandsari replaces refined sugar"
}

export interface Recipe {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  category: string; // top-level taxonomy key (see lib/categories.ts)
  subCategory?: string; // sub-product key for product groups (e.g. "desi-ghee")
  ingredients: Ingredient[];
  steps: string[];
  anveshanProducts: string[]; // array of AnveshanProduct IDs used in this recipe
  tags?: string[];
  isVeg?: boolean; // false = non-veg (contains meat/fish/egg); hidden in Veg Mode

  intro?: string; // SEO/AEO lead paragraph that directly answers "what is X / how to make X"
  faqs?: { question: string; answer: string }[]; // powers visible FAQ + FAQPage schema
  tips?: string[]; // expert tips / variations (extra crawlable, answer-friendly content)
}

export interface CartItem {
  shopifyVariantId: string;
  quantity: number;
  productName: string;
}

// A line in the local AJAX cart (drawer). Keyed by variantId.
export interface CartLine {
  variantId: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
}
