import Link from "next/link";
import { PageTitle } from "./Card";

// Shared sub-page header. Mobile shows a subtle "Return to Account" back link
// above the title; on desktop the sidebar covers navigation so it's hidden.
export default function SubPageHeader({ title }: { title: string }) {
  return (
    <div className="mb-5">
      <Link
        href="/account"
        className="mb-2 inline-flex items-center gap-1 text-[13px] font-medium text-[#235A49] hover:underline min-[990px]:hidden"
      >
        <span aria-hidden="true">‹</span> Return to Account
      </Link>
      <PageTitle>{title}</PageTitle>
    </div>
  );
}
