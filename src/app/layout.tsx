import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import ChatBot from "@/components/chatbot/ChatBot";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.maplecrestdevelopments.ca"),
  metadataBase: new URL('https://www.maplecrestdevelopments.ca'),
  title: {
    default: "Maple Crest Developments | Premium Canadian Construction & Real Estate",
    template: "%s | Maple Crest Developments",
  },
  description:
    "Premium residential, commercial and mixed-use developments across Canada. Building Canada's future, one community at a time.",
  keywords: [
    "Canadian real estate",
    "construction company Canada",
    "luxury homes Toronto",
    "real estate developer",
    "Maple Crest",
    "Canadian communities",
    "property development",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Maple Crest Developments",
    title: "Maple Crest Developments | Premium Canadian Construction & Real Estate",
    description:
      "Premium residential, commercial and mixed-use developments across Canada.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maple Crest Developments",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maple Crest Developments",
    description:
      "Premium residential, commercial and mixed-use developments across Canada.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
        <ChatBot />
        <Script id="jsonld" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Maple Crest Developments",
              "description": "Premium residential, commercial and mixed-use developments across Canada.",
              "url": "https://www.maplecrestdevelopments.ca",
              "telephone": "(416) 555-8900",
              "email": "info@maplecrestdevelopments.ca",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "120 King Street West, Suite 1800",
                "addressLocality": "Toronto",
                "addressRegion": "Ontario",
                "postalCode": "M5X 1Y5",
                "addressCountry": "CA"
              },
              "sameAs": [
                "https://www.linkedin.com/company/maple-crest-developments"
              ],
              "foundingDate": "2009",
              "numberOfEmployees": 250
            }
          `}
        </Script>
      </body>
    </html>
  );
}
