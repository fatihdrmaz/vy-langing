import { LOGO_VIEWBOX, RIBBON_PATH } from "./Logo";
import styles from "./Preloader.module.css";

// CSS-only curtain built from the official "Logo Loader": the ribbon fills left→right under the wordmark,
// then the curtain lifts. No JS, disabled for reduced-motion, never blocks input (pointer-events: none).
export function Preloader() {
  return (
    <div className={styles.curtain} aria-hidden="true">
      <div className={styles.loader}>
        <svg viewBox={LOGO_VIEWBOX} overflow="visible">
          <defs>
            <linearGradient id="pl-aura" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#2f16a8" />
              <stop offset="0.55" stopColor="#ab04f2" />
              <stop offset="1" stopColor="#ef2ef2" />
            </linearGradient>
            <clipPath id="pl-reveal">
              <rect className={styles.clip} x="9" y="30" width="95" height="22" />
            </clipPath>
          </defs>
          <text className={styles.word} x="8" y="34" fontFamily="var(--font-archivo), Archivo, sans-serif" fontWeight={700} fontSize={30} letterSpacing={-0.5}>
            voyola
          </text>
          <path className={styles.track} d={RIBBON_PATH} />
          <path d={RIBBON_PATH} fill="url(#pl-aura)" clipPath="url(#pl-reveal)" />
        </svg>
      </div>
    </div>
  );
}
