import type { MetadataRoute } from "next";
import { isGithubPages, pagesSiteUrl } from "@/lib/hosting";
import { PUBLIC_URL, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = isGithubPages ? pagesSiteUrl(PUBLIC_URL) : siteUrl();
  if (isGithubPages) {
    return ["/", "/trends/", "/quiz/", "/digest/", "/legal/disclaimer/"].map((path) => ({
      url: `${base}${path}`,
      changeFrequency: path === "/" || path === "/trends/" ? "hourly" : "weekly",
      priority: path === "/" ? 1 : 0.7,
    }));
  }
  return ["", "/trends", "/quiz", "/digest", "/legal/disclaimer"].map((path) => ({
    url: `${base}${path || "/"}`,
    changeFrequency: path === "" || path === "/trends" ? "hourly" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
