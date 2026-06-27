// Embeds every recipe in indian-recipes.json with Transformers.js and writes a
// compact binary index (raw Float32, normalized) for server-side semantic search.
// Run once: node scripts/build-embeddings.mjs
//
// Requires a working onnxruntime. On Linux/macOS and Vercel this works out of the
// box. On Windows it needs the Microsoft Visual C++ Redistributable (x64) —
// without it onnxruntime-node throws ERR_DLOPEN_FAILED.
import { pipeline, env } from "@huggingface/transformers";
import { readFileSync, writeFileSync, mkdirSync } from "fs";

env.allowLocalModels = false; // pull the model from the HF hub (cached after 1st run)

const MODEL = "Xenova/all-MiniLM-L6-v2";
const DIM = 384;
const BATCH = 16;

const recipes = JSON.parse(readFileSync("indian-recipes.json", "utf8"));
const texts = recipes.map(
  (r) =>
    `${r.name}. ${r.description ?? ""} Ingredients: ${r.ingredients.join(", ")}. ` +
    `Method: ${(r.steps ?? []).join(" ")} Region: ${r.location}.`
);

console.log(`Embedding ${recipes.length} recipes with ${MODEL} …`);
const extractor = await pipeline("feature-extraction", MODEL);

const all = new Float32Array(recipes.length * DIM);
for (let i = 0; i < texts.length; i += BATCH) {
  const batch = texts.slice(i, i + BATCH);
  const out = await extractor(batch, { pooling: "mean", normalize: true });
  all.set(out.data, i * DIM);
  if (i % (BATCH * 10) === 0) console.log(`  ${i}/${texts.length}`);
}

mkdirSync("data", { recursive: true });
writeFileSync("data/recipe-embeddings.bin", Buffer.from(all.buffer));
writeFileSync(
  "data/recipe-embeddings.meta.json",
  JSON.stringify({ count: recipes.length, dim: DIM, model: MODEL }, null, 2)
);
console.log(`Done → data/recipe-embeddings.bin (${recipes.length} × ${DIM})`);
