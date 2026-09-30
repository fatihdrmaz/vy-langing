import styles from "./Phone.module.css";

// iPhone-ish frame; children = screen. The real screen captures carry their own status bar, Dynamic Island
// and home indicator, so the frame draws only the bezel.
export function Phone({ children, className, glow = true }: { children: React.ReactNode; className?: string; glow?: boolean }) {
  return (
    <div className={`${styles.phone} ${className ?? ""}`} aria-hidden="true">
      {glow && <div className={styles.glow} />}
      <div className={styles.body}>
        <div className={styles.screen}>{children}</div>
      </div>
    </div>
  );
}

export function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`${styles.status} ${dark ? styles.statusDark : ""}`}>
      <b>9:41</b>
      <span className={styles.statusIcons}>
        <i className={styles.sig} />
        <i className={styles.bat} />
      </span>
    </div>
  );
}
