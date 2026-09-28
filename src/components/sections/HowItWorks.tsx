"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Icon } from "@/components/phone/Icons";
import { Mark } from "@/components/ui/Logo";
import styles from "./HowItWorks.module.css";

// Section 07: four steps, each with a miniature app moment; the rail between them fills on scroll.
export function HowItWorks() {
  const t = useTranslations("how");
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = root.current!;
      const fill = el.querySelector<HTMLElement>(`.${styles.fill}`)!;
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);
      gsap.fromTo(fill, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: el.querySelector(`.${styles.rail}`), start: "top 80%", end: "bottom 35%", scrub: true } });
      gsap.from(cards, { y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: cards[0], start: "top 85%", once: true } });
      cards.forEach((c) => {
        ScrollTrigger.create({ trigger: c, start: "top 72%", once: true, onEnter: () => c.classList.add(styles.live) });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="nasil" className={`${styles.sec} light`} aria-labelledby="how-title">
      <div className="wrap">
        <div className={styles.head}>
          <div>
            <span className="eyebrow" data-reveal>
              {t("eyebrow")}
            </span>
            <h2 id="how-title" className="h2" data-reveal data-reveal-delay="1">
              {t("h2")}
            </h2>
          </div>
          <p className="lede muted" data-reveal data-reveal-delay="2">
            {t("intro")}
          </p>
        </div>

        <div className={styles.rail} aria-hidden="true">
          <div className={styles.fill} />
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={styles.dot} style={{ left: `${12.5 + i * 25}%` }}>
              0{i + 1}
            </span>
          ))}
        </div>

        <ol className={styles.grid}>
          {/* 01 download */}
          <li className={styles.card} data-magnetic="5">
            <div className={styles.mini}>
              <div className={styles.appIcon}>
                <Mark size={26} />
              </div>
              <div className={styles.storeRow}>
                <span>{t("mini.store")}</span>
              </div>
              <div className={styles.qr}>
                {Array.from({ length: 25 }, (_, k) => (
                  <i key={k} className={(k * 7) % 3 === 0 ? styles.qrOn : undefined} />
                ))}
              </div>
              <small>{t("mini.qr")}</small>
            </div>
            <Step t={t} i={0} />
          </li>
          {/* 02 account */}
          <li className={styles.card} data-magnetic="5">
            <div className={styles.mini}>
              <div className={styles.field}>
                <span>{t("mini.phone")}</span>
              </div>
              <small>{t("mini.otp")}</small>
              <div className={styles.otp}>
                {["4", "8", "2", ""].map((d, k) => (
                  <b key={k} style={{ ["--d" as string]: k }}>
                    {d}
                    {k === 3 && <i className={styles.caret} />}
                  </b>
                ))}
              </div>
              <div className={styles.oauth}>
                <span>
                  <AppleGlyph /> Apple
                </span>
                <span>
                  <GoogleGlyph /> Google
                </span>
              </div>
            </div>
            <Step t={t} i={1} />
          </li>
          {/* 03 discover */}
          <li className={styles.card} data-magnetic="5">
            <div className={styles.mini}>
              <small className={styles.pin}>
                {Icon.pin({ size: 12 })} {t("mini.near")}
              </small>
              {[Icon.food, Icon.lounge, Icon.fast].map((ic, k) => (
                <div key={k} className={styles.row} style={{ ["--d" as string]: k }}>
                  <span className={styles.rowIc}>{ic({ size: 16 })}</span>
                  <span className={styles.rowLines}>
                    <i style={{ width: `${70 - k * 12}%` }} />
                    <i style={{ width: `${45 + k * 8}%` }} />
                  </span>
                  {k === 0 && <span className={styles.rowTag} />}
                </div>
              ))}
            </div>
            <Step t={t} i={2} />
          </li>
          {/* 04 choose & earn */}
          <li className={styles.card} data-magnetic="5">
            <div className={`${styles.mini} ${styles.miniEarn}`}>
              <span className={styles.tick}>{Icon.check({ size: 22 })}</span>
              <b className={styles.earnAmt}>₺186,00</b>
              <small>{t("mini.paid")}</small>
              <span className={styles.earnPts}>
                {Icon.star({ size: 14 })} {t("mini.earn")}
              </span>
            </div>
            <Step t={t} i={3} />
          </li>
        </ol>
      </div>
    </section>
  );
}

function Step({ t, i }: { t: ReturnType<typeof useTranslations<"how">>; i: number }) {
  return (
    <div className={styles.body}>
      <span className={styles.num}>0{i + 1}</span>
      <h3>{t(`steps.${i}.t`)}</h3>
      <p>{t(`steps.${i}.d`)}</p>
    </div>
  );
}

const AppleGlyph = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3.1 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.7-1-2.7-3.8zM14 5.4c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.6 2.8-1.4z" />
  </svg>
);
const GoogleGlyph = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <path d="M21 12h-8M21 12a9 9 0 1 1-3-6.7" />
  </svg>
);
