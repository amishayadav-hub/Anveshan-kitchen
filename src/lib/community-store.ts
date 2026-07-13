// Data access + engagement counters for the community "Real Peeps" feed APIs.
//
// Source of truth is the Firestore `communityPosts` collection (admin-editable).
// The feed is READ via the CLIENT Firebase SDK (public NEXT_PUBLIC config — the
// same path recipe images use, always available on Vercel) so admin-set images
// show even when the server-only service account isn't configured. Durable
// like/save/share counts are written via the Admin SDK when it IS configured;
// otherwise we fall back to in-memory counters. If the collection is empty or
// unreadable we fall back to the hardcoded COMMUNITY_POSTS.

import { FieldValue } from "firebase-admin/firestore";
import {
  collection as clientCollection,
  getDocs as clientGetDocs,
  doc as clientDoc,
  getDoc as clientGetDoc,
} from "firebase/firestore";
import { getAdminDb, isAdminConfigured } from "./firebase-admin";
import { db as clientDb } from "./firebase";
import { COMMUNITY_POSTS, CommunityPost } from "@/data/community-posts";

// Cache the full post list so a busy feed doesn't re-read the collection on every
// request/scroll. Read ONCE, serve every page from memory. Busted on any write
// (and by /api/revalidate) so admin edits + counts stay reactive.
let cache: { posts: CommunityPost[]; at: number } | null = null;
const TTL_MS = 5 * 60_000; // 5 min

// In-memory fallback counters (only used when Firestore isn't the source).
const likeDeltas = new Map<string, number>();
const saveCounts = new Map<string, number>();
const shareCounts = new Map<string, number>();

// Strip the page suffix (`-p2`) added while looping, back to the source id.
export function baseId(id: string): string {
  return id.replace(/-p\d+$/, "");
}

// Whether Firestore is currently backing the feed (read succeeded, non-empty).
let firestoreBacked = false;

async function loadBasePosts(): Promise<CommunityPost[]> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.posts;
  try {
    // CLIENT SDK read — works with the public config regardless of whether the
    // server-only Admin SDK / service account is configured. Sort by `order` in
    // JS so any doc missing that field is still included (a Firestore orderBy
    // would silently drop it).
    const snap = await clientGetDocs(clientCollection(clientDb, "communityPosts"));
    if (!snap.empty) {
      const posts = snap.docs
        .map((d) => ({ id: d.id, ...(d.data() as Record<string, unknown>) }) as CommunityPost & { order?: number })
        .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER));
      cache = { posts, at: Date.now() };
      firestoreBacked = true;
      return posts;
    }
  } catch {
    // network/permission issue — fall back to the bundled posts below
  }
  firestoreBacked = false;
  return COMMUNITY_POSTS;
}

export async function findPost(id: string): Promise<CommunityPost | undefined> {
  const key = baseId(id);
  // Single-doc read (1 read) instead of scanning the whole collection.
  try {
    const snap = await clientGetDoc(clientDoc(clientDb, "communityPosts", key));
    if (snap.exists()) return { id: snap.id, ...(snap.data() as Record<string, unknown>) } as CommunityPost;
  } catch {
    /* fall back to bundled data below */
  }
  return COMMUNITY_POSTS.find((p) => p.id === key);
}

// A finite page of the feed. Reads the collection ONCE (cached) and slices in
// memory — no per-scroll re-reads and no infinite loop. `hasMore` is false once
// every post has been served, so the client stops fetching.
export async function getPage(
  cursor: number,
  limit: number
): Promise<{ posts: CommunityPost[]; nextCursor: number; hasMore: boolean }> {
  const base = await loadBasePosts();
  const start = Math.max(0, cursor);
  const slice = base.slice(start, start + limit).map((src) => ({
    ...src,
    likes: firestoreBacked ? src.likes : src.likes + (likeDeltas.get(src.id) ?? 0),
  }));
  const nextCursor = start + slice.length;
  return { posts: slice, nextCursor, hasMore: nextCursor < base.length };
}

// Increment/decrement a durable counter field on the post doc, returning the
// new value. Falls back to in-memory counting when Firestore isn't backing.
async function bump(
  id: string,
  field: "likes" | "saves" | "shares",
  by: number
): Promise<number | null> {
  const key = baseId(id);
  if (isAdminConfigured()) {
    try {
      const ref = getAdminDb().collection("communityPosts").doc(key);
      await ref.update({ [field]: FieldValue.increment(by) });
      cache = null; // reflect the new count on the next feed read
      const snap = await ref.get();
      return Math.max(0, Number(snap.get(field)) || 0);
    } catch {
      // fall through to in-memory
    }
  }
  return null;
}

export async function likePost(id: string, liked: boolean): Promise<number> {
  const fromDb = await bump(id, "likes", liked ? 1 : -1);
  if (fromDb !== null) return fromDb;
  const key = baseId(id);
  const base = COMMUNITY_POSTS.find((p) => p.id === key);
  if (!base) return 0;
  const delta = (likeDeltas.get(key) ?? 0) + (liked ? 1 : -1);
  likeDeltas.set(key, delta);
  return Math.max(0, base.likes + delta);
}

export async function savePost(id: string, saved: boolean): Promise<number> {
  const fromDb = await bump(id, "saves", saved ? 1 : -1);
  if (fromDb !== null) return fromDb;
  const key = baseId(id);
  const n = Math.max(0, (saveCounts.get(key) ?? 0) + (saved ? 1 : -1));
  saveCounts.set(key, n);
  return n;
}

export async function sharePost(id: string): Promise<number> {
  const fromDb = await bump(id, "shares", 1);
  if (fromDb !== null) return fromDb;
  const key = baseId(id);
  const n = (shareCounts.get(key) ?? 0) + 1;
  shareCounts.set(key, n);
  return n;
}

export function bustCache() { cache = null; }

