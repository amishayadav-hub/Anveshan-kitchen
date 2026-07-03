"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import SubPageHeader from "@/components/account/SubPageHeader";
import Card, { PrimaryButton } from "@/components/account/Card";

interface Address {
  id: string;
  name: string;
  line: string;
  city: string;
  pin: string;
  phone: string;
}

const fieldCls =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#235A49] focus:ring-2 focus:ring-[#235A49]/20";

const empty: Omit<Address, "id"> = { name: "", line: "", city: "", pin: "", phone: "" };

export default function AddressBookPage() {
  const { user } = useAuth();
  const key = user ? `anveshan-addresses-${user.uid}` : "";

  const [addresses, setAddresses] = useState<Address[]>(() => {
    if (typeof window === "undefined" || !user) return [];
    try {
      return JSON.parse(localStorage.getItem(`anveshan-addresses-${user.uid}`) || "[]") as Address[];
    } catch {
      return [];
    }
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Omit<Address, "id">>(empty);

  function persist(next: Address[]) {
    setAddresses(next);
    try {
      if (key) localStorage.setItem(key, JSON.stringify(next));
    } catch {}
  }

  function openAdd() {
    setEditingId(null);
    setDraft(empty);
    setShowForm(true);
  }
  function openEdit(a: Address) {
    setEditingId(a.id);
    const { id: _id, ...rest } = a;
    void _id;
    setDraft(rest);
    setShowForm(true);
  }
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (editingId) {
      persist(addresses.map((a) => (a.id === editingId ? { ...draft, id: editingId } : a)));
    } else {
      persist([...addresses, { ...draft, id: Date.now().toString() }]);
    }
    setShowForm(false);
    setDraft(empty);
    setEditingId(null);
  }
  function remove(id: string) {
    persist(addresses.filter((a) => a.id !== id));
  }

  return (
    <div>
      <SubPageHeader title="Address Book" />

      {!showForm && (
        <PrimaryButton onClick={openAdd} className="mb-5 w-full min-[750px]:w-auto">
          + Add a new address
        </PrimaryButton>
      )}

      {showForm && (
        <Card className="mb-5 max-w-xl p-5">
          <form onSubmit={submit} className="space-y-3">
            <input className={fieldCls} placeholder="Full name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} required />
            <input className={fieldCls} placeholder="Address (house, street, area)" value={draft.line} onChange={(e) => setDraft({ ...draft, line: e.target.value })} required />
            <div className="grid grid-cols-2 gap-3">
              <input className={fieldCls} placeholder="City" value={draft.city} onChange={(e) => setDraft({ ...draft, city: e.target.value })} required />
              <input className={fieldCls} placeholder="PIN code" inputMode="numeric" value={draft.pin} onChange={(e) => setDraft({ ...draft, pin: e.target.value.replace(/\D/g, "").slice(0, 6) })} required />
            </div>
            <input className={fieldCls} placeholder="Phone" inputMode="numeric" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value.replace(/[^\d+ ]/g, "") })} required />
            <div className="flex gap-3 pt-1">
              <PrimaryButton type="submit" className="w-full min-[750px]:w-auto">
                {editingId ? "Save address" : "Add address"}
              </PrimaryButton>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 text-[15px] font-semibold text-gray-500 hover:text-gray-700">
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

      {addresses.length === 0 && !showForm ? (
        <Card className="flex flex-col items-center px-6 py-14 text-center">
          <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F1F8F5] text-[#235A49]">
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10z" /><circle cx="12" cy="11" r="2.2" />
            </svg>
          </span>
          <h2 className="text-lg font-semibold text-[#242424]">No saved addresses</h2>
          <p className="mt-1 text-sm text-[rgba(36,36,36,0.6)]">Add an address to speed up checkout.</p>
        </Card>
      ) : (
        <div className="grid gap-4 min-[990px]:grid-cols-2">
          {addresses.map((a, i) => (
            <Card key={a.id} className="p-5">
              {i === 0 && (
                <span className="mb-2 inline-block rounded-full bg-[#F1F8F5] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#235A49]">
                  Default
                </span>
              )}
              <p className="font-semibold text-[#242424]">{a.name}</p>
              <p className="mt-0.5 text-sm text-[rgba(36,36,36,0.7)]">{a.line}</p>
              <p className="text-sm text-[rgba(36,36,36,0.7)]">{a.city} — {a.pin}</p>
              <p className="mt-0.5 text-sm text-[rgba(36,36,36,0.7)]">📞 {a.phone}</p>
              <div className="mt-4 flex gap-2">
                <button onClick={() => openEdit(a)} className="flex-1 rounded-md border border-[#00584B] py-2 text-sm font-semibold text-[#00584B] hover:bg-[#F1F8F5]">
                  Edit
                </button>
                <button onClick={() => remove(a.id)} className="flex-1 rounded-md border border-red-200 py-2 text-sm font-semibold text-[#C0392B] hover:bg-red-50">
                  Delete
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
