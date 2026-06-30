"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Classes for the scroller itself (must include the overflow utilities). */
  className?: string;
}

const FADE = "28px"; // width of the edge fade

// Wraps a horizontally-scrolling row and softly fades the content at whichever
// edge still has hidden content — a subtle, professional "there's more sideways"
// cue. Uses a CSS mask so it respects the row's own shape/background and adds no
// visible bar or overlay. The mask clears entirely when nothing overflows.
export default function HScroll({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [mask, setMask] = useState<string | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function update() {
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      if (scrollWidth - clientWidth <= 1) {
        setMask(undefined); // not scrollable → no fade
        return;
      }
      const left = scrollLeft > 1 ? "transparent" : "black";
      const right = scrollLeft < scrollWidth - clientWidth - 1 ? "transparent" : "black";
      setMask(
        `linear-gradient(to right, ${left}, black ${FADE}, black calc(100% - ${FADE}), ${right})`
      );
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

  return (
    <div
      ref={ref}
      className={className}
      style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
    >
      {children}
    </div>
  );
}
