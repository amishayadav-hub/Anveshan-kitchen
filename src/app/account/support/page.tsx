"use client";

import { useState } from "react";
import SubPageHeader from "@/components/account/SubPageHeader";
import Card, { PrimaryButton } from "@/components/account/Card";
import { WHATSAPP_NUMBER } from "@/lib/account-theme";

const fieldCls =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#235A49] focus:ring-2 focus:ring-[#235A49]/20";

const FAQS = [
  { q: "How long does delivery take?", a: "Orders are usually delivered in 3–5 business days across India." },
  { q: "What is your return policy?", a: "Unopened products can be returned within 7 days of delivery." },
];

export default function SupportPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [sent, setSent] = useState(false);

  return (
    <div>
      <SubPageHeader title="Help & Support" />

      {/* Contact options */}
      <div className="grid gap-3 min-[750px]:grid-cols-3">
        <ContactCard href="mailto:support@anveshan.farm" label="Email" value="support@anveshan.farm" />
        <ContactCard href="tel:+919999999999" label="Phone" value="+91 99999 99999" />
        <ContactCard href={`https://wa.me/${WHATSAPP_NUMBER}`} label="WhatsApp" value="Chat with us" external />
      </div>

      {/* FAQ accordion */}
      <h2 className="mb-2 mt-6 text-[15px] font-semibold text-[#242424]">Frequently asked questions</h2>
      <Card className="divide-y divide-gray-100">
        {FAQS.map((f, i) => (
          <div key={f.q}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left text-sm font-medium text-[#242424]"
            >
              {f.q}
              <span className={`shrink-0 text-[#235A49] transition-transform ${open === i ? "rotate-180" : ""}`}>⌄</span>
            </button>
            {open === i && <p className="px-5 pb-4 text-sm text-[rgba(36,36,36,0.7)]">{f.a}</p>}
          </div>
        ))}
      </Card>

      {/* Contact form */}
      <h2 className="mb-2 mt-6 text-[15px] font-semibold text-[#242424]">Send us a message</h2>
      <Card className="max-w-xl p-5">
        {sent ? (
          <p className="py-4 text-center text-sm font-medium text-[#235A49]">
            Thanks! We&apos;ve received your message and will reply by email soon.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-3"
          >
            <input className={fieldCls} placeholder="Your name" required />
            <input className={fieldCls} type="email" placeholder="Your email" required />
            <textarea className={`${fieldCls} min-h-[110px] resize-y`} placeholder="How can we help?" required />
            <PrimaryButton type="submit" className="w-full min-[750px]:w-auto">Submit</PrimaryButton>
          </form>
        )}
      </Card>
    </div>
  );
}

function ContactCard({
  href,
  label,
  value,
  external,
}: {
  href: string;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="rounded-[14px] bg-white p-4 text-center shadow-[0_2px_10px_rgba(35,90,73,0.06)] transition-colors hover:bg-[#F1F8F5]"
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">{label}</p>
      <p className="mt-1 text-sm font-medium text-[#235A49]">{value}</p>
    </a>
  );
}
