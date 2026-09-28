import { useTranslations } from "next-intl";
import styles from "./Faq.module.css";

// Native <details> for accessibility + crawlability; FAQPage JSON-LD is emitted in the layout.
export function Faq() {
  const t = useTranslations("faq");
  return (
    <section id="sss" className={`${styles.sec} light`} aria-labelledby="faq-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.head}>
          <span className="eyebrow" data-reveal>
            {t("eyebrow")}
          </span>
          <h2 id="faq-title" className="h2" data-reveal data-reveal-delay="1">
            {t("h2")}
          </h2>
        </div>
        <div className={styles.list}>
          {Array.from({ length: 10 }, (_, i) => (
            <details key={i} className={styles.item} name="faq" open={i === 0}>
              <summary>
                <span>{t(`items.${i}.q`)}</span>
                <i aria-hidden="true" />
              </summary>
              <div className={styles.body}>
                <p>{t(`items.${i}.a`)}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
