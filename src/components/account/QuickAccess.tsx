import Link from "next/link";
import { AccountIcon } from "./icons";
import type { AccountIconKey } from "@/lib/account-theme";

interface QuickItem {
  label: string;
  href: string;
  icon: AccountIconKey;
}

const ITEMS: QuickItem[] = [
  { label: "Your Orders", href: "/account/orders", icon: "bag" },
  { label: "Need Help?", href: "/account/support", icon: "help" },
];

// Row of quick-access cards (icon on top).
export default function QuickAccess() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {ITEMS.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className="flex flex-col items-center gap-2 rounded-[14px] bg-white px-2 py-4 text-center shadow-[0_2px_10px_rgba(35,90,73,0.06)] transition-colors hover:bg-[#F1F8F5]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F8F5] text-[#235A49]">
            <AccountIcon name={it.icon} />
          </span>
          <span className="text-[12.5px] font-medium leading-tight text-[#242424]">{it.label}</span>
        </Link>
      ))}
    </div>
  );
}
