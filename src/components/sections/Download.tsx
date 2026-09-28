import { useTranslations } from "next-intl";
import { Phone, StatusBar } from "@/components/phone/Phone";
import { Waitlist } from "@/components/ui/Waitlist";
import { WEB_APP_URL } from "@/lib/seo";
import s from "@/components/phone/screens.module.css";
import styles from "./Download.module.css";

// Section 09: conversion band. Store badges are disabled until launch; the waitlist is the real CTA.
export function Download() {
  const t = useTranslations("download");

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
            <span className={styles.store} aria-disabled="true">
              <AppleIcon />
              <span>
                <small>{t("soon")}</small>
                <b>App Store</b>
              </span>
            </span>
            <span className={styles.store} aria-disabled="true">
              <PlayIcon />
              <span>
                <small>{t("soon")}</small>
                <b>Google Play</b>
              </span>
            </span>
            <a className={`btn btn-ghost ${styles.webBtn}`} href={WEB_APP_URL} rel="noopener">
              {t("web")}
            </a>
          </div>

          <Waitlist />
        </div>

        <div className={styles.visual} aria-hidden="true">
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

function AppleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3.1 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.7-1-2.7-3.8zM14 5.4c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.6 2.8-1.4z" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.6 2.3 13 12l-9.4 9.7c-.4-.2-.6-.7-.6-1.2V3.5c0-.5.2-1 .6-1.2zM14.4 13.4l2.8 2.8-11.6 6.6 8.8-9.4zM20.7 10.8c.9.5.9 1.9 0 2.4l-2.4 1.4-3.1-3.1 3.1-3.1 2.4 1.4zM5.6 1.2l11.6 6.6-2.8 2.8-8.8-9.4z" />
    </svg>
  );
}
