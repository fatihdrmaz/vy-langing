import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { SITE_URL, localePath } from "@/lib/seo";

// Structured data for Google + AI answer engines: Organization, SoftwareApplication, WebSite, FAQPage.
export async function JsonLd({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "meta" });
  const faq = await getTranslations({ locale, namespace: "faq" });
  const url = `${SITE_URL}${localePath(locale)}`;

  const faqEntities = Array.from({ length: 13 }, (_, i) => ({
    "@type": "Question",
    name: faq(`items.${i}.q`),
    acceptedAnswer: { "@type": "Answer", text: faq(`items.${i}.a`) },
  }));

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "Voyola",
        url: SITE_URL,
        logo: `${SITE_URL}/brand/voyola-ribbon-light.svg`,
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Voyola",
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#org` },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: t("title"),
        description: t("description"),
        inLanguage: locale,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        primaryImageOfPage: `${SITE_URL}/media/og-image.jpg`,
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#app`,
        name: "Voyola",
        description: t("description"),
        applicationCategory: "TravelApplication",
        operatingSystem: "iOS, Android, Web",
        url,
        image: `${SITE_URL}/media/og-image.jpg`,
        publisher: { "@id": `${SITE_URL}/#org` },
        offers: { "@type": "Offer", price: "0", priceCurrency: "TRY", availability: "https://schema.org/PreOrder" },
        areaServed: { "@type": "Airport", name: "Istanbul Airport", iataCode: "IST" },
      },
      { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: faqEntities },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
