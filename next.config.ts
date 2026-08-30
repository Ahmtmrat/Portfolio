import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
  "default-src 'self'",
  // 'unsafe-eval' is only needed in development, where React uses eval to
  // reconstruct server-side error stacks. Production needs neither.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  // next/font self-hosts Figtree and JetBrains Mono, so no Google Fonts origin.
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: https:",
  // Turbopack drives hot reload over a WebSocket; 'self' does not reliably
  // cover the ws: scheme, so dev needs it spelled out.
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  // Only in production. Over plain http — `next dev` on a LAN address, say —
  // this upgrades every asset request to https and the page loads nothing.
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: "/(.*)",
      headers: securityHeaders,
    },
  ],
  poweredByHeader: false,
  output: "standalone",
};

export default nextConfig;
