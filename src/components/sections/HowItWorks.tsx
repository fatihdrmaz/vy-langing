"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Icon } from "@/components/phone/Icons";
import styles from "./HowItWorks.module.css";

// Section 07: four steps; the connecting line fills as you scroll.
export function HowItWorks() {
  const t = useTranslations("how");
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const line = root.current!.querySelector<HTMLElement>(`.${styles.fill}`)!;
      const steps = gsap.utils.toArray<HTMLElement>(`.${styles.step}`);
      gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 60%", end: "bottom 70%", scrub: true } });
      steps.forEach((s, i) => {
        gsap.from(s, { y: 30, opacity: 0, duration: 0.7, delay: i * 0.08, scrollTrigger: { trigger: s, start: "top 85%", once: true } });
      });
    },
    { scope: root },
  );

  const icons = [Icon.arrow, Icon.shield, Icon.pin, Icon.star];

  return (
    <section ref={root} id="nasil" className={`${styles.sec} light`} aria-labelledby="how-title">
      <div className="wrap">
        <div className={styles.head}>
          <span className="eyebrow" data-reveal>
            {t("eyebrow")}
          </span>
          <h2 id="how-title" className="h2" data-reveal data-reveal-delay="1">
            {t("h2")}
          </h2>
        </div>
        <ol className={styles.steps}>
          <div className={styles.line} aria-hidden="true">
            <div className={styles.fill} />
          </div>
          {[0, 1, 2, 3].map((i) => (
            <li key={i} className={styles.step}>
              <span className={styles.dot}>{icons[i]({ size: 20 })}</span>
              <span className={styles.num}>0{i + 1}</span>
              <h3>{t(`steps.${i}.t`)}</h3>
              <p>{t(`steps.${i}.d`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
