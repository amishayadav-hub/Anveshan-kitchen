import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Transformers.js + its native onnxruntime out of the bundler; load it as
  // a real Node module at runtime in the /api/search route.
  // NOTE: firebase-admin is pinned to v12 (see package.json) — v13/14 pull
  // jose@6 (ESM-only) which crashes the externalized serverless runtime with
  // ERR_REQUIRE_ESM. v12 uses jose@4 (CJS). Don't upgrade without checking that.
  serverExternalPackages: ["@huggingface/transformers"],
  // Ensure the recipe dataset + embeddings index are bundled into the serverless
  // functions that read them at runtime (Next won't trace process.cwd() reads).
  outputFileTracingIncludes: {
    "/api/search": ["./data/recipe-embeddings.bin", "./indian-recipes.json"],
    "/api/generate-recipe": [
      "./data/recipe-embeddings.bin",
      "./indian-recipes.json",
      "./data/indian-recipes-enriched.json",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Admins can paste any hosted CDN URL for recipe/product/community images
    // and it renders live (the "**" pattern allows any HTTPS host). This keeps
    // next/image optimization. To tighten security later, replace "**" with an
    // explicit allowlist of approved CDNs (requires a redeploy per new host).
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
