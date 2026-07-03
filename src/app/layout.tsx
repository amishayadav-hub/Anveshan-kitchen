import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Slab, Figtree } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME, buildSiteJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CertificationsMarquee from "@/components/CertificationsMarquee";
import AuthProvider from "@/components/auth/AuthProvider";
import LikesProvider from "@/components/likes/LikesProvider";
import CartProvider from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { GoogleAnalytics } from "@next/third-parties/google";

// GA4 loads on every page (root layout) only when a measurement ID is configured
// — set NEXT_PUBLIC_GA_ID (G-XXXXXXX) in Vercel + .env.local. Absent = no-op.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Recipe-page typography: serif headings (Roboto Slab) + sans body (Figtree).
const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Healthy Indian Recipes with Pure, Farm-Direct Ingredients`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Wholesome Indian recipes built around Anveshan's wood-pressed oils, bilona ghee, khapli atta and natural superfoods. Cook healthier, the way it was meant to be.",
  keywords: [
    "Anveshan recipes",
    "healthy Indian recipes",
    "wood-pressed oil recipes",
    "bilona ghee recipes",
    "khapli atta recipes",
    "natural cooking",
  ],
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — Healthy Indian Recipes`,
    description:
      "Wholesome Indian recipes built around Anveshan's pure, farm-direct ingredients.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${robotoSlab.variable} ${figtree.variable} h-full antialiased`}
    >
      {/* pb on mobile so page content/footer clears the fixed bottom tab bar */}
      <body className="min-h-full flex flex-col pb-[56px] md:pb-0">
        <AuthProvider>
          <LikesProvider>
            <CartProvider>
              <JsonLd data={buildSiteJsonLd()} />
              <Header />
              {children}
              <CertificationsMarquee />
              <Footer />
              <CartDrawer />
            </CartProvider>
            <MobileBottomNav />
          </LikesProvider>
        </AuthProvider>
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
