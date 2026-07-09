// ─── Recipe category taxonomy ────────────────────────────────────────────────
// Two-level structure: product groups (with sub-products) + plain dish types.
// Each recipe belongs to exactly ONE top-level category (exclusive).
// Product-group recipes also carry a `subCategory` (e.g. "desi-ghee").

export interface SubCategory {
  key: string;
  label: string;
}

export interface Category {
  key: string;
  label: string;
  kind: "product" | "dish";
  subs?: SubCategory[];
}

export const CATEGORIES: Category[] = [
  {
    key: "ghee",
    label: "Ghee Recipes",
    kind: "product",
    // No sub-categories — all ghee recipes live under one group.
    // The 3 ghee varieties (Gir Cow / Desi Cow / Buffalo) are chosen at buy
    // time via the ghee product's variant selector, not as recipe filters.
  },
  {
    key: "oil",
    label: "Oil Recipes",
    kind: "product",
    subs: [
      { key: "groundnut-oil", label: "Groundnut Oil" },
      { key: "mustard-oil", label: "Mustard Oil" },
      { key: "sunflower-oil", label: "Sunflower Oil" },
      { key: "coconut-oil", label: "Coconut Oil" },
      { key: "sesame-oil", label: "Sesame Oil" },
      { key: "olive-oil", label: "Olive Oil" },
    ],
  },
  {
    key: "atta",
    label: "Atta Recipes",
    kind: "product",
    subs: [
      { key: "multigrain-atta", label: "Multigrain Atta" },
      { key: "khapli-atta", label: "Khapli Atta" },
      { key: "protein-atta", label: "Protein Atta" },
    ],
  },
  {
    key: "superfood",
    label: "Superfood Recipes",
    kind: "product",
    subs: [
      { key: "moringa", label: "Moringa" },
      { key: "sattu", label: "Sattu" },
      { key: "turmeric-latte", label: "Turmeric Latte" },
      { key: "ashwagandha", label: "Ashwagandha Mix" },
      { key: "honey", label: "Honey" },
      { key: "saffron", label: "Saffron" },
      { key: "jaggery", label: "Jaggery Powder" },
      { key: "amlaprash", label: "Amlaprash" },
      { key: "dry-fruit-paak", label: "Dry Fruit Paak" },
    ],
  },
  { key: "chutney", label: "Chutney", kind: "dish" },
  { key: "breakfast", label: "Breakfast", kind: "dish" },
  { key: "lunch", label: "Lunch", kind: "dish" },
  { key: "sweet", label: "Sweet", kind: "dish" },
  { key: "dessert", label: "Dessert", kind: "dish" },
  { key: "main-course", label: "Main Course", kind: "dish" },
  { key: "snack", label: "Snack", kind: "dish" },
  { key: "starter", label: "Starter", kind: "dish" },
  { key: "drink", label: "Drink", kind: "dish" },
];

export function getCategory(key: string): Category | undefined {
  return CATEGORIES.find((c) => c.key === key);
}

export function getCategoryLabel(key: string): string {
  return getCategory(key)?.label ?? key;
}

export function getSubLabel(categoryKey: string, subKey?: string): string | undefined {
  if (!subKey) return undefined;
  return getCategory(categoryKey)?.subs?.find((s) => s.key === subKey)?.label;
}
