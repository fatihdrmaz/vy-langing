"use client";

import { useEffect } from "react";

// Adds .is-in to every [data-reveal] once it enters the viewport. One IntersectionObserver for the page;
// a MutationObserver picks up elements added later (client navigation, HMR, lazy content).
export function RevealObserver() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    const observe = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    };
    observe(document);
    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n.hasAttribute("data-reveal")) io.observe(n);
            observe(n);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
  return null;
}
