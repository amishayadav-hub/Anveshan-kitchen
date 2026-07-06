import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Transformers.js + its native onnxruntime out of the bundler; load it as
  // a real Node module at runtime in the /api/search route.
  serverExternalPackages: ["@huggingface/transformers"],
  // Ensure the recipe dataset + embeddings index are bundled into the serverless
  // functions that read them at runtime (Next won't trace process.cwd() reads).
  outputFileTracingIncludes: {
    "/api/search": ["./data/recipe-embeddings.bin", "./indian-recipes.json"],
    "/api/generate-recipe": ["./data/recipe-embeddings.bin", "./indian-recipes.json"],
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
