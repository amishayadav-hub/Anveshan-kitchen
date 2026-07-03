import { ACCOUNT } from "@/lib/account-theme";

interface HeroUser {
  displayName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
}

// Green hero: circular avatar (initial), "Your Account", phone/email below.
export default function HeroHeader({ user }: { user: HeroUser | null }) {
  const name = user?.displayName || user?.email?.split("@")[0] || "there";
  const sub = user?.phoneNumber || user?.email || "";
  const initial = (name.trim()[0] || "A").toUpperCase();

  return (
    <div
      className="flex items-center gap-3 rounded-[14px] px-4 py-3.5 text-white"
      style={{ background: ACCOUNT.colors.primaryGreen }}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-lg font-bold">
        {initial}
      </span>
      <div className="min-w-0">
        <h2 className="text-[15px] font-semibold leading-tight" style={{ fontFamily: ACCOUNT.font.heading }}>
          Your Account
        </h2>
        {sub && (
          <p className="truncate text-xs" style={{ color: ACCOUNT.colors.whiteSoft }}>
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}
