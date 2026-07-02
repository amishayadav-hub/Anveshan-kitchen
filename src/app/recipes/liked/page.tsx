import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liked Recipes",
  description: "Recipes you've liked.",
};

// Placeholder — to be built with per-user likes once auth is in place.
export default function LikedPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Liked Recipes</h1>
      <p className="mt-2 text-gray-500">Your saved recipes will appear here — coming soon.</p>
    </main>
  );
}
