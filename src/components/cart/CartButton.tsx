"use client";

import { useCart } from "./CartProvider";

export default function CartButton() {
  const { count, open } = useCart();
  return (
    <button
      onClick={open}
      className="relative p-2 text-anv-green hover:text-anv-green-dark transition-colors"
      aria-label={`Open cart${count ? `, ${count} items` : ""}`}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-anv-green text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}
