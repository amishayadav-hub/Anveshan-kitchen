import type { Metadata } from "next";
import SmartSearch from "@/components/recipes/SmartSearch";

export const metadata: Metadata = {
  title: "Smart Recipe Search",
  description: "Semantic recipe search powered by on-device embeddings (Transformers.js).",
};

export default function SmartSearchPage() {
  return (
    <main>
      <SmartSearch />
    </main>
  );
}
