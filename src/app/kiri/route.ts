import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const BENCHMARKS_URL =
  "https://tangled.org/russ-fugal.smart-knowledge-systems.com/kiri/raw/main/bench/benchmarks.html";

const OG_TAGS = `
<meta property="og:title" content="KIRI — Performance Benchmarks" />
<meta property="og:description" content="Performance benchmarks for Japanese morphological analysis — tokenization throughput and dictionary load times across Rust, TypeScript, and Elixir." />
<meta property="og:image" content="https://smart-knowledge-systems.com/media/kiri.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="KIRI — Performance Benchmarks for Japanese Morphological Analysis" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="KIRI — Performance Benchmarks" />
<meta name="twitter:description" content="Performance benchmarks for Japanese morphological analysis — tokenization throughput and dictionary load times across Rust, TypeScript, and Elixir." />
<meta name="twitter:image" content="https://smart-knowledge-systems.com/media/kiri.png" />
`;

function injectOgTags(html: string): string {
  return html.replace("</head>", `${OG_TAGS}</head>`);
}

export async function GET() {
  try {
    const res = await fetch(BENCHMARKS_URL);

    if (!res.ok) {
      const filePath = path.join(process.cwd(), "public/media/benchmarks.html");
      const html = await fs.readFile(filePath, "utf-8");
      return new NextResponse(injectOgTags(html), {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    const html = await res.text();

    return new NextResponse(injectOgTags(html), {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (error) {
    return new NextResponse("Failed to fetch benchmarks", { status: 502 });
  }
}
