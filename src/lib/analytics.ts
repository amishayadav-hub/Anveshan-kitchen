// Thin, safe wrapper over GA4's gtag for custom events. Page views are already
// tracked automatically by <GoogleAnalytics> (@next/third-parties) on every
// route; this adds interaction events. No-ops when GA isn't loaded (no GA id,
// SSR, or an ad-blocker), so callers never need to guard.
//
// It ALSO writes a first-party click counter to /api/track (Firestore, via the
// Admin SDK) so the admin dashboard can read real per-button/per-link totals
// with a desktop vs mobile split. That beacon fires independently of GA — it
// still records even when NEXT_PUBLIC_GA_ID is unset or GA is blocked.

type Value = string | number | boolean | undefined | null;
export type TrackParams = Record<string, Value>;

// The param that best distinguishes the same event across UI surfaces. Ordered
// by how meaningful it is as a per-button/per-link dimension.
function surfaceOf(params: TrackParams): string {
  const v =
    params.source ??
    params.surface ??
    params.tab ??
    params.item ??
    params.category ??
    params.method ??
    params.type;
  return v == null ? "" : String(v);
}

function currentDevice(): "mobile" | "desktop" {
  return typeof window !== "undefined" &&
    window.matchMedia?.("(max-width: 767px)")?.matches
    ? "mobile"
    : "desktop";
}

// Fire-and-forget first-party counter. sendBeacon survives page navigation
// (important for link clicks), with a keepalive fetch fallback.
function countClick(event: string, params: TrackParams): void {
  try {
    const payload = JSON.stringify({
      event,
      surface: surfaceOf(params),
      device: currentDevice(),
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Never let analytics break an interaction.
  }
}

export function track(event: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;

  // First-party counter (independent of GA availability).
  countClick(event, params);

  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  // Drop undefined/null so GA doesn't record empty params.
  const clean: TrackParams = {};
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== null) clean[k] = v;
  gtag("event", event, clean);
}
