import type { NextConfig } from "next";
import { readFileSync } from "node:fs";

const githubPages = process.env.GITHUB_PAGES === "1";

function githubPagesBasePath(): string {
  const fromEnv = process.env.NEXT_PUBLIC_BASE_PATH?.trim();
  const raw = fromEnv || `/${JSON.parse(readFileSync("package.json", "utf8")).name as string}`;
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withSlash.replace(/\/$/, "");
}

const securityHeaders = [
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
};

if (!githubPages) {
  nextConfig.headers = async () => [
    {
      source: "/:path*",
      headers: securityHeaders,
    },
  ];
}

if (githubPages) {
  const basePath = githubPagesBasePath();
  nextConfig.output = "export";
  nextConfig.trailingSlash = true;
  nextConfig.basePath = basePath;
  nextConfig.assetPrefix = basePath;
  nextConfig.images = { unoptimized: true };
}

export default nextConfig;
