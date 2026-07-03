"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/auth/AuthProvider";
import type { LikedRecipe } from "@/lib/likes";

interface LikesContextValue {
  /** Liked recipes, newest first. Empty when logged out. */
  likes: LikedRecipe[];
  isLiked: (slug: string) => boolean;
  /** Toggle a like. Returns the new state; false + no-op if not signed in. */
  toggle: (recipe: LikedRecipe) => Promise<boolean>;
  /** True while the first snapshot for a signed-in user is loading. */
  loading: boolean;
  /** Whether a user is signed in (likes require it). */
  signedIn: boolean;
}

const LikesContext = createContext<LikesContextValue | null>(null);

export function useLikes() {
  const ctx = useContext(LikesContext);
  if (!ctx) throw new Error("useLikes must be used within <LikesProvider>");
  return ctx;
}

// Firestore collection of a user's liked recipes.
const likesCol = (uid: string) => collection(db, "users", uid, "likedRecipes");

export default function LikesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  // Tagged with the uid the data belongs to, so `likes`/`loading` can be derived
  // (no synchronous state resets in the effect) and one user never sees another's.
  const [data, setData] = useState<{ uid: string; likes: LikedRecipe[] } | null>(null);

  // Subscribe to this user's likes; re-subscribes when the account changes.
  useEffect(() => {
    if (!user) return;
    const q = query(likesCol(user.uid), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) =>
        setData({
          uid: user.uid,
          likes: snap.docs.map((d) => {
            const d0 = d.data() as Partial<LikedRecipe>;
            return { slug: d.id, name: d0.name ?? d.id, image: d0.image };
          }),
        }),
      () => setData({ uid: user.uid, likes: [] }) // permission / network error → empty
    );
    return unsub;
  }, [user]);

  const likes = useMemo<LikedRecipe[]>(
    () => (user && data?.uid === user.uid ? data.likes : []),
    [user, data]
  );
  const loading = !!user && data?.uid !== user.uid; // signed in but first snapshot not in yet

  const likedSlugs = useMemo(() => new Set(likes.map((l) => l.slug)), [likes]);

  async function toggle(recipe: LikedRecipe): Promise<boolean> {
    if (!user) return false;
    const ref = doc(db, "users", user.uid, "likedRecipes", recipe.slug);
    if (likedSlugs.has(recipe.slug)) {
      await deleteDoc(ref);
      return false;
    }
    await setDoc(ref, {
      name: recipe.name,
      image: recipe.image ?? null,
      createdAt: serverTimestamp(),
    });
    return true;
  }

  return (
    <LikesContext.Provider
      value={{ likes, isLiked: (slug) => likedSlugs.has(slug), toggle, loading, signedIn: !!user }}
    >
      {children}
    </LikesContext.Provider>
  );
}
