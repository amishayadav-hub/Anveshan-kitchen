"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useLikes } from "@/components/likes/LikesProvider";
import { track } from "@/lib/analytics";
import { withShareUtm } from "@/lib/utm";

interface Props {
  name: string;
  slug: string;
  image?: string;
  className?: string;
}

// Copy text to the clipboard in ANY context: the async Clipboard API in secure
// contexts, else a hidden-textarea execCommand fallback (works on http / LAN IP
// / older browsers). Returns whether the copy actually succeeded.
async function copyLink(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

// Share + Like actions shown at the foot of the recipe description.
// Share uses the native share sheet when available, else copies the link.
// The heart saves the recipe to the signed-in user's liked collection.
export default function RecipeActions({ name, slug, image, className }: Props) {
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { isLiked, toggle, signedIn } = useLikes();
  const liked = isLiked(slug);
  const [busy, setBusy] = useState(false);

  async function share() {
    const url = withShareUtm(window.location.href, "recipe");
    const canNativeShare = typeof navigator !== "undefined" && typeof navigator.share === "function";
    track("share", { content_type: "recipe", item_id: slug, method: canNativeShare ? "native" : "copy" });

    if (canNativeShare) {
      try {
        await navigator.share({ title: name, url });
        return;
      } catch (e) {
        // User dismissed the share sheet — that's a normal outcome, stop here.
        if ((e as Error)?.name === "AbortError") return;
        // Any other native-share failure → fall through to copy so the click
        // never does nothing.
      }
    }

    // Copy the link, with a legacy fallback for non-secure contexts (http /
    // LAN IP) where navigator.clipboard is unavailable, and a prompt() as the
    // last resort. Always give visible feedback.
    const ok = await copyLink(url);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } else {
      window.prompt("Copy this recipe link:", url);
    }
  }

  async function like() {
    // Liking requires an account — send guests to sign in first.
    if (!signedIn) {
      track("like_recipe", { item_id: slug, signed_in: false });
      router.push("/account");
      return;
    }
    if (busy) return;
    setBusy(true);
    track("like_recipe", { item_id: slug, liked: !liked, signed_in: true });
    try {
      await toggle({ slug, name, image });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={`no-print flex items-center gap-2 ${className ?? "mt-4"}`}>
      <button
        type="button"
        onClick={like}
        aria-pressed={liked}
        aria-label={liked ? "Remove from liked recipes" : "Save to liked recipes"}
        title={signedIn ? (liked ? "Liked" : "Save to liked") : "Sign in to save"}
        className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform touch-manipulation active:scale-90 disabled:opacity-60 ${
          liked ? "text-[#7B1E3C]" : "text-[#7B1E3C]/60 hover:text-[#7B1E3C]"
        }`}
        disabled={busy}
      >
        <HeartIcon filled={liked} />
      </button>

      <button
        type="button"
        onClick={share}
        className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-anv-cream-dark px-4 text-sm font-medium text-gray-600 transition-colors touch-manipulation active:scale-95 hover:border-anv-green/40 hover:text-anv-green"
      >
        <ShareIcon />
        <span>{copied ? "Link copied" : "Share"}</span>
      </button>
    </div>
  );
}

function Svg({ children, fill = "none" }: { children: ReactNode; fill?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

// Filled red heart when liked; outline otherwise (color comes from currentColor).
function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <Svg fill={filled ? "currentColor" : "none"}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </Svg>
  );
}

function ShareIcon() {
  return (
    <Svg>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.59 13.51 6.83 3.98" />
      <path d="m15.41 6.51-6.82 3.98" />
    </Svg>
  );
}
