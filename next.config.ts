import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Transformers.js + its native onnxruntime, and firebase-admin (gRPC /
  // native @google-cloud deps) out of the bundler; load them as real Node modules
  // at runtime. Bundling firebase-admin under Turbopack breaks its dynamic
  // requires and 500s the /api/track, /api/events, /api/revalidate + community
  // routes that use the Admin SDK.
  serverExternalPackages: ["@huggingface/transformers", "firebase-admin", "@google-cloud/firestore"],
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
