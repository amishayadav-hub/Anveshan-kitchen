"use client";

import { useState } from "react";
import SubPageHeader from "@/components/account/SubPageHeader";
import Card, { PrimaryButton } from "@/components/account/Card";

const fieldCls =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#235A49] focus:ring-2 focus:ring-[#235A49]/20";

const STAGES = ["Ordered", "Packed", "Shipped", "Out for delivery", "Delivered"];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [tracked, setTracked] = useState<string | null>(null);
  // Demo: current stage is "Shipped" (index 2) until a real tracking API is wired.
  const currentStage = 2;

  function track(e: React.FormEvent) {
    e.preventDefault();
    if (orderId.trim()) setTracked(orderId.trim());
  }

  return (
    <div>
      <SubPageHeader title="Track Your Order" />

      <Card className="max-w-xl p-5 min-[990px]:p-6">
        <form onSubmit={track} className="flex flex-col gap-3 min-[750px]:flex-row">
          <input
            className={fieldCls}
            placeholder="Enter your Order ID / tracking number"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <PrimaryButton type="submit" className="shrink-0">Track</PrimaryButton>
        </form>
      </Card>

      {tracked && (
        <Card className="mt-6 p-5 min-[990px]:p-6">
          <p className="mb-4 text-sm text-[rgba(36,36,36,0.7)]">
            Status for order <span className="font-semibold text-[#242424]">#{tracked}</span>
          </p>
          <ol className="relative ml-2 border-l-2 border-gray-100">
            {STAGES.map((s, i) => {
              const done = i <= currentStage;
              return (
                <li key={s} className="mb-5 ml-4 last:mb-0">
                  <span
                    className={`absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full ${
                      done ? "bg-[#235A49]" : "bg-gray-200"
                    }`}
                  />
                  <p className={`text-sm ${done ? "font-semibold text-[#242424]" : "text-gray-400"}`}>{s}</p>
                  {i === currentStage && <p className="text-xs text-[#235A49]">In progress</p>}
                </li>
              );
            })}
          </ol>
        </Card>
      )}
    </div>
  );
}
