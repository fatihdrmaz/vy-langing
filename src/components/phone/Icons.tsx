// Small stroke icon set (currentColor). Kept inline: no icon lib dependency.
const base = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const Icon = {
  food: (p?: { size?: number }) => (
    <svg {...base} width={p?.size ?? 20} height={p?.size ?? 20}><path d="M4 3v7a3 3 0 0 0 6 0V3M7 3v18M18 3c-2 0-3 3-3 6v3h3v9" /></svg>
  ),
  lounge: (p?: { size?: number }) => (
    <svg {...base} width={p?.size ?? 20} height={p?.size ?? 20}><path d="M4 11V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4M3 11h18v6H3zM6 17v2M18 17v2" /></svg>
  ),
  fast: (p?: { size?: number }) => (
    <svg {...base} width={p?.size ?? 20} height={p?.size ?? 20}><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>
  ),
  buggy: (p?: { size?: number }) => (
    <svg {...base} width={p?.size ?? 20} height={p?.size ?? 20}><path d="M3 13l2-5h9l3 5M3 13h16v4H3zM6 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM16 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM19 13h2v4h-2" /></svg>
  ),
  pay: (p?: { size?: number }) => (
    <svg {...base} width={p?.size ?? 20} height={p?.size ?? 20}><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 10h18M7 15h4" /></svg>
  ),
  gift: (p?: { size?: number }) => (
    <svg {...base} width={p?.size ?? 20} height={p?.size ?? 20}><path d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7c-2-3-6-3-6-1s3 1 6 1zm0 0c2-3 6-3 6-1s-3 1-6 1z" /></svg>
  ),
  pin: (p?: { size?: number }) => (
    <svg {...base} width={p?.size ?? 20} height={p?.size ?? 20}><path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>
  ),
  qr: (p?: { size?: number }) => (
    <svg {...base} width={p?.size ?? 20} height={p?.size ?? 20}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3h-3zM20 14v3M17 20h3M14 20h1" /></svg>
  ),
  shield: (p?: { size?: number }) => (
    <svg {...base} width={p?.size ?? 20} height={p?.size ?? 20}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="m9 12 2 2 4-4" /></svg>
  ),
  eye: (p?: { size?: number }) => (
    <svg {...base} width={p?.size ?? 20} height={p?.size ?? 20}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
  ),
  chat: (p?: { size?: number }) => (
    <svg {...base} width={p?.size ?? 20} height={p?.size ?? 20}><path d="M21 12a8 8 0 0 1-11.6 7.2L4 21l1.8-5.4A8 8 0 1 1 21 12z" /></svg>
  ),
  lock: (p?: { size?: number }) => (
    <svg {...base} width={p?.size ?? 20} height={p?.size ?? 20}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
  ),
  plane: (p?: { size?: number }) => (
    <svg {...base} width={p?.size ?? 20} height={p?.size ?? 20}><path d="M2 16l20-8-6 14-3-6zM13 16l-4-4" /></svg>
  ),
  arrow: (p?: { size?: number }) => (
    <svg {...base} width={p?.size ?? 20} height={p?.size ?? 20}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  ),
  check: (p?: { size?: number }) => (
    <svg {...base} width={p?.size ?? 20} height={p?.size ?? 20} strokeWidth={2.4}><path d="m5 12 5 5L20 7" /></svg>
  ),
  star: (p?: { size?: number }) => (
    <svg {...base} width={p?.size ?? 20} height={p?.size ?? 20}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" /></svg>
  ),
};

export type IconName = keyof typeof Icon;
