// Official wordmark (agency v2): lowercase geometric "voyola", the "y" chevron carries the brand colours.
// Redrawn from the Design System SVG; `ink` = letter colour (white on dark, #210a60 on light).
export function Logo({ height = 26, ink = "currentColor", className }: { height?: number; ink?: string; className?: string }) {
  const width = (height * 720) / 300;
  return (
    <svg width={width} height={height} viewBox="0 0 720 300" className={className} aria-hidden="true" focusable="false">
      <g fill={ink}>
        <path d="M20 100 L52 100 L74 152 L96 100 L128 100 L88 200 L60 200 Z" />
        <path fillRule="evenodd" d="M140 150a52 52 0 1 0 104 0a52 52 0 1 0 -104 0ZM168 150a24 24 0 1 1 48 0a24 24 0 1 1 -48 0Z" />
        <path fillRule="evenodd" d="M366 150a52 52 0 1 0 104 0a52 52 0 1 0 -104 0ZM394 150a24 24 0 1 1 48 0a24 24 0 1 1 -48 0Z" />
        <path d="M482 10 L510 10 L510 150 Q510 172 532 172 L544 172 L544 200 L524 200 Q482 200 482 158 Z" />
        <path fillRule="evenodd" d="M556 150a52 52 0 1 0 104 0a52 52 0 1 0 -104 0ZM584 150a24 24 0 1 1 48 0a24 24 0 1 1 -48 0Z" />
        <path d="M652 100 L680 100 L680 200 L652 200 Z" />
        <path d="M680 176 L697 176 L697 200 L680 200 Z" />
      </g>
      <path fill="#ef2ef2" d="M256 100 L288 100 L330 170 L308 170 Z" />
      <path fill="#ef2ef2" d="M322 100 L352 100 L331 200 L301 200 Z" />
      <path fill="#ab04f2" d="M301 200 L331 200 L312 290 L282 290 Z" />
    </svg>
  );
}

export function Mark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 200" aria-hidden="true">
      <path fill="#ef2ef2" d="M0 0 L36 0 L84 78 L60 78 Z" />
      <path fill="#ef2ef2" d="M72 0 L106 0 L84 110 L50 110 Z" />
      <path fill="#ab04f2" d="M50 110 L84 110 L62 200 L28 200 Z" />
    </svg>
  );
}
