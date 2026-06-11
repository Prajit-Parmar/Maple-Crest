import type { Metadata } from "next";
import { Source_Sans_3, Source_Code_Pro } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import ChatBot from "@/components/chatbot/ChatBot";
import PortfolioBanner from "@/components/layout/PortfolioBanner";

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
});

const sourceCode = Source_Code_Pro({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.maplecrestdevelopments.ca"),
  title: {
    default: "Maple Crest Developments | Portfolio Demo",
    template: "%s | Maple Crest Developments",
  },
  description:
    "Portfolio/demo project — Maple Crest Developments concept site showcasing a fictional Canadian real estate developer. Built with Next.js, TypeScript, and Leaflet.",
  keywords: [
    "portfolio", "demo", "Next.js", "real estate concept",
    "Maple Crest", "fictional company", "web development portfolio",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Maple Crest Developments (Portfolio)",
    title: "Maple Crest Developments | Portfolio Demo",
    description: "Portfolio/demo project showcasing a fictional Canadian real estate developer. Not a real company.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Maple Crest Developments — Portfolio Demo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maple Crest Developments (Portfolio Demo)",
    description: "Portfolio/demo project showcasing a fictional Canadian real estate developer. Not a real company.",
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${sourceCode.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <PortfolioBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
        <ChatBot />
        <Script id="jsonld" type="application/ld+json" strategy="afterInteractive">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Maple Crest Developments — Portfolio Demo",
            "description": "Fictional real estate developer concept site. This is a portfolio/demo project, not a real company.",
            "about": { "@type": "Thing", "name": "Portfolio Project", "description": "A Next.js portfolio project demonstrating a fictional Canadian real estate developer website." }
          }
        `}</Script>
      </body>
    </html>
  );
}
