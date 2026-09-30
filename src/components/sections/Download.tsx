import { Phone } from "@/components/phone/Phone";
import { Shot } from "@/components/phone/Shot";
import { Waitlist } from "@/components/ui/Waitlist";
import { WEB_APP_URL } from "@/lib/seo";
import styles from "./Download.module.css";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { QrBox } from "@/components/ui/QrBox";
import { getLocale, getTranslations } from "next-intl/server";

// Section 09: conversion band. Store badges are disabled until launch; the waitlist is the real CTA.
export async function Download() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "download" });

  return (
    <section id="indir" className={styles.sec} aria-labelledby="download-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <h2 id="download-title" className={`h2 ${styles.h2}`} data-reveal>
            {t("h2")}
          </h2>
          <p className={`lede ${styles.lede}`} data-reveal data-reveal-delay="1">
            {t("text")}
          </p>

          <div className={styles.stores} data-reveal data-reveal-delay="2">
            <StoreBadges soon={t("soon")} hint={t("badgeHint")} />
            <a className={`btn btn-ghost ${styles.webBtn}`} href={WEB_APP_URL} rel="noopener">
              {t("web")}
            </a>
          </div>

          <Waitlist />
        </div>

        <div className={styles.visual}>
          <div className={styles.qr}>
            <QrBox label={t("qr")} locale={locale} />
          </div>
          <Phone className={styles.phone} glow={false}>
            <Shot name="dashboard" />
          </Phone>
        </div>
      </div>
    </section>
  );
}
