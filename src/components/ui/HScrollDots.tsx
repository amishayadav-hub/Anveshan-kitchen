"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Classes for the scroller itself (must include the overflow utilities). */
  className?: string;
  /** Active dot colour (override for dark/green backgrounds). */
  activeColor?: string;
  /** Inactive dot colour. */
  inactiveColor?: string;
  /**
   * Controlled active index. When provided, the active dot follows this value
   * (e.g. a selected tab) instead of the row's scroll position, and the matching
   * item is scrolled into view. Leave undefined for pure scroll-position tracking.
   */
  activeIndex?: number;
  /** Force the dots to show even when the row doesn't overflow. */
  alwaysShow?: boolean;
  /** "dots" (default) = carousel dots; "bar" = a thin themed scroll-progress line. */
  variant?: "dots" | "bar";
}

// Wraps a horizontally-scrolling row and renders carousel-style dots beneath it —
// one dot per item. By default the active dot reflects scroll position; pass
// `activeIndex` to sync it to a selection (e.g. the active tab). Reused across
// every horizontal scroller.
export default function HScrollDots({
  children,
  className = "",
  activeColor = "bg-anv-green",
  inactiveColor = "bg-gray-300",
  activeIndex,
  alwaysShow = false,
  variant = "dots",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [scrollActive, setScrollActive] = useState(0);
  const [overflowing, setOverflowing] = useState(false);
  // For the "bar" variant: thumb width (visible fraction) + position (0..1).
  const [viewFrac, setViewFrac] = useState(1);
  const [scrollFrac, setScrollFrac] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function update() {
      if (!el) return;
      const items = Array.from(el.children) as HTMLElement[];
      const max = el.scrollWidth - el.clientWidth;
      setOverflowing(max > 1);
      setViewFrac(el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1);
      setScrollFrac(max > 0 ? el.scrollLeft / max : 0);
      setCount(items.length);
      if (items.length === 0) return;
      // Active = the item whose left edge sits closest to the row's left edge.
      const base = el.getBoundingClientRect().left;
      let best = 0;
      let bestDist = Infinity;
      items.forEach((it, i) => {
        const d = Math.abs(it.getBoundingClientRect().left - base);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setScrollActive(best);
    }

    // Defer the first read out of the synchronous effect body.
    const raf = requestAnimationFrame(update);
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  // Controlled mode: bring the active item into view when it changes (only if
  // it's actually out of view, so visible tabs don't jump around).
  useEffect(() => {
    if (activeIndex == null) return;
    const el = ref.current;
    if (!el) return;
    const item = el.children[activeIndex] as HTMLElement | undefined;
    if (!item) return;
    const elRect = el.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    if (itemRect.left < elRect.left) {
      el.scrollBy({ left: itemRect.left - elRect.left - 8, behavior: "smooth" });
    } else if (itemRect.right > elRect.right) {
      el.scrollBy({ left: itemRect.right - elRect.right + 8, behavior: "smooth" });
    }
  }, [activeIndex]);

  function go(i: number) {
    const el = ref.current;
    if (!el) return;
    const item = el.children[i] as HTMLElement | undefined;
    if (!item) return;
    const delta = item.getBoundingClientRect().left - el.getBoundingClientRect().left;
    el.scrollTo({ left: el.scrollLeft + delta, behavior: "smooth" });
  }

  const active = activeIndex ?? scrollActive;
  const show = (overflowing || alwaysShow) && count > 1;

  return (
    <div>
      <div ref={ref} className={className}>
        {children}
      </div>
      {variant === "bar"
        ? (overflowing || alwaysShow) && (
            // Thin scroll-progress line — a green thumb slides along a soft track.
            <div className="mx-auto mt-2.5 h-[3px] w-24 overflow-hidden rounded-full bg-anv-green/10">
              <div
                className="h-full rounded-full bg-anv-green/50"
                style={{
                  width: `${Math.max(viewFrac * 100, 15)}%`,
                  marginLeft: `${scrollFrac * (100 - Math.max(viewFrac * 100, 15))}%`,
                }}
              />
            </div>
          )
        : show && (
            <div className="mt-2 flex justify-center gap-1.5">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to item ${i + 1}`}
                  onClick={() => go(i)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === active ? `w-4 ${activeColor}` : `w-1.5 ${inactiveColor}`
                  }`}
                />
              ))}
            </div>
          )}
    </div>
  );
}
