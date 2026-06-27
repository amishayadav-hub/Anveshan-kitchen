import { readFileSync, existsSync } from "fs";
import path from "path";

// Server-only semantic search over the 10k synthetic recipe dataset using
// Transformers.js embeddings + cosine similarity. Singletons are built once per
// server instance.

const MODEL = "Xenova/all-MiniLM-L6-v2";
const DIM = 384;

export interface DatasetRecipe {
  name: string;
  description?: string;
  ingredients: string[];
  steps?: string[];
  location: string;
}

export interface SearchHit extends DatasetRecipe {
  score: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let extractorPromise: Promise<any> | null = null;
async function getExtractor() {
  if (!extractorPromise) {
    extractorPromise = (async () => {
      const { pipeline, env } = await import("@huggingface/transformers");
      env.allowLocalModels = false;
      return pipeline("feature-extraction", MODEL);
    })();
  }
  return extractorPromise;
}

let index: { recipes: DatasetRecipe[]; vectors: Float32Array; count: number } | null = null;
function getIndex() {
  if (index) return index;
  const root = process.cwd();
  const binPath = path.join(root, "data", "recipe-embeddings.bin");
  const recipesPath = path.join(root, "indian-recipes.json");
  if (!existsSync(binPath) || !existsSync(recipesPath)) return null;

  const recipes: DatasetRecipe[] = JSON.parse(readFileSync(recipesPath, "utf8"));
  const buf = readFileSync(binPath);
  const vectors = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
  index = { recipes, vectors, count: recipes.length };
  return index;
}

export function indexReady(): boolean {
  return getIndex() !== null;
}

/**
 * Returns the top-K dataset recipes by cosine similarity to `query`.
 * Throws if the index isn't built or the embedding model fails to load.
 */
export async function searchRecipes(query: string, topK = 3): Promise<SearchHit[]> {
  const idx = getIndex();
  if (!idx) throw new Error("INDEX_NOT_BUILT");

  const extractor = await getExtractor();
  const out = await extractor(query, { pooling: "mean", normalize: true });
  const q = out.data as Float32Array;

  const { vectors, recipes, count } = idx;
  const top: { i: number; score: number }[] = [];
  for (let i = 0; i < count; i++) {
    const base = i * DIM;
    let dot = 0;
    for (let d = 0; d < DIM; d++) dot += q[d] * vectors[base + d];
    if (top.length < topK) {
      top.push({ i, score: dot });
      top.sort((a, b) => a.score - b.score);
    } else if (dot > top[0].score) {
      top[0] = { i, score: dot };
      top.sort((a, b) => a.score - b.score);
    }
  }

  return top
    .sort((a, b) => b.score - a.score)
    .map(({ i, score }) => ({ ...recipes[i], score: Number(score.toFixed(4)) }));
}
