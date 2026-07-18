import "server-only";
import { getAdminDb, isAdminConfigured } from "./firebase-admin";

// Runtime-editable generator settings, backed by the Firestore `settings`
// collection and managed from the admin dashboard. Falls back to code defaults
// when the Admin SDK isn't configured or the doc is missing, so the generator
// works without them. Short in-memory TTL keeps the hot path cheap.
//
// NOTE: this module is server-only (Admin SDK). Do not import it from any file
// that is also used in a client bundle.

export interface GeneratorSettings {
  enabled: boolean;
  rateLimitPerMin: number;
  groundingThreshold: number;
  // Cosine floor for a semantic hit to be served directly from the enriched
  // dataset (zero AI). Stricter than groundingThreshold on purpose: a wrong
  // grounding still gets rewritten by the model; a wrong direct serve doesn't.
  exactMatchThreshold: number;
}

const GENERATOR_DEFAULTS: GeneratorSettings = {
  enabled: true,
  rateLimitPerMin: 15,
  groundingThreshold: 0.5,
  exactMatchThreshold: 0.7,
};

const TTL_MS = 30_000;
let cache: { value: GeneratorSettings; at: number } | null = null;

export async function getGeneratorSettings(): Promise<GeneratorSettings> {
  if (!isAdminConfigured()) return GENERATOR_DEFAULTS;
  if (cache && Date.now() - cache.at < TTL_MS) return cache.value;
  try {
    const snap = await getAdminDb().collection("settings").doc("generator").get();
    const value: GeneratorSettings = snap.exists
      ? { ...GENERATOR_DEFAULTS, ...(snap.data() as Partial<GeneratorSettings>) }
      : GENERATOR_DEFAULTS;
    cache = { value, at: Date.now() };
    return value;
  } catch {
    return GENERATOR_DEFAULTS;
  }
}
