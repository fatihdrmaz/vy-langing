import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "tr"],
  defaultLocale: "en",
  // "/" = EN (most Istanbul Airport passengers are international), "/tr" = Turkish.
  localePrefix: "as-needed",
  localeDetection: false, // no auto-redirect: stable URLs for SEO and AI crawlers
});

export type Locale = (typeof routing.locales)[number];
