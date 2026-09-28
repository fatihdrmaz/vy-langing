"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

// Lenis drives the scroll; GSAP ScrollTrigger reads from it. Disabled for reduced-motion users.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.95,
      smoothWheel: true,
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Anchor links go through Lenis so pinned sections offset correctly
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!a) return;
      let url: URL;
      try {
        url = new URL(a.href, location.href);
      } catch {
        return;
      }
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const id = decodeURIComponent(url.hash.slice(1));
      const el = id && document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -72, duration: 1.4 });
      history.replaceState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);

    // Arrived from another page with a hash (e.g. /privacy → /#sss): let pinned sections lay out, then go there
    if (location.hash) {
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (el) setTimeout(() => lenis.scrollTo(el, { offset: -72, duration: 1.2 }), 400);
    }

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
