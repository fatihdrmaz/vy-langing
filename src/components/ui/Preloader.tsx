import { Mark } from "./Logo";
import styles from "./Preloader.module.css";

// CSS-only curtain: the brand chevron blinks in, the curtain lifts after ~0.7s. No JS, no layout impact,
// disabled for reduced-motion. Solid colour surfaces are not LCP candidates, so it doesn't hurt the metric.
export function Preloader() {
  return (
    <div className={styles.curtain} aria-hidden="true">
      <div className={styles.mark}>
        <Mark size={44} />
      </div>
    </div>
  );
}
