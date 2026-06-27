"use client";

import { useState } from "react";
import { ProductPdp } from "@/data/product-pdp";
import FaqAccordion from "@/components/recipes/FaqAccordion";

interface Props {
  productName: string;
  pdp: ProductPdp;
}

type TabKey = "shelf" | "benefits" | "faqs";

export default function ProductInfoTabs({ productName, pdp }: Props) {
  const hasShelf = !!pdp.shelfLife && (!!pdp.shelfLife.duration || !!pdp.shelfLife.storage);
  const hasBenefits = !!pdp.benefits?.length;
  const hasFaqs = !!pdp.faqs?.length;

  const tabs: { key: TabKey; label: string }[] = [
    ...(hasShelf ? [{ key: "shelf" as const, label: "Shelf Life" }] : []),
    ...(hasBenefits ? [{ key: "benefits" as const, label: "Benefits" }] : []),
    ...(hasFaqs ? [{ key: "faqs" as const, label: "FAQs" }] : []),
  ];

  const [tab, setTab] = useState<TabKey>(tabs[0]?.key ?? "faqs");

  if (tabs.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-center text-lg font-bold text-gray-900 mb-5">
        More about Anveshan {productName}
      </h2>

      {/* Pill tab bar */}
      <div className="bg-anv-green rounded-full p-1.5 flex justify-center gap-1 sm:gap-2 mb-8">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 sm:px-7 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              tab === t.key ? "bg-white text-anv-green" : "text-white/80 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Shelf Life */}
      {tab === "shelf" && pdp.shelfLife && (
        <div className="space-y-4 max-w-3xl">
          {pdp.shelfLife.duration && (
            <p className="text-gray-700 leading-relaxed">
              <span className="font-bold text-anv-green">Duration:</span> {pdp.shelfLife.duration}
            </p>
          )}
          {pdp.shelfLife.storage && (
            <p className="text-gray-700 leading-relaxed">
              <span className="font-bold text-anv-green">Storage:</span> {pdp.shelfLife.storage}
            </p>
          )}
        </div>
      )}

      {/* Benefits */}
      {tab === "benefits" && hasBenefits && (
        <div>
          <h3 className="text-center font-bold text-gray-900 tracking-wide mb-6">BENEFITS</h3>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
            {pdp.benefits!.map((b, i) => (
              <div key={i} className="flex gap-3">
                <span className="shrink-0 text-anv-green mt-0.5">
                  <LeafIcon />
                </span>
                <div>
                  <p className="font-semibold text-gray-900">{b.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQs accordion */}
      {tab === "faqs" && hasFaqs && <FaqAccordion faqs={pdp.faqs!} />}
    </section>
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
