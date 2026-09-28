import { Phone, StatusBar } from "@/components/phone/Phone";
import { Waitlist } from "@/components/ui/Waitlist";
import { WEB_APP_URL } from "@/lib/seo";
import s from "@/components/phone/screens.module.css";
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
            <StatusBar />
            <div className={s.app}>
              <div className={s.hero}>
                <small>Voyola Points</small>
                <span className={s.big}>1.240</span>
                <div className={s.tags}>
                  <span>IST</span>
                  <span>TK 1985</span>
                </div>
              </div>
              <div className={s.row}><span className={s.thumb} /><span className={s.tx}><b>Lounge</b><span>{t("soon")}</span></span></div>
              <div className={s.row}><span className={s.thumb} /><span className={s.tx}><b>Fast Track</b><span>{t("soon")}</span></span></div>
              <div className={s.row}><span className={s.thumb} /><span className={s.tx}><b>Pay with QR</b><span>Gate F · 3 min</span></span></div>
              <div className={s.tabbar}>
                <span className={s.tabOn}><i />Home</span>
                <span><i />Services</span>
                <span><i className={s.fab} />Pay</span>
                <span><i />Purchases</span>
                <span><i />Wallet</span>
              </div>
            </div>
          </Phone>
        </div>
      </div>
    </section>
  );
}
