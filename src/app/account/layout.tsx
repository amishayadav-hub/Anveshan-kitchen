import type { Metadata } from "next";
import AccountShell from "@/components/account/AccountShell";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your Anveshan account — orders, addresses and more.",
  robots: { index: false, follow: false }, // private area
};

// Shared shell for every /account route. On desktop the sidebar stays put and
// each child route renders into the right panel; on mobile it's a single column.
export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <AccountShell>{children}</AccountShell>;
}
