"use client";

import Image from "next/image";
import { useCart } from "./CartProvider";
import { buildCartPermalink } from "@/lib/shopify-cart";

export default function CartDrawer() {
  const { lines, isOpen, close, subtotal, count, setQty, remove } = useCart();

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
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      {/* drawer */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                    {l.price > 0 && (
                      <p className="text-xs text-anv-green font-semibold mt-0.5">₹{l.price}</p>
                    )}
                    <div className="flex items-center justify-between gap-3 mt-2">
                      <div className="flex items-center border border-gray-200 rounded-full overflow-hidden shrink-0">
                        <button
                          onClick={() => setQty(l.variantId, l.quantity - 1)}
                          className="w-10 h-10 text-gray-600 hover:bg-gray-50"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-sm">{l.quantity}</span>
                        <button
                          onClick={() => setQty(l.variantId, l.quantity + 1)}
                          className="w-10 h-10 text-gray-600 hover:bg-gray-50"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(l.variantId)}
                        className="text-xs text-gray-400 hover:text-red-500 px-2 py-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
