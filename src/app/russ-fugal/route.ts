// a GET function that redirects to 'https://bsky.app/profile/rusted.social.sara.ai'
import { NextResponse } from "next/server";

export function GET() {
    const url = "https://bsky.app/profile/russ-fugal.smart-knowledge-systems.com"
    return NextResponse.redirect(url, { status: 302 });
}
