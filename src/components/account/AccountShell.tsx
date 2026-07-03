"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { ACCOUNT } from "@/lib/account-theme";
import Login from "./Login";
import HeroHeader from "./HeroHeader";
import AccountMenu from "./AccountMenu";
import Card from "./Card";

// Renders the whole account section:
//  • loading  → spinner
//  • guest    → sign-in / register gate
//  • signed in → responsive shell: desktop (990px+) = sticky sidebar + panel;
//    mobile/tablet = single column (the page provides its own hero + menu).
export default function AccountShell({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="mx-auto flex max-w-md flex-col items-center px-4 py-20">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#235A49]/30 border-t-[#235A49]" aria-label="Loading" />
      </main>
    );
  }

  if (!user) return <Login />;

  return (
    <main
      className="mx-auto w-full max-w-[1140px] px-4 py-5 min-[1200px]:px-6 min-[1200px]:py-8"
      style={{ fontFamily: ACCOUNT.font.body, color: ACCOUNT.colors.body }}
    >
      <div className="min-[990px]:grid min-[990px]:grid-cols-[300px_1fr] min-[990px]:items-start min-[990px]:gap-8">
        {/* Desktop sidebar (hidden below 990px) */}
        <aside className="hidden self-start min-[990px]:sticky min-[990px]:top-20 min-[990px]:block">
          <div className="space-y-4">
            <HeroHeader user={user} />
            <Card className="overflow-hidden">
              <AccountMenu variant="sidebar" />
            </Card>
          </div>
        </aside>

        {/* Content panel (mobile: full width) */}
        <div className="min-w-0">{children}</div>
      </div>
    </main>
  );
}
