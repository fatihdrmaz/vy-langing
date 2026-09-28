"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { WEB_APP_URL } from "@/lib/seo";
import styles from "./Nav.module.css";

export function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    return () => document.documentElement.classList.remove("lenis-stopped");
  }, [open]);

  const links = [
    ["#kesfet", t("discover")],
    ["#hizmetler", t("services")],
    ["#avantajlar", t("benefits")],
    ["#nasil", t("how")],
    ["#sss", t("faq")],
  ] as const;

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`wrap ${styles.bar}`}>
        <a href="#top" className={styles.logo} aria-label="Voyola">
          <Logo height={34} />
        </a>

        <nav className={styles.links} aria-label="Primary">
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <div className={styles.right}>
          <div className={styles.lang} role="group" aria-label={t("langLabel")}>
            {(["tr", "en"] as const).map((l) => (
              <Link key={l} href={pathname} locale={l} aria-current={locale === l ? "true" : undefined} aria-label={l === "tr" ? "Türkçe" : "English"} className={locale === l ? styles.langOn : undefined}>
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <a className={`btn btn-ghost btn-sm ${styles.hideSm}`} href={WEB_APP_URL} rel="noopener">
            {t("web")}
          </a>
          <a className="btn btn-primary btn-sm" href="#indir">
            {t("download")}
          </a>
          <button className={styles.burger} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? t("close") : t("menu")} onClick={() => setOpen((v) => !v)}>
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`${styles.sheet} ${open ? styles.sheetOpen : ""}`} hidden={!open}>
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a className="btn btn-primary" href="#indir" onClick={() => setOpen(false)}>
          {t("download")}
        </a>
        <a className="btn btn-ghost" href={WEB_APP_URL} rel="noopener">
          {t("web")}
        </a>
        <div className={styles.sheetLang}>
          {(["tr", "en"] as const).map((l) => (
            <Link key={l} href={pathname} locale={l} aria-current={locale === l ? "true" : undefined}>
              {l.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
