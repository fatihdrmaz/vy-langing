import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing, type Locale } from "@/i18n/routing";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Interactions } from "@/components/motion/Interactions";
import { Preloader } from "@/components/ui/Preloader";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, localePath } from "@/lib/seo";
import "../globals.css";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const languages = Object.fromEntries(routing.locales.map((l) => [l, localePath(l)]));
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: "%s · Voyola" },
    description: t("description"),
    applicationName: "Voyola",
    keywords: ["Voyola", "Istanbul Airport", "İstanbul Havalimanı", "airport app", "lounge", "fast track", "airport dining", "QR payment"],
    alternates: { canonical: localePath(locale as Locale), languages: { ...languages, "x-default": "/" } },
    openGraph: {
      type: "website",
      siteName: "Voyola",
      url: localePath(locale as Locale),
      title: t("title"),
      description: t("description"),
      locale: locale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: locale === "tr" ? ["en_US"] : ["tr_TR"],
      images: [{ url: "/media/og-image.jpg", width: 1200, height: 630, alt: t("ogAlt") }],
    },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description"), images: ["/media/og-image.jpg"] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    icons: { icon: "/brand/voyola-mark.svg", apple: "/brand/voyola-appicon.svg" },
    category: "travel",
  };
}

export const viewport = { themeColor: "#100535", width: "device-width", initialScale: 1 };

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${archivo.variable} ${inter.variable}`}>
      <body>
        <NextIntlClientProvider>
          <JsonLd locale={locale as Locale} />
          <Preloader />
          <SmoothScroll>{children}</SmoothScroll>
          <Interactions />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
