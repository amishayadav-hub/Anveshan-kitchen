"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CommunityPost } from "@/data/community-posts";

const PAGE_SIZE = 17;

// Feed state: paginated fetch from the API, plus client-side like/save tracking.
// Posts stay in state once loaded (cache of viewed posts). Like counts are shown
// as base-from-API + local toggle, so they never double-count under re-renders.
export function useCommunityFeed() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [baseLikes, setBaseLikes] = useState<Record<string, number>>({});
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const cursorRef = useRef(0);
  const loadingRef = useRef(false);
  const likedRef = useRef<Record<string, boolean>>({});
  const savedRef = useRef<Record<string, boolean>>({});

  const loadMore = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const res = await fetch(`/api/community/posts?cursor=${cursorRef.current}&limit=${PAGE_SIZE}`);
      const data = (await res.json()) as { posts: CommunityPost[]; nextCursor: number };
      const incoming = data.posts ?? [];
      cursorRef.current = data.nextCursor ?? cursorRef.current + PAGE_SIZE;
      setPosts((prev) => [...prev, ...incoming]);
      setBaseLikes((prev) => {
        const next = { ...prev };
        for (const p of incoming) if (next[p.id] === undefined) next[p.id] = p.likes;
        return next;
      });
    } catch {
      /* keep whatever we have; the feed simply won't grow this time */
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  // Initial batch on mount.
  useEffect(() => {
    loadMore();
  }, [loadMore]);

  // Handlers run once per click (not in a setState updater), so refs stay the
  // source of truth and the API is hit exactly once.
  const toggleLike = useCallback((id: string) => {
    const next = !likedRef.current[id];
    likedRef.current = { ...likedRef.current, [id]: next };
    setLiked({ ...likedRef.current });
    fetch(`/api/community/posts/${id}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ liked: next }),
    }).catch(() => {});
  }, []);

  const toggleSave = useCallback((id: string) => {
    const next = !savedRef.current[id];
    savedRef.current = { ...savedRef.current, [id]: next };
    setSaved({ ...savedRef.current });
    fetch(`/api/community/posts/${id}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ saved: next }),
    }).catch(() => {});
  }, []);

  const recordShare = useCallback((id: string) => {
    fetch(`/api/community/posts/${id}/share`, { method: "POST" }).catch(() => {});
  }, []);

  const likeCountFor = useCallback(
    (id: string) => (baseLikes[id] ?? 0) + (liked[id] ? 1 : 0),
    [baseLikes, liked]
  );

  return { posts, loading, loadMore, liked, saved, likeCountFor, toggleLike, toggleSave, recordShare };
}
