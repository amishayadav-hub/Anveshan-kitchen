import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb, isAdminConfigured } from "@/lib/firebase-admin";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

// First-party campaign attribution. The site posts a "visit" when a visitor
// lands via a utm_* link, and a "conversion" when they proceed to checkout.
// One durable doc per campaign: campaigns/{source|medium|campaign} with
// { source, medium, campaign, visits, conversions, lastAt }. Admin-SDK writes
// only — the admin dashboard reads these to show campaign performance.

const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

function keyFor(source: string, medium: string, campaign: string): string {
  return `${source}|${medium}|${campaign}`
    .toLowerCase()
    .replace(/[^a-z0-9|_-]+/g, "_")
    .slice(0, 150);
}

export async function POST(req: NextRequest) {
  const limit = rateLimit(`campaign:${clientIp(req)}`, 60, 60_000);
  if (!limit.ok) return NextResponse.json({ ok: false, skipped: "rate_limited" });
  if (!isAdminConfigured()) return NextResponse.json({ ok: false, skipped: "unconfigured" });

  const b = await req.json().catch(() => ({}));
  const source = str(b.source, 60).trim();
  if (!source) return NextResponse.json({ ok: false, skipped: "no_source" });

  const medium = str(b.medium, 60).trim() || "(none)";
  const campaign = str(b.campaign, 80).trim() || "(none)";
  const isConversion = b.type === "conversion";
  const key = keyFor(source, medium, campaign);

  try {
    await getAdminDb()
      .collection("campaigns")
      .doc(key)
      .set(
        {
          source,
          medium,
          campaign,
          visits: FieldValue.increment(isConversion ? 0 : 1),
          conversions: FieldValue.increment(isConversion ? 1 : 0),
          lastAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, skipped: "write_error" });
  }
}
