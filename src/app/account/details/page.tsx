"use client";

import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/components/auth/AuthProvider";
import SubPageHeader from "@/components/account/SubPageHeader";
import Card, { PrimaryButton } from "@/components/account/Card";

const fieldCls =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#235A49] focus:ring-2 focus:ring-[#235A49]/20";

// user is guaranteed by AccountShell, so state can initialise straight from it
// (no effect → avoids a synchronous setState-in-effect).
export default function AccountDetailsPage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.displayName ?? "");
  const [phone, setPhone] = useState(() => {
    if (typeof window === "undefined" || !user) return "";
    try {
      return localStorage.getItem(`anveshan-phone-${user.uid}`) ?? "";
    } catch {
      return "";
    }
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    if (!user) return;
    setSaving(true);
    try {
      if (auth.currentUser && name.trim() && name.trim() !== (user.displayName ?? "")) {
        await updateProfile(auth.currentUser, { displayName: name.trim() });
      }
      try {
        localStorage.setItem(`anveshan-phone-${user.uid}`, phone.trim());
      } catch {}
      setSaved(true);
      setTimeout(() => setSaved(false), 1600);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <SubPageHeader title="Account Details" />

      <Card className="max-w-xl p-5 min-[990px]:p-6">
        {!editing ? (
          <>
            <dl className="space-y-3 text-sm">
              <Row label="Name" value={name || "—"} />
              <Row label="Email" value={user?.email ?? "—"} />
              <Row label="Phone" value={phone || "Not added"} />
            </dl>
            <PrimaryButton className="mt-5 w-full min-[750px]:w-auto" onClick={() => setEditing(true)}>
              Edit
            </PrimaryButton>
            {saved && <p className="mt-2 text-sm font-medium text-[#235A49]">Saved ✓</p>}
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              save();
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-[#242424]">Name</label>
              <input id="name" className={fieldCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-[#242424]">Email</label>
              <input id="email" className={`${fieldCls} bg-gray-50 text-gray-500`} value={user?.email ?? ""} disabled />
              <p className="mt-1 text-xs text-gray-400">Email can&apos;t be changed here.</p>
            </div>
            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium text-[#242424]">Phone</label>
              <input
                id="phone" type="tel" inputMode="numeric" className={fieldCls}
                value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^\d+ ]/g, ""))}
                placeholder="10-digit mobile number"
              />
            </div>
            <div className="flex gap-3">
              <PrimaryButton type="submit" disabled={saving} className="w-full min-[750px]:w-auto">
                {saving ? "Saving…" : "Save"}
              </PrimaryButton>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-6 py-3 text-[15px] font-semibold text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-gray-100 pb-2.5">
      <dt className="text-[rgba(36,36,36,0.6)]">{label}</dt>
      <dd className="text-right font-medium text-[#242424]">{value}</dd>
    </div>
  );
}
