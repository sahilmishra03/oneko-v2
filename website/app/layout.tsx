import Providers from "./providers";
import "./globals.css";

import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { cookies } from "next/headers";
import Script from "next/script";
import { Inter, Schibsted_Grotesk } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const analyticsDomain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;
const analyticsScriptUrl = process.env.NEXT_PUBLIC_ANALYTICS_SCRIPT_URL;
const serverThemes = {
  regular: { bg: "#fafaf9", primary: "#292524", foreground: "#57534e" },
  rose: { bg: "#fff1f2", primary: "#881337", foreground: "#e11d48" },
  emerald: { bg: "#f0fdfa", primary: "#134e4a", foreground: "#0d9488" },
  blue: { bg: "#eef2ff", primary: "#1e1b4b", foreground: "#4f46e5" },
  amber: { bg: "#fffbeb", primary: "#451a03", foreground: "#b45309" },
  violet: { bg: "#f5f3ff", primary: "#2e1065", foreground: "#7c3aed" },
} as const;
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  description: site.description,
  openGraph: {
    title: `${site.name} - ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} - ${site.tagline}`,
    description: site.description,
  },
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-schibsted-grotesk",
});

export default async function RootLayout({ children }) {
  const savedColor = (await cookies()).get("site-color")?.value;
  const initialTheme =
    savedColor && savedColor in serverThemes
      ? serverThemes[savedColor as keyof typeof serverThemes]
      : serverThemes.regular;

  return (
    <html
      lang="en"
      className={cn(
        inter.variable,
        schibstedGrotesk.variable,
        GeistSans.variable,
        "font-sans antialiased",
      )}
      style={
        {
          "--theme-bg": initialTheme.bg,
          "--primary": initialTheme.primary,
          "--foreground": initialTheme.foreground,
        } as CSSProperties
      }
      suppressHydrationWarning
    >
      <body className={cn("font-display bg-theme-bg")}>
        <Navbar />
        <main>
          <Providers>{children}</Providers>
        </main>
        <Footer />
        {analyticsDomain && analyticsScriptUrl ? (
          <Script
            src={analyticsScriptUrl}
            data-domain={analyticsDomain}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
