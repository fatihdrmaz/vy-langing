"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

const APPSTORE = process.env.NEXT_PUBLIC_APPSTORE_URL;
const PLAY = process.env.NEXT_PUBLIC_PLAY_URL;

// Fires the qr_landing event and, when store URLs exist, forwards the device to its store.
export function DlRedirect() {
  useEffect(() => {
    const src = new URLSearchParams(location.search).get("src") || "direct";
    track("qr_landing", { src });
    const ua = navigator.userAgent;
    const target = /iPhone|iPad|iPod/i.test(ua) ? APPSTORE : /Android/i.test(ua) ? PLAY : undefined;
    if (target) {
      track(/iPhone|iPad|iPod/i.test(ua) ? "appstore_click" : "googleplay_click", { src: "dl" });
      location.replace(target);
    }
  }, []);
  return null;
}
