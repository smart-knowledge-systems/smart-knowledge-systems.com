import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { logger, logEvent } from "@/lib/axiom/server";

// Paths to exclude from logging
const EXCLUDED_PATHS = [
  "/_next",
  "/api",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
];

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
  // Check excluded paths
  if (EXCLUDED_PATHS.some((path) => pathname.startsWith(path))) {
    return false;
  }

  // Check excluded extensions
  if (EXCLUDED_EXTENSIONS.some((ext) => pathname.endsWith(ext))) {
    return false;
  }

  return true;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldLogRequest(pathname)) {
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

    // Use waitUntil for reliable delivery without blocking the response
    const response = NextResponse.next();

    // Note: In Edge runtime, we need to flush asynchronously
    // The flush will happen in the background
    logger.flush().catch(() => {
      // Silently handle flush errors in proxy
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
