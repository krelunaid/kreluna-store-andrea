import { NextRequest, NextResponse } from "next/server";

const PRIMARY_HOST = "store.kreluna.it";
const KNOWN_LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

function isLocalHost(host: string): boolean {
  return KNOWN_LOCAL_HOSTS.has(host) || host.startsWith("localhost:");
}

function shouldRedirect(host: string): boolean {
  const normalized = host.toLowerCase();
  if (!normalized) return false;
  if (normalized.includes("chatgpt.site")) return true;
  if (normalized.includes("kreluna.it") && normalized !== PRIMARY_HOST) return true;
  return normalized !== PRIMARY_HOST;
}

export function middleware(request: NextRequest) {
  const host = request.nextUrl.hostname;

  if (!host || isLocalHost(host)) {
    return NextResponse.next();
  }

  if (!shouldRedirect(host)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.host = PRIMARY_HOST;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/:path*"],
};
