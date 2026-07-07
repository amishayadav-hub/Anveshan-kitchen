"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { generatedShopLines } from "@/lib/generated-cart";
import type { CommunityPost } from "@/data/community-posts";
import { track } from "@/lib/analytics";
import ImageCarousel from "./ImageCarousel";

interface Props {
  post: CommunityPost;
  active: boolean; // mount images only for on-screen / nearby posts
  liked: boolean;
  likeCount: number;
  onLike: () => void;
  onShare: () => void;
}

// One full-viewport Instagram-Reels-style post: image/carousel background,
// gradient scrims, author + tags (Anveshan products tagged), an IG-style recipe
// caption, a right action rail (like/share) and the products as one Add bundle.
export default function ReelPost({ post, active, liked, likeCount, onLike, onShare }: Props) {
  const { addLines, open } = useCart();
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Resolve the post's Anveshan products once — used for BOTH the tags and the
  // single "add bundle" button (deduped + priced by generatedShopLines).
  const { lines: bundleLines, total: bundleTotal } = generatedShopLines(post.products);
  // Hashtags shown inside the caption: topical tags + the tagged Anveshan products.
  const productTags = bundleLines.map((l) => l.name.replace(/^Anveshan\s+/, ""));
  const hashtags = [...post.tags, ...productTags.map((t) => t.replace(/\s+/g, ""))];

  async function share() {
    onShare();
    track("share", { content_type: "community_post", item_id: post.id });
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: post.title, text: post.description, url });
      } catch {}
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  function addBundle() {
    if (bundleLines.length === 0) return;
    track("add_to_cart", { source: "real_peeps", post: post.title, items: bundleLines.length, value: bundleTotal });
    addLines(bundleLines);
    open();
  }

  return (
    <article className="relative h-full w-full snap-start overflow-hidden bg-black text-white">
      <ImageCarousel images={post.images} alt={post.title} mount={active} />

      {/* When the recipe caption is expanded ("more"), blur + dim the photo so
          the recipe text reads clearly. Sits above the image, below the content. */}
      <div
        className={`pointer-events-none absolute inset-0 z-[5] transition-all duration-300 ${
          expanded ? "bg-black/40 backdrop-blur-md" : "bg-transparent backdrop-blur-0"
        }`}
        aria-hidden="true"
      />

      {/* Scrims for legibility */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

      {/* Author (top-left) */}
      <div className="absolute left-4 top-4 right-16">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-anv-green text-sm font-bold ring-2 ring-white/70">
            {post.author.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight">{post.author}</p>
            <p className="truncate text-xs text-white/70">{post.handle} · {post.date}</p>
          </div>
        </div>
      </div>

      {/* Right action rail — Like + Share */}
      <div className="absolute bottom-52 right-3 z-10 flex flex-col items-center gap-5">
        <button
          onClick={() => {
            track("like_post", { item_id: post.id, liked: !liked });
            onLike();
          }}
          className="flex flex-col items-center gap-1"
          aria-pressed={liked}
        >
          <span className={`flex h-11 w-11 items-center justify-center transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)] ${liked ? "text-red-500" : "text-white"}`}>
            <HeartIcon filled={liked} />
          </span>
          <span className="text-xs font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">{likeCount}</span>
        </button>
        <button onClick={share} className="flex flex-col items-center gap-1">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur">
            <ShareIcon />
          </span>
          <span className="text-xs font-medium">{copied ? "Copied" : "Share"}</span>
        </button>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 pb-6 pr-20">
        <h2 className="text-xl font-bold leading-tight" style={{ fontFamily: "var(--font-roboto-slab), serif" }}>
          {post.title}
        </h2>

        {/* IG-style recipe caption — tap "more" to read the full recipe. The
            hashtags (topical + tagged Anveshan products) live INSIDE the caption,
            revealed when expanded, just like Instagram. */}
        <div className="mt-1 text-sm">
          <div className={expanded ? "max-h-[34vh] overflow-y-auto no-scrollbar" : "line-clamp-2"}>
            <p className="whitespace-pre-line leading-snug text-white/85">{post.description}</p>
            {hashtags.length > 0 && (
              <p className="mt-2 leading-snug text-[#a9d4c4]">
                {hashtags.map((h) => (
                  <span key={h} className="mr-1.5 font-medium">#{h}</span>
                ))}
              </p>
            )}
          </div>
          <button onClick={() => setExpanded((v) => !v)} className="mt-0.5 text-xs font-semibold text-white/60 hover:text-white">
            {expanded ? "less" : "…more"}
          </button>
        </div>

        {/* Products as ONE bundle → add all at once */}
        {bundleLines.length > 0 && (
          <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white/95 p-2 text-gray-900 shadow-lg">
            <div className="flex -space-x-2.5">
              {bundleLines.slice(0, 3).map((l) =>
                l.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img key={l.variantId} src={l.image} alt={l.name} loading="lazy" className="h-9 w-9 rounded-full bg-anv-cream/40 object-cover ring-2 ring-white" />
                ) : null
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-bold leading-tight">Anveshan bundle</p>
              <p className="text-[11px] text-gray-500">
                {bundleLines.length} Anveshan product{bundleLines.length !== 1 ? "s" : ""} · ₹{bundleTotal}
              </p>
            </div>
            <button
              onClick={addBundle}
              aria-label="Add all products to cart"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-anv-green px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-anv-green-dark"
            >
              ADD <CartIcon />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
function ShareIcon() {
  // Paper-plane / send — Instagram-style share.
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4z" />
    </svg>
  );
}
function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
