"use client";

import { useEffect } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

// Site-wide pointer polish (fine pointers only):
//  - .btn: a radial highlight follows the cursor (CSS vars --mx/--my)
//  - [data-magnetic]: the element leans a few px toward the cursor and springs back
export function Interactions() {
  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;

    const magnets = new WeakMap<HTMLElement, { x: (v: number) => void; y: (v: number) => void }>();
    const getMagnet = (el: HTMLElement) => {
      let m = magnets.get(el);
      if (!m) {
        m = { x: gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" }), y: gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" }) };
        magnets.set(el, m);
      }
      return m;
    };

    const onMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const btn = target.closest<HTMLElement>(".btn");
      if (btn) {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        btn.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      }
      const mag = target.closest<HTMLElement>("[data-magnetic]");
      if (mag) {
        const r = mag.getBoundingClientRect();
        const strength = Number(mag.dataset.magnetic) || 6;
        const m = getMagnet(mag);
        m.x(((e.clientX - (r.left + r.width / 2)) / r.width) * strength * 2);
        m.y(((e.clientY - (r.top + r.height / 2)) / r.height) * strength * 2);
      }
    };
    const onOut = (e: PointerEvent) => {
      const mag = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-magnetic]");
      if (mag && !mag.contains(e.relatedTarget as Node | null)) {
        const m = getMagnet(mag);
        m.x(0);
        m.y(0);
      }
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);
  return null;
}
