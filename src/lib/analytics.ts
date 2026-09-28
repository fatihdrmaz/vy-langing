"use client";

import { track as vercelTrack } from "@vercel/analytics";

export type ConsentValue = "all" | "essential";
export const CONSENT_KEY = "vy-consent";

export function getConsent(): ConsentValue | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "all" || v === "essential" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(v: ConsentValue) {
  try {
    localStorage.setItem(CONSENT_KEY, v);
  } catch {}
  window.dispatchEvent(new CustomEvent("vy:consent", { detail: v }));
}

// Event names from the Website Content & UX Brief §17. Only sent when analytics consent was given.
export type EventName =
  | "hero_download"
  | "webapp_open"
  | "service_click"
  | "faq_expand"
  | "appstore_click"
  | "googleplay_click"
  | "language_switch"
  | "contact_support"
  | "waitlist_submit"
  | "qr_landing";

export function track(name: EventName, props?: Record<string, string | number | boolean>) {
  if (getConsent() !== "all") return;
  try {
    vercelTrack(name, props);
  } catch {}
}
