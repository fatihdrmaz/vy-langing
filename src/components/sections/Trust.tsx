import { useTranslations } from "next-intl";
import { Icon } from "@/components/phone/Icons";
import { Link } from "@/i18n/navigation";
import styles from "./Trust.module.css";

// Section 08: intentionally calm — a breathing space before the conversion band.
export function Trust() {
  const t = useTranslations("trust");
  const items = [
    { key: "data", icon: Icon.lock },
    { key: "pay", icon: Icon.shield },
    { key: "clear", icon: Icon.eye },
    { key: "support", icon: Icon.chat },
  ] as const;

  return (
    <section className={`${styles.sec} light`} aria-labelledby="trust-title">
      <div className="wrap">
        <div className={styles.head}>
          <span className="eyebrow" data-reveal>
            {t("eyebrow")}
          </span>
          <h2 id="trust-title" className="h2" data-reveal data-reveal-delay="1">
            {t("h2")}
          </h2>
        </div>
        <div className={styles.grid}>
          {items.map((it, i) => (
            <article key={it.key} className={`card ${styles.card}`} data-reveal data-reveal-delay={String(Math.min(3, i)) as "1"}>
              <span className={styles.ic}>{it.icon({ size: 22 })}</span>
              <h3>{t(`items.${it.key}.t`)}</h3>
              <p>{t(`items.${it.key}.d`)}</p>
            </article>
          ))}
        </div>
        <div className={styles.foot} data-reveal>
          <Link href="/privacy" className="btn btn-dark">
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
