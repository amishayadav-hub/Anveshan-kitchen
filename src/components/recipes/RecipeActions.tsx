"use client";

import { useEffect, useState, type ReactNode } from "react";

interface Props {
  slug: string;
  name: string;
}

const FAVORITES_KEY = "anveshan-favorites";

export default function RecipeActions({ slug, name }: Props) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const list: string[] = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
      setSaved(list.includes(slug));
    } catch {}
  }, [slug]);

  function toggleSave() {
    try {
      const list: string[] = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
      const next = list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      setSaved(next.includes(slug));
    } catch {}
  }

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
    <div className="no-print flex flex-wrap items-center gap-2 mt-4">
      <ActionButton onClick={() => window.print()} label="Print">
        <PrinterIcon />
      </ActionButton>
      <ActionButton onClick={share} label={copied ? "Link copied" : "Share"}>
        <ShareIcon />
      </ActionButton>
      <ActionButton onClick={toggleSave} label={saved ? "Saved" : "Save"} pressed={saved}>
        <BookmarkIcon filled={saved} />
      </ActionButton>
    </div>
  );
}

function ActionButton({
  onClick,
  label,
  pressed,
  children,
}: {
  onClick: () => void;
  label: string;
  pressed?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${
        pressed
          ? "border-anv-green bg-anv-green/10 text-anv-green"
          : "border-anv-cream-dark text-gray-600 hover:border-anv-green/40 hover:text-anv-green"
      }`}
    >
      {children}
      <span>{label}</span>
    </button>
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

function PrinterIcon() {
  return (
    <Svg>
      <path d="M6 9V2h12v7" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
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

function BookmarkIcon({ filled }: { filled?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}
