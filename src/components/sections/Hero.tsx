"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { SpriteWalker, type SpriteWalkerHandle } from "@/components/motion/SpriteWalker";
import { SplitText } from "@/components/motion/SplitText";
import { WEB_APP_URL } from "@/lib/seo";
import styles from "./Hero.module.css";

const ico = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const NOTE_ICONS = [
  <svg key="door" {...ico}><path d="M4 21V5a2 2 0 0 1 2-2h8v18M14 21h6M17 3h1a2 2 0 0 1 2 2v16M11 12h.01" /></svg>,
  <svg key="check" {...ico}><path d="M4 8h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 12h16M8 4v4M16 4v4" /><path d="m9.5 15.5 1.7 1.7 3.3-3.4" /></svg>,
  <svg key="plane" {...ico}><path d="M2 16l20-8-6 14-3-6zM13 16l-4-4" /></svg>,
];

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
          end: "+=48%",
          pin: stage,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => walker.current?.setProgress(self.progress, 1),
        },
      });

      tl.to(figure, { xPercent: 120, yPercent: -18, scale: 0.62, ease: "none", duration: 1 }, 0)
        .to(ground, { xPercent: -22, ease: "none", duration: 1 }, 0)
        .to(bg, { scale: 1.16, xPercent: -3, ease: "none", duration: 1 }, 0)
        .to(scrollHint, { opacity: 0, duration: 0.1 }, 0)
        .to(copy, { yPercent: -2, ease: "none", duration: 1 }, 0);

      // Journey notes pop in along the path
      // Journey notes: appear one after another and stay (a growing trail), previous ones dim slightly
      notes.forEach((n, i) => {
        const at = 0.04 + i * 0.3;
        tl.fromTo(n, { opacity: 0, y: 22, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.1, ease: "back.out(1.6)" }, at);
        if (i < notes.length - 1) tl.to(n, { opacity: 0.55, scale: 0.96, duration: 0.1 }, at + 0.3);
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
                <span className={styles.noteMark}>{NOTE_ICONS[i]}</span>
                <span className={styles.noteTx}>
                  <b>{t(`steps.${i}.k`)}</b>
                  <small>{t(`steps.${i}.v`)}</small>
                </span>
                <span className={styles.noteStep}>
                  {[0, 1, 2].map((j) => (
                    <i key={j} className={j <= i ? styles.on : undefined} />
                  ))}
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
