import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "codeindex — Semantic Code Search",
    template: "%s | codeindex",
  },
  description:
    "Semantic search that finds what code does, not just what it says. Works locally. Scales across repos. Free for production use.",
  openGraph: {
    title: "codeindex — Semantic Code Search",
    description:
      "Understand your code at any scale. 1.4x better ranking vs expert grep across 330 queries and 16 languages. 42 repos indexed for $0.70.",
    url: "https://smart-knowledge-systems.com/codeindex",
    siteName: "Smart Knowledge Systems",
    locale: "en_US",
    type: "website",
  },
};

export default function CodeindexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
