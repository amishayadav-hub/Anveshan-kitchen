"use client";

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

// Floating product card: image, quality blurb, selectable size+price rows, and a
// corner ↗ that opens the full PDP. Picking a size sets the pack used in the cart.
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
  return (
    <>
      {/* click-away layer */}
      <div className="fixed inset-0 z-30" onClick={onClose} />

      <div className="absolute left-0 top-full mt-2 z-40 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 text-left">
        {pdpUrl && (
          <a
            href={pdpUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="View full product page"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 text-anv-green hover:text-anv-green-dark"
          >
            <ExternalLinkIcon className="w-4 h-4" />
          </a>
        )}

        <div className="flex gap-3 items-center pr-6">
          {image && (
            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-anv-cream/40 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
          )}
          <p className="font-bold text-gray-900 leading-tight">{name}</p>
        </div>

        {about && <p className="text-xs text-gray-500 mt-2.5 leading-relaxed">{about}</p>}

        {sizes.length > 0 && (
          <div className="mt-3.5 space-y-1.5">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
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
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-colors ${
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
