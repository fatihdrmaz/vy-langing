import { setRequestLocale, getTranslations } from "next-intl/server";
import { DlRedirect } from "@/components/ui/DlRedirect";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Waitlist } from "@/components/ui/Waitlist";

export const metadata = { robots: { index: false } };

// Smart download link (QR / short links). Redirects to the store when URLs are configured; otherwise the waitlist.
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  return (
    <>
      <Nav solid />
      <DlRedirect />
      <main style={{ paddingTop: 140, minHeight: "70vh" }}>
        <div className="wrap" style={{ maxWidth: 720, paddingBottom: 120, display: "flex", flexDirection: "column", gap: 22 }}>
          <h1 className="h2">{t("dl.title")}</h1>
          <p className="lede muted">{t("dl.body")}</p>
          <Waitlist />
        </div>
      </main>
      <Footer />
    </>
  );
}
