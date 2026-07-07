"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import CartButton from "@/components/cart/CartButton";
import HamburgerMenu from "@/components/HamburgerMenu";
import { SearchIcon } from "@/components/ui/icons";
import { track } from "@/lib/analytics";

// Slim top header: Anveshan logo + search & cart on the right.
export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the field as soon as it expands.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function go() {
    const q = query.trim();
    if (q) track("search", { search_term: q, source: "header" });
    router.push(q ? `/recipes?q=${encodeURIComponent(q)}` : "/recipes");
    setOpen(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    go();
  }

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Hamburger + logo pinned left; search + cart grouped on the right. */}
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
        <div className="flex shrink-0 items-center gap-1">
          <HamburgerMenu />
          <Link
            href="/recipes"
            aria-label="Anveshan Kitchen"
            onClick={() => track("logo_click", { source: "header" })}
            className={`shrink-0 items-end gap-[3px] ${open ? "hidden" : "flex"}`}
          >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.shopify.com/s/files/1/0270/3346/9006/files/anveshan-logo-updates-register-mark.png?v=1728463199"
            alt="Anveshan"
            width={120}
            height={28}
            className="h-4 w-auto"
          />
            {/* "kitchen" rendered in the brand font to match the "anveshan" wordmark */}
            <span
              className="relative -top-px text-[15px] font-semibold leading-none tracking-tight text-[#235A49]"
              style={{ fontFamily: "var(--font-brand), system-ui, sans-serif" }}
            >
              kitchen
            </span>
          </Link>
        </div>

        <div className={`flex min-w-0 items-center gap-1 ${open ? "flex-1" : ""}`}>
          {/* Search: icon only; expands to fill the whole bar when clicked */}
          <form onSubmit={onSubmit} className={`flex items-center ${open ? "flex-1" : ""}`}>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => {
                if (!query.trim()) setOpen(false);
              }}
              placeholder="Search recipes…"
              tabIndex={open ? 0 : -1}
              className={`min-w-0 text-sm text-gray-700 bg-gray-50 rounded-full outline-none transition-all duration-200 ${
                open
                  ? "flex-1 w-full px-3.5 py-1.5 mr-1 border border-gray-200 focus:border-anv-green"
                  : "w-0 px-0 py-0 border-0"
              }`}
            />
            <button
              type="button"
              onClick={() => (open ? go() : setOpen(true))}
              aria-label="Search recipes"
              className="flex h-11 w-11 items-center justify-center text-anv-green hover:text-anv-green-dark transition-colors"
            >
              <SearchIcon />
            </button>
          </form>

          <CartButton />
        </div>
      </div>
    </header>
  );
}
