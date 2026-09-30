import { useId } from "react";

// Official ribbon wordmark (agency export, Sep 2026): Archivo 700 "voyola" + a tapering brush ribbon in the
// Aura gradient. Gradient stops are mapped to the site palette (indigo → purple → magenta).
// `ink` = wordmark colour: white on dark, --brand-ink on light. `progress` (0–1) clips the ribbon for loaders.
export const LOGO_VIEWBOX = "4 6 104 46";
export const RIBBON_PATH = "M10 46 C 40 50, 75 47, 102 37 C 78 45, 42 47, 10 43 Z";

export function Logo({ height = 34, ink = "currentColor", className, ribbonId }: { height?: number; ink?: string; className?: string; ribbonId?: string }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `aura-${uid}`;
  const width = (height * 104) / 46;
  return (
    <svg width={width} height={height} viewBox={LOGO_VIEWBOX} className={className} aria-hidden="true" focusable="false" overflow="visible">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2f16a8" />
          <stop offset="0.55" stopColor="#ab04f2" />
          <stop offset="1" stopColor="#ef2ef2" />
        </linearGradient>
      </defs>
      <text x="8" y="34" fontFamily="var(--font-archivo), Archivo, sans-serif" fontWeight={700} fontSize={30} letterSpacing={-0.5} fill={ink}>
        voyola
      </text>
      <path id={ribbonId} d={RIBBON_PATH} fill={`url(#${gradId})`} />
    </svg>
  );
}

// Standalone chevron mark (app icon / favicon) — unchanged brand symbol.
export function Mark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={(size * 210) / 100} viewBox="0 0 100 210" aria-hidden="true">
      <path fill="#ef2ef2" d="M0 0 L55 0 L100 105 L45 105 Z" />
      <path fill="#ab04f2" d="M45 105 L100 105 L55 210 L0 210 Z" />
    </svg>
  );
}
