import { useTranslations } from "next-intl";
import { Icon } from "@/components/phone/Icons";
import { Link } from "@/i18n/navigation";
import styles from "./Trust.module.css";

// Section 08: calm and concrete — trust claims on the left, a real-looking transaction receipt + support thread on the right.
export function Trust() {
  const t = useTranslations("trust");
  const items = [
    { key: "data", icon: Icon.lock },
    { key: "pay", icon: Icon.shield },
    { key: "clear", icon: Icon.eye },
    { key: "support", icon: Icon.chat },
  ] as const;

  return (
    <section className={styles.sec} aria-labelledby="trust-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <span className="eyebrow" data-reveal>
            {t("eyebrow")}
          </span>
          <h2 id="trust-title" className="h2" data-reveal data-reveal-delay="1">
            {t("h2")}
          </h2>
          <p className="lede muted" data-reveal data-reveal-delay="2">
            {t("intro")}
          </p>
          <ul className={styles.list}>
            {items.map((it, i) => (
              <li key={it.key} data-reveal data-reveal-delay={String(Math.min(3, i)) as "1"}>
                <span className={styles.ic}>{it.icon({ size: 20 })}</span>
                <div>
                  <b>{t(`items.${it.key}.t`)}</b>
                  <p>{t(`items.${it.key}.d`)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div data-reveal>
            <Link href="/privacy" className="btn btn-dark">
              {t("cta")}
            </Link>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.panel}>
            <article className={styles.receipt} data-reveal>
              <header>
                <span>{t("receipt.title")}</span>
                <b className={styles.status}>
                  {Icon.check({ size: 12 })} {t("receipt.status")}
                </b>
              </header>
              <div className={styles.rMerchant}>
                <span className={styles.rIc}>{Icon.food({ size: 18 })}</span>
                <div>
                  <b>{t("receipt.merchant")}</b>
                  <small>{t("receipt.time")}</small>
                </div>
              </div>
              <div className={styles.rAmount}>{t("receipt.amount")}</div>
              <dl className={styles.rMeta}>
                <div>
                  <dt>{t("receipt.method")}</dt>
                  <dd>{t("receipt.points")}</dd>
                </div>
                <div>
                  <dt>{t("receipt.id")}</dt>
                  <dd className={styles.mono}>VY-8F2K-••••-41Q7</dd>
                </div>
              </dl>
              <div className={styles.perf} />
            </article>

            <div className={`${styles.chat} ${styles.chatQ}`} data-reveal data-reveal-delay="2">
              <p>{t("support.q")}</p>
            </div>
            <div className={`${styles.chat} ${styles.chatA}`} data-reveal data-reveal-delay="3">
              <span className={styles.agent}>{Icon.chat({ size: 14 })}</span>
              <div>
                <p>{t("support.a")}</p>
                <small>{t("support.label")}</small>
              </div>
            </div>

            <div className={styles.enc} data-reveal data-reveal-delay="1">
              <span>{Icon.lock({ size: 14 })}</span>
              {t("enc")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
