// Lightweight in-memory fixed-window rate limiter.
//
// NOTE: state lives in the process, so on serverless this is PER warm instance,
// not global — it blunts naive abuse loops and bots without any new credentials,
// but is not a hard global cap. For strict, multi-instance limits swap this for a
// shared store (Upstash Redis / Vercel KV) behind the same `rateLimit` signature.

type Entry = { count: number; reset: number };

const buckets = new Map<string, Entry>();

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfter: number; // seconds until the window resets (0 when allowed)
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();

  // Opportunistic cleanup so the map can't grow unbounded under churn.
  if (buckets.size > 5000) {
    for (const [k, e] of buckets) if (now >= e.reset) buckets.delete(k);
  }

  const entry = buckets.get(key);
  if (!entry || now >= entry.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }
  if (entry.count >= limit) {
    return { ok: false, remaining: 0, retryAfter: Math.ceil((entry.reset - now) / 1000) };
  }
  entry.count += 1;
  return { ok: true, remaining: limit - entry.count, retryAfter: 0 };
}

/** Best-effort client IP from common proxy headers (Vercel sets x-forwarded-for). */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
