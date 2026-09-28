import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL, localePath } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/contact", "/privacy", "/terms", "/cookies", "/distance-sales", "/refund"];
  const now = new Date();
  return pages.flatMap((p) =>
    routing.locales.map((l) => ({
      url: `${SITE_URL}${localePath(l, p)}`,
      lastModified: now,
      changeFrequency: p === "" ? ("weekly" as const) : ("monthly" as const),
      priority: p === "" ? 1 : 0.4,
      alternates: { languages: Object.fromEntries(routing.locales.map((x) => [x, `${SITE_URL}${localePath(x, p)}`])) },
    })),
  );
}
