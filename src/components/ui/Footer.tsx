import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { LiveStrip } from "./LiveStrip";
import { WEB_APP_URL, localePath } from "@/lib/seo";
import styles from "./Footer.module.css";

export function Footer() {
  const t = useTranslations("footer");
  const n = useTranslations("nav");
  const home = localePath(useLocale());
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo height={30} ink="#fff" />
          <p>{t("tagline")}</p>
          <span className={styles.loc}>{t("location")}</span>
          <LiveStrip />
        </div>
        <nav aria-label={t("product")}>
          <b>{t("product")}</b>
          <a href={`${home}#hizmetler`}>{n("services")}</a>
          <a href={`${home}#avantajlar`}>{n("benefits")}</a>
          <a href={`${home}#nasil`}>{n("how")}</a>
          <a href={WEB_APP_URL} rel="noopener">{n("web")}</a>
        </nav>
        <nav aria-label={t("company")}>
          <b>{t("company")}</b>
          <Link href="/about">{t("about")}</Link>
          <Link href="/contact">{t("contact")}</Link>
          <a href={`${home}#sss`}>{t("help")}</a>
          <a href="mailto:partners@voyola.com">{t("partners")}</a>
        </nav>
        <nav aria-label={t("legal")}>
          <b>{t("legal")}</b>
          <Link href="/terms">{t("terms")}</Link>
          <Link href="/privacy">{t("privacy")}</Link>
          <Link href="/privacy">{t("kvkk")}</Link>
          <Link href="/cookies">{t("cookies")}</Link>
          <Link href="/distance-sales">{t("distance")}</Link>
          <Link href="/refund">{t("refund")}</Link>
        </nav>
      </div>
      <div className={`wrap ${styles.bottom}`}>
        <span>© {year} Voyola. {t("rights")}</span>
      </div>
    </footer>
  );
}
