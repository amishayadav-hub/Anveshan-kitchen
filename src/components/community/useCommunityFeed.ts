"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CommunityPost } from "@/data/community-posts";

const PAGE_SIZE = 10;
// Bumped to v2 to discard any older cache that stored empty/0 like counts
// (JSON.stringify drops undefined, so a bad snapshot could zero out baseLikes).
const CACHE_KEY = "rp-feed-v2";

interface FeedCache {
  posts: CommunityPost[];
  cursor: number;
  hasMore: boolean;
  baseLikes: Record<string, number>;
}

// Feed state: paginated fetch from the API (finite — stops at hasMore=false),
// plus client-side like/save tracking. Loaded posts are cached in sessionStorage
// so navigating away and back (or re-scrolling) doesn't re-hit the API/Firestore.
export function useCommunityFeed() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [baseLikes, setBaseLikes] = useState<Record<string, number>>({});
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const cursorRef = useRef(0);
  const hasMoreRef = useRef(true);
  const loadingRef = useRef(false);
  const hydratedRef = useRef(false);
  const likedRef = useRef<Record<string, boolean>>({});
  const savedRef = useRef<Record<string, boolean>>({});

  const persist = useCallback((next: FeedCache) => {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(next));
    } catch {
      /* storage full / unavailable — non-fatal */
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const res = await fetch(`/api/community/posts?cursor=${cursorRef.current}&limit=${PAGE_SIZE}`);
      const data = (await res.json()) as { posts: CommunityPost[]; nextCursor: number; hasMore: boolean };
      const incoming = data.posts ?? [];
      cursorRef.current = data.nextCursor ?? cursorRef.current + incoming.length;
      hasMoreRef.current = data.hasMore ?? false;

      let mergedPosts: CommunityPost[] = [];
      let mergedLikes: Record<string, number> = {};
      setPosts((prev) => {
        mergedPosts = [...prev, ...incoming];
        return mergedPosts;
      });
      setBaseLikes((prev) => {
        mergedLikes = { ...prev };
        // Coerce to a number so a missing/undefined API value can never poison
        // the cache (undefined would be dropped by JSON.stringify → shows 0).
        for (const p of incoming) if (mergedLikes[p.id] === undefined) mergedLikes[p.id] = Number(p.likes) || 0;
        return mergedLikes;
      });
      persist({ posts: mergedPosts, cursor: cursorRef.current, hasMore: hasMoreRef.current, baseLikes: mergedLikes });
    } catch {
      /* keep whatever we have; the feed simply won't grow this time */
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [persist]);

  // On mount: restore from sessionStorage if present, else fetch the first page.
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (raw) {
        const c = JSON.parse(raw) as FeedCache;
        if (c.posts?.length) {
          // Rebuild baseLikes from the cached posts themselves so a missing or
          // partial stored map can't zero out the counts (self-healing).
          const restoredLikes: Record<string, number> = { ...(c.baseLikes ?? {}) };
          for (const p of c.posts) {
            if (restoredLikes[p.id] === undefined) restoredLikes[p.id] = Number(p.likes) || 0;
          }
          setPosts(c.posts);
          setBaseLikes(restoredLikes);
          cursorRef.current = c.cursor ?? c.posts.length;
          hasMoreRef.current = c.hasMore ?? false;
          return; // hydrated — no network read
        }
      }
    } catch {
      /* ignore parse/storage errors and fetch fresh */
    }
    loadMore();
  }, [loadMore]);

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
