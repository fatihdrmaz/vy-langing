"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  text: string;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: boolean; // animate on scroll into view (default) or immediately
  accentFrom?: number; // word index from which to apply .accent
};

// Word-level split: full sentence stays in DOM (aria-label) so crawlers/screen readers read it whole.
export function SplitText({ text, as = "span", className, delay = 0, stagger = 0.06, trigger = true, accentFrom }: Props) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      if (!ref.current) return;
      const targets = ref.current.querySelectorAll<HTMLElement>(".split-word > span");
      if (prefersReducedMotion()) return;
      gsap.from(targets, {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger,
        delay,
        scrollTrigger: trigger ? { trigger: ref.current, start: "top 88%", once: true } : undefined,
      });
    },
    { scope: ref },
  );

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} className="split-word" aria-hidden="true">
          <span className={accentFrom !== undefined && i >= accentFrom ? "accent" : undefined}>{w}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
