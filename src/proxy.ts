import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { after } from "next/server";
import { logger, logEvent } from "@/lib/axiom/server";

const KNOT_PLAIN_TEXT = `
╔══════════════════════════════════════════════════════════╗
║           knot.smart-knowledge-systems.com               ║
║           Tangled knot · ATProto git hosting             ║
╚══════════════════════════════════════════════════════════╝

STATUS
  This knot runs as a local Docker container on a personal
  laptop. It is only reachable when that laptop is powered
  on and connected to the internet via Cloudflare Tunnel.

  If you're seeing this page, the knot is likely offline.

RETRY
  https://knot.smart-knowledge-systems.com

TANGLED PROFILE (always available)
  https://tangled.sh/did:plc:i2fgba5nignuw4nccml33wjp

CLONE EXAMPLE (when knot is live)
  git clone https://knot.smart-knowledge-systems.com/<did>/<repo>

──────────────────────────────────────────────────────────
`.trim();

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

  // Content negotiation for /knot: serve plain text to non-browser clients (curl, etc.)
  if (pathname === "/knot") {
    const accept = request.headers.get("accept") ?? "";
    if (!accept.includes("text/html")) {
      return new Response(KNOT_PLAIN_TEXT, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
    return NextResponse.next();
  }

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
