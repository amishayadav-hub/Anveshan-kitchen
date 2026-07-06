"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

// Replica of the live anveshan.farm footer (links point to the real store).
const SERVICES = [
  { label: "Shop", href: "https://www.anveshan.farm/collections/all-products" },
  { label: "Track Your Order", href: "https://www.anveshan.farm/pages/track-order" },
  { label: "Our Story", href: "https://www.anveshan.farm/pages/about-us" },
  { label: "Blog", href: "https://www.anveshan.farm/blogs/anveshan-blog" },
  { label: "Corporate Info", href: "https://www.anveshan.farm/pages/corporate-information" },
  { label: "Contact Us", href: "https://www.anveshan.farm/pages/contact-us" },
];

const POLICIES = [
  { label: "Privacy Policy", href: "https://www.anveshan.farm/policies/privacy-policy" },
  { label: "Shipping Policy", href: "https://www.anveshan.farm/policies/shipping-policy" },
  { label: "Refund Policy", href: "https://www.anveshan.farm/policies/refund-policy" },
  { label: "Terms of Service", href: "https://www.anveshan.farm/policies/terms-of-service" },
  { label: "Sitemap", href: "https://www.anveshan.farm/pages/sitemap" },
];

const SOCIAL = [
  { label: "Facebook", href: "https://www.facebook.com/Anveshan-325859228089056/", icon: <FacebookIcon /> },
  { label: "Instagram", href: "https://www.instagram.com/anveshan.farms/?hl=en", icon: <InstagramIcon /> },
  { label: "Email", href: "mailto:support@anveshan.farm", icon: <MailIcon /> },
  { label: "X", href: "https://twitter.com/Anveshan_farms", icon: <XIcon /> },
];

function FootLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("footer_link", { source: label })}
      className="flex items-center min-h-[44px] md:min-h-0 text-white/80 hover:text-white transition-colors"
    >
      {label}
    </a>
  );
}

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-anv-gold font-semibold uppercase tracking-wide text-sm mb-2 md:mb-5">{children}</h3>
  );
}

// Link list that collapses into a tap-to-expand accordion on mobile, and is
// always expanded (plain column) on md+.
function FooterAccordion({ heading, links }: { heading: string; links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="col-span-2 md:col-span-1 border-t border-white/10 md:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-3 md:py-0 md:pointer-events-none"
      >
        <span className="text-anv-gold font-semibold uppercase tracking-wide text-sm">{heading}</span>
        <ChevronIcon className={`md:hidden h-5 w-5 text-anv-gold transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <ul className={`${open ? "block" : "hidden"} md:block space-y-0 md:space-y-3 text-sm pb-2 md:pb-0 md:mt-5`}>
        {links.map((l) => (
          <li key={l.label}>
            <FootLink href={l.href} label={l.label} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-anv-green text-white">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-14">
        <div className="grid grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] gap-x-6 gap-y-5 md:gap-10">
          {/* Brand + newsletter */}
          <div className="col-span-2 md:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cdn.shopify.com/s/files/1/0270/3346/9006/files/anveshan-logo-updates-register-mark.png?v=1728463199"
              alt="Anveshan"
              className="h-8 w-auto brightness-0 invert"
            />
            <p className="mt-5 text-sm text-white/80">
              <span className="font-semibold text-white">Corporate Office</span> - Sector 32, Gurugram
            </p>
            <p className="text-sm text-white/80">
              <span className="font-semibold text-white">Registered Office</span> - IMT Manesar, Gurugram
            </p>
            <p className="mt-4 text-sm text-white/80">
              Grievance Redressal Officer:{" "}
              <a href="mailto:suyash@anveshan.farm" className="underline underline-offset-2 hover:text-white">
                Suyash Gupta
              </a>
            </p>

            <h3 className="text-anv-gold font-semibold uppercase tracking-wide text-sm mt-8 mb-3">
              Subscribe to our newsletter
            </h3>
            <a
              href="https://www.anveshan.farm"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("footer_link", { source: "newsletter" })}
              className="flex items-center justify-between w-full max-w-sm rounded-md border border-white/30 px-4 py-3 text-sm text-white/70 hover:border-white/60 transition-colors"
            >
              Email
              <span className="text-anv-gold">→</span>
            </a>

            <p className="mt-8 text-xs text-white/55">
              Copyright © 2026, Anveshan Farm Technologies Pvt. Ltd.
            </p>
          </div>

          {/* Services + Policies: tap-to-expand accordions on mobile, columns on md+ */}
          <FooterAccordion heading="Services" links={SERVICES} />
          <FooterAccordion heading="Policies" links={POLICIES} />

          {/* Need help */}
          <div className="col-span-2 md:col-span-1">
            <ColHeading>Need Help?</ColHeading>
            <a
              href="https://www.anveshan.farm/pages/contact-us"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("footer_link", { source: "Contact Us (button)" })}
              className="inline-flex w-full max-w-[220px] min-h-[44px] items-center justify-center bg-anv-gold text-anv-green font-semibold rounded-full px-6 py-2.5 hover:brightness-105 transition"
            >
              Contact Us
            </a>

            <div className="flex items-center gap-3 mt-5">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  onClick={() => track("social_click", { source: s.label })}
                  className="w-11 h-11 rounded-full bg-anv-gold text-anv-green flex items-center justify-center hover:brightness-105 transition"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <h3 className="text-anv-gold font-semibold uppercase tracking-wide text-sm mt-7 mb-3">
              Download App
            </h3>
            <div className="flex flex-wrap gap-3">
              <StoreBadge
                href="https://onelink.to/w8thxs"
                top="GET IT ON"
                bottom="Google Play"
                icon={<PlayIcon />}
              />
              <StoreBadge
                href="https://onelink.to/xnwmtg"
                top="Download on the"
                bottom="App Store"
                icon={<AppleIcon />}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function StoreBadge({
  href,
  top,
  bottom,
  icon,
}: {
  href: string;
  top: string;
  bottom: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("app_store_click", { source: bottom })}
      className="inline-flex items-center gap-2 bg-black rounded-lg px-3 py-2 hover:brightness-110 transition"
    >
      <span className="text-white">{icon}</span>
      <span className="leading-tight text-white">
        <span className="block text-[9px] uppercase tracking-wide">{top}</span>
        <span className="block text-sm font-semibold -mt-0.5">{bottom}</span>
      </span>
    </a>
  );
}

// ── icons ──────────────────────────────────────────────────────────────────
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 2.5v19l11-9.5-11-9.5z" />
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.42 2.2-1.13 2.99-.79.9-2.06 1.58-3.18 1.49-.13-1.1.42-2.24 1.08-2.97.74-.83 2.05-1.46 3.23-1.51zM20.5 17.1c-.55 1.26-.82 1.82-1.53 2.94-.99 1.56-2.39 3.5-4.12 3.51-1.54.02-1.93-1-4.02-.99-2.08.01-2.51 1.01-4.05.98-1.73-.02-3.05-1.78-4.04-3.34C-.06 15.55-.36 9.5 2.78 7.7 4.2 6.9 5.74 7 7.21 7c1.18.01 2.46.99 3.27.99.78 0 2.36-1.22 3.97-1.04.68.03 2.57.27 3.78 2.06-3.32 1.81-2.79 6.36.94 8.09z" />
    </svg>
  );
}
