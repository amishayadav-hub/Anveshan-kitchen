// Data access + engagement counters for the community feed APIs.
//
// Counts live in-memory (per warm serverless instance) — enough to make the
// like/save/share endpoints real and reactive without new infra. Swap the Maps
// for Firestore/Redis for durable, cross-instance counts later.

import { COMMUNITY_POSTS, CommunityPost } from "@/data/community-posts";

const TOTAL = COMMUNITY_POSTS.length;

const likeDeltas = new Map<string, number>();
const saveCounts = new Map<string, number>();
const shareCounts = new Map<string, number>();

// Strip the page suffix (`-p2`) added while looping, back to the source id.
export function baseId(id: string): string {
  return id.replace(/-p\d+$/, "");
}

export function findPost(id: string): CommunityPost | undefined {
  return COMMUNITY_POSTS.find((p) => p.id === baseId(id));
}

// One looped page. With 17 source posts, page N reuses them with unique ids
// (`<id>-p<N>`) so the client can paginate forever via a real API.
export function getPage(cursor: number, limit: number): { posts: CommunityPost[]; nextCursor: number } {
  const posts: CommunityPost[] = [];
  for (let i = 0; i < limit; i++) {
    const abs = cursor + i;
    const base = COMMUNITY_POSTS[abs % TOTAL];
    const page = Math.floor(abs / TOTAL);
    posts.push({
      ...base,
      id: page === 0 ? base.id : `${base.id}-p${page}`,
      likes: base.likes + (likeDeltas.get(base.id) ?? 0),
    });
  }
  return { posts, nextCursor: cursor + limit }; // always more → infinite feed
}

export function likePost(id: string, liked: boolean): number {
  const key = baseId(id);
  const base = COMMUNITY_POSTS.find((p) => p.id === key);
  if (!base) return 0;
  const delta = (likeDeltas.get(key) ?? 0) + (liked ? 1 : -1);
  likeDeltas.set(key, delta);
  return Math.max(0, base.likes + delta);
}

export function savePost(id: string, saved: boolean): number {
  const key = baseId(id);
  const n = Math.max(0, (saveCounts.get(key) ?? 0) + (saved ? 1 : -1));
  saveCounts.set(key, n);
  return n;
}

export function sharePost(id: string): number {
  const key = baseId(id);
  const n = (shareCounts.get(key) ?? 0) + 1;
  shareCounts.set(key, n);
  return n;
}
