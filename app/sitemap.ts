import type { MetadataRoute } from "next";

const SITE_URL = "https://store.kreluna.it";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: "2026-08-28",
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
