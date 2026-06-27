import type { ReactNode } from "react";
import type { GheeVariant } from "@/types";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "anveshan.farm";

// productId → live Shopify product handle (for the PDP link).
// Empty string = no live SKU → branded + bold but NOT linked.
export const PRODUCT_HANDLES: Record<string, string> = {
  khandsari: "jaggerypowder",
  ghee: "gir-cow-ghee",
  "groundnut-oil": "wood-pressed-groundnut-oil",
  honey: "wild-forest-honey",
  "coconut-oil": "wood-pressed-coconut-oil",
  "khapli-atta": "cold-pressed-khapli-atta-low-100-emmer-wheat-gi-high-fiber-stone-ground-flour",
  "mustard-oil": "wood-pressed-mustard-oil",
  "sunflower-oil": "sunflower-oil",
  "sesame-oil": "wood-pressed-black-sesame-oil",
  "olive-oil": "extra-virgin-olive-oil",
  "multigrain-atta": "khapli-multigrain-atta",
  "protein-atta": "khapli-multigrain-atta",
  "moringa-powder": "",
  sattu: "",
  "turmeric-latte-mix": "turmeric-latte",
  "ashwagandha-mix": "turmeric-latte",
  saffron: "kashmiri-mongra-saffron",
  "jaggery-powder": "jaggerypowder",
  amlaprash: "amlaprash",
  "dry-fruit-paak": "dry-fruit-paak-bites",
};

// productId → keyword(s) to detect inside free-text step instructions.
export const PRODUCT_TERMS: Record<string, string[]> = {
  ghee: ["ghee"],
  khandsari: ["khandsari"],
  "jaggery-powder": ["jaggery powder", "jaggery"],
  honey: ["honey"],
  "groundnut-oil": ["groundnut oil", "groundnut"],
  "mustard-oil": ["mustard oil"],
  "sunflower-oil": ["sunflower oil"],
  "sesame-oil": ["sesame oil", "til oil"],
  "coconut-oil": ["coconut oil"],
  "olive-oil": ["olive oil"],
  "khapli-atta": ["khapli atta", "khapli"],
  "multigrain-atta": ["multigrain atta", "multigrain"],
  "protein-atta": ["protein atta"],
  "moringa-powder": ["moringa"],
  sattu: ["sattu"],
  saffron: ["saffron", "kesar"],
  "turmeric-latte-mix": ["turmeric latte"],
  "ashwagandha-mix": ["ashwagandha"],
  amlaprash: ["amlaprash"],
  "dry-fruit-paak": ["dry fruit paak"],
};

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function pdpUrl(handle: string): string {
  return `https://${SHOPIFY_DOMAIN}/products/${handle}`;
}

/** PDP URL for an internal productId, or null when there's no live SKU. */
export function pdpUrlForProduct(productId: string): string | null {
  const handle = PRODUCT_HANDLES[productId];
  return handle ? pdpUrl(handle) : null;
}

// Per-ghee-variety PDP handle + product image + tasting/Ayurvedic attributes
// (shown in the hover popover on the ghee variety chips).
export interface GheeVarietyInfo {
  handle: string;
  image: string;
  flavour: string;
  texture: string;
  bestFor: string;
  ayurvedic: string;
}

export const GHEE_VARIETY: Record<GheeVariant, GheeVarietyInfo> = {
  "gir-cow": {
    handle: "gir-cow-ghee",
    image:
      "https://cdn.shopify.com/s/files/1/0270/3346/9006/files/Artboard12_9aa0bb70-c8dd-4f7f-b2c0-81e248099162.jpg?v=1773726670",
    flavour: "Sweet and lactic",
    texture: "Golden, light grains",
    bestFor: "Digestion & Nourishment",
    ayurvedic: "Boosts Metabolism",
  },
  "desi-cow": {
    handle: "a2-desi-ghee",
    image:
      "https://cdn.shopify.com/s/files/1/0270/3346/9006/files/Desi-cow-ghee-500-ml.jpg?v=1778050408",
    flavour: "Sweet & caramelized",
    texture: "Pale yellow, heavy grains",
    bestFor: "Strength & Stamina",
    ayurvedic: "Prevents Infections",
  },
  buffalo: {
    handle: "desi-buffalo-ghee",
    image:
      "https://cdn.shopify.com/s/files/1/0270/3346/9006/files/Artboard12_996aed27-904d-4cfe-8982-aede84ad567c.jpg?v=1749579826",
    flavour: "Sour and lactic",
    texture: "White, dense & smooth",
    bestFor: "Muscles & Sleep",
    ayurvedic: "Reduces Acidity",
  },
};

/**
 * Brands + bolds every Anveshan-product mention in free step text, and links it
 * to that product's PDP (opens in a new tab). Only the products actually used in
 * the recipe (productIds) are matched, so unrelated words are never touched.
 *
 *   "dissolve the jaggery powder"  →  "dissolve the **Anveshan jaggery powder**"
 *   (bold black, clickable → anveshan.farm/products/jaggerypowder)
 */
export function highlightProductMentions(text: string, productIds: string[]): ReactNode {
  // Build (term → productId) entries for just this recipe's products, longest first
  // so "jaggery powder" wins over "jaggery", "khapli atta" over "khapli", etc.
  const entries: { term: string; productId: string }[] = [];
  const seen = new Set<string>();
  for (const id of productIds) {
    for (const term of PRODUCT_TERMS[id] ?? []) {
      const key = term.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      entries.push({ term, productId: id });
    }
  }
  if (entries.length === 0) return text;
  entries.sort((a, b) => b.term.length - a.term.length);

  const termToId = new Map(entries.map((e) => [e.term.toLowerCase(), e.productId]));
  const alternation = entries.map((e) => escapeRe(e.term)).join("|");
  // optionally swallow an existing "Anveshan " prefix so we never double it
  const re = new RegExp(`(?:Anveshan\\s+)?\\b(${alternation})\\b`, "gi");

  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const core = m[1];
    const productId = termToId.get(core.toLowerCase());
    const handle = productId ? PRODUCT_HANDLES[productId] : "";
    const label = `Anveshan ${core}`;

    if (handle) {
      out.push(
        <a
          key={`${m.index}-${k}`}
          href={pdpUrl(handle)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-gray-900 underline decoration-anv-green/40 underline-offset-2 hover:text-anv-green hover:decoration-anv-green transition-colors"
        >
          {label}
        </a>
      );
    } else {
      // no live PDP (e.g. moringa, sattu) — still brand + bold, just not clickable
      out.push(
        <strong key={`${m.index}-${k}`} className="font-bold text-gray-900">
          {label}
        </strong>
      );
    }
    last = m.index + m[0].length;
    k++;
    if (re.lastIndex === m.index) re.lastIndex++;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
