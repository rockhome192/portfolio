import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Serverless functions are stateless — you can't keep a counter in a module
// variable because each request may run on a different instance. So the rate
// limit lives in Upstash Redis (an external store) instead.
//
// Fail-open by design: if Upstash env vars aren't set (e.g. before you've
// created the account), we skip rate limiting rather than break the form.

let cached: Ratelimit | null = null;

function getRatelimit(): Ratelimit | null {
  if (cached) return cached;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  cached = new Ratelimit({
    redis: new Redis({ url, token }),
    // 3 messages per 10 minutes per IP.
    limiter: Ratelimit.slidingWindow(3, "10 m"),
    prefix: "portfolio:contact",
  });
  return cached;
}

export type RateLimitResult = { success: boolean; retryAfter: number };

export async function checkRateLimit(ip: string): Promise<RateLimitResult | null> {
  const rl = getRatelimit();
  if (!rl) return null; // not configured → allow
  const { success, reset } = await rl.limit(ip);
  const retryAfter = Math.max(0, Math.ceil((reset - Date.now()) / 1000));
  return { success, retryAfter };
}
