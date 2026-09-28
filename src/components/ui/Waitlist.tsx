"use client";

import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./Waitlist.module.css";

type Status = "idle" | "ok" | "invalid" | "consent" | "error";

export function Waitlist() {
  const t = useTranslations("download");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [pending, start] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const consent = fd.get("consent") === "on";
    const hp = String(fd.get("website") ?? ""); // honeypot
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return setStatus("invalid");
    if (!consent) return setStatus("consent");
    const form = e.currentTarget;
    start(async () => {
      try {
        const r = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email, consent, locale, hp }),
        });
        if (!r.ok) throw new Error(String(r.status));
        setStatus("ok");
        form.reset();
      } catch {
        setStatus("error");
      }
    });
  };

  if (status === "ok") {
    return (
      <p className={styles.success} role="status">
        ✓ {t("success")}
      </p>
    );
  }

  const err = status === "invalid" ? t("errorInvalid") : status === "consent" ? t("errorConsent") : status === "error" ? t("errorGeneric") : null;

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate data-reveal data-reveal-delay="3">
      <div className={styles.head}>
        <b>{t("waitTitle")}</b>
        <span>{t("waitText")}</span>
      </div>
      <div className={styles.row}>
        <label className="sr-only" htmlFor="wl-email">
          {t("email")}
        </label>
        <input id="wl-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder={t("email")} className={styles.input} required aria-invalid={status === "invalid"} />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className={styles.hp} aria-hidden="true" />
        <button className="btn btn-light" type="submit" disabled={pending}>
          {pending ? "…" : t("submit")}
        </button>
      </div>
      <label className={styles.consent}>
        <input type="checkbox" name="consent" />
        <span>
          {t.rich("consent", {
            privacy: (chunks) => (
              <Link href="/privacy" className={styles.link}>
                {chunks}
              </Link>
            ),
          })}
        </span>
      </label>
      {err && (
        <p className={styles.err} role="alert">
          {err}
        </p>
      )}
    </form>
  );
}
