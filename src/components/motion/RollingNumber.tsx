"use client";

import styles from "./RollingNumber.module.css";

// Odometer-style number: each digit is a column of 0–9 that slides to the current value.
// Width is reserved for `digits` columns so the layout never shifts; leading blanks collapse.
export function RollingNumber({ value, digits = 3, className }: { value: number; digits?: number; className?: string }) {
  const str = String(Math.max(0, Math.round(value))).padStart(digits, " ");
  return (
    <span className={`${styles.wrap} ${className ?? ""}`} aria-label={String(Math.round(value))} role="img">
      {str.split("").map((ch, i) => {
        const d = ch === " " ? -1 : Number(ch);
        return (
          <span key={i} className={`${styles.col} ${d < 0 ? styles.blank : ""}`} aria-hidden="true">
            <span className={styles.reel} style={{ transform: `translateY(${d < 0 ? 0 : -d * 10}%)`, transitionDelay: `${(digits - 1 - i) * 60}ms` }}>
              {Array.from({ length: 10 }, (_, n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
