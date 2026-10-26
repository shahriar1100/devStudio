import { createHash } from "node:crypto";
const WINDOW_SECONDS = 600;
const MAX_REQUESTS = 5;
const localBuckets = new Map<string, { count: number; expires: number }>();
export class RateLimitUnavailable extends Error {}
export async function checkRateLimit(identity: string): Promise<{ allowed: boolean; retryAfter: number }> {
  const key = `contact:${createHash("sha256").update(identity).digest("hex")}`;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    try {
      // INCR + expiry are atomic, so concurrent requests cannot exceed the shared allowance.
      const script = "local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end; return {n, redis.call('TTL', KEYS[1])}";
      const response = await fetch(url, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(["EVAL", script, "1", key, String(WINDOW_SECONDS)]), signal: AbortSignal.timeout(5000), cache: "no-store" });
      if (!response.ok) throw new Error("Rate limit provider unavailable");
      const data = await response.json() as { result?: [number, number] };
      if (!Array.isArray(data.result) || data.result.length !== 2 || !data.result.every(Number.isFinite)) throw new Error("Invalid rate limit response");
      return { allowed: data.result[0] <= MAX_REQUESTS, retryAfter: Math.max(1, data.result[1]) };
    } catch { throw new RateLimitUnavailable("Shared rate limiting is unavailable."); }
  }
  if (process.env.NODE_ENV === "production") throw new RateLimitUnavailable("Shared rate limiting must be configured in production.");
  const now = Date.now();
  for (const [bucketKey, bucket] of localBuckets) if (bucket.expires <= now) localBuckets.delete(bucketKey);
  if (localBuckets.size >= 10000 && !localBuckets.has(key)) return { allowed: false, retryAfter: WINDOW_SECONDS };
  const bucket = localBuckets.get(key) || { count: 0, expires: now + WINDOW_SECONDS * 1000 };
  bucket.count++; localBuckets.set(key, bucket);
  return { allowed: bucket.count <= MAX_REQUESTS, retryAfter: Math.ceil((bucket.expires - now) / 1000) };
}
