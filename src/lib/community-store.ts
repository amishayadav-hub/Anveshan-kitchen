// Data access + engagement counters for the community "Real Peeps" feed APIs.
//
// Source of truth is the Firestore `communityPosts` collection (admin-editable),
// with durable like/save/share counts on each doc. If the collection is empty or
// the Admin SDK isn't configured yet, we transparently fall back to the original
// hardcoded COMMUNITY_POSTS + in-memory counters, so the feed never breaks
// before/without the migration (see admin_dashboard/scripts/seed-community.mjs).

import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb, isAdminConfigured } from "./firebase-admin";
import { COMMUNITY_POSTS, CommunityPost } from "@/data/community-posts";

// Short cache so a busy feed doesn't read all posts from Firestore per request.
// Busted on any write so counts stay reactive.
let cache: { posts: CommunityPost[]; at: number } | null = null;
const TTL_MS = 30_000;

// In-memory fallback counters (only used when Firestore isn't the source).
const likeDeltas = new Map<string, number>();
const saveCounts = new Map<string, number>();
const shareCounts = new Map<string, number>();

// Strip the page suffix (`-p2`) added while looping, back to the source id.
export function baseId(id: string): string {
  return id.replace(/-p\d+$/, "");
}

// Whether Firestore is currently backing the feed (configured + non-empty).
let firestoreBacked = false;
// Auto-sync runs once per warm instance (cheap id-only check when nothing's new).
let synced = false;

// Create any posts present in the code data file but missing from Firestore, so
// adding a recipe to community-posts.ts shows up in the live feed AND the admin
// dashboard automatically — no manual re-seed. Existing docs (and their edits /
// like-save-share counts) are never touched.
async function autoSyncMissing(col: FirebaseFirestore.CollectionReference, existingIds: Set<string>) {
  const missing = COMMUNITY_POSTS.filter((p) => !existingIds.has(p.id));
  if (missing.length === 0) return false;
  const batch = getAdminDb().batch();
  for (const p of missing) {
    batch.set(col.doc(p.id), {
      title: p.title,
      description: p.description,
      author: p.author,
      handle: p.handle,
      date: p.date,
      images: p.images,
      tags: p.tags,
      products: p.products,
      likes: p.likes,
      saves: 0,
      shares: 0,
      order: COMMUNITY_POSTS.indexOf(p), // preserve the code order
      createdAt: FieldValue.serverTimestamp(),
    });
  }
  await batch.commit();
  return true;
}

async function loadBasePosts(): Promise<CommunityPost[]> {
  if (!isAdminConfigured()) {
    firestoreBacked = false;
    return COMMUNITY_POSTS;
  }
  if (cache && Date.now() - cache.at < TTL_MS) return cache.posts;
  try {
    const col = getAdminDb().collection("communityPosts");
    let snap = await col.orderBy("order").get();

    if (!synced) {
      const created = await autoSyncMissing(col, new Set(snap.docs.map((d) => d.id)));
      if (created) snap = await col.orderBy("order").get(); // re-read with new docs
      synced = true;
    }

    if (snap.empty) {
      firestoreBacked = false;
      return COMMUNITY_POSTS;
    }
    const posts = snap.docs.map((d) => ({ id: d.id, ...d.data() } as CommunityPost));
    cache = { posts, at: Date.now() };
    firestoreBacked = true;
    return posts;
  } catch {
    firestoreBacked = false;
    return COMMUNITY_POSTS;
  }
}

export async function findPost(id: string): Promise<CommunityPost | undefined> {
  const base = await loadBasePosts();
  return base.find((p) => p.id === baseId(id));
}

// One looped page. With 17 source posts, page N reuses them with unique ids
// (`<id>-p<N>`) so the client can paginate forever via a real API.
export async function getPage(
  cursor: number,
  limit: number
): Promise<{ posts: CommunityPost[]; nextCursor: number }> {
  const base = await loadBasePosts();
  const total = base.length || 1;
  const posts: CommunityPost[] = [];
  for (let i = 0; i < limit; i++) {
    const abs = cursor + i;
    const src = base[abs % total];
    if (!src) break;
    const page = Math.floor(abs / total);
    const likes = firestoreBacked ? src.likes : src.likes + (likeDeltas.get(src.id) ?? 0);
    posts.push({
      ...src,
      id: page === 0 ? src.id : `${src.id}-p${page}`,
      likes,
    });
  }
  return { posts, nextCursor: cursor + limit }; // always more → infinite feed
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

