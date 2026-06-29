import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, buildGeneratorPageJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import GenerateClient from "./GenerateClient";

const TITLE = "AI Recipe Generator — Cook Any Dish the Anveshan Way";
const DESCRIPTION =
  "Type any dish and our AI builds 4–5 healthy Indian recipe variations, each made with Anveshan's pure bilona ghee, wood-pressed oils and ancient-grain attas — step-by-step, with one-click shopping. Free, in English or Hinglish.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "AI recipe generator",
    "Indian recipe generator",
    "healthy recipe generator",
    "recipe from ingredients",
    "ghee recipes",
    "wood-pressed oil recipes",
    "khapli atta recipes",
    "Anveshan recipes",
    "Hinglish recipes",
  ],
  alternates: { canonical: `${SITE_URL}/recipes/generate` },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: `${SITE_URL}/recipes/generate`,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

export default function GenerateRecipePage() {
  return (
    <>
      <JsonLd data={buildGeneratorPageJsonLd()} />
      <GenerateClient />
    </>
  );
}
