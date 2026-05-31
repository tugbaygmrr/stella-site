import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { HeroIntroProvider } from "./components/HeroIntroProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stella Istanbul — Shaping Silence. Elevating Spaces.",
  description:
    "Premium acoustic wall panels and MDF systems manufactured in Türkiye for modern interiors.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-warm text-charcoal antialiased">
        <LanguageProvider>
          <HeroIntroProvider>{children}</HeroIntroProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
