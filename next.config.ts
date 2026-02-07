import type { NextConfig } from "next";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://static.cloudflareinsights.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://formspree.io https://static.cloudflareinsights.com;
  frame-src https://www.youtube.com;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://formspree.io;
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\n/g, " ")
  .trim();

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
