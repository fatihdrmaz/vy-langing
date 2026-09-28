"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "power3.out" });
}

export { gsap, ScrollTrigger, useGSAP };

// Reduced motion, or a viewport too short for pinned scenes (phone in landscape): sections fall back to static flow.
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(max-height: 520px)").matches);

export const isDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;
