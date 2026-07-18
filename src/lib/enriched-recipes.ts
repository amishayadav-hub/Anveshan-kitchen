import "server-only";
import { readFileSync, existsSync } from "fs";
import path from "path";
import type { GeneratedRecipe, GeneratedRecipeSet, Language } from "./ai-providers";

// Serve-first source for the generator: rich, pre-validated variation sets
// produced offline by scripts/enrich-recipes.mjs (one set per dish family in
// the 10k dataset). Serving from here costs zero AI calls and ~no latency.
// The file is absent until the enrichment script has run — every helper
// degrades to null and the route falls through to AI generation.

interface EnrichedFamily {
  baseDish: string;
  members: string[];
  variations: Array<
    Omit<GeneratedRecipe, "provider" | "language"> & { tips?: string[] }
  >;
}

interface EnrichedFile {
  version: number;
  families: Record<string, EnrichedFamily>;
  nameToFamily: Record<string, string>;
}

const PROVIDER = "Anveshan Collection";

let data: EnrichedFile | null | undefined; // undefined = not loaded yet
function getData(): EnrichedFile | null {
  if (data !== undefined) return data;
  try {
    const p = path.join(process.cwd(), "data", "indian-recipes-enriched.json");
    data = existsSync(p) ? (JSON.parse(readFileSync(p, "utf8")) as EnrichedFile) : null;
  } catch {
    data = null;
  }
  return data;
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/**
 * Direct dish-name lookup from the user's raw query — no embeddings needed.
 * Matches when the query IS a known member/base name, or when the query
 * contains every token of a multi-word base dish ("easy aloo paratha recipe"
 * → "Aloo Paratha"). Single-token bases are never substring-matched, so a
 * bare "paratha" can't hijack a specific dish.
 */
export function findEnrichedByQuery(query: string): string | null {
  const d = getData();
  if (!d) return null;
  const q = norm(query);
  if (!q) return null;
  if (d.nameToFamily[q]) return d.nameToFamily[q];

  const qTokens = new Set(q.split(" "));
  let best: { slug: string; tokens: number } | null = null;
  for (const [slug, fam] of Object.entries(d.families)) {
    const bTokens = norm(fam.baseDish).split(" ");
    if (bTokens.length >= 2 && bTokens.every((t) => qTokens.has(t))) {
      // Prefer the most specific base ("chana dal tadka" over "dal tadka").
      if (!best || bTokens.length > best.tokens) best = { slug, tokens: bTokens.length };
    }
  }
  return best?.slug ?? null;
}

/** Lookup by a dataset row name (a semantic-search hit) → its family slug. */
export function findEnrichedByHitName(hitName: string): string | null {
  const d = getData();
  return d?.nameToFamily[norm(hitName)] ?? null;
}

/** Materialize a family as the GeneratedRecipeSet shape the client renders. */
export function getEnrichedSet(slug: string, language: Language): GeneratedRecipeSet | null {
  const d = getData();
  const fam = d?.families[slug];
  if (!fam?.variations?.length) return null;
  return {
    query: fam.baseDish,
    provider: PROVIDER,
    language,
    variations: fam.variations.map((v) => ({ ...v, provider: PROVIDER, language })),
  };
}
