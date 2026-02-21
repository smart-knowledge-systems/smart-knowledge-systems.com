import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { after } from "next/server";
import { logger, logEvent } from "@/lib/axiom/server";

// Exact paths to exclude from logging
const EXCLUDED_EXACT_PATHS = new Set([
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
]);

// Path prefixes to exclude (matched by segment boundary)
const EXCLUDED_PATH_PREFIXES = ["/_next/", "/api/"];

// File extensions to exclude
const EXCLUDED_EXTENSIONS = [
  ".js",
  ".css",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".ico",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
];

function shouldLogRequest(pathname: string): boolean {
  if (EXCLUDED_EXACT_PATHS.has(pathname)) {
    return false;
  }

  if (EXCLUDED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return false;
  }

  if (EXCLUDED_EXTENSIONS.some((ext) => pathname.endsWith(ext))) {
    return false;
  }

  return true;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!shouldLogRequest(pathname)) {
    return NextResponse.next();
  }

  logEvent("http.request", {
    method: request.method,
    path: pathname,
    host: request.headers.get("host") || "unknown",
    userAgent: request.headers.get("user-agent") || "unknown",
    referer: request.headers.get("referer") || "direct",
    ip:
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown",
  });

  // Flush logs after the response is sent (non-blocking)
  after(async () => {
    await logger.flush().catch((error: unknown) => {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to flush proxy logs:", error);
      }
    });
  });

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
