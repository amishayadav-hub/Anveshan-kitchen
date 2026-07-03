"use client";

import Link from "next/link";
import SubPageHeader from "@/components/account/SubPageHeader";
import Card from "@/components/account/Card";

interface Order {
  id: string;
  date: string;
  status: string;
  items: number;
  total: number;
}

// No live order feed yet → empty state by default. Populate this array (or wire
// it to a data source) and the list/grid below renders automatically.
const ORDERS: Order[] = [];

export default function OrderHistoryPage() {
  return (
    <div>
      <SubPageHeader title="Order History" />

      {ORDERS.length === 0 ? (
        <Card className="flex flex-col items-center px-6 py-14 text-center">
          <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F1F8F5] text-[#235A49]">
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8h12l-1 12H7L6 8z" /><path d="M9 8a3 3 0 0 1 6 0" />
            </svg>
          </span>
          <h2 className="text-lg font-semibold text-[#242424]">You haven&apos;t placed any orders yet</h2>
          <p className="mt-1 text-sm text-[rgba(36,36,36,0.6)]">Your Anveshan orders will show up here.</p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center bg-[#00584B] px-8 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            Please Shop
          </Link>
        </Card>
      ) : (
        <div className="grid gap-4 min-[990px]:grid-cols-2">
          {ORDERS.map((o) => (
            <Card key={o.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-[#242424]">Order #{o.id}</p>
                  <p className="text-xs text-[rgba(36,36,36,0.6)]">{o.date}</p>
                </div>
                <span className="rounded-full bg-[#F1F8F5] px-3 py-1 text-xs font-semibold text-[#235A49]">
                  {o.status}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-[rgba(36,36,36,0.7)]">{o.items} item{o.items !== 1 ? "s" : ""}</span>
                <span className="font-bold text-[#242424]">₹{o.total}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <Link href="/account/track" className="flex-1 rounded-md border border-[#00584B] py-2 text-center text-sm font-semibold text-[#00584B] hover:bg-[#F1F8F5]">
                  Track
                </Link>
                <button className="flex-1 rounded-md bg-[#00584B] py-2 text-center text-sm font-semibold text-white hover:opacity-90">
                  View
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
