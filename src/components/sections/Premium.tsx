"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion, isDesktop } from "@/lib/gsap";
import styles from "./Premium.module.css";

const ITEMS = [
  { key: "lounge", img: "/media/svc-lounge.jpg" },
  { key: "fasttrack", img: "/media/svc-fasttrack.jpg" },
  { key: "buggy", img: "/media/svc-buggy.jpg" },
  { key: "other", img: "/media/svc-meetgreet.jpg" },
] as const;

// Section 05: editorial stacked cards — each sticks under the previous and recedes as the next arrives.
export function Premium() {
  const t = useTranslations("premium");
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !isDesktop()) return;
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.94 - (cards.length - 2 - i) * 0.02,
          opacity: 0.6,
          ease: "none",
          scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top top+=120", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={`${styles.sec} light`} aria-labelledby="premium-title">
      <div className="wrap">
        <div className={styles.head}>
          <div>
            <span className="eyebrow" data-reveal>
              {t("eyebrow")}
            </span>
            <h2 id="premium-title" className="h2" data-reveal data-reveal-delay="1">
              {t("h2")}
            </h2>
          </div>
          <p className="lede muted" data-reveal data-reveal-delay="2">
            {t("intro")}
          </p>
        </div>

        <div className={styles.stack}>
          {ITEMS.map((it, i) => (
            <article key={it.key} className={styles.card} style={{ ["--i" as string]: i }}>
              <div className={styles.media}>
                <Image src={it.img} alt={t(`items.${it.key}.t`)} fill sizes="(max-width: 1023px) 100vw, 60vw" quality={72} />
              </div>
              <div className={styles.body}>
                <span className={styles.num}>0{i + 1}</span>
                <h3>{t(`items.${it.key}.t`)}</h3>
                <p>{t(`items.${it.key}.d`)}</p>
                <span className="badge badge-soon">{t("soon")}</span>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.foot} data-reveal>
          <a className="btn btn-dark" href="#indir">
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
