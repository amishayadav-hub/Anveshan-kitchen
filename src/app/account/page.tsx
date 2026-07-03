"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import HeroHeader from "@/components/account/HeroHeader";
import QuickAccess from "@/components/account/QuickAccess";
import AccountMenu from "@/components/account/AccountMenu";
import Card, { SectionLabel, PageTitle } from "@/components/account/Card";

// Account dashboard / overview. On mobile it's the full account home (hero +
// quick cards + wallet + menu). On desktop the hero + menu live in the sidebar,
// so the panel shows just the title + quick cards + wallet.
export default function AccountOverview() {
  const { user } = useAuth();
  const name = user?.displayName || user?.email?.split("@")[0] || "there";

  return (
    <div className="space-y-5">
      {/* Mobile hero (desktop hero is in the sidebar) */}
      <div className="min-[990px]:hidden">
        <HeroHeader user={user} />
      </div>

      {/* Desktop panel title */}
      <PageTitle className="hidden min-[990px]:block">Hi, {name}</PageTitle>

      <QuickAccess />

      {/* Mobile menu list (desktop uses the sidebar menu) */}
      <div className="min-[990px]:hidden">
        <SectionLabel>Your Information</SectionLabel>
        <Card className="overflow-hidden">
          <AccountMenu variant="list" />
        </Card>
      </div>

      <p className="pt-2 text-center text-[13px] italic text-[rgba(36,36,36,0.55)]">
        Purity and aapka personal connection!
      </p>
    </div>
  );
}
