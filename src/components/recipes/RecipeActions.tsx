"use client";

import { useState, type ReactNode } from "react";

interface Props {
  name: string;
  className?: string;
}

// Single Share action shown at the foot of the recipe description.
// Uses the native share sheet when available, else copies the link.
export default function RecipeActions({ name, className }: Props) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: name, url });
      } catch {}
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  return (
    <div className={`no-print ${className ?? "mt-4"}`}>
      <button
        type="button"
        onClick={share}
        className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-anv-cream-dark px-4 text-sm font-medium text-gray-600 transition-colors hover:border-anv-green/40 hover:text-anv-green"
      >
        <ShareIcon />
        <span>{copied ? "Link copied" : "Share"}</span>
      </button>
    </div>
  );
}

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
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
