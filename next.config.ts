import path from "path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Every external origin this app actually loads from, in one place — keep
// this in sync with next.config.ts's images.remotePatterns and any new
// third-party embed if one is ever added.
const SUPABASE_ORIGIN = "https://ngypxicxyfhnmfbuykjx.supabase.co";

const CSP = [
  `default-src 'self'`,
  // Next.js's own hydration/RSC scripts and this app's two inline scripts
  // (theme init, JSON-LD) are unnoned inline — see note below.
  `script-src 'self' 'unsafe-inline'`,
  `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
  `img-src 'self' data: blob: ${SUPABASE_ORIGIN} https://lh3.googleusercontent.com`,
  `media-src 'self' ${SUPABASE_ORIGIN}`,
  `font-src 'self' https://fonts.gstatic.com data:`,
  `connect-src 'self' ${SUPABASE_ORIGIN} wss://${SUPABASE_ORIGIN.replace("https://", "")}`,
  `frame-src 'none'`,
  `object-src 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `frame-ancestors 'none'`,
  `upgrade-insecure-requests`,
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "ngypxicxyfhnmfbuykjx.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  turbopack: {
    root: path.join(__dirname),
  },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
