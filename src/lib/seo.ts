import type { Locale } from "@/i18n/routing";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://voyola.com";
export const WEB_APP_URL = process.env.NEXT_PUBLIC_WEB_APP_URL ?? "https://app.voyola.com";

export function localePath(locale: Locale | string, path = "") {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${prefix}${path}` || "/";
}
