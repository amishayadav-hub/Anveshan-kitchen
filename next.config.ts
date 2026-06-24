import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
};

export default nextConfig;
