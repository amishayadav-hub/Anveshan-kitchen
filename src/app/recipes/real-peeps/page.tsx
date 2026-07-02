import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Peeps — Community Recipes",
  description: "Recipes shared by the Anveshan community.",
};

// Placeholder — to be built from featured community submissions.
export default function RealPeepsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Real Peeps</h1>
      <p className="mt-2 text-gray-500">Recipes shared by the Anveshan community — coming soon.</p>
    </main>
  );
}
