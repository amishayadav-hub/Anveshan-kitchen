"use client";

import { AttaVariety, ATTA_VARIETY } from "@/lib/product-highlight";

interface Props {
  varieties: AttaVariety[];
  selected: AttaVariety;
  onChange: (variety: AttaVariety) => void;
}

// Atta type selector (Khapli / Multigrain). Picking one updates the cart variant,
// price and image — same behaviour as the ghee variety chips.
export default function AttaSelector({ varieties, selected, onChange }: Props) {
  return (
    <div className="flex flex-nowrap gap-2 overflow-x-auto no-scrollbar">
      {varieties.map((v) => {
        const info = ATTA_VARIETY[v];
        return (
          <button
            key={v}
            type="button"
            aria-pressed={selected === v}
            onClick={() => onChange(v)}
            className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
              selected === v
                ? "bg-anv-green text-white border-anv-green"
                : "bg-white text-anv-green border-anv-green/25 hover:border-anv-green hover:bg-anv-green/5"
            }`}
          >
            {info.label} Atta
            <span className="ml-1.5 text-xs opacity-75">₹{info.price}</span>
          </button>
        );
      })}
    </div>
  );
}
