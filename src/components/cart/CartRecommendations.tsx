"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { getAllProductsClient } from "@/lib/recipes";
import { AnveshanProduct, CartLine } from "@/types";
import { useCart } from "./CartProvider";
import { variantMetaFor } from "@/lib/cart-variants";
import { pdpUrlForProduct } from "@/lib/product-highlight";
import { track } from "@/lib/analytics";

// Cross-category product recommendations for the cart. Instead of suggesting
// more of what's already in the cart (e.g. more Ghee), we surface COMPLEMENTARY
// categories (Oil, Atta, Superfoods…). Each card opens the product's PDP on the
// storefront; the ADD button adds it with a fly-to-cart animation.

// Category display order so hero staples surface first among the picks.
const CATEGORY_RANK: Record<string, number> = {
  ghee: 0,
  oil: 1,
  grain: 2, // attas
  sweetener: 3,
  superfood: 4,
  spice: 5,
};

type Rec = { p: AnveshanProduct; variantId: string; price: number; pdp: string };

export default function CartRecommendations() {
  const { lines, addLines } = useCart();
  const [products, setProducts] = useState<AnveshanProduct[]>([]);
  const [added, setAdded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let alive = true;
    getAllProductsClient()
      .then((ps) => {
        if (alive) setProducts(ps);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // Map every variant id + product name → its category so we can tell which
  // categories are ALREADY in the cart (cart lines only store variantId/name).
  const { variantToCat, nameToCat } = useMemo(() => {
    const variantToCat: Record<string, string> = {};
    const nameToCat: Record<string, string> = {};
    for (const p of products) {
      variantToCat[p.shopifyVariantId] = p.category;
      p.variants?.forEach((v) => (variantToCat[v.shopifyVariantId] = p.category));
      nameToCat[p.name.toLowerCase()] = p.category;
    }
    return { variantToCat, nameToCat };
  }, [products]);

  const cartCategories = useMemo(() => {
    const set = new Set<string>();
    for (const l of lines) {
      const c = variantToCat[l.variantId] ?? nameToCat[l.name.toLowerCase()];
      if (c) set.add(c);
    }
    return set;
  }, [lines, variantToCat, nameToCat]);

  const cartVariantIds = useMemo(() => new Set(lines.map((l) => l.variantId)), [lines]);

  // Complementary products: linkable (PDP) + addable (variant) + not already in
  // the cart + a DIFFERENT category from what's in the cart. Falls back to any
  // not-in-cart product if the cart already spans every category.
  const recs = useMemo<Rec[]>(() => {
    const usable = products
      .map((p) => {
        const variantId = p.variants ? p.variants[0].shopifyVariantId : p.shopifyVariantId;
        const price = p.variants ? p.variants[0].price : p.price;
        const pdp = pdpUrlForProduct(p.id);
        return pdp && variantId ? { p, variantId, price, pdp } : null;
      })
      .filter((x): x is Rec => x !== null && !cartVariantIds.has(x.variantId));

    const complementary = usable.filter((x) => !cartCategories.has(x.p.category));
    const pool = complementary.length ? complementary : usable;

    // Group by category, then round-robin across categories so the picks are a
    // DIVERSE spread (Oil, Atta, Superfood…) rather than 6 oils crowding out the
    // rest.
    const byCat = new Map<string, Rec[]>();
    for (const x of pool) {
      const arr = byCat.get(x.p.category) ?? [];
      arr.push(x);
      byCat.set(x.p.category, arr);
    }
    const cats = [...byCat.keys()].sort((a, b) => (CATEGORY_RANK[a] ?? 9) - (CATEGORY_RANK[b] ?? 9));
    for (const c of cats) byCat.get(c)!.sort((a, b) => a.p.name.localeCompare(b.p.name));

    const out: Rec[] = [];
    for (let i = 0; out.length < 8; i++) {
      let anyThisRound = false;
      for (const c of cats) {
        const item = byCat.get(c)![i];
        if (item) {
          out.push(item);
          anyThisRound = true;
          if (out.length >= 8) break;
        }
      }
      if (!anyThisRound) break;
    }
    return out;
  }, [products, cartCategories, cartVariantIds]);

  if (recs.length === 0) return null;

  // Fly a clone of the product image from the card to the cart header for a
  // clear "added" confirmation. Best-effort — the button state confirms too.
  function flyToCart(src: HTMLElement | null, imageUrl: string) {
    if (typeof window === "undefined" || !src || !imageUrl) return;
    const target = document.getElementById("cart-fly-target");
    if (!target || typeof src.animate !== "function") return;
    try {
      const s = src.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      const fly = document.createElement("img");
      fly.src = imageUrl;
      fly.style.cssText = `position:fixed;left:${s.left}px;top:${s.top}px;width:${s.width}px;height:${s.height}px;border-radius:10px;object-fit:cover;z-index:300;pointer-events:none;box-shadow:0 6px 20px rgba(0,0,0,.25);`;
      document.body.appendChild(fly);
      const dx = t.left + t.width / 2 - (s.left + s.width / 2);
      const dy = t.top + t.height / 2 - (s.top + s.height / 2);
      const anim = fly.animate(
        [
          { transform: "translate(0,0) scale(1)", opacity: 1 },
          { transform: `translate(${dx}px, ${dy}px) scale(0.25)`, opacity: 0.3 },
        ],
        { duration: 650, easing: "cubic-bezier(0.22,0.61,0.36,1)" }
      );
      const cleanup = () => fly.remove();
      anim.onfinish = cleanup;
      anim.oncancel = cleanup;
    } catch {
      /* animation unsupported — the button confirmation still fires */
    }
  }

  function add(rec: Rec, imgEl: HTMLElement | null) {
    const line: CartLine = {
      variantId: rec.variantId,
      name: rec.p.name,
      image: rec.p.image,
      price: rec.price,
      quantity: 1,
      ...variantMetaFor(rec.variantId, rec.p.id),
    };
    track("add_to_cart", { source: "cart_recommendation", product: rec.p.name, value: rec.price });
    flyToCart(imgEl, rec.p.image);
    addLines([line]);
    setAdded((a) => ({ ...a, [rec.p.id]: true }));
    window.setTimeout(() => setAdded((a) => ({ ...a, [rec.p.id]: false })), 1500);
  }

  return (
    <div className="border-t border-gray-100 px-4 py-3">
      <p className="mb-2 text-xs font-semibold text-gray-500">Complete your kitchen</p>
      <div className="flex gap-2.5 overflow-x-auto no-scrollbar">
        {recs.map((rec) => (
          <RecCard key={rec.p.id} rec={rec} added={!!added[rec.p.id]} onAdd={add} />
        ))}
      </div>
    </div>
  );
}

function RecCard({
  rec,
  added,
  onAdd,
}: {
  rec: Rec;
  added: boolean;
  onAdd: (rec: Rec, imgEl: HTMLElement | null) => void;
}) {
  const imgRef = useRef<HTMLDivElement | null>(null);
  const { p, price, pdp } = rec;
  return (
    <div className="relative w-[84px] shrink-0">
      <div ref={imgRef} className="relative h-16 w-[84px] overflow-hidden rounded-lg bg-anv-cream/40">
        {p.image && <Image src={p.image} alt={p.name} fill className="object-cover" sizes="84px" />}
      </div>
      <p className="mt-1 line-clamp-1 text-[10px] font-medium leading-tight text-gray-800">{p.name}</p>
      <p className="text-[10px] font-semibold text-gray-500">₹{price}</p>

      {/* Stretched link → the WHOLE card opens the product PDP. Sits above the
          image/text but BELOW the ADD button (z-20), so ADD stays clickable. */}
      <a
        href={pdp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${p.name}`}
        onClick={() => track("select_item", { source: "cart_recommendation", product: p.name })}
        className="absolute inset-0 z-10 rounded-lg"
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onAdd(rec, imgRef.current);
        }}
        aria-label={`Add ${p.name} to cart`}
        className={`relative z-20 mt-1 inline-flex w-full items-center justify-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold text-white transition-colors touch-manipulation active:scale-95 ${
          added ? "bg-emerald-600" : "bg-anv-green hover:bg-anv-green-dark"
        }`}
      >
        {added ? (
          <>
            Added
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </>
        ) : (
          <>
            ADD
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
}
