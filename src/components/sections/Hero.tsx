"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { SpriteWalker, type SpriteWalkerHandle } from "@/components/motion/SpriteWalker";
import { SplitText } from "@/components/motion/SplitText";
import { WEB_APP_URL } from "@/lib/seo";
import { Phone } from "@/components/phone/Phone";
import { Shot } from "@/components/phone/Shot";
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
  const reflection = useRef<SpriteWalkerHandle>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const stage = el.querySelector<HTMLElement>(`.${styles.stage}`)!;
      const figure = el.querySelector<HTMLElement>(`.${styles.figure}`)!;
      const ground = el.querySelector<HTMLElement>(`.${styles.ground}`)!;
      const bg = el.querySelector<HTMLElement>(`.${styles.bgImg}`)!;
      const notes = gsap.utils.toArray<HTMLElement>(`.${styles.note}`);
      const scrollHint = el.querySelector<HTMLElement>(`.${styles.scrollHint}`)!;
      const zoom = el.querySelector<HTMLElement>(`.${styles.zoom}`)!;
      const figureWrap = el.querySelector<HTMLElement>(`.${styles.figureWrap}`)!;

      if (prefersReducedMotion()) {
        walker.current?.setFrame(4);
        reflection.current?.setFrame(4);
        gsap.set(notes, { opacity: 1, y: 0 });
        gsap.set(zoom, { display: "none" });
        return;
      }

      // Autoplay: the hero tells its story on its own (no pin, no scroll-jacking). Starts 1.2s after load;
      // if the visitor scrolls before it finishes, it fast-forwards instead of being cut off.
      gsap.from(figure, { opacity: 0, x: -40, duration: 1.0, ease: "power3.out", delay: 0.3 });

      const tl = gsap.timeline({
        delay: 1.2,
        defaults: { ease: "none" },
        onUpdate: () => {
          const p = Math.min(1, tl.progress() / 0.55);
          walker.current?.setProgress(p, 1);
          reflection.current?.setProgress(p, 1);
        },
      });
      // 0 → 0.55: the walk (12 frames once), traveller recedes into the terminal
      tl.to(figure, { xPercent: 105, yPercent: -22, scale: 0.55, duration: 2.2 }, 0)
        .to(ground, { xPercent: -14, duration: 4 }, 0)
        .to(bg, { scale: 1.1, xPercent: -2, duration: 4 }, 0)
        .to(scrollHint, { opacity: 0, duration: 0.3 }, 0);
      // journey notes pop in along the way and stay as a trail
      notes.forEach((n, i) => {
        const at = 0.2 + i * 0.55;
        tl.fromTo(n, { opacity: 0, y: 22, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, at);
        if (i < notes.length - 1) tl.to(n, { opacity: 0.55, scale: 0.96, duration: 0.3, ease: "power1.out" }, at + 0.55);
      });
      // 0.55 → 1: the phone emerges from the traveller's hand and settles centre-right; notes retire
      tl.fromTo(zoom, { opacity: 0, scale: 0.3, yPercent: 30, xPercent: 50 }, { opacity: 1, scale: 1, yPercent: 0, xPercent: 0, duration: 1.1, ease: "power2.out" }, 2.2)
        .to(figureWrap, { opacity: 0, duration: 0.6, ease: "power1.in" }, 2.4)
        .to(notes, { opacity: 0, y: -14, duration: 0.4, ease: "power1.in" }, 2.4);

      // Early scroll → finish quickly rather than leaving the scene half-told
      const hurry = () => { if (tl.progress() < 1) tl.timeScale(3.5); };
      window.addEventListener("scroll", hurry, { passive: true, once: true });

      // Gentle parallax while the hero scrolls away (no pin)
      gsap.to(stage, { yPercent: 18, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });

      return () => window.removeEventListener("scroll", hurry);
    },
    { scope: root },
  );

  return (
    <section ref={root} id="kesfet" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.stage}>
        {/* Cinematic backdrop */}
        <div className={styles.bg} aria-hidden="true">
          <Image src="/media/hero-poster-blur.jpg" alt="" fill priority sizes="100vw" className={styles.bgImg} quality={78} />
          <div className={styles.tint} />
          <div className={styles.scrim} />
        </div>

        {/* Panning terminal strip at the traveller's feet */}
        <div className={styles.ground} aria-hidden="true">
          <Image src="/traveler/airport-bg.webp" alt="" width={1524} height={400} className={styles.groundImg} sizes="140vw" priority fetchPriority="high" />
        </div>

        <div className={`wrap ${styles.inner}`}>
          <div className={styles.copy}>
            <span className={`${styles.chip} ${styles.in}`} style={{ animationDelay: "0.1s" }}>
              <i />
              {t("eyebrow")}
            </span>
            <h1 id="hero-title" className={styles.h1}>
              <SplitText text={t("h1a")} as="span" trigger={false} delay={0.2} className={styles.line} />
              <SplitText text={t("h1b")} as="span" trigger={false} delay={0.45} className={`${styles.line} ${styles.accent}`} />
            </h1>
            <p className={`lede ${styles.lede} ${styles.in}`} style={{ animationDelay: "0.55s" }}>
              {t("lede")}
            </p>
            <div className={`${styles.ctas} ${styles.in}`} style={{ animationDelay: "0.7s" }}>
              <a className="btn btn-primary" href="#indir" data-magnetic="6" data-track="hero_download">
                {t("primary")}
              </a>
              <a className="btn btn-ghost" href={WEB_APP_URL} rel="noopener" data-magnetic="6">
                {t("secondary")}
              </a>
            </div>
            <p className={`${styles.micro} ${styles.in}`} style={{ animationDelay: "0.85s" }}>
              <span>{t("micro1")}</span>
              <span>{t("micro2")}</span>
              <span className={styles.microAccent}>{t("micro3")}</span>
            </p>
          </div>

          <div className={styles.figureWrap}>
            <div className={styles.figure}>
              <div className={styles.shadow} aria-hidden="true" />
              <SpriteWalker ref={walker} alt={t("walkerAlt")} className={styles.canvas} />
              <div className={styles.reflection} aria-hidden="true">
                <SpriteWalker ref={reflection} alt="" className={styles.canvas} />
              </div>
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

        <div className={styles.zoom} aria-hidden="true">
          <Phone glow={false} className={styles.zoomPhone}>
            <Shot name="dashboard" />
          </Phone>
        </div>

        <div className={styles.scrollHint} aria-hidden="true">
          <span>{t("scroll")}</span>
          <i />
        </div>
      </div>
    </section>
  );
}
