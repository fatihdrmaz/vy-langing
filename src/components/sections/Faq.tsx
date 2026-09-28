"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Icon, type IconName } from "@/components/phone/Icons";
import styles from "./Faq.module.css";
import { track } from "@/lib/analytics";

type Cat = "general" | "pay" | "privacy" | "support";
const ITEMS: { i: number; cat: Cat; icon: IconName }[] = [
  { i: 0, cat: "general", icon: "plane" },
  { i: 1, cat: "general", icon: "star" },
  { i: 2, cat: "general", icon: "pin" },
  { i: 3, cat: "general", icon: "lounge" },
  { i: 4, cat: "pay", icon: "qr" },
  { i: 5, cat: "pay", icon: "gift" },
  { i: 6, cat: "general", icon: "shield" },
  { i: 7, cat: "privacy", icon: "pin" },
  { i: 8, cat: "privacy", icon: "lock" },
  { i: 9, cat: "support", icon: "chat" },
  { i: 10, cat: "general", icon: "plane" },
  { i: 11, cat: "pay", icon: "shield" },
  { i: 12, cat: "general", icon: "qr" },
];
const CATS: ("all" | Cat)[] = ["all", "general", "pay", "privacy", "support"];

// FAQ: category pills, animated accordion (grid-rows), a small glyph per answer, and a follow-up card.
// All answers stay in the DOM (hidden via the filter) so FAQPage JSON-LD and crawlers see everything.
export function Faq() {
  const t = useTranslations("faq");
  const [cat, setCat] = useState<"all" | Cat>("all");
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="sss" className={`${styles.sec} light`} aria-labelledby="faq-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.head}>
          <span className="eyebrow" data-reveal>
            {t("eyebrow")}
          </span>
          <h2 id="faq-title" className="h2" data-reveal data-reveal-delay="1">
            {t("h2")}
          </h2>
          <div className={styles.cats} role="tablist" aria-label={t("eyebrow")} data-reveal data-reveal-delay="2">
            {CATS.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} className={`${styles.cat} ${cat === c ? styles.catOn : ""}`} onClick={() => setCat(c)}>
                {t(`cats.${c}`)}
              </button>
            ))}
          </div>
          <div className={styles.more} data-reveal data-reveal-delay="3">
            <span className={styles.moreIc}>{Icon.chat({ size: 18 })}</span>
            <div>
              <b>{t("more.t")}</b>
              <p>{t("more.d")}</p>
              <a href={`mailto:${t("more.cta")}`}>{t("more.cta")}</a>
              <small>{t("more.meta")}</small>
            </div>
          </div>
        </div>

        <ul className={styles.list}>
          {ITEMS.map(({ i, cat: c, icon }) => {
            const hidden = cat !== "all" && cat !== c;
            const isOpen = open === i;
            return (
              <li key={i} className={`${styles.item} ${hidden ? styles.hidden : ""} ${isOpen ? styles.open : ""}`}>
                <h3>
                  <button className={styles.q} aria-expanded={isOpen} aria-controls={`faq-a-${i}`} id={`faq-q-${i}`} onClick={() => { setOpen(isOpen ? null : i); if (!isOpen) track("faq_expand", { q: i }); }}>
                    <span className={styles.qIc}>{Icon[icon]({ size: 16 })}</span>
                    <span className={styles.qText}>{t(`items.${i}.q`)}</span>
                    <i className={styles.plus} aria-hidden="true" />
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className={styles.a}>
                  <div className={styles.aInner}>
                    <p>{t(`items.${i}.a`)}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
