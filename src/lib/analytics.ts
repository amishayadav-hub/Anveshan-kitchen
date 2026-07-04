// Thin, safe wrapper over GA4's gtag for custom events. Page views are already
// tracked automatically by <GoogleAnalytics> (@next/third-parties) on every
// route; this adds interaction events. No-ops when GA isn't loaded (no GA id,
// SSR, or an ad-blocker), so callers never need to guard.

type Value = string | number | boolean | undefined | null;
export type TrackParams = Record<string, Value>;

export function track(event: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  // Drop undefined/null so GA doesn't record empty params.
  const clean: TrackParams = {};
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== null) clean[k] = v;
  gtag("event", event, clean);
}
