"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ACCOUNT, ACCOUNT_MENU } from "@/lib/account-theme";
import { AccountIcon, LogoutIcon } from "./icons";
import { useAuth } from "@/components/auth/AuthProvider";

// Vertical menu list + Log Out. `variant="sidebar"` adds the accent-green left
// border on the active row (desktop sidebar); "list" is the mobile overview list.
export default function AccountMenu({ variant = "list" }: { variant?: "list" | "sidebar" }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.push("/"); // clear session → home
  }

  return (
    <nav className="divide-y divide-gray-100">
      {ACCOUNT_MENU.map((item) => {
        const active = pathname === item.href;
        const leftBorder =
          active && variant === "sidebar" ? "border-[#235A49]" : "border-transparent";
        return (
          <Link
            key={item.key}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 border-l-[3px] px-[18px] py-[15px] text-[14px] transition-colors hover:bg-[#F1F8F5] ${leftBorder} ${
              active ? "bg-[#F1F8F5] font-semibold" : ""
            }`}
            style={{ color: active ? ACCOUNT.colors.heading : ACCOUNT.colors.body }}
          >
            <span className="text-[#235A49]">
              <AccountIcon name={item.icon} />
            </span>
            <span className="flex-1">{item.label}</span>
            <span className="text-lg leading-none text-gray-300">›</span>
          </Link>
        );
      })}

      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full items-center gap-3 border-l-[3px] border-transparent px-[18px] py-[15px] text-[14px] font-medium transition-colors hover:bg-red-50"
        style={{ color: ACCOUNT.colors.red }}
      >
        <LogoutIcon />
        <span className="flex-1 text-left">Log Out</span>
        <span className="text-lg leading-none text-red-200">›</span>
      </button>
    </nav>
  );
}
