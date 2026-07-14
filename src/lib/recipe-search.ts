// Shared recipe search: normalisation + typo-tolerant token matching used by
// BOTH the header's live suggestions and the recipe grid filter, so they behave
// identically. Matching is over name + tags + category + region + description;
// a query matches only if EVERY token hits, with a small edit-distance budget so
// spelling variants ("baigan" → "baingan") still match.

import { Recipe } from "@/types";

// Lowercase, strip accents/punctuation, collapse whitespace.
export function normalizeText(s: string): string {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// Bounded Levenshtein — returns early once the distance provably exceeds `max`.
function editDistance(a: string, b: string, max: number): number {
  const al = a.length;
  const bl = b.length;
  if (Math.abs(al - bl) > max) return max + 1;
  let prev = Array.from({ length: bl + 1 }, (_, i) => i);
  for (let i = 1; i <= al; i++) {
    const curr = [i];
    let rowMin = i;
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const v = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      curr[j] = v;
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1;
    prev = curr;
  }
  return prev[bl];
}

// A query token "hits" if it's a substring of the haystack, or a near-match to
// any word. Budget kept tight so short tokens don't collide with common words
// (e.g. "misal" must NOT fuzzy-match "masala").
export function tokenHits(token: string, haystack: string, words: string[]): boolean {
  if (haystack.includes(token)) return true;
  const max = token.length >= 8 ? 2 : token.length >= 4 ? 1 : 0;
  if (max === 0) return false;
  return words.some((w) => editDistance(w, token, max) <= max);
}

type WithRegion = Recipe & { region?: string };

// The searchable text for a recipe.
export function recipeHaystack(r: Recipe): string {
  const region = (r as WithRegion).region ?? "";
  return normalizeText([r.name, (r.tags ?? []).join(" "), r.category, region, r.description ?? ""].join(" "));
}

// Split a query into normalised tokens.
export function queryTokens(query: string): string[] {
  return normalizeText(query).split(" ").filter(Boolean);
}

// Does a recipe match ALL the given tokens? (precomputed haystack/words.)
export function matchesTokens(hay: string, words: string[], tokens: string[]): boolean {
  return tokens.every((t) => tokenHits(t, hay, words));
}

// Ranked recipe search for the suggestions dropdown. Name matches rank above
// description-only matches; a name that STARTS with the query ranks highest.
export function searchRecipes(recipes: Recipe[], query: string, limit?: number): Recipe[] {
  const tokens = queryTokens(query);
  if (tokens.length === 0) return [];

  const scored: { r: Recipe; score: number }[] = [];
  for (const r of recipes) {
    const hay = recipeHaystack(r);
    const words = hay.split(" ").filter(Boolean);
    if (!matchesTokens(hay, words, tokens)) continue;

    const nameNorm = normalizeText(r.name);
    const nameWords = nameNorm.split(" ").filter(Boolean);
    let score = 0;
    if (nameNorm.startsWith(tokens[0])) score += 100; // "paneer…" leads
    // All tokens hit the NAME (fuzzy, so typos like "chutny" still count) →
    // name matches rank above recipes that only mention the term in the body.
    if (tokens.every((t) => tokenHits(t, nameNorm, nameWords))) score += 50;
    score -= nameNorm.length * 0.02; // gently prefer shorter, more specific names
    scored.push({ r, score });
  }

  scored.sort((a, b) => b.score - a.score || a.r.name.localeCompare(b.r.name));
  const out = scored.map((s) => s.r);
  return typeof limit === "number" ? out.slice(0, limit) : out;
}
