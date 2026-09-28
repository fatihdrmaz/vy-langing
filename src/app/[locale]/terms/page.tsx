import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/ui/LegalPage";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage kind="terms" locale={locale} />;
}
