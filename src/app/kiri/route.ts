import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const BENCHMARKS_URL =
  "https://tangled.org/russ-fugal.smart-knowledge-systems.com/kiri/raw/main/bench/benchmarks.html";

export async function GET() {
  try {
    const res = await fetch(BENCHMARKS_URL);

    if (!res.ok) {
      const filePath = path.join(process.cwd(), "public/media/benchmarks.html");
      const html = await fs.readFile(filePath, "utf-8");
      return new NextResponse(html, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    const html = await res.text();

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (error) {
    return new NextResponse("Failed to fetch benchmarks", { status: 502 });
  }
}
