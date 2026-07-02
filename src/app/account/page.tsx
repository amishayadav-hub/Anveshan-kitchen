import type { Metadata } from "next";
import AccountClient from "./AccountClient";

export const metadata: Metadata = {
  title: "Account",
  description: "Sign in to access your orders, rewards wallet, addresses and more.",
};

export default function AccountPage() {
  return <AccountClient />;
}
