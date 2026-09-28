"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion, isDesktop } from "@/lib/gsap";
import { Phone, StatusBar } from "@/components/phone/Phone";
import { Icon, type IconName } from "@/components/phone/Icons";
import s from "@/components/phone/screens.module.css";
import styles from "./Journey.module.css";

const CARDS: { key: "food" | "premium" | "pay" | "benefits" | "discover"; icon: IconName }[] = [
  { key: "food", icon: "food" },
  { key: "premium", icon: "lounge" },
  { key: "pay", icon: "qr" },
  { key: "benefits", icon: "gift" },
  { key: "discover", icon: "pin" },
];

// Section 02: five service cards orbit the phone, then get "pulled in" as the app rows light up.
export function Journey() {
  const t = useTranslations("journey");
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !isDesktop()) return;
      const el = root.current!;
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);
      const rows = gsap.utils.toArray<HTMLElement>(`.${styles.stage} [data-row]`);
      const phone = el.querySelector<HTMLElement>(`.${styles.phone}`)!;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: "+=160%", pin: true, scrub: 0.8, anticipatePin: 1 },
      });

      tl.from(phone, { y: 80, scale: 0.92, duration: 0.3, ease: "power2.out" }, 0)
        .from(cards, { opacity: 0, y: 30, stagger: 0.03, duration: 0.14, ease: "power2.out" }, 0);
      cards.forEach((c, i) => {
        const at = 0.2 + i * 0.14;
        tl.to(c, { x: 0, y: 0, xPercent: 0, yPercent: 0, left: "50%", top: "50%", scale: 0.35, opacity: 0, duration: 0.18, ease: "power2.in" }, at);
        if (rows[i]) tl.add(() => rows[i].classList.toggle(s.rowOn, tl.scrollTrigger!.direction > 0), at + 0.14);
      });
      tl.to({}, { duration: 0.15 });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="hizmetler" className={`${styles.sec} light`} aria-labelledby="journey-title">
      <div className={`wrap ${styles.stage}`}>
        <div className={styles.head}>
          <span className="eyebrow" data-reveal>
            {t("eyebrow")}
          </span>
          <h2 id="journey-title" className={`h2 ${styles.h2}`} data-reveal data-reveal-delay="1">
            {t("h2")}
          </h2>
          <p className={`lede muted ${styles.intro}`} data-reveal data-reveal-delay="2">
            {t("intro")}
          </p>
        </div>

        <div className={styles.orbit}>
          <Phone className={styles.phone}>
            <StatusBar />
            <div className={s.app}>
              <div className={s.top}>
                <div>
                  <small>Istanbul Airport · IST</small>
                  <b>Merhaba 👋</b>
                </div>
                <span className={s.pill}>Voyola</span>
              </div>
              <div className={s.hero}>
                <small>TK 1985 · IST → LHR</small>
                <span className={s.big}>02:45</span>
                <div className={s.tags}>
                  <span>Gate F7</span>
                  <span>Boarding 18:05</span>
                </div>
              </div>
              <div className={s.label}>{t("eyebrow")}</div>
              {CARDS.map((c) => (
                <div key={c.key} className={s.row} data-row>
                  <span className={s.ic}>{Icon[c.icon]()}</span>
                  <span className={s.tx}>
                    <b>{t(`cards.${c.key}.t`)}</b>
                    <span>{t(`cards.${c.key}.d`)}</span>
                  </span>
                  <span className={s.go}>›</span>
                </div>
              ))}
              <div className={s.tabbar}>
                <span className={s.tabOn}><i />Home</span>
                <span><i />Services</span>
                <span><i className={s.fab} />Pay</span>
                <span><i />Purchases</span>
                <span><i />Wallet</span>
              </div>
            </div>
          </Phone>

          {CARDS.map((c, i) => (
            <article key={c.key} className={`${styles.card} ${styles[`c${i}` as "c0"]}`}>
              <span className={styles.cardIc}>{Icon[c.icon]({ size: 22 })}</span>
              <h3>{t(`cards.${c.key}.t`)}</h3>
              <p>{t(`cards.${c.key}.d`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
