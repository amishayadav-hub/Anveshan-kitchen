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
    // Images come from already-sized external CDNs (Unsplash ?w=…). Skipping the
    // built-in optimizer avoids dev-time proxy timeouts and serves them directly.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
};

export default nextConfig;
