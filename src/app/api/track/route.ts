import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb, isAdminConfigured } from "@/lib/firebase-admin";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

// First-party click counter. The public site's track() fires here (fire-and-
// forget) so an admin dashboard can read real per-button/per-link totals with a
// desktop vs mobile split — data GA4 alone can't surface in-app.
//
// One doc per event key: clicks/{eventKey} = { event, label, surface, count,
// mobile, desktop, lastAt }. A single doc per key can hit Firestore's ~1
// write/sec sustained limit on very hot buttons; shard later if needed.

function clamp(v: unknown, max: number): string {
  return typeof v === "string" ? v.slice(0, max) : "";
}

// Firestore doc IDs can't contain "/". Build a stable, safe key from event+surface.
function makeKey(event: string, surface: string): string {
  return `${event}__${surface || "default"}`
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "_")
    .slice(0, 120);
}

export async function POST(req: NextRequest) {
  // Best-effort abuse guard; counters are non-critical so we fail open on limit.
  const limit = rateLimit(`track:${clientIp(req)}`, 240, 60_000);
  if (!limit.ok) return NextResponse.json({ ok: false, skipped: "rate_limited" });

  // No credential in this environment → silently no-op so the client never errors.
  if (!isAdminConfigured()) return NextResponse.json({ ok: false, skipped: "unconfigured" });

  const body = await req.json().catch(() => ({}));
  const event = clamp(body.event, 60).trim();
  if (!event) return NextResponse.json({ ok: false, skipped: "no_event" });

  // `surface` (or `label` / `source`) distinguishes the same event across UI
  // surfaces (e.g. add_to_cart:sticky_bar vs add_to_cart:pdp_panel).
  const surface = clamp(body.surface ?? body.source ?? body.label, 80).trim();
  const device =
    body.device === "mobile" || body.device === "desktop" ? body.device : "unknown";

  const key = makeKey(event, surface);

  try {
    await getAdminDb()
      .collection("clicks")
      .doc(key)
      .set(
        {
          event,
          surface: surface || null,
          label: surface ? `${event} · ${surface}` : event,
          count: FieldValue.increment(1),
          mobile: FieldValue.increment(device === "mobile" ? 1 : 0),
          desktop: FieldValue.increment(device === "desktop" ? 1 : 0),
          lastAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    return NextResponse.json({ ok: true });
  } catch {
    // Never surface counter failures to the visitor.
    return NextResponse.json({ ok: false, skipped: "write_error" });
  }
}
