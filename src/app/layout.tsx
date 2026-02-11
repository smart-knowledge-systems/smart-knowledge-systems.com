import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { WebVitals } from "@/lib/axiom/client";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Systems",
  description:
    "build smart knowledge-sharing systems that combine the best of human expertise with smart technology",
  openGraph: {
    title: "Smart Systems",
    description:
      "build smart knowledge-sharing systems that combine the best of human expertise with smart technology",
    url: "https://smart-knowledge-systems.com",
    siteName: "Smart Knowledge Systems",
    images: [
      {
        url: "https://cdn.sara.ai/image/uuid/7715fd21-5d30-54f9-b838-22acec9d9d9b.jpg",
        width: 725,
        height: 482,
        alt: "Smart Systems",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <WebVitals />
        {children}
      </body>
      <Analytics />
    </html>
  );
}
