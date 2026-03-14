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
      "Understand your code at any scale. 3.1x better search results than ripgrep. 42 repos indexed for $0.17.",
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
