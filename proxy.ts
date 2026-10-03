import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { updateSession } from "./lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

const LEGACY_HOSTNAME = "dr-osama-moafy.vercel.app";

export default async function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();
  if (host === LEGACY_HOSTNAME) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = "dr-osamamowafi.com";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    return updateSession(request);
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
