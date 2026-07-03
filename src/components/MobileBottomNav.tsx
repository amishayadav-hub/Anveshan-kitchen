"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

// Brand palette (natural/organic food brand).
const GREEN = "#245b49";
const GOLD = "#e8d998";

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={GREEN}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6"
    >
      {children}
    </svg>
  );
}

const HomeIcon = () => (
  <Svg>
    <path d="M3 10.7 12 3l9 7.7" />
    <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
    {/* gold door accent */}
    <path d="M10 21v-5h4v5" stroke={GOLD} />
  </Svg>
);
const PeepsIcon = () => (
  <Svg>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
    {/* second person, gold accent */}
    <circle cx="17" cy="9" r="2.2" stroke={GOLD} />
    <path d="M16 20a5 5 0 0 1 5-5" stroke={GOLD} />
  </Svg>
);
const ShareIcon = () => (
  <Svg>
    <path d="M22 3 11 14" />
    <path d="M22 3 15 21l-4-7-7-4 18-7z" />
    {/* gold spark */}
    <circle cx="5.5" cy="18.5" r="1" fill={GOLD} stroke="none" />
  </Svg>
);
const HeartIcon = () => (
  <Svg>
    <path d="M12 20.5C5.5 16.2 3 12.9 3 9.3 3 6.6 5.1 4.5 7.7 4.5c1.6 0 3.2.9 4.3 2.4C13.1 5.4 14.7 4.5 16.3 4.5 18.9 4.5 21 6.6 21 9.3c0 3.6-2.5 6.9-9 11.2z" />
  </Svg>
);
const UserIcon = () => (
  <Svg>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
    {/* gold ring accent */}
    <circle cx="12" cy="8" r="5.2" stroke={GOLD} strokeWidth="1" opacity="0.7" />
  </Svg>
);

interface Tab {
  href: string;
  label: string;
  icon: ReactNode;
}

// `authOnly` tabs only appear for signed-in users (e.g. Liked recipes).
const TABS: (Tab & { authOnly?: boolean })[] = [
  { href: "/recipes", label: "Home", icon: <HomeIcon /> },
  { href: "/recipes/real-peeps", label: "Real Peeps", icon: <PeepsIcon /> },
  { href: "/recipes/share", label: "Publish", icon: <ShareIcon /> },
  { href: "/recipes/liked", label: "Liked", icon: <HeartIcon />, authOnly: true },
  { href: "/account", label: "Account", icon: <UserIcon /> },
];

// Fixed bottom tab bar — mobile only (hidden from 768px up; the desktop header
// takes over there). 5 equal-width items, icon-on-top + label-below.
export default function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  // Hide auth-only tabs (Liked) from guests.
  const tabs = TABS.filter((t) => !t.authOnly || user);

  return (
    <nav
      className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-[99] border-t border-[#ececec] bg-white md:hidden"
      style={{ boxShadow: "0 -2px 10px rgba(0,0,0,0.05)" }}
      aria-label="Primary"
    >
      <ul className="flex items-stretch">
        {tabs.map((t) => {
          const active = pathname === t.href;
          return (
            <li key={t.href} className="relative flex-1 text-center" style={{ flex: "1 1 0" }}>
              <Link
                href={t.href}
                aria-current={active ? "page" : undefined}
                className="flex min-h-[56px] flex-col items-center justify-center gap-1 py-1.5"
              >
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-1/2 h-[3px] w-7 -translate-x-1/2 rounded-b-[3px]"
                    style={{ background: GREEN }}
                  />
                )}
                {t.icon}
                <span className="text-[13px] leading-none" style={{ color: GREEN }}>
                  {t.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
