import { NextRequest, NextResponse } from "next/server";

const PRIMARY_HOST = "store.kreluna.it";
const KNOWN_LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function isLocalHost(host: string): boolean {
  return KNOWN_LOCAL_HOSTS.has(host) || host.startsWith("localhost:");
}

export function middleware(request: NextRequest) {
  const host = request.nextUrl.hostname.toLowerCase();

  if (!host || isLocalHost(host)) {
    return NextResponse.next();
  }

  if (host === PRIMARY_HOST) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.hostname = PRIMARY_HOST;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/:path*"],
};
