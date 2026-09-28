"use client";

import styles from "./StoreBadges.module.css";

const APPSTORE = process.env.NEXT_PUBLIC_APPSTORE_URL;
const PLAY = process.env.NEXT_PUBLIC_PLAY_URL;

function focusWaitlist() {
  const input = document.getElementById("wl-email") as HTMLInputElement | null;
  if (!input) return;
  input.scrollIntoView({ behavior: "smooth", block: "center" });
  input.focus({ preventScroll: true });
  const form = input.closest("form");
  form?.classList.remove("flash");
  void form?.offsetWidth;
  form?.classList.add("flash");
}

// Real store links when NEXT_PUBLIC_APPSTORE_URL / NEXT_PUBLIC_PLAY_URL are set; otherwise they route to the waitlist.
export function StoreBadges({ soon, hint }: { soon: string; hint: string }) {
  const items = [
    { key: "appstore", url: APPSTORE, label: "App Store", icon: <AppleIcon />, track: "appstore_click" },
    { key: "play", url: PLAY, label: "Google Play", icon: <PlayIcon />, track: "googleplay_click" },
  ];
  return (
    <>
      {items.map((it) =>
        it.url ? (
          <a key={it.key} className={styles.store} href={it.url} rel="noopener" data-track={it.track}>
            {it.icon}
            <span>
              <small>{it.key === "appstore" ? "Download on the" : "Get it on"}</small>
              <b>{it.label}</b>
            </span>
          </a>
        ) : (
          <button key={it.key} type="button" className={styles.store} onClick={focusWaitlist} title={hint} data-track={it.track}>
            {it.icon}
            <span>
              <small>{soon}</small>
              <b>{it.label}</b>
            </span>
          </button>
        ),
      )}
    </>
  );
}

function AppleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3.1 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.7-1-2.7-3.8zM14 5.4c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.6 2.8-1.4z" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.6 2.3 13 12l-9.4 9.7c-.4-.2-.6-.7-.6-1.2V3.5c0-.5.2-1 .6-1.2zM14.4 13.4l2.8 2.8-11.6 6.6 8.8-9.4zM20.7 10.8c.9.5.9 1.9 0 2.4l-2.4 1.4-3.1-3.1 3.1-3.1 2.4 1.4zM5.6 1.2l11.6 6.6-2.8 2.8-8.8-9.4z" />
    </svg>
  );
}
