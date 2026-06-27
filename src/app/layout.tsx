import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME, buildSiteJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={buildSiteJsonLd()} />
        <Header />
        {children}
      </body>
    </html>
  );
}
