// Dev tool: scroll through /tr on an emulated iPhone and dump viewport screenshots. Usage: node scripts/mobile-shots.mjs <outDir> [url]
import { chromium, devices } from "playwright";
const out = process.argv[2] ?? "./.shots";
const url = process.argv[3] ?? "http://localhost:3000/tr";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await browser.newContext({ ...devices["iPhone 13"], locale: "tr-TR" });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
const H = () => page.evaluate(() => document.documentElement.scrollHeight);
const sw = await page.evaluate(() => [document.documentElement.scrollWidth, innerWidth, innerHeight]);
console.log("scrollWidth/innerWidth/innerHeight", sw, "docH", await H());
let i = 0;
// Scroll in small steps (scrub animations need intermediate positions); shoot every ~700px
for (let y = 0; y < (await H()); y += 140) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(90);
  if (y % 700 === 0) { await page.waitForTimeout(500); await page.screenshot({ path: `${out}/m-${String(i++).padStart(2, "0")}.png` }); }
}
console.log("shots", i);
await browser.close();
