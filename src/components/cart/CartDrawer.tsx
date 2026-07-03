"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "./CartProvider";
import { buildCartPermalink } from "@/lib/shopify-cart";
import CartRecommendations from "./CartRecommendations";

export default function CartDrawer() {
  const { lines, isOpen, close, subtotal, count, setQty, changeVariant, remove } = useCart();
  // Which line's size list is expanded (keyed by variantId).
  const [editing, setEditing] = useState<string | null>(null);

  function checkout() {
    if (lines.length === 0) return;
    const url = buildCartPermalink(
      lines.map((l) => ({ shopifyVariantId: l.variantId, quantity: l.quantity, productName: l.name }))
    );
    window.location.href = url; // Shopify cart/checkout carries every line
  }

  return (
    <>
      {/* backdrop */}
      <div
        onClick={close}
        className={`print:hidden fixed inset-0 z-[100] bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      {/* drawer */}
      <aside
        className={`print:hidden fixed top-0 right-0 z-[110] h-full w-full max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <header className="flex items-center justify-between pl-5 pr-2 h-14 border-b border-gray-100 shrink-0">
          <h2 className="font-bold text-gray-900">Your Cart{count > 0 ? ` (${count})` : ""}</h2>
          <button onClick={close} aria-label="Close cart" className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-700 text-2xl leading-none">
            ×
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            Your cart is empty.
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-4">
              {lines.map((l) => (
                <div key={l.variantId} className="flex gap-3 items-start">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-anv-cream/40 shrink-0">
                    {l.image && <Image src={l.image} alt={l.name} fill className="object-cover" sizes="56px" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-gray-900 leading-tight line-clamp-2">{l.name}</p>
                      {l.price > 0 && (
                        <span className="text-sm font-semibold text-gray-900 shrink-0">₹{l.price * l.quantity}</span>
                      )}
                    </div>

                    {/* Size / pack selector — tap the current size to switch it. */}
                    {l.variants && l.variants.length > 1 && (
                      <div className="mt-1.5">
                        <button
                          onClick={() => setEditing((cur) => (cur === l.variantId ? null : l.variantId))}
                          aria-expanded={editing === l.variantId}
                          className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 hover:border-anv-green/40"
                        >
                          {l.variantLabel ?? "Choose size"}
                          <svg
                            viewBox="0 0 24 24"
                            className={`h-3.5 w-3.5 transition-transform ${editing === l.variantId ? "rotate-180" : ""}`}
                            fill="none" stroke="currentColor" strokeWidth="2.5"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>

                        {editing === l.variantId && (
                          <div className="mt-1.5 space-y-1 rounded-lg border border-gray-100 p-1.5">
                            {l.variants.map((v) => {
                              const active = v.variantId === l.variantId;
                              return (
                                <button
                                  key={v.variantId}
                                  onClick={() => {
                                    changeVariant(l.variantId, v);
                                    setEditing(null);
                                  }}
                                  className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors ${
                                    active
                                      ? "bg-anv-green/5 text-anv-green font-semibold"
                                      : "text-gray-700 hover:bg-gray-50"
                                  }`}
                                >
                                  <span>{v.label}</span>
                                  <span className="font-semibold">
                                    ₹{v.price}
                                    {active && " ✓"}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-3 mt-2">
                      <div className="flex items-center border border-gray-200 rounded-full overflow-hidden shrink-0">
                        <button
                          onClick={() => setQty(l.variantId, l.quantity - 1)}
                          className="w-7 h-7 text-gray-600 hover:bg-gray-50"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-xs">{l.quantity}</span>
                        <button
                          onClick={() => setQty(l.variantId, l.quantity + 1)}
                          className="w-7 h-7 text-gray-600 hover:bg-gray-50"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(l.variantId)}
                        aria-label="Remove item"
                        title="Remove"
                        className="p-2 text-gray-500 transition-colors hover:text-red-600"
                      >
                        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V6" />
                          <path d="M10 11v6M14 11v6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              </div>
              <CartRecommendations />
            </div>

            <footer className="border-t border-gray-100 p-4 space-y-3 shrink-0">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold text-gray-900">₹{subtotal}</span>
              </div>
              <button
                onClick={checkout}
                className="w-full bg-anv-green hover:bg-anv-green-dark text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Checkout on anveshan.farm →
              </button>
              <p className="text-center text-xs text-gray-400">
                You&apos;ll complete payment securely on anveshan.farm.
              </p>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
