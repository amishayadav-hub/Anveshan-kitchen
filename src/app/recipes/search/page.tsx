import type { Metadata } from "next";
import SmartSearch from "@/components/recipes/SmartSearch";

export const metadata: Metadata = {
  title: "Smart Recipe Search",
  description: "Semantic recipe search powered by on-device embeddings (Transformers.js).",
};

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SmartSearchPage({ searchParams }: Props) {
  const sp = await searchParams;
  const initialQuery = typeof sp.q === "string" ? sp.q : "";

  return (
    <main>
      {/* key remounts so a new ?q= seeds the bar and re-runs the full search */}
      <SmartSearch key={initialQuery} initialQuery={initialQuery} />
    </main>
  );
}
