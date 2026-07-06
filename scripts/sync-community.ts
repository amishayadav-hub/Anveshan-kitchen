// Sync src/data/community-posts.ts → Firestore `communityPosts`.
//
// SOURCE OF TRUTH = FIRESTORE (the dashboard). The code file is only a seed for
// brand-new reels. Run this after you ADD or REMOVE reels in community-posts.ts:
//
//   npm run sync-community
//
// Behaviour (safe by design — never reverts a dashboard edit):
//   • ADDS reels that are in the file but missing from Firestore.
//   • REMOVES `cpNN` docs you deleted from the file (mirror deletions).
//   • DOES NOT touch posts that already exist in Firestore — your dashboard
//     edits (images, captions, etc.) and like/save/share counts stay intact.
//   • Never touches dashboard-created posts (they have auto-ids, not `cpNN`).
//
// Because existing docs are never overwritten, editing content in the file for a
// reel that's already in Firestore has NO effect — edit those in the dashboard.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import {
  initializeApp,
  cert,
  applicationDefault,
  getApps,
} from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { COMMUNITY_POSTS } from "../src/data/community-posts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Load .env.local so FIREBASE_SERVICE_ACCOUNT is available.
try {
  const env = readFileSync(path.join(root, ".env.local"), "utf8");
  for (const line of env.split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {
  /* rely on ambient env */
}

function credential() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT?.trim();
  if (raw) {
    const json = raw.startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
    return cert(JSON.parse(json));
  }
  return applicationDefault();
}

if (!process.env.FIREBASE_SERVICE_ACCOUNT && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error("Missing FIREBASE_SERVICE_ACCOUNT (set it in anveshan-recipes/.env.local).");
  process.exit(1);
}

if (!getApps().length) {
  initializeApp({ credential: credential(), projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID });
}
const db = getFirestore();

async function main() {
  const fileIds = new Set(COMMUNITY_POSTS.map((p) => p.id));

  // Read existing ids once so we only CREATE what's missing (never overwrite).
  const existing = await db.collection("communityPosts").get();
  const existingIds = new Set(existing.docs.map((d) => d.id));

  let created = 0;
  let pruned = 0;
  let skipped = 0;

  for (let i = 0; i < COMMUNITY_POSTS.length; i++) {
    const p = COMMUNITY_POSTS[i];
    if (existingIds.has(p.id)) {
      // Already in Firestore → the dashboard owns it. Leave it untouched so
      // edits (images/captions) and counts are never reverted.
      skipped++;
      continue;
    }
    await db.collection("communityPosts").doc(p.id).set({
      title: p.title,
      description: p.description,
      author: p.author,
      handle: p.handle,
      date: p.date,
      images: p.images,
      tags: p.tags,
      products: p.products,
      likes: p.likes ?? 0,
      saves: 0,
      shares: 0,
      order: i,
      createdAt: FieldValue.serverTimestamp(),
    });
    created++;
  }

  // Mirror deletions: remove cpNN docs no longer in the file. Dashboard-created
  // posts (auto-ids, not matching cpNN) are left alone.
  for (const d of existing.docs) {
    if (/^cp\d+$/.test(d.id) && !fileIds.has(d.id)) {
      await d.ref.delete();
      pruned++;
    }
  }

  console.log(
    `Community synced → Firestore: ${created} added, ${pruned} removed, ${skipped} left untouched (dashboard owns them). File has ${COMMUNITY_POSTS.length} posts.`
  );
  process.exit(0);
}

main().catch((e) => {
  console.error("Sync failed:", e);
  process.exit(1);
});
