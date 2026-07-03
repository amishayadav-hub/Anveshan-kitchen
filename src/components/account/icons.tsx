import type { ReactNode } from "react";
import type { AccountIconKey } from "@/lib/account-theme";

function Base({ children, className = "h-5 w-5" }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

// Menu / quick-access icons keyed by AccountIconKey.
export function AccountIcon({ name, className }: { name: AccountIconKey; className?: string }) {
  switch (name) {
    case "user":
      return <Base className={className}><circle cx="12" cy="8" r="3.5" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></Base>;
    case "bag":
      return <Base className={className}><path d="M6 8h12l-1 12H7L6 8z" /><path d="M9 8a3 3 0 0 1 6 0" /></Base>;
    case "coin":
      return <Base className={className}><circle cx="12" cy="12" r="8" /><path d="M12 8v8M9.5 10.5h3.5a1.5 1.5 0 0 1 0 3H9.5" /></Base>;
    case "pin":
      return <Base className={className}><path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10z" /><circle cx="12" cy="11" r="2.2" /></Base>;
    case "truck":
      return <Base className={className}><path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17.5" cy="18" r="1.6" /></Base>;
    case "help":
      return <Base className={className}><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7M12 17h.01" /></Base>;
  }
}

export function LogoutIcon({ className = "h-5 w-5" }: { className?: string }) {
  return <Base className={className}><path d="M9 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4" /><path d="M16 17l5-5-5-5M21 12H9" /></Base>;
}

export function WhatsAppIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2zm5.8 14.16c-.24.68-1.42 1.32-1.96 1.36-.5.05-1.14.24-3.7-.78-3.12-1.23-5.12-4.42-5.28-4.63-.15-.2-1.26-1.68-1.26-3.2 0-1.53.8-2.28 1.08-2.6.28-.3.62-.38.83-.38.2 0 .41 0 .59.01.19.01.44-.07.69.53.24.6.83 2.06.9 2.2.07.15.12.32.02.52-.1.2-.15.32-.3.5-.14.17-.3.38-.44.5-.14.15-.29.31-.12.6.16.3.73 1.2 1.56 1.94 1.07.96 1.97 1.25 2.26 1.4.28.15.45.12.62-.07.17-.2.71-.83.9-1.11.19-.3.38-.24.64-.15.26.1 1.66.78 1.94.93.28.15.47.22.53.34.07.12.07.7-.17 1.37z" />
    </svg>
  );
}
