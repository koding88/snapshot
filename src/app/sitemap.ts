import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const baseUrl = siteConfig.domain;
const locales = siteConfig.locales;

const staticRoutes = [
  "",
  "/about",
  "/galleries",
  "/packages",
  "/blogs",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
