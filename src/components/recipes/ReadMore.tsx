"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  text: string;
  /** "lines" → CSS -webkit-line-clamp (default). "chars" → JS character cutoff. */
  mode?: "lines" | "chars";
  /** Visible lines when collapsed (mode="lines"). */
  lines?: number;
  /** Visible characters when collapsed (mode="chars"). */
  chars?: number;
  /** Toggle labels — configurable per the spec. */
  expandLabel?: string;
  collapseLabel?: string;
  /** Classes for the text element (e.g. "recipe-body"). */
  className?: string;
}

// Subtle inline link styling for the toggle: accent colour, no underline until
// hover/focus. A real <button>, so Enter/Space + focus come for free.
const TOGGLE_CLASS =
  "font-medium text-anv-green no-underline hover:underline focus-visible:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-anv-green/30 rounded-sm";

export default function ReadMore({
  text,
  mode = "lines",
  lines = 3,
  chars = 150,
  expandLabel = "Read more",
  collapseLabel = "Show less",
  className = "",
}: Props) {
  const [expanded, setExpanded] = useState(false);

  // ── Character-based fallback ──────────────────────────────────────────────
  if (mode === "chars") {
    const isLong = text.length > chars;
    const shown = expanded || !isLong ? text : `${text.slice(0, chars).trimEnd()}…`;
    return (
      <p className={className}>
        {shown}
        {isLong && (
          <>
            {" "}
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className={TOGGLE_CLASS}
            >
              {expanded ? collapseLabel : expandLabel}
            </button>
          </>
        )}
      </p>
    );
  }

  // ── Line-based version (CSS line-clamp) ───────────────────────────────────
  return <LineClamp
    text={text}
    lines={lines}
    expanded={expanded}
    setExpanded={setExpanded}
    expandLabel={expandLabel}
    collapseLabel={collapseLabel}
    className={className}
  />;
}

function LineClamp({
  text,
  lines,
  expanded,
  setExpanded,
  expandLabel,
  collapseLabel,
  className,
}: {
  text: string;
  lines: number;
  expanded: boolean;
  setExpanded: (fn: (v: boolean) => boolean) => void;
  expandLabel: string;
  collapseLabel: string;
  className: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  // Show the toggle only once we know the text actually overflows the clamp.
  const [needsToggle, setNeedsToggle] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || expanded) return; // only measure while clamped
    if (el.scrollHeight > el.clientHeight + 1) setNeedsToggle(true);
  }, [text, lines, expanded]);

  return (
    <div>
      <p
        ref={ref}
        className={className}
        style={
          expanded
            ? undefined
            : {
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: lines,
                overflow: "hidden",
              }
        }
      >
        {text}
      </p>
      {needsToggle && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className={`mt-1 inline-block text-[13.5px] ${TOGGLE_CLASS}`}
        >
          {expanded ? collapseLabel : expandLabel}
        </button>
      )}
    </div>
  );
}
