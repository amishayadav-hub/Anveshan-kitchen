"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

/* ────────────────────────────────────────────────────────────────────────────
 * Brand palette
 * ──────────────────────────────────────────────────────────────────────────── */
const GREEN = "#245b49";
const GOLD = "#e8d998";

/* ────────────────────────────────────────────────────────────────────────────
 * STUBBED AUTH — replace these with your real provider (Firebase Auth phone,
 * MSG91, Twilio, etc.). They only mock success so the UI flow is demonstrable.
 * ──────────────────────────────────────────────────────────────────────────── */
async function sendOtpStub(phone: string): Promise<void> {
  // TODO: call your OTP provider, e.g. signInWithPhoneNumber(auth, "+91"+phone, recaptcha)
  console.log("[stub] send OTP to +91", phone);
}
async function verifyOtpStub(phone: string, code: string): Promise<boolean> {
  // TODO: confirmationResult.confirm(code) → returns the signed-in user
  console.log("[stub] verify OTP", code, "for +91", phone);
  return code.length === 6; // mock: any 6-digit code passes
}
async function loginWithEmailStub(email: string, password: string): Promise<boolean> {
  // TODO: signInWithEmailAndPassword(auth, email, password)
  console.log("[stub] email login", email, password ? "•••" : "");
  return !!email && !!password;
}

/* ────────────────────────────────────────────────────────────────────────────
 * Icons (inline, brand-green stroke)
 * ──────────────────────────────────────────────────────────────────────────── */
function Icon({ children, className = "h-5 w-5" }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {children}
    </svg>
  );
}
const UserGlyph = () => <Icon><circle cx="12" cy="8" r="3.5" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></Icon>;
const Chevron = () => <Icon className="h-4 w-4 text-gray-400"><path d="m9 6 6 6-6 6" /></Icon>;
const CoinGlyph = () => <Icon className="h-6 w-6"><circle cx="12" cy="12" r="8" /><path d="M12 8v8M9.5 10.5h3.5a1.5 1.5 0 0 1 0 3H9.5" /></Icon>;

/* ────────────────────────────────────────────────────────────────────────────
 * Account dashboard menu config
 * ──────────────────────────────────────────────────────────────────────────── */
interface Section {
  key: string;
  label: string;
  isNew?: boolean;
  body: string; // placeholder panel copy
}
const SECTIONS: Section[] = [
  { key: "details", label: "Account Details", body: "Your profile info — name, phone, email — will appear here." },
  { key: "orders", label: "Order History", body: "Your past Anveshan orders and their status will appear here." },
  { key: "reports", label: "Test Reports", isNew: true, body: "Lab / purity test reports for the batches you've purchased." },
  { key: "wallet", label: "Rewards Wallet", body: "Your reward coins, how you earned them, and how to redeem." },
  { key: "addresses", label: "Address Book", body: "Saved delivery addresses. Add, edit or remove addresses here." },
  { key: "track", label: "Track Your Order", body: "Track a live shipment by order ID." },
  { key: "help", label: "Help & Support", body: "FAQs and ways to reach the Anveshan support team." },
];

const WALLET_COINS = 240; // stub balance

/* ────────────────────────────────────────────────────────────────────────────
 * Component
 * ──────────────────────────────────────────────────────────────────────────── */
export default function AccountClient() {
  const [loggedIn, setLoggedIn] = useState(false);
  return loggedIn ? <Dashboard onLogout={() => setLoggedIn(false)} /> : <Login onSuccess={() => setLoggedIn(true)} />;
}

/* ── Login / Sign-up ─────────────────────────────────────────────────────── */
type Step = "phone" | "otp" | "email";

function Login({ onSuccess }: { onSuccess: () => void }) {
  const router = useRouter();
  // Dismiss the login: go back if there's history, else to the recipes home.
  function handleClose() {
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push("/recipes");
  }
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const phoneValid = /^\d{10}$/.test(phone);

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!phoneValid) return setError("Enter a valid 10-digit mobile number.");
    setError("");
    setBusy(true);
    await sendOtpStub(phone);
    setBusy(false);
    setStep("otp");
  }
  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const ok = await verifyOtpStub(phone, otp);
    setBusy(false);
    if (ok) onSuccess();
    else setError("Invalid or expired code. Try again.");
  }
  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const ok = await loginWithEmailStub(email, password);
    setBusy(false);
    if (ok) onSuccess();
    else setError("Incorrect email or password.");
  }

  const inputCls =
    "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#245b49] focus:ring-2 focus:ring-[#245b49]/20";
  const primaryBtn =
    "w-full rounded-lg bg-[#245b49] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1c4a3b] disabled:opacity-60";

  return (
    <main className="mx-auto flex max-w-md flex-col px-4 py-10">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
        {/* Brand hero */}
        <div className="relative px-6 py-8 text-center text-white" style={{ background: `linear-gradient(135deg, ${GREEN}, #1c4a3b)` }}>
          <span className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full" style={{ background: GOLD, opacity: 0.15 }} />
          {/* Close — dismiss login if the user doesn't want to sign in */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.shopify.com/s/files/1/0270/3346/9006/files/anveshan-logo-updates-register-mark.png?v=1728463199"
            alt="Anveshan"
            className="mx-auto h-5 w-auto brightness-0 invert"
          />
          <h1 className="mt-4 text-xl font-bold">Sign In</h1>
          <p className="mt-1 text-sm text-white/80">Login to your account</p>
          <p className="mt-0.5 text-xs text-white/70">Access your orders, wallet, addresses &amp; more.</p>
        </div>

        <div className="p-6">
          {error && (
            <p role="alert" className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
          )}

          {step === "phone" && (
            <form onSubmit={handleSendOtp} noValidate>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">Mobile number</label>
              <div className="flex gap-2">
                <span className="inline-flex select-none items-center rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm font-medium text-gray-600">+91</span>
                <input
                  id="phone" type="tel" inputMode="numeric" autoComplete="tel" maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="10-digit mobile number"
                  className={inputCls} required
                />
              </div>
              <button type="submit" disabled={busy || !phoneValid} className={`${primaryBtn} mt-4`}>
                {busy ? "Sending…" : "Login"}
              </button>
              <Divider />
              <button type="button" onClick={() => { setError(""); setStep("email"); }} className="w-full rounded-lg border border-[#245b49] py-2.5 text-sm font-semibold text-[#245b49] transition-colors hover:bg-[#245b49]/5">
                Login with email instead
              </button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerify} noValidate>
              <p className="mb-3 text-sm text-gray-600">
                Enter the 6-digit code sent to <span className="font-semibold text-gray-900">+91 {phone}</span>.{" "}
                <button type="button" onClick={() => setStep("phone")} className="font-medium text-[#245b49] hover:underline">Change</button>
              </p>
              <label htmlFor="otp" className="mb-1 block text-sm font-medium text-gray-700">Verification code</label>
              <input
                id="otp" type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="••••••"
                className={`${inputCls} tracking-[0.5em]`} required
              />
              <button type="submit" disabled={busy || otp.length !== 6} className={`${primaryBtn} mt-4`}>
                {busy ? "Verifying…" : "Verify & Login"}
              </button>
              <button type="button" onClick={() => sendOtpStub(phone)} className="mt-3 w-full text-center text-sm font-medium text-[#245b49] hover:underline">
                Resend code
              </button>
            </form>
          )}

          {step === "email" && (
            <form onSubmit={handleEmail} noValidate>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputCls} required />
              <label htmlFor="password" className="mb-1 mt-3 block text-sm font-medium text-gray-700">Password</label>
              <input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={inputCls} required />
              <button type="submit" disabled={busy || !email || !password} className={`${primaryBtn} mt-4`}>
                {busy ? "Signing in…" : "Login"}
              </button>
              <Divider />
              <button type="button" onClick={() => { setError(""); setStep("phone"); }} className="w-full rounded-lg border border-[#245b49] py-2.5 text-sm font-semibold text-[#245b49] transition-colors hover:bg-[#245b49]/5">
                Login with mobile OTP
              </button>
            </form>
          )}

          <p className="mt-5 text-center text-xs leading-relaxed text-gray-400">
            By proceeding, you agree to our{" "}
            <a href="https://www.anveshan.farm/policies/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-[#245b49] underline underline-offset-2">Terms &amp; Conditions</a>{" "}
            and{" "}
            <a href="https://www.anveshan.farm/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#245b49] underline underline-offset-2">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </main>
  );
}

function Divider() {
  return (
    <div className="my-4 flex items-center gap-3">
      <span className="h-px flex-1 bg-gray-200" />
      <span className="text-xs text-gray-400">or</span>
      <span className="h-px flex-1 bg-gray-200" />
    </div>
  );
}

/* ── Logged-in dashboard ─────────────────────────────────────────────────── */
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [active, setActive] = useState(SECTIONS[0].key);
  const activeSection = SECTIONS.find((s) => s.key === active) ?? SECTIONS[0];

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      {/* Header block */}
      <header className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-full text-[#245b49]" style={{ background: `${GREEN}15` }}>
          <UserGlyph />
        </span>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Your Account</h1>
          <p className="text-sm text-gray-500">View your orders, wallet &amp; more.</p>
        </div>
      </header>

      {/* Rewards Wallet highlight card */}
      <button
        onClick={() => setActive("wallet")}
        className="mt-5 flex w-full items-center justify-between rounded-2xl p-4 text-left text-white shadow-sm transition-transform hover:-translate-y-0.5"
        style={{ background: `linear-gradient(135deg, ${GREEN}, #1c4a3b)` }}
      >
        <span className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: GOLD, color: GREEN }}>
            <CoinGlyph />
          </span>
          <span>
            <span className="block text-sm text-white/80">Rewards Wallet</span>
            <span className="block text-lg font-bold">{WALLET_COINS} coins</span>
          </span>
        </span>
        <span className="rounded-full px-3 py-1 text-sm font-semibold" style={{ background: GOLD, color: GREEN }}>View</span>
      </button>

      {/* Sidebar + content on desktop; stacked list on mobile */}
      <div className="mt-6 md:grid md:grid-cols-[280px_1fr] md:gap-8">
        <nav aria-label="Account sections" className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <ul className="divide-y divide-gray-100">
            {SECTIONS.map((s) => {
              const isActive = s.key === active;
              return (
                <li key={s.key}>
                  <button
                    onClick={() => setActive(s.key)}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex w-full items-center justify-between px-4 py-3.5 text-left text-sm transition-colors hover:bg-[#245b49]/5 ${isActive ? "bg-[#245b49]/5 font-semibold text-[#245b49]" : "text-gray-800"}`}
                  >
                    <span className="flex items-center gap-2">
                      {s.label}
                      {s.isNew && (
                        <span className="rounded-full px-1.5 py-0.5 text-[10px] font-bold" style={{ background: GOLD, color: GREEN }}>NEW</span>
                      )}
                    </span>
                    <Chevron />
                  </button>
                </li>
              );
            })}
            <li>
              <button onClick={onLogout} className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
                Log out
                <Chevron />
              </button>
            </li>
          </ul>
        </nav>

        {/* Content panel */}
        <section className="mt-4 rounded-2xl border border-gray-100 bg-white p-6 md:mt-0">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            {activeSection.label}
            {activeSection.isNew && (
              <span className="rounded-full px-1.5 py-0.5 text-[10px] font-bold" style={{ background: GOLD, color: GREEN }}>NEW</span>
            )}
          </h2>
          {activeSection.key === "wallet" ? (
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#245b49]/15 bg-[#245b49]/5 p-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full text-[#245b49]" style={{ background: GOLD }}>
                <CoinGlyph />
              </span>
              <div>
                <p className="text-2xl font-bold text-[#245b49]">{WALLET_COINS}</p>
                <p className="text-sm text-gray-500">reward coins available</p>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-sm leading-relaxed text-gray-500">{activeSection.body}</p>
          )}
        </section>
      </div>
    </main>
  );
}
