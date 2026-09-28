import styles from "./Phone.module.css";

// iPhone-ish frame; children = screen. Kept CSS-only so it renders in SSR and animates cheaply.
export function Phone({ children, className, glow = true }: { children: React.ReactNode; className?: string; glow?: boolean }) {
  return (
    <div className={`${styles.phone} ${className ?? ""}`} aria-hidden="true">
      {glow && <div className={styles.glow} />}
      <div className={styles.body}>
        <div className={styles.island} />
        <div className={styles.screen}>{children}</div>
        <div className={styles.home} />
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
