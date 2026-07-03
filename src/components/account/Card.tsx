import type { ReactNode } from "react";

// Base surface: white, radius 14px, brand-green soft shadow (design-system card).
export default function Card({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`rounded-[14px] bg-white shadow-[0_2px_10px_rgba(35,90,73,0.06)] ${className}`}>
      {children}
    </div>
  );
}

// Small uppercase, muted, letter-spaced section label ("YOUR INFORMATION").
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 px-1 text-[13px] font-semibold uppercase tracking-wider text-gray-400">
      {children}
    </p>
  );
}

// Shared page title (Roboto Slab; ~21px mobile / ~26px desktop).
export function PageTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h1
      className={`text-[21px] leading-tight text-[#242424] min-[990px]:text-[26px] ${className}`}
      style={{ fontFamily: "var(--font-roboto-slab), serif", fontWeight: 600 }}
    >
      {children}
    </h1>
  );
}

// Primary action button: dark green, white, square corners.
export function PrimaryButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center bg-[#00584B] px-6 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
