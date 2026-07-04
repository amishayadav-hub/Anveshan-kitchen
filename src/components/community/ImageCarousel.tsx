"use client";

import { useRef, useState } from "react";

// Full-bleed image (single) or swipeable carousel (multiple) for one reel post.
// Horizontal scroll-snap handles swipe on all devices; dots + arrows aid desktop.
// `mount` gates the heavy <img> tags so off-screen posts stay cheap (virtualization).
export default function ImageCarousel({
  images,
  alt,
  mount,
}: {
  images: string[];
  alt: string;
  mount: boolean;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  function onScroll() {
    const el = trackRef.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  }

  function go(i: number) {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(images.length - 1, i));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  }

  // Placeholder while off-screen — keeps layout + avoids loading unseen images.
  if (!mount) {
    return <div className="absolute inset-0 bg-neutral-900" aria-hidden="true" />;
  }

  return (
    <div className="absolute inset-0">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden no-scrollbar"
      >
        {images.map((src, i) => (
          <div key={i} className="relative h-full w-full shrink-0 snap-center bg-neutral-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${alt}${images.length > 1 ? ` (${i + 1}/${images.length})` : ""}`}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          {/* Dots */}
          <div className="pointer-events-none absolute left-1/2 top-3 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-4 bg-white" : "w-1.5 bg-white/50"}`}
              />
            ))}
          </div>
          {/* Desktop arrows */}
          {index > 0 && (
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur md:flex"
            >
              ‹
            </button>
          )}
          {index < images.length - 1 && (
            <button
              onClick={() => go(index + 1)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur md:flex"
            >
              ›
            </button>
          )}
        </>
      )}
    </div>
  );
}
