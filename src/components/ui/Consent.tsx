"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Link } from "@/i18n/navigation";
import { getConsent, setConsent, track, type ConsentValue } from "@/lib/analytics";
import styles from "./Consent.module.css";

// Cookie consent (KVKK/GDPR): analytics scripts mount only after "Accept". Also owns the delegated
// click tracker for [data-track] elements and external app links.
export function Consent() {
  const t = useTranslations("consent");
  const locale = useLocale();
  const consent = useSyncExternalStore(
    (cb) => {
      window.addEventListener("vy:consent", cb);
      window.addEventListener("storage", cb);
      return () => {
        window.removeEventListener("vy:consent", cb);
        window.removeEventListener("storage", cb);
      };
    },
    () => getConsent(),
    () => undefined,
  );

  // Delegated event tracking
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("a,button");
      if (!el) return;
      const name = el.dataset.track;
      if (name) {
        track(name as Parameters<typeof track>[0], { locale, label: (el.textContent || "").trim().slice(0, 40) });
        return;
      }
      const href = (el as HTMLAnchorElement).href || "";
      if (/app\.voyola\.com/.test(href)) track("webapp_open", { locale });
      else if (/^mailto:/.test(href)) track("contact_support", { locale, to: href.replace("mailto:", "") });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [locale]);

  const choose = (v: ConsentValue) => setConsent(v);

  return (
    <>
      {consent === "all" && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
      {consent === null && (
        <div className={styles.bar} role="dialog" aria-live="polite" aria-label="Cookies">
          <p>
            {t("text")}{" "}
            <Link href="/cookies" className={styles.link}>
              {t("more")}
            </Link>
          </p>
          <div className={styles.actions}>
            <button className="btn btn-ghost btn-sm" onClick={() => choose("essential")}>
              {t("essential")}
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => choose("all")}>
              {t("accept")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Small button for the cookie policy page to reopen the choice
export function ConsentReset({ label }: { label: string }) {
  return (
    <button
      className="btn btn-dark"
      onClick={() => {
        try {
          localStorage.removeItem("vy-consent");
        } catch {}
        window.dispatchEvent(new CustomEvent("vy:consent", { detail: null }));
      }}
    >
      {label}
    </button>
  );
}
