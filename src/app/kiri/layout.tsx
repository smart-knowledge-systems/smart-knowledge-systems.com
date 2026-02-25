import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KIRI - Performance Benchmarks",
  description:
    "Performance benchmarks for Japanese morphological analysis. Explore cutting-edge NLP metrics and language processing optimization.",
  openGraph: {
    title: "KIRI - Performance Benchmarks",
    description:
      "Performance benchmarks for Japanese morphological analysis. Explore cutting-edge NLP metrics and language processing optimization.",
    images: [
      {
        url: "/kiri.png",
        width: 1200,
        height: 630,
        alt: "KIRI - Performance Benchmarks for Japanese Morphological Analysis",
      },
    ],
  },
};

export default function KiriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
