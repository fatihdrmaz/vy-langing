"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion, isDesktop } from "@/lib/gsap";
import styles from "./Tiers.module.css";
import { Logo } from "@/components/ui/Logo";

const TIERS = ["silver", "gold", "platinum", "diamond"] as const;

// Membership levels: four metallic cards fan out from a stacked deck as you scroll; pointer tilt + sheen on hover.
export function Tiers() {
  const t = useTranslations("tiers");
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);
      if (prefersReducedMotion()) return;

      if (!isDesktop()) {
        // Phone: cards slide up one after another and stack on the previous one
        const H = () => window.innerHeight * 0.75;
        cards.forEach((c, k) => gsap.set(c, { y: k === 0 ? 0 : H(), zIndex: k + 1 }));
        const mtl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top top", end: "+=" + cards.length * 60 + "%", pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true },
        });
        for (let k = 1; k < cards.length; k++) {
          mtl.to(cards[k], { y: k * 14, duration: 1, ease: "power2.out" }, (k - 1) * 1.05);
          for (let j = 0; j < k; j++) mtl.to(cards[j], { scale: 1 - (k - j) * 0.045, y: j * 14 - (k - j) * 4, duration: 1, ease: "power2.out" }, (k - 1) * 1.05);
        }
        mtl.from(el.querySelector(`.${styles.foot}`), { opacity: 0, duration: 0.4 }, (cards.length - 2) * 1.05 + 0.6);
        return;
      }

      const spread = () => Math.min(330, (Math.min(el.clientWidth, 1280) - 300) / 3);

      // Stacked start state
      cards.forEach((c, k) => {
        const off = k - 1.5;
        gsap.set(c, { x: 0, y: Math.abs(off) * 10, rotate: off * 6, zIndex: k + 1 });
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: "+=120%", pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true },
      });
      cards.forEach((c, k) => {
        const off = k - 1.5;
        tl.to(c, { x: () => off * spread(), y: k === 3 ? -16 : 0, rotate: 0, ease: "power3.out", duration: 1 }, 0);
      });
      tl.from(el.querySelector(`.${styles.foot}`), { opacity: 0, y: 20, duration: 0.3 }, 0.6);

      // Pointer tilt
      if (!window.matchMedia("(pointer: fine)").matches) return;
      cards.forEach((c) => {
        const inner = c.firstElementChild as HTMLElement;
        const rx = gsap.quickTo(inner, "--rx", { duration: 0.4, ease: "power3" });
        const ry = gsap.quickTo(inner, "--ry", { duration: 0.4, ease: "power3" });
        const sx = gsap.quickTo(inner, "--sx", { duration: 0.4, ease: "power3" });
        c.addEventListener("pointermove", (e) => {
          const r = c.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
          rx((0.5 - py) * 14); ry((px - 0.5) * 16); sx(120 - px * 140);
        });
        c.addEventListener("pointerleave", () => { rx(0); ry(0); sx(120); });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.sec} aria-labelledby="tiers-title">
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.head}>
          <div>
            <span className="eyebrow" data-reveal>
              {t("eyebrow")}
            </span>
            <h2 id="tiers-title" className="h2" data-reveal data-reveal-delay="1">
              {t("h2")}
            </h2>
          </div>
          <div className={styles.headRight}>
            <p className="lede muted" data-reveal data-reveal-delay="2">
              {t("text")}
            </p>
            <a className="btn btn-primary" href="#indir" data-reveal data-reveal-delay="3">
              {t("cta")}
            </a>
          </div>
        </div>

        <div className={styles.deck}>
          {TIERS.map((key, i) => (
            <div key={key} className={`${styles.card} ${styles[key]}`}>
              <div className={styles.cardIn}>
                <div className={styles.row}>
                  <Logo height={22} ink="currentColor" />
                  <span>
                    {t("level")} {i + 1}
                  </span>
                </div>
                <div>
                  <span className={styles.chip} />
                  <h3>{t(`items.${i}.n`)}</h3>
                  <p>{t(`items.${i}.d`)}</p>
                </div>
                <svg className={styles.nfc} width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M8.5 16.5a6 6 0 0 0 0-9M12 19a10 10 0 0 0 0-14M5 14a2.5 2.5 0 0 0 0-4" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <p className={styles.foot}>{t("note")}</p>
      </div>
    </section>
  );
}
