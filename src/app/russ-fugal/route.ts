// Redirect to Bluesky profile
import { NextResponse } from "next/server";
import { BLUESKY_PROFILE_URL } from "@/content/marketing-content";

export function GET() {
  return NextResponse.redirect(BLUESKY_PROFILE_URL, { status: 302 });
}
