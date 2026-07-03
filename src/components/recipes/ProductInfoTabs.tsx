"use client";

import { useState } from "react";
import { ProductPdp } from "@/data/product-pdp";

interface Props {
  productName: string;
  pdp: ProductPdp;
}

type TabKey = "shelf" | "benefits";

export default function ProductInfoTabs({ productName, pdp }: Props) {
  const hasShelf = !!pdp.shelfLife && (!!pdp.shelfLife.duration || !!pdp.shelfLife.storage);
  const hasBenefits = !!pdp.benefits?.length;

  // FAQs intentionally omitted here — the recipe already has its own FAQ section,
  // so the product footer stays focused on Shelf Life + Benefits (no duplicate FAQ).
  const tabs: { key: TabKey; label: string }[] = [
    ...(hasShelf ? [{ key: "shelf" as const, label: "Shelf Life" }] : []),
    ...(hasBenefits ? [{ key: "benefits" as const, label: "Benefits" }] : []),
  ];

  const [tab, setTab] = useState<TabKey>(tabs[0]?.key ?? "shelf");

  if (tabs.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="recipe-heading text-center">
        More about Anveshan {productName}
      </h2>

      {/* Pill tab bar */}
      <div className="bg-anv-green rounded-full p-1.5 flex flex-wrap justify-center gap-1 sm:gap-2 mb-8">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 sm:px-7 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              tab === t.key ? "bg-white text-anv-green" : "text-white/80 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Shelf Life */}
      {tab === "shelf" && pdp.shelfLife && (
        <div className="space-y-3 max-w-3xl">
          {pdp.shelfLife.duration && (
            <p className="text-[13px] text-gray-700 leading-relaxed">
              <span className="font-bold text-anv-green">Duration:</span> {pdp.shelfLife.duration}
            </p>
          )}
          {pdp.shelfLife.storage && (
            <p className="text-[13px] text-gray-700 leading-relaxed">
              <span className="font-bold text-anv-green">Storage:</span> {pdp.shelfLife.storage}
            </p>
          )}
        </div>
      )}

      {/* Benefits — headings on one row; hover/tap each to reveal its detail. */}
      {tab === "benefits" && hasBenefits && (
        <div>
          <h3 className="text-center text-sm font-bold text-gray-900 tracking-wide mb-6">BENEFITS</h3>
          <div className="flex flex-nowrap justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible no-scrollbar">
            {pdp.benefits!.map((b, i) => (
              <BenefitChip key={i} title={b.title} desc={b.desc} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// A benefit heading (e.g. "Gut Health"); hover / focus / tap opens a small
// floating window with the detail. Mirrors the ghee-variety popover pattern.
function BenefitChip({ title, desc }: { title: string; desc: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative shrink-0"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="inline-flex min-h-[34px] items-center gap-1.5 whitespace-nowrap rounded-full border border-anv-green/25 bg-white px-3 text-[13px] font-semibold text-anv-green transition-all hover:border-anv-green hover:bg-anv-green/5"
      >
        <LeafIcon />
        {title}
      </button>
      {open && (
        <div className="fixed inset-x-4 top-auto z-40 mx-auto w-auto max-w-sm rounded-2xl border border-gray-200 bg-white p-4 shadow-xl sm:absolute sm:inset-x-auto sm:left-1/2 sm:top-full sm:mx-0 sm:mt-2 sm:w-64 sm:max-w-none sm:-translate-x-1/2">
          <p className="mb-1 text-sm font-bold text-anv-green">{title}</p>
          <p className="text-[13px] leading-relaxed text-gray-600">{desc}</p>
        </div>
      )}
    </div>
  );
}

function LeafIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </svg>
  );
}
