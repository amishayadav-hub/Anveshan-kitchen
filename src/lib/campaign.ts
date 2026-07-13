// First-party UTM capture (client-side helpers).
//
// Reads incoming utm_* params when a visitor lands, stores FIRST-TOUCH
// attribution in a cookie (so it survives across the session / return visits),
// and lets us attribute conversions back to the campaign that brought them.
// Writes to Firestore happen server-side via /api/campaign, and only for
// campaign-tagged sessions (deduped) — organic traffic writes nothing.

export interface Campaign {
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
}

const COOKIE = "anv_campaign";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// Parse utm_* out of a query string. Returns null when there's no utm_source.
export function readCampaignFromSearch(search: string): Campaign | null {
  const p = new URLSearchParams(search);
  const source = p.get("utm_source");
  if (!source) return null;
  return {
    source,
    medium: p.get("utm_medium") || "(none)",
    campaign: p.get("utm_campaign") || "(none)",
    term: p.get("utm_term") || undefined,
    content: p.get("utm_content") || undefined,
  };
}

export function storeCampaign(c: Campaign): void {
  try {
    document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(c))}; path=/; max-age=${MAX_AGE}; samesite=lax`;
  } catch {
    /* cookies unavailable — non-fatal */
  }
}

export function getStoredCampaign(): Campaign | null {
  try {
    const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`));
    return m ? (JSON.parse(decodeURIComponent(m[1])) as Campaign) : null;
  } catch {
    return null;
  }
}

// Fire-and-forget beacon to the first-party campaign recorder.
export function sendCampaign(payload: Record<string, unknown>): void {
  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/campaign", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    /* never break the page for analytics */
  }
}
