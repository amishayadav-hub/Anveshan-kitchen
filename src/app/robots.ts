import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// AI answer-engine + assistant crawlers we explicitly welcome. Being crawlable
// by these is the #1 GEO (Generative Engine Optimization) lever — if they can't
// read the site, they can't cite Anveshan recipes in ChatGPT / Perplexity /
// Google AI Overviews / Claude answers. `*` below already allows them, but
// naming them makes intent unambiguous and survives any future default-block.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI crawler (training + retrieval)
  "OAI-SearchBot", // ChatGPT Search indexing
  "ChatGPT-User", // ChatGPT live browsing on a user's behalf
  "ClaudeBot", // Anthropic crawler
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot", // Perplexity indexing
  "Perplexity-User", // Perplexity live fetch
  "Google-Extended", // Gemini / AI Overviews training signal
  "Applebot-Extended", // Apple Intelligence
  "meta-externalagent", // Meta AI
  "Amazonbot",
  "Bytespider", // TikTok / Doubao
  "CCBot", // Common Crawl (feeds many models)
  "Diffbot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  // Same access policy for everyone: crawl the whole site except non-indexable
  // API + embed surfaces. AI crawlers get their own named rules so the welcome
  // is explicit; edit AI_CRAWLERS (or set `disallow: "/"` on a bot) to opt one
  // out later without touching the rest.
  const commonDisallow = ["/api/", "/embed"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: commonDisallow },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: commonDisallow,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
