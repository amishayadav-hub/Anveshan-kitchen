"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextValue {
  /** The signed-in, NON-anonymous user (null when only an anonymous session exists). */
  user: User | null;
  /**
   * Stable Firebase uid for the current visitor — present even for anonymous
   * sessions. Used for per-user analytics (e.g. the recipe-generator funnel).
   * Distinct from `user`, which stays null until a real sign-in.
   */
  uid: string | null;
  /** True until the first auth-state check resolves — avoids a login/dashboard flash. */
  loading: boolean;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Firebase restores any persisted session, then fires here. Keeps the user
  // signed in across refreshes and syncs sign-out across tabs. When there's no
  // session at all, we create an ANONYMOUS one so every visitor has a stable
  // uid for analytics — while `user` stays null (anonymous ≠ signed in), so all
  // existing "is the user signed in?" checks behave exactly as before.
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        try {
          await signInAnonymously(auth); // refires this listener with the anon user
          return;
        } catch {
          setUser(null);
          setUid(null);
          setLoading(false);
          return;
        }
      }
      setUid(u.uid);
      setUser(u.isAnonymous ? null : u);
      setLoading(false);
    });
    return unsub;
  }, []);

  async function register(name: string, email: string, password: string) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const displayName = name.trim();
    if (displayName) await updateProfile(cred.user, { displayName });
    // updateProfile doesn't re-fire onAuthStateChanged, so push the fresh user.
    setUser({ ...cred.user });
    setUid(cred.user.uid);
  }

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function loginWithGoogle() {
    // Popup flow. onAuthStateChanged sets the user on success.
    await signInWithPopup(auth, new GoogleAuthProvider());
  }

  async function logout() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, uid, loading, register, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
