"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion, isDesktop } from "@/lib/gsap";
import { Phone } from "@/components/phone/Phone";
import { DashboardScreen, DASH_ROWS } from "@/components/phone/DashboardScreen";
import { Icon } from "@/components/phone/Icons";
import s from "@/components/phone/screens.module.css";
import styles from "./Journey.module.css";

const CARDS = DASH_ROWS;

// Section 02: five service cards orbit the phone, then get "pulled in" as the app rows light up.
export function Journey() {
  const t = useTranslations("journey");
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = root.current!;
      const desktop = isDesktop();
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);
      const rows = gsap.utils.toArray<HTMLElement>(`.${styles.stage} [data-row]`);
      const phone = el.querySelector<HTMLElement>(`.${styles.phone}`)!;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: desktop ? "+=160%" : "+=130%", pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true },
      });

      tl.from(phone, { y: 80, scale: 0.92, duration: 0.3, ease: "power2.out" }, 0);
      if (desktop) tl.from(cards, { opacity: 0, y: 30, stagger: 0.03, duration: 0.14, ease: "power2.out" }, 0);
      cards.forEach((c, i) => {
        const at = 0.2 + i * 0.14;
        if (desktop) {
          tl.to(c, { x: 0, y: 0, xPercent: -50, yPercent: -50, left: "50%", top: "50%", right: "auto", bottom: "auto", scale: 0.3, opacity: 0, duration: 0.18, ease: "power2.in" }, at);
        } else {
          const delta = (axis: "x" | "y") => {
            const pr = phone.getBoundingClientRect();
            const cr = c.getBoundingClientRect();
            const cur = Number(gsap.getProperty(c, axis)) || 0;
            return axis === "x" ? pr.left + pr.width / 2 - (cr.left - cur + cr.width / 2) : pr.top + pr.height * 0.45 - (cr.top - cur + cr.height / 2);
          };
          tl.to(c, { x: () => delta("x"), y: () => delta("y"), scale: 0.25, opacity: 0, duration: 0.18, ease: "power2.in" }, at);
        }
        if (rows[i]) tl.add(() => rows[i].classList.toggle(s.rowOn, tl.scrollTrigger!.direction > 0), at + 0.14);
      });
      tl.to({}, { duration: 0.15 });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="hizmetler" className={`${styles.sec} light no-bridge`} aria-labelledby="journey-title">
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
            <DashboardScreen rowAttr={{ "data-row": "" }} />
          </Phone>

          <div className={styles.pills}>
            {CARDS.map((c, i) => (
              <article key={c.key} className={`${styles.card} ${styles[`c${i}` as "c0"]}`} data-track="service_click" role="button" tabIndex={0}>
                <span className={styles.cardIc}>{Icon[c.icon]({ size: 22 })}</span>
                <h3>{t(`cards.${c.key}.t`)}</h3>
                <p>{t(`cards.${c.key}.d`)}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
