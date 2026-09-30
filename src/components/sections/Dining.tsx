"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Phone } from "@/components/phone/Phone";
import { Shot } from "@/components/phone/Shot";
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
            <div className={styles.screens}>
              {/* Screen 1: campaigns (real) */}
              <div className={styles.screen}>
                <Shot name="campaigns" />
              </div>
              {/* Screen 2: pay QR (real) */}
              <div className={styles.screen}>
                <Shot name="pay" />
              </div>
              {/* Screen 3: payment summary (real) */}
              <div className={styles.screen}>
                <Shot name="paysuccess" />
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
