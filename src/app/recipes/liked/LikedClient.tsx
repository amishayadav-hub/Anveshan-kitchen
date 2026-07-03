"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Recipe, AnveshanProduct } from "@/types";
import { useAuth } from "@/components/auth/AuthProvider";
import { useLikes } from "@/components/likes/LikesProvider";
import RecipeCard from "@/components/recipes/RecipeCard";

interface Props {
  recipes: Recipe[];
  productMap: Record<string, AnveshanProduct>;
}

export default function LikedClient({ recipes, productMap }: Props) {
  const { user, loading: authLoading } = useAuth();
  const { likes, loading } = useLikes();

  const bySlug = useMemo(() => new Map(recipes.map((r) => [r.slug, r])), [recipes]);
  // Preserve the user's like order (newest first) and resolve to full recipes.
  const likedRecipes = useMemo(
    () => likes.map((l) => bySlug.get(l.slug)).filter(Boolean) as Recipe[],
    [likes, bySlug]
  );

  if (authLoading) return <Centered><Spinner /></Centered>;

  if (!user) {
    return (
      <Centered>
        <h1 className="text-2xl font-bold text-gray-900">Liked Recipes</h1>
        <p className="mt-2 text-gray-500">Sign in to save recipes and see them here.</p>
        <Link href="/account" className="mt-5 inline-block rounded-full bg-anv-green px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-anv-green-dark">
          Sign in
        </Link>
      </Centered>
    );
  }

  if (loading) return <Centered><Spinner /></Centered>;

  if (likedRecipes.length === 0) {
    return (
      <Centered>
        <h1 className="text-2xl font-bold text-gray-900">Liked Recipes</h1>
        <p className="mt-2 text-gray-500">
          You haven&apos;t liked any recipes yet. Tap the ♥ on a recipe to save it here.
        </p>
        <Link href="/recipes" className="mt-5 inline-block rounded-full bg-anv-green px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-anv-green-dark">
          Browse recipes
        </Link>
      </Centered>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-8">
      <header className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Liked Recipes</h1>
        <p className="text-sm text-gray-500">
          {likedRecipes.length} saved recipe{likedRecipes.length !== 1 ? "s" : ""}.
        </p>
      </header>

      {/* Same card + grid as the recipes listing (PLP) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {likedRecipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} productMap={productMap} />
        ))}
      </div>
    </main>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center">{children}</main>;
}

function Spinner() {
  return <span className="h-8 w-8 animate-spin rounded-full border-2 border-anv-green/30 border-t-anv-green" aria-label="Loading" />;
}
