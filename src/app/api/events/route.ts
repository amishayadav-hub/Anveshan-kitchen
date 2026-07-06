import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb, isAdminConfigured } from "@/lib/firebase-admin";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

// Per-user recipe-generator funnel events. The generator logs a `generate`
// event (the keyword/ingredients searched) and, when a visitor engages a
// specific generated variation, a `variation_click` event linked back to it.
// Server-authoritative writes to `generatorEvents` via the Admin SDK; the admin
// dashboard reconstructs per-user journeys and aggregates from this stream.

const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");
const num = (v: unknown) => (typeof v === "number" && isFinite(v) ? v : 0);
const strArr = (v: unknown, max: number) =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string").slice(0, max) : [];

export async function POST(req: NextRequest) {
  const limit = rateLimit(`events:${clientIp(req)}`, 120, 60_000);
  if (!limit.ok) return NextResponse.json({ ok: false, skipped: "rate_limited" });
  if (!isAdminConfigured()) return NextResponse.json({ ok: false, skipped: "unconfigured" });

  const b = await req.json().catch(() => ({}));
  const type =
    b.type === "generate" ? "generate" : b.type === "variation_click" ? "variation_click" : null;
  if (!type) return NextResponse.json({ ok: false, skipped: "bad_type" });

  const base: Record<string, unknown> = {
    type,
    uid: str(b.uid, 128) || "anon",
    sessionId: str(b.sessionId, 64) || null,
    ts: FieldValue.serverTimestamp(),
  };

  if (type === "generate") {
    base.query = str(b.query, 200);
    base.ingredients = strArr(b.ingredients, 20);
    base.language = b.language === "hi" ? "hi" : "en";
    // Names of the variations the AI returned, so the dashboard can show what
    // was offered vs what got clicked.
    base.variationsReturned = strArr(b.variationsReturned, 12);
  } else {
    base.generateEventId = str(b.generateEventId, 128) || null;
    base.variationIndex = num(b.variationIndex);
    base.variationName = str(b.variationName, 160);
    base.products = strArr(b.products, 20);
    base.subtotal = num(b.subtotal);
    base.action = b.action === "expand" ? "expand" : "add_to_cart";
  }

  try {
    const ref = await getAdminDb().collection("generatorEvents").add(base);
    return NextResponse.json({ ok: true, id: ref.id });
  } catch {
    return NextResponse.json({ ok: false, skipped: "write_error" });
  }
}
