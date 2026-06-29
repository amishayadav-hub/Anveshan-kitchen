import { GheeVariant } from "@/types";

// Price, image and Shopify variant id per product id, mirroring seed.ts so the
// AI generator can build real cart lines without a server round-trip.
// moringa-powder & sattu have no live SKU, so they're absent here (skipped in cart).
export interface ProductInfo {
  price: number;
  image: string;
  variantId: string;
}

export const PRODUCT_CATALOG: Record<string, ProductInfo> = {
  khandsari: { price: 105, variantId: "47070925095104", image: "https://cdn.shopify.com/s/files/1/0270/3346/9006/files/Artboard12_f22902d8-4e96-4490-b287-d58886566a1c.jpg?v=1765871764&width=200" },
  ghee: { price: 1250, variantId: "43355933212864", image: "https://cdn.shopify.com/s/files/1/0270/3346/9006/files/Artboard12_9aa0bb70-c8dd-4f7f-b2c0-81e248099162.jpg?v=1773726670&width=200" },
  "groundnut-oil": { price: 425, variantId: "43150198866112", image: "https://cdn.shopify.com/s/files/1/0270/3346/9006/files/Artboard_12_6.jpg?v=1763560050&width=200" },
  honey: { price: 383, variantId: "46476687114432", image: "https://cdn.shopify.com/s/files/1/0270/3346/9006/files/500gm.webp?v=1768374154&width=200" },
  "coconut-oil": { price: 977, variantId: "30393637404750", image: "https://cdn.shopify.com/s/files/1/0270/3346/9006/files/Artboard_12_4_67bdeb46-61b8-457b-98cf-0d75038260b4.jpg?v=1763559751&width=200" },
  "khapli-atta": { price: 240, variantId: "46719452676288", image: "https://cdn.shopify.com/s/files/1/0270/3346/9006/files/khapli_aata.webp?v=1767422899&width=200" },
  "mustard-oil": { price: 523, variantId: "30393367396430", image: "https://cdn.shopify.com/s/files/1/0270/3346/9006/files/Artboard12_2_422e0a2c-6179-4458-b457-da7ff2eb1385.jpg?v=1773726594&width=200" },
  "sunflower-oil": { price: 580, variantId: "43077260607680", image: "https://cdn.shopify.com/s/files/1/0270/3346/9006/files/Artboard12_1_7128c9f8-cd21-495d-a6ac-05b3af88c38b.jpg?v=1763558905&width=200" },
  "sesame-oil": { price: 750, variantId: "30393241829454", image: "https://cdn.shopify.com/s/files/1/0270/3346/9006/files/Artboard_12_3_09eb1085-3955-4ff8-aee7-cf6d913dd15e.jpg?v=1763559549&width=200" },
  "olive-oil": { price: 570, variantId: "45426734530752", image: "https://cdn.shopify.com/s/files/1/0270/3346/9006/files/Artboard12_b740ac29-b327-45cd-b764-e83483cbf015.jpg?v=1749576161&width=200" },
  "multigrain-atta": { price: 360, variantId: "48130399207616", image: "https://cdn.shopify.com/s/files/1/0270/3346/9006/files/Frontcopy1.06.16PM1.08.54PM.webp?v=1775561230&width=200" },
  "protein-atta": { price: 360, variantId: "48130399207616", image: "https://cdn.shopify.com/s/files/1/0270/3346/9006/files/Frontcopy1.06.16PM1.08.54PM.webp?v=1775561230&width=200" },
  "turmeric-latte-mix": { price: 370, variantId: "47258532577472", image: "https://cdn.shopify.com/s/files/1/0270/3346/9006/files/Artboard_12_12ec8eef-dde2-4635-8906-105c93273fdc.jpg?v=1767420716&width=200" },
  "ashwagandha-mix": { price: 370, variantId: "47258532577472", image: "https://cdn.shopify.com/s/files/1/0270/3346/9006/files/Artboard_12_12ec8eef-dde2-4635-8906-105c93273fdc.jpg?v=1767420716&width=200" },
  saffron: { price: 450, variantId: "43376001122496", image: "https://cdn.shopify.com/s/files/1/0270/3346/9006/files/safron-g-1g.jpg?v=1753953941&width=200" },
  "jaggery-powder": { price: 105, variantId: "47070925095104", image: "https://cdn.shopify.com/s/files/1/0270/3346/9006/files/Artboard12_f22902d8-4e96-4490-b287-d58886566a1c.jpg?v=1765871764&width=200" },
  amlaprash: { price: 343, variantId: "46033354064064", image: "https://cdn.shopify.com/s/files/1/0270/3346/9006/files/front.jpg?v=1773726357&width=200" },
  "dry-fruit-paak": { price: 345, variantId: "47258508755136", image: "https://cdn.shopify.com/s/files/1/0270/3346/9006/files/Artboard12_21d90bc8-2bac-44a7-9605-9e1a43ab806b.jpg?v=1765871043&width=200" },
};

// Ghee sub-variants carry their own variant id + price (image shared with ghee).
export const GHEE_VARIANT_INFO: Record<GheeVariant, { variantId: string; price: number; label: string }> = {
  "gir-cow": { variantId: "43355933212864", price: 1250, label: "Gir Cow" },
  "desi-cow": { variantId: "32459662557262", price: 1045, label: "Desi Cow" },
  buffalo: { variantId: "45791842533568", price: 705, label: "Buffalo" },
};
