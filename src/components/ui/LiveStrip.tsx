"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Icon } from "@/components/phone/Icons";
import styles from "./LiveStrip.module.css";

// Footer detail: live Istanbul time + a quiet flight-board line. Purely atmospheric.
export function LiveStrip() {
  const locale = useLocale();
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Istanbul" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, [locale]);

  return (
    <div className={styles.strip} aria-hidden="true">
      <span className={styles.dot} />
      <span>İstanbul</span>
      <b className={styles.time}>{time || "--:--"}</b>
      <span className={styles.sep}>·</span>
      <span className={styles.route}>
        IST {Icon.plane({ size: 12 })} LHR
      </span>
      <span className={styles.sep}>·</span>
      <span>Gate F7</span>
      <span className={styles.sep}>·</span>
      <span className={styles.ok}>On time</span>
    </div>
  );
}
