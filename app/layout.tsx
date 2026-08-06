import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

import { auth } from "@/auth";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { getSiteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Editorial serif used for campaign headlines (hero, section titles) to
// give Terrashop20 a considered, boutique feel rather than a marketplace one.
const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

// TODO: replace with the production domain once it's finalized.
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Terrashop20 — Tas Premium Branded Preloved",
  description:
    "Terrashop20 menghadirkan tas premium branded preloved pilihan — diautentikasi, diperiksa kondisinya, dan dijual dengan harga yang jauh lebih bersahabat dibanding baru.",
  openGraph: {
    title: "Terrashop20 — Tas Premium Branded Preloved",
    description:
      "Terrashop20 menghadirkan tas premium branded preloved pilihan — diautentikasi, diperiksa kondisinya, dan dijual dengan harga yang jauh lebih bersahabat dibanding baru.",
    url: siteUrl,
    siteName: "Terrashop20",
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// viewportFit: "cover" lets the safe-area-inset-* env() variables populate
// on notched/home-indicator iPhones, which the sticky mobile add-to-bag
// bar and cart drawer footer rely on (see .pb-safe in globals.css).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-paper text-ink">
        <Providers session={session}>
          <Navbar />
          {children}
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
