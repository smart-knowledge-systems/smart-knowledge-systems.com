import { NextResponse } from "next/server";

const BENCHMARKS_URL =
  "https://tangled.org/russ-fugal.smart-knowledge-systems.com/kiri/raw/main/bench/benchmarks.html";

export async function GET() {
  const res = await fetch(BENCHMARKS_URL);

  if (!res.ok) {
    return new NextResponse("Failed to fetch benchmarks", { status: 502 });
  }

  const html = await res.text();

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
