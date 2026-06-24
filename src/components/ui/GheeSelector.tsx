"use client";

import { GheeVariant, GheeVariantOption } from "@/types";

interface Props {
  variants: GheeVariantOption[];
  selected: GheeVariant;
  onChange: (variant: GheeVariant) => void;
}

const LABELS: Record<GheeVariant, string> = {
  "gir-cow": "Gir Cow",
  "desi-cow": "Desi Cow",
  "buffalo": "Buffalo",
};

export default function GheeSelector({ variants, selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((v) => (
        <button
          key={v.type}
          onClick={() => onChange(v.type)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
            selected === v.type
              ? "bg-anv-green text-white border-anv-green"
              : "bg-white text-anv-green border-anv-cream-dark hover:border-anv-green"
          }`}
        >
          {LABELS[v.type]}
          <span className="ml-1.5 text-xs opacity-75">₹{v.price}</span>
        </button>
      ))}
    </div>
  );
}
