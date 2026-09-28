"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion, isDesktop } from "@/lib/gsap";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/phone/Icons";
import styles from "./PayEarn.module.css";

// Section 06: Aura points card with pointer tilt + scroll-driven counter; ledger rows reveal.
export function PayEarn() {
  const t = useTranslations("payearn");
  const root = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const card = cardRef.current!;
      const rows = gsap.utils.toArray<HTMLElement>(`.${styles.ledgerRow}`);
      const steps = gsap.utils.toArray<HTMLElement>(`.${styles.step}`);

      if (prefersReducedMotion()) {
        if (numRef.current) numRef.current.textContent = "1.240";
        return;
      }

      const desktop = isDesktop();
      // Pinned scene (all sizes): card flips in, points count up, ledger rows slide in one by one, then the pills
      const counter = { v: 0 };
      const mtl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: desktop ? "+=110%" : "+=120%", pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true },
      });
      mtl.from(card, { rotateY: -40, rotateX: 10, y: 60, opacity: 0, duration: 0.5, ease: "power2.out" }, 0)
        .to(counter, { v: 1240, duration: 0.6, ease: "power1.out", onUpdate: () => { if (numRef.current) numRef.current.textContent = Math.round(counter.v).toLocaleString("tr-TR"); } }, 0.2)
        .from(rows, { x: 40, opacity: 0, stagger: 0.25, duration: 0.4, ease: "power2.out" }, 0.5)
        .from(steps, { y: 16, opacity: 0, stagger: 0.12, duration: 0.3, ease: "power2.out" }, 1.1)
        .to({}, { duration: 0.2 });
      if (!desktop) return;

      // Pointer tilt (desktop, fine pointer)
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const qx = gsap.quickTo(card, "--tx", { duration: 0.5, ease: "power3" });
      const qy = gsap.quickTo(card, "--ty", { duration: 0.5, ease: "power3" });
      const wrap = card.parentElement!;
      const onMove = (e: PointerEvent) => {
        const r = wrap.getBoundingClientRect();
        qx(((e.clientY - r.top) / r.height - 0.5) * -14);
        qy(((e.clientX - r.left) / r.width - 0.5) * 14);
      };
      const onLeave = () => { qx(0); qy(0); };
      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerleave", onLeave);
      return () => { wrap.removeEventListener("pointermove", onMove); wrap.removeEventListener("pointerleave", onLeave); };
    },
    { scope: root },
  );

  return (
    <section ref={root} id="avantajlar" className={styles.sec} aria-labelledby="payearn-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <span className="eyebrow" data-reveal>
            {t("eyebrow")}
          </span>
          <h2 id="payearn-title" className="h2" data-reveal data-reveal-delay="1">
            {t("h2")}
          </h2>
          <p className="lede muted" data-reveal data-reveal-delay="2">
            {t("text")}
          </p>
          <p className={styles.sub} data-reveal data-reveal-delay="3">
            {t("sub")}
          </p>
          <ol className={styles.steps}>
            {[0, 1, 2].map((i) => (
              <li key={i} className={styles.step}>
                <span className={styles.stepIc}>{[Icon.qr, Icon.star, Icon.gift][i]({ size: 20 })}</span>
                <b>{t(`steps.${i}`)}</b>
              </li>
            ))}
          </ol>
          <div data-reveal>
            <a className="btn btn-primary" href="#indir">
              {t("cta")}
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.cardWrap}>
            <div ref={cardRef} className={styles.card}>
              <div className={styles.cardTop}>
                <Logo height={20} ink="#fff" />
                <span className={styles.cardChip} />
              </div>
              <div className={styles.cardMid}>
                <small>{t("cardLabel")}</small>
                <b>
                  <span ref={numRef}>0</span>
                </b>
              </div>
              <div className={styles.cardBot}>
                <span>{t("cardHint")}</span>
              </div>
              <div className={styles.shine} />
            </div>
          </div>

          <ul className={styles.ledger}>
            {[0, 1, 2].map((i) => {
              const a = t(`ledger.${i}.a`);
              const neg = a.startsWith("−") || a.startsWith("-");
              return (
                <li key={i} className={styles.ledgerRow}>
                  <span className={styles.ledgerIc}>{neg ? Icon.lounge({ size: 18 }) : Icon.food({ size: 18 })}</span>
                  <span className={styles.ledgerName}>{t(`ledger.${i}.n`)}</span>
                  <b className={neg ? styles.neg : styles.pos}>{a}</b>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
