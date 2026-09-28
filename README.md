# voyola.com — landing

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 (tokens only) · GSAP ScrollTrigger + Lenis · next-intl (EN default `/`, TR `/tr`).

```bash
npm i
cp .env.example .env.local   # optional: KV creds for the waitlist
npm run dev                  # http://localhost:3000
```

## Structure

- `src/app/[locale]/` — page, layout (fonts, metadata, JSON-LD), `/privacy`, `/terms`
- `src/components/sections/` — one file + CSS module per homepage block (Hero → Faq), in the order of the Website Content & UX Brief
- `src/components/motion/` — `SmoothScroll` (Lenis↔GSAP), `SpriteWalker` (12-frame canvas walk cycle), `SplitText`, `Reveal`
- `src/components/phone/` — CSS-only phone frame + app-screen primitives mirroring the Design System
- `messages/{tr,en}.json` — all copy (source: `Voyola_Website_Content_UX_Brief_TR_EN.pdf`)
- `src/app/tokens.colors.css` — copied from the Design System `tokens/colors.css`; site aliases live in `globals.css`
- `public/traveler/` — walker sprite sheet (`sheet.webp`, 12 × 288×448) + `airport-bg.webp`
- `src/app/api/waitlist` — Upstash/Vercel KV backed waitlist (logs to console without env)

## SEO / AI discoverability

`robots.ts` (AI crawlers allowed), `sitemap.ts` (hreflang), `public/llms.txt`, JSON-LD (`Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`), OG image, canonical + alternates per locale.

## Content rules

No partner/vendor names (TUM, EPP, Simpra…), no revenue or commission figures, no go-live date, no "wallet / e-money / balance" wording until the PSP/licence setup is final. Lounge / Fast Track / Buggy are marked "coming soon".
