"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { useAuth } from "@/components/auth/AuthProvider";

const GREEN = "#245b49";
const GOLD = "#e8d998";

/* Map raw Firebase auth error codes to friendly, user-facing copy. */
function authErrorMessage(err: unknown): string {
  const code = err instanceof FirebaseError ? err.code : "";
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try logging in instead.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/operation-not-allowed":
      return "Email sign-in isn't enabled for this project yet. Enable Email/Password in the Firebase console.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    default:
      if (err instanceof FirebaseError) return `${err.message} (${err.code})`;
      return "Something went wrong. Please try again.";
  }
}

type Mode = "login" | "register";

// Sign-in / registration gate shown when no user is authenticated.
export default function Login() {
  const router = useRouter();
  const { login, register } = useAuth();

  function handleClose() {
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push("/recipes");
  }

  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function switchMode(next: Mode) {
    setError("");
    setPassword("");
    setMode(next);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }
    setBusy(true);
    try {
      if (mode === "register") await register(name, email, password);
      else await login(email, password);
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  const inputCls =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#245b49] focus:ring-2 focus:ring-[#245b49]/20";
  const primaryBtn =
    "w-full rounded-lg bg-[#245b49] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1c4a3b] disabled:opacity-60";

  const isRegister = mode === "register";
  const canSubmit = !!email && !!password && (!isRegister || !!name.trim());

  return (
    <main className="mx-auto flex max-w-md flex-col px-4 py-10">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
        <div className="relative px-6 py-8 text-center text-white" style={{ background: `linear-gradient(135deg, ${GREEN}, #1c4a3b)` }}>
          <span className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full" style={{ background: GOLD, opacity: 0.15 }} />
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
          <h1 className="mt-4 text-xl font-bold">{isRegister ? "Create your account" : "Sign In"}</h1>
          <p className="mt-1 text-sm text-white/80">{isRegister ? "Join Anveshan Kitchen" : "Login to your account"}</p>
          <p className="mt-0.5 text-xs text-white/70">Access your orders, addresses &amp; more.</p>
        </div>

        <div className="p-6">
          {error && <p role="alert" className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

          <form onSubmit={handleSubmit} noValidate>
            {isRegister && (
              <>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">Full name</label>
                <input id="name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={`${inputCls} mb-3`} required />
              </>
            )}
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputCls} required />
            <label htmlFor="password" className="mb-1 mt-3 block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password" type="password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" className={inputCls} required minLength={6}
            />
            {isRegister && <p className="mt-1 text-xs text-gray-400">At least 6 characters.</p>}
            <button type="submit" disabled={busy || !canSubmit} className={`${primaryBtn} mt-4`}>
              {busy ? (isRegister ? "Creating account…" : "Signing in…") : isRegister ? "Create account" : "Login"}
            </button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          {isRegister ? (
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button type="button" onClick={() => switchMode("login")} className="font-semibold text-[#245b49] hover:underline">Log in</button>
            </p>
          ) : (
            <p className="text-center text-sm text-gray-600">
              New to Anveshan?{" "}
              <button type="button" onClick={() => switchMode("register")} className="font-semibold text-[#245b49] hover:underline">Create an account</button>
            </p>
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
