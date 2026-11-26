import type { MetadataRoute } from "next";
import { isGithubPages, pagesSiteUrl } from "@/lib/hosting";
import { PUBLIC_URL, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = isGithubPages ? pagesSiteUrl(PUBLIC_URL) : siteUrl();
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
