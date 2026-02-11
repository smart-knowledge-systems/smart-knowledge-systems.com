// Redirect to Bluesky profile
import { NextResponse } from "next/server";

export function GET() {
  const url = "https://bsky.app/profile/russ-fugal.smart-knowledge-systems.com";
  return NextResponse.redirect(url, { status: 302 });
}
