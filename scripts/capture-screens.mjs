// Dev tool: render the real app screens (Design System export, served at :8766) with public-safe copy,
// and save @2x PNG + WebP into public/screens. Usage: node scripts/capture-screens.mjs
import { chromium } from "playwright";
import sharp from "sharp";
const DS = "http://localhost:8766";
const SITE = "http://localhost:3000";
const REPLACE = [
  [/Çağdaş Karademir|Zeynep Özkan/g, "Deniz Kaya"], [/ÇK|ZÖ/g, "DK"], [/Wallet top-up/g, "Top-up"], [/^Wallet$/g, "Points"],
  [/2× Aura/g, "2× puan"], [/\bAura\b/g, "Puan"],
  [/Simit Sarayı/g, "Fırın & Simit"], [/Starbucks/g, "Kahve Durağı"], [/Chanel|CHANEL/g, "Parfüm"], [/N°5[^|]*/g, "Signature"], [/Unifree Duty Free|Unifree/g, "Duty Free"],
  [/One wallet for your whole journey/g, "Your airport, in one app"], [/\bwallet\b/gi, "account"],
];
const sanitize = () => {
  const map = window.__REPLACE.map(([r, to]) => [new RegExp(r.source, r.flags), to]);
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const n of nodes) { let t = n.nodeValue; for (const [re, to] of map) t = t.replace(re, to); if (t !== n.nodeValue) n.nodeValue = t; }
  // third-party merchant logos → neutral tile
  document.querySelectorAll('img[src*="wikimedia"], img[src*="Special:FilePath"]').forEach((img) => { const w = img.parentElement; img.remove(); if (w) { w.style.background = "#EDE7FA"; } });
};
const b = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await ctx.addInitScript((m) => { window.__REPLACE = m; }, REPLACE.map(([re, to]) => [{ source: re.source, flags: re.flags }, to]));
const shots = [
  { name: "dashboard", url: "/templates/mobile-3-dashboard/Dashboard.dc.html", after: async (p) => { await p.evaluate(() => { const s = [...document.querySelectorAll("*")].find((e) => /Voyola Points/.test(e.textContent) && e.scrollWidth > e.clientWidth + 20 && e.children.length >= 2); if (s) s.scrollLeft = s.clientWidth; }); } },
  { name: "pay", url: "/templates/mobile-5-pay/Pay.dc.html" },
  { name: "campaigns", url: "/templates/mobile-7-campaigns/Campaigns.dc.html", after: async (p) => { await p.evaluate((site) => { const pics = ["fnb-restaurant.jpg", "campaign-kv.jpg", "svc-lounge.jpg", "svc-fasttrack.jpg", "svc-meetgreet.jpg"]; document.querySelectorAll('img[src*="unsplash"]').forEach((img, i) => { img.src = `${site}/media/${pics[i % pics.length]}`; }); }, SITE); await p.waitForTimeout(1500); } },
  { name: "webauth", url: "/templates/web-1-auth/WebAuth.dc.html" },
];
for (const s of shots) {
  const p = await ctx.newPage();
  await p.goto(DS + s.url, { waitUntil: "networkidle" }); await p.waitForTimeout(1200);
  await p.evaluate(sanitize); if (s.after) await s.after(p); await p.waitForTimeout(400);
  const png = `public/screens/${s.name}.png`; await p.screenshot({ path: png });
  await sharp(png).webp({ quality: 88 }).toFile(`public/screens/${s.name}.webp`);
  const left = await p.evaluate(() => /Karademir|Özkan|Starbucks|Simit Sarayı|Chanel|Unifree|Aura|wallet/i.test(document.body.innerText));
  console.log(s.name, "leftover sensitive text:", left);
  await p.close();
}
await b.close();
