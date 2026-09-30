"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion, isDesktop } from "@/lib/gsap";
import { Phone, StatusBar } from "@/components/phone/Phone";
import { TabBar } from "@/components/phone/TabBar";
import { Icon, type IconName } from "@/components/phone/Icons";
import s from "@/components/phone/screens.module.css";
import { RollingNumber } from "@/components/motion/RollingNumber";
import styles from "./Moment.module.css";

type StateKey = "relaxed" | "dine" | "hurry" | "rush";
const STATES: { key: StateKey; from: number; icon: IconName; soon: boolean }[] = [
  { key: "relaxed", from: 150, icon: "lounge", soon: true },
  { key: "dine", from: 95, icon: "food", soon: false },
  { key: "hurry", from: 45, icon: "fast", soon: true },
  { key: "rush", from: 20, icon: "buggy", soon: true },
];
const START = 150;

// Section 03: the signature scroll — minutes-to-boarding count down as you scroll; the suggestion follows.
export function Moment() {
  const t = useTranslations("moment");
  const root = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const [minutes, setMinutes] = useState(START);
  const idxRef = useRef(0);

  useGSAP(
    () => {
      const el = root.current!;
      const ring = el.querySelector<SVGCircleElement>(`.${styles.ringFg}`)!;
      const dots = gsap.utils.toArray<HTMLElement>(`.${styles.dot}`);
      if (prefersReducedMotion()) {
        setIdx(1);
        setMinutes(75);
        return;
      }
      const desktop = isDesktop();
      // Four discrete stops instead of a continuous countdown: scroll snaps to a stop, the counter tweens to its value.
      const STOPS = [150, 75, 35, 12];
      const shown = { v: STOPS[0] };
      let stage = 0;
      const setStage = (i: number) => {
        if (i === stage && shown.v === STOPS[i]) return;
        stage = i;
        shown.v = STOPS[i];
        setMinutes(STOPS[i]);
        gsap.to(ring, { strokeDashoffset: 1 - i / 3, duration: 0.6, ease: "power2.out", overwrite: true });
        dots.forEach((d, k) => d.classList.toggle(styles.dotOn, k <= i));
        idxRef.current = i;
        setIdx(i);
      };
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: desktop ? "+=140%" : "+=120%",
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: { snapTo: 1 / 3, duration: { min: 0.15, max: 0.4 }, ease: "power1.inOut", inertia: false },
        onUpdate: (self) => setStage(Math.min(3, Math.floor(self.progress * 4))),
      });
    },
    { scope: root },
  );

  const st = STATES[idx];

  return (
    <section ref={root} className={styles.sec} aria-labelledby="moment-title" data-state={st.key}>
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <span className="eyebrow" data-reveal>
            {t("eyebrow")}
          </span>
          <h2 id="moment-title" className="h2" data-reveal data-reveal-delay="1">
            {t("h2")}
          </h2>
          <p className="lede muted" data-reveal data-reveal-delay="2">
            {t("text")}
          </p>

          <div className={styles.timerRow}>
          <div className={styles.timer} data-reveal data-reveal-delay="3">
            <svg className={styles.ring} viewBox="0 0 120 120" aria-hidden="true">
              <circle className={styles.ringBg} cx="60" cy="60" r="54" pathLength={1} />
              <circle className={styles.ringFg} cx="60" cy="60" r="54" pathLength={1} />
            </svg>
            <div className={styles.timerTxt}>
              <small>{t("timerLabel")}</small>
              <b>
                <RollingNumber value={minutes} digits={3} /> <em>{t("minutes")}</em>
              </b>
            </div>
          </div>

          <ol className={styles.track} aria-hidden="true">
            {STATES.map((x, i) => (
              <li key={x.key} className={`${styles.dot} ${i === 0 ? styles.dotOn : ""} ${i === idx ? styles.dotCur : ""}`}>
                <span>{t(`states.${x.key}.tag`)}</span>
              </li>
            ))}
          </ol>
          </div>
          <p className={styles.hint}>{t("hint")}</p>
        </div>

        <div className={styles.phoneWrap}>
          <Phone className={styles.phone}>
            <StatusBar />
            <div className={s.app}>
              <div className={s.top}>
                <div>
                  <small>IST → LHR · TK 1985</small>
                  <b>
                    {t("gate")} F7 · {t("boarding")} 18:05
                  </b>
                </div>
              </div>
              <div className={styles.mapCard} aria-hidden="true">
                <svg viewBox="0 0 280 120" className={styles.map}>
                  <path d="M10 90 C 60 80, 90 30, 150 40 S 240 70, 270 30" fill="none" stroke="rgba(33,10,96,0.25)" strokeWidth="2" strokeDasharray="4 5" />
                  <circle cx="10" cy="90" r="5" fill="#ab04f2" />
                  <circle cx="270" cy="30" r="6" fill="#ef2ef2" />
                  <circle cx="150" cy="40" r="3" fill="#210a60" />
                </svg>
                <span className={styles.you}>{t("gate")} F7</span>
              </div>

              <div key={st.key} className={`${s.suggest} ${styles.suggest}`}>
                <span className={s.tag}>{t(`states.${st.key}.tag`)}</span>
                <div className={styles.sugHead}>
                  <span className={s.ic}>{Icon[st.icon]()}</span>
                  <b className={styles.sugTitle}>{t(`states.${st.key}.title`)}</b>
                </div>
                <p>{t(`states.${st.key}.desc`)}</p>
                <span className={`${s.cta} ${st.soon ? s.disabled : ""}`}>
                  {t(`states.${st.key}.cta`)}
                  {st.soon ? <span className={styles.soonTag}>{t("soon")}</span> : Icon.arrow({ size: 16 })}
                </span>
              </div>

              <TabBar active="home" />
            </div>
          </Phone>
        </div>
      </div>
    </section>
  );
}
