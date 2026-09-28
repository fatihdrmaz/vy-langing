import { NextResponse } from "next/server";
import { z } from "zod";
import { Redis } from "@upstash/redis";

export const runtime = "nodejs";

const Body = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  consent: z.literal(true),
  locale: z.enum(["tr", "en"]).default("en"),
  hp: z.string().max(0).optional(), // honeypot must be empty
});

// Vercel KV / Upstash Redis via env (KV_REST_API_URL + KV_REST_API_TOKEN or UPSTASH_REDIS_REST_*).
// Without env vars (local dev) the request is accepted and logged so the UI can be exercised.
function redis(): Redis | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const parsed = Body.safeParse(json);
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });
  const { email, locale } = parsed.data;

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const db = redis();
  if (!db) {
    console.info("[waitlist:dev]", { email, locale, ip });
    return NextResponse.json({ ok: true });
  }

  // Simple per-IP rate limit: 5 submissions / 10 min
  const rlKey = `waitlist:rl:${ip}`;
  const hits = await db.incr(rlKey);
  if (hits === 1) await db.expire(rlKey, 600);
  if (hits > 5) return NextResponse.json({ ok: false }, { status: 429 });

  const added = await db.sadd("waitlist:emails", email);
  if (added) {
    await db.hset(`waitlist:entry:${email}`, {
      email,
      locale,
      consent: "1",
      consentAt: new Date().toISOString(),
      ua: req.headers.get("user-agent") ?? "",
      ref: req.headers.get("referer") ?? "",
    });
  }
  return NextResponse.json({ ok: true });
}
