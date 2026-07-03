"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ProductSize } from "@/data/product-variants";
import { ExternalLinkIcon } from "@/components/ui/icons";

interface Props {
  name: string;
  image?: string;
  about?: string;
  pdpUrl?: string | null;
  sizes: ProductSize[];
  selectedVariantId?: string;
  onSelectSize: (size: ProductSize) => void;
  onClose: () => void;
}

// Compact size popover — small, anchored right next to the product name (not a
// full-width sheet). It auto-flips up/down and left/right so it always stays on
// screen. Same behaviour on mobile and desktop. Picking a size sets the cart pack.
export default function ProductInfoCard({
  name,
  image,
  about,
  pdpUrl,
  sizes,
  selectedVariantId,
  onSelectSize,
  onClose,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // Default: open below the trigger, left-aligned. Corrected after measuring.
  const [pos, setPos] = useState<{ v: "top" | "bottom"; h: "left" | "right" }>({
    v: "bottom",
    h: "left",
  });

  // Measure once on open and flip toward whatever side has room in the viewport.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setPos({
      v: r.bottom > vh - 8 && r.top > vh - r.bottom ? "top" : "bottom",
      h: r.right > vw - 8 ? "right" : "left",
    });
  }, []);

  const vCls = pos.v === "top" ? "bottom-full mb-1.5" : "top-full mt-1.5";
  const hCls = pos.h === "right" ? "right-0" : "left-0";

  return (
    <>
      {/* Transparent click-away above the mobile bottom nav (z-[99]). */}
      <div className="fixed inset-0 z-[100]" onClick={onClose} aria-hidden="true" />

      <div
        ref={ref}
        role="dialog"
        aria-label={`${name} — choose size`}
        className={`absolute z-[110] w-52 max-w-[calc(100vw-1.5rem)] rounded-xl bg-white shadow-xl border border-gray-200 p-3 text-left ${vCls} ${hCls}`}
      >
        {pdpUrl && (
          <a
            href={pdpUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="View full product page"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-2.5 right-2.5 text-anv-green hover:text-anv-green-dark"
          >
            <ExternalLinkIcon className="w-3.5 h-3.5" />
          </a>
        )}

        <div className="flex gap-2 items-center pr-5">
          {image && (
            <div className="relative w-9 h-9 rounded-md overflow-hidden bg-anv-cream/40 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
          )}
          <p className="text-sm font-bold text-gray-900 leading-tight line-clamp-2">{name}</p>
        </div>

        {about && <p className="text-[11px] text-gray-500 mt-1.5 leading-snug line-clamp-2">{about}</p>}

        {sizes.length > 0 && (
          <div className="mt-2 space-y-1">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
              Available sizes
            </p>
            {sizes.map((s) => {
              const active = s.variantId === selectedVariantId;
              return (
                <button
                  key={s.variantId}
                  onClick={() => {
                    onSelectSize(s);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-xs transition-colors ${
                    active
                      ? "border-anv-green bg-anv-green/5 text-anv-green font-semibold"
                      : "border-gray-200 hover:border-anv-green/40 text-gray-700"
                  }`}
                >
                  <span>{s.label}</span>
                  <span className="font-semibold">
                    ₹{s.price}
                    {active && " ✓"}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
