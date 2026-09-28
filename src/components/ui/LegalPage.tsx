import { getTranslations } from "next-intl/server";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { ConsentReset } from "./Consent";
import styles from "./LegalPage.module.css";

export type PageKind = "about" | "contact" | "cookies" | "distance" | "refund" | "privacy" | "terms";

// Secondary pages share one calm layout; copy lives in messages/*.json under `pages`.
export async function LegalPage({ kind, locale }: { kind: PageKind; locale: string }) {
  const t = await getTranslations({ locale, namespace: "pages" });
  const f = await getTranslations({ locale, namespace: "footer" });
  return (
    <>
      <Nav solid />
      <main className={`light ${styles.main}`}>
        <article className={`wrap ${styles.article}`}>
          <h1 className="h2">{t(`${kind}.title`)}</h1>
          <p className="lede muted">{t(`${kind}.body`)}</p>
          {kind === "about" && <p className="lede muted">{t("about.body2")}</p>}
          {kind === "contact" && (
            <dl className={styles.contacts}>
              <div>
                <dt>{t("contact.general")}</dt>
                <dd>
                  <a href="mailto:hello@voyola.com">hello@voyola.com</a>
                </dd>
              </div>
              <div>
                <dt>{t("contact.support")}</dt>
                <dd>
                  <a href="mailto:support@voyola.com">support@voyola.com</a>
                </dd>
              </div>
              <div>
                <dt>{t("contact.partners")}</dt>
                <dd>
                  <a href="mailto:partners@voyola.com">partners@voyola.com</a>
                </dd>
              </div>
              <p className={styles.note}>{t("contact.hours")}</p>
            </dl>
          )}
          {kind === "cookies" && (
            <div className={styles.actions}>
              <ConsentReset label={t("cookies.manage")} />
            </div>
          )}
          <p className={styles.back}>
            <a href={locale === "en" ? "/" : `/${locale}`}>← {f("tagline").split(",")[0]}</a>
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
