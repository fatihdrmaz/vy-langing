"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { SpriteWalker, type SpriteWalkerHandle } from "@/components/motion/SpriteWalker";
import { SplitText } from "@/components/motion/SplitText";
import { WEB_APP_URL } from "@/lib/seo";
import styles from "./Hero.module.css";

export function Hero() {
  const t = useTranslations("hero");
  const root = useRef<HTMLElement>(null);
  const walker = useRef<SpriteWalkerHandle>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const stage = el.querySelector<HTMLElement>(`.${styles.stage}`)!;
      const figure = el.querySelector<HTMLElement>(`.${styles.figure}`)!;
      const ground = el.querySelector<HTMLElement>(`.${styles.ground}`)!;
      const bg = el.querySelector<HTMLElement>(`.${styles.bgImg}`)!;
      const copy = el.querySelector<HTMLElement>(`.${styles.copy}`)!;
      const notes = gsap.utils.toArray<HTMLElement>(`.${styles.note}`);
      const scrollHint = el.querySelector<HTMLElement>(`.${styles.scrollHint}`)!;

      if (prefersReducedMotion()) {
        walker.current?.setFrame(4);
        gsap.set(notes, { opacity: 1, y: 0 });
        return;
      }

      // Intro (no scroll needed)
      gsap.from(figure, { opacity: 0, x: -40, duration: 1.2, ease: "power3.out", delay: 0.3 });

      // Scroll-driven walk: pin the stage, traveller walks into the terminal (away from camera → smaller, higher).
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=150%",
          pin: stage,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => walker.current?.setProgress(self.progress, 4),
        },
      });

      tl.to(figure, { xPercent: 120, yPercent: -18, scale: 0.62, ease: "none", duration: 1 }, 0)
        .to(ground, { xPercent: -22, ease: "none", duration: 1 }, 0)
        .to(bg, { scale: 1.16, xPercent: -3, ease: "none", duration: 1 }, 0)
        .to(scrollHint, { opacity: 0, duration: 0.1 }, 0)
        .to(copy, { yPercent: -6, opacity: 0.0, ease: "power1.in", duration: 0.28 }, 0.72);

      // Journey notes pop in along the path
      notes.forEach((n, i) => {
        const at = 0.1 + i * 0.28;
        tl.fromTo(n, { opacity: 0, y: 18, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.08, ease: "power2.out" }, at)
          .to(n, { opacity: 0, y: -10, duration: 0.08 }, at + 0.22);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="kesfet" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.stage}>
        {/* Cinematic backdrop */}
        <div className={styles.bg} aria-hidden="true">
          <Image src="/media/hero-poster.jpg" alt="" fill priority sizes="100vw" className={styles.bgImg} quality={78} />
          <div className={styles.tint} />
          <div className={styles.scrim} />
        </div>

        {/* Panning terminal strip at the traveller's feet */}
        <div className={styles.ground} aria-hidden="true">
          <Image src="/traveler/airport-bg.webp" alt="" width={1524} height={400} className={styles.groundImg} priority />
        </div>

        <div className={`wrap ${styles.inner}`}>
          <div className={styles.copy}>
            <span className={styles.chip} data-reveal>
              <i />
              {t("eyebrow")}
            </span>
            <h1 id="hero-title" className={styles.h1}>
              <SplitText text={t("h1a")} as="span" trigger={false} delay={0.2} className={styles.line} />
              <SplitText text={t("h1b")} as="span" trigger={false} delay={0.45} className={`${styles.line} ${styles.accent}`} />
            </h1>
            <p className={`lede ${styles.lede}`} data-reveal data-reveal-delay="2">
              {t("lede")}
            </p>
            <div className={styles.ctas} data-reveal data-reveal-delay="3">
              <a className="btn btn-primary" href="#indir">
                {t("primary")}
              </a>
              <a className="btn btn-ghost" href={WEB_APP_URL} rel="noopener">
                {t("secondary")}
              </a>
            </div>
            <p className={styles.micro} data-reveal data-reveal-delay="3">
              <span>{t("micro1")}</span>
              <span>{t("micro2")}</span>
              <span className={styles.microAccent}>{t("micro3")}</span>
            </p>
          </div>

          <div className={styles.figureWrap}>
            <div className={styles.figure}>
              <div className={styles.shadow} aria-hidden="true" />
              <SpriteWalker ref={walker} alt={t("walkerAlt")} className={styles.canvas} />
            </div>
            {[0, 1, 2].map((i) => (
              <div key={i} className={`${styles.note} ${styles[`note${i}` as "note0"]}`} aria-hidden="true">
                <span className={styles.noteMark}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
                <span>
                  <b>{t(`steps.${i}.k`)}</b>
                  <small>{t(`steps.${i}.v`)}</small>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.scrollHint} aria-hidden="true">
          <span>{t("scroll")}</span>
          <i />
        </div>
      </div>
    </section>
  );
}
