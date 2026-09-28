"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Phone, StatusBar } from "@/components/phone/Phone";
import { Icon } from "@/components/phone/Icons";
import s from "@/components/phone/screens.module.css";
import styles from "./Dining.module.css";

// Section 04: sticky copy + sticky phone; three beats scroll past on the right and switch the phone screen.
export function Dining() {
  const t = useTranslations("dining");
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const img = el.querySelector<HTMLElement>(`.${styles.bgImg}`)!;
      const beats = gsap.utils.toArray<HTMLElement>(`.${styles.beat}`);
      const screens = gsap.utils.toArray<HTMLElement>(`.${styles.screen}`);
      const scan = el.querySelector<HTMLElement>(`.${styles.scan}`);

      const showOnly = (i: number, animate: boolean) => {
        screens.forEach((sc, k) => {
          if (animate) gsap.to(sc, { autoAlpha: k === i ? 1 : 0, y: k === i ? 0 : 14, duration: k === i ? 0.5 : 0.3, overwrite: true });
          else gsap.set(sc, { autoAlpha: k === i ? 1 : 0, y: 0 });
        });
      };

      if (prefersReducedMotion()) {
        showOnly(0, false);
        beats.forEach((b) => b.classList.add(styles.beatOn));
        return;
      }

      gsap.to(img, { yPercent: 12, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      showOnly(0, false);
      if (scan) gsap.to(scan, { top: "calc(100% - 14px)", duration: 1.6, ease: "sine.inOut", repeat: -1, yoyo: true });

      beats.forEach((b, i) => {
        ScrollTriggerToggle(b, () => {
          beats.forEach((x, k) => x.classList.toggle(styles.beatOn, k === i));
          showOnly(i, true);
        });
      });

      function ScrollTriggerToggle(trigger: HTMLElement, onEnter: () => void) {
        gsap.timeline({ scrollTrigger: { trigger, start: "top 55%", end: "bottom 55%", onEnter, onEnterBack: onEnter } });
      }
    },
    { scope: root },
  );

  const sample = [0, 1, 2, 3] as const;

  return (
    <section ref={root} className={styles.sec} aria-labelledby="dining-title">
      <div className={styles.bg} aria-hidden="true">
        <Image src="/media/fnb-restaurant.jpg" alt="" fill sizes="100vw" className={styles.bgImg} quality={70} />
        <div className={styles.scrim} />
      </div>

      <div className={`wrap ${styles.grid}`}>
        {/* Col 1: copy (sticky) */}
        <div className={styles.copy}>
          <span className="eyebrow" data-reveal>
            {t("eyebrow")}
          </span>
          <h2 id="dining-title" className={`h2 ${styles.h2}`} data-reveal data-reveal-delay="1">
            {t("h2")}
          </h2>
          <p className={`lede muted ${styles.lede}`} data-reveal data-reveal-delay="2">
            {t("text")}
          </p>
          <div data-reveal data-reveal-delay="3">
            <a className="btn btn-light" href="#indir">
              {t("cta")}
            </a>
            <p className={styles.micro}>{t("micro")}</p>
          </div>
        </div>

        {/* Col 2: phone (sticky) */}
        <div className={styles.phoneCol}>
          <Phone className={styles.phone}>
            <StatusBar />
            <div className={styles.screens}>
              {/* Screen 1: discovery */}
              <div className={`${s.app} ${styles.screen}`}>
                <div className={s.top}>
                  <div>
                    <small>{t("eyebrow")}</small>
                    <b>Gate F · 12 {t("filters.near").toLowerCase()}</b>
                  </div>
                </div>
                <div className={s.chips}>
                  {(["all", "coffee", "quick", "sit", "near"] as const).map((f, i) => (
                    <span key={f} className={i === 0 ? s.on : undefined}>
                      {t(`filters.${f}`)}
                    </span>
                  ))}
                </div>
                {sample.map((i) => (
                  <div key={i} className={s.row}>
                    <span className={s.thumb} />
                    <span className={s.tx}>
                      <b>{t(`sample.${i}.n`)}</b>
                      <span>{t(`sample.${i}.m`)}</span>
                    </span>
                    {t(`sample.${i}.tag`) && <span className={s.soon}>{t(`sample.${i}.tag`)}</span>}
                  </div>
                ))}
              </div>
              {/* Screen 2: scanning */}
              <div className={`${s.app} ${styles.screen}`}>
                <div className={s.top}>
                  <div>
                    <small>Pay</small>
                    <b>{t("paySteps.0")}</b>
                  </div>
                </div>
                <div className={s.qr}>
                  <div className={s.qrBox}>
                    <span className={`${s.scanline} ${styles.scan}`} />
                    <svg viewBox="0 0 24 24" fill="none" stroke="#210a60" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
                      <path d="M14 14h3v3h-3zM20 14v3M17 20h3M14 20h1" />
                    </svg>
                  </div>
                </div>
                <div className={s.sheet}>
                  <span className={s.merchant}>{t("sample.0.n")}</span>
                  <b className={s.amt}>₺186,00</b>
                  <span className={s.cta}>{t("paySteps.1")}</span>
                </div>
              </div>
              {/* Screen 3: paid */}
              <div className={`${s.app} ${styles.screen}`}>
                <div className={s.top}>
                  <div>
                    <small>Pay</small>
                    <b>{t("paySteps.2")}</b>
                  </div>
                </div>
                <div className={styles.paidBody}>
                  <span className={styles.tick}>{Icon.check({ size: 28 })}</span>
                  <b>₺186,00</b>
                  <span>{t("sample.0.n")}</span>
                  <span className={styles.pts}>+24 Voyola Points</span>
                </div>
              </div>
            </div>
          </Phone>
        </div>

        {/* Col 3: beats */}
        <ol className={styles.beatList}>
          {[0, 1, 2].map((i) => (
            <li key={i} className={styles.beat}>
              <span className={styles.beatNum}>0{i + 1}</span>
              <h3>{t(`beats.${i}.t`)}</h3>
              <p>{t(`beats.${i}.d`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
