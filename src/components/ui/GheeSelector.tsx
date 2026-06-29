"use client";

import { useState } from "react";
import { GheeVariant, GheeVariantOption } from "@/types";
import { GHEE_VARIETY } from "@/lib/product-highlight";

interface Props {
  variants: GheeVariantOption[];
  selected: GheeVariant;
  onChange: (variant: GheeVariant) => void;
  /** Show the hover popover with tasting notes. Off in tight layouts (e.g. cart sidebar). */
  showInfo?: boolean;
}

const LABELS: Record<GheeVariant, string> = {
  "gir-cow": "Gir Cow",
  "desi-cow": "Desi Cow",
  "buffalo": "Buffalo",
};

// Ghee type selector. Click selects the type for the cart; hover/focus/tap shows
// a popover with that variety's product image + flavour/texture/best-for/ayurvedic.
export default function GheeSelector({ variants, selected, onChange, showInfo = true }: Props) {
  const [openInfo, setOpenInfo] = useState<GheeVariant | null>(null);

  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((v) => {
        const info = GHEE_VARIETY[v.type];
        return (
          <div
            key={v.type}
            className="relative"
            onMouseEnter={() => showInfo && setOpenInfo(v.type)}
            onMouseLeave={() => setOpenInfo((cur) => (cur === v.type ? null : cur))}
          >
            <button
              type="button"
              aria-pressed={selected === v.type}
              onClick={() => {
                onChange(v.type);
                if (showInfo) setOpenInfo((cur) => (cur === v.type ? null : v.type)); // tap toggles on mobile
              }}
              onFocus={() => showInfo && setOpenInfo(v.type)}
              onBlur={() => setOpenInfo((cur) => (cur === v.type ? null : cur))}
              className={`min-h-[40px] px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                selected === v.type
                  ? "bg-anv-green text-white border-anv-green"
                  : "bg-white text-anv-green border-anv-green/25 hover:border-anv-green hover:bg-anv-green/5"
              }`}
            >
              {LABELS[v.type]}
              <span className="ml-1.5 text-xs opacity-75">₹{v.price}</span>
            </button>

            {info && openInfo === v.type && (
              <div className="fixed inset-x-4 top-auto z-40 w-auto max-w-sm mx-auto sm:absolute sm:inset-x-auto sm:left-0 sm:top-full sm:mt-2 sm:w-72 sm:max-w-none sm:mx-0 bg-white rounded-2xl shadow-xl border border-gray-200 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-anv-cream/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={info.image} alt={`${LABELS[v.type]} Ghee`} width={56} height={56} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </div>
                  <p className="font-bold text-anv-green leading-tight">{LABELS[v.type]} Ghee</p>
                </div>
                <dl className="space-y-2">
                  <Attr label="Flavour" value={info.flavour} />
                  <Attr label="Texture" value={info.texture} />
                  <Attr label="Best For" value={info.bestFor} />
                  <Attr label="Ayurvedic Benefits" value={info.ayurvedic} />
                </dl>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Attr({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-sm">
      <dt className="text-gray-500">{label}</dt>
      <dd className="font-semibold text-anv-green">{value}</dd>
    </div>
  );
}
