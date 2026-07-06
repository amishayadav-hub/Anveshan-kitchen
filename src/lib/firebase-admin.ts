import "server-only";
import {
  getApps,
  initializeApp,
  cert,
  applicationDefault,
  type App,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

// Server-side Firebase for first-party analytics writes and on-demand
// revalidation. Uses a service-account credential (server-only secret):
//  - FIREBASE_SERVICE_ACCOUNT = raw JSON or base64-encoded JSON, or
//  - GOOGLE_APPLICATION_CREDENTIALS = path to the JSON file.
// Lazy-initialized so importing this never throws when the credential is
// absent (e.g. local dev without a key) — callers get the error only on use.

export function isAdminConfigured(): boolean {
  return Boolean(
    process.env.FIREBASE_SERVICE_ACCOUNT?.trim() ||
      process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim()
  );
}

function loadCredential() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT?.trim();
  if (raw) {
    const json = raw.startsWith("{")
      ? raw
      : Buffer.from(raw, "base64").toString("utf8");
    return cert(JSON.parse(json));
  }
  return applicationDefault();
}

let cached: App | null = null;
function getApp(): App {
  if (cached) return cached;
  cached = getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: loadCredential(),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      });
  return cached;
}

export function getAdminDb(): Firestore {
  return getFirestore(getApp());
}
