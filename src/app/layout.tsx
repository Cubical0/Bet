import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ajmeri-satta-king.com"),
  title: {
    default: "Ajmeri Satta King - Live Results & Charts | Satta King Results",
    template: "%s | Ajmeri Satta King",
  },
  description:
    "Get live Ajmeri Satta King results, charts, and historical data. Daily updated Satta King results for Ajmeri Gate, Gali, Desawar, and more. Check today's Satta King results instantly.",
  keywords: [
    "satta king",
    "ajmeri satta king",
    "satta king results",
    "ajmeri gate satta",
    "satta king chart",
    "satta king live results",
    "satta king ajmeri",
    "satta king today",
    "satta king game",
    "satta king online",
  ],
  authors: [{ name: "Ajmeri Satta King Team" }],
  creator: "Ajmeri Satta King",
  publisher: "Ajmeri Satta King",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.ajmeri-satta-king.com",
    title: "Ajmeri Satta King - Live Results & Charts | Satta King Results",
    description:
      "Get live Ajmeri Satta King results, charts, and historical data. Daily updated Satta King results for Ajmeri Gate, Gali, Desawar, and more. Check today's Satta King results instantly.",
    siteName: "Ajmeri Satta King",
    images: [
      {
        url: "https://www.ajmeri-satta-king.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ajmeri Satta King",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajmeri Satta King - Live Results & Charts | Satta King Results",
    description:
      "Get live Ajmeri Satta King results, charts, and historical data. Daily updated Satta King results for Ajmeri Gate, Gali, Desawar, and more.",
    creator: "@ajmerisattaking",
    images: ["https://www.ajmeri-satta-king.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.ajmeri-satta-king.com",
  },
  verification: {
    google: "your-google-site-verification", // Add your Google verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
