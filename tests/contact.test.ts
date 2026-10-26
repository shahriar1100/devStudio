import { test } from "node:test";
import assert from "node:assert/strict";
import { contactSchema } from "../src/lib/contact-schema.ts";
import { checkRateLimit, RateLimitUnavailable } from "../src/lib/rate-limit.ts";
const valid = { fullName: "Test Visitor", email: "visitor@example.com", phone: "", businessName: "", service: "Business Website", budget: "Not Sure", description: "A new business website with services and a contact form.", website: "", startedAt: 1000 };
test("valid inquiries accept optional empty contact fields and trim names", () => {
  const result = contactSchema.safeParse({ ...valid, fullName: "  Test Visitor  " });
  assert.ok(result.success); assert.equal(result.data.fullName, "Test Visitor");
});
test("malformed email and missing required choices are rejected", () => {
  for (const fields of [{ email: "not-an-email" }, { service: "" }, { budget: "" }, { fullName: " " }, { description: "Too short" }]) assert.equal(contactSchema.safeParse({ ...valid, ...fields }).success, false);
});
test("unknown service, oversized content, and filled honeypots are rejected", () => {
  for (const fields of [{ service: "Unknown service" }, { description: "x".repeat(5001) }, { website: "spam.example" }, { phone: "invalid-phone" }, { email: "test@example.com\r\nBcc: victim@example.com" }]) assert.equal(contactSchema.safeParse({ ...valid, ...fields }).success, false);
});
test("local limiter allows five attempts then rejects the sixth", async () => {
  const original = { ...process.env };
  Object.assign(process.env, { NODE_ENV: "test" }); delete process.env.UPSTASH_REDIS_REST_URL; delete process.env.UPSTASH_REDIS_REST_TOKEN;
  try {
    for (let i = 0; i < 5; i++) assert.equal((await checkRateLimit("test-local-visitor")).allowed, true);
    const limit = await checkRateLimit("test-local-visitor"); assert.equal(limit.allowed, false); assert.ok(limit.retryAfter > 0 && limit.retryAfter <= 600);
    assert.equal((await checkRateLimit("another-visitor")).allowed, true);
  } finally { process.env = original; }
});
test("production limiter fails closed when shared configuration is missing", async () => {
  const original = { ...process.env }; Object.assign(process.env, { NODE_ENV: "production" }); delete process.env.UPSTASH_REDIS_REST_URL; delete process.env.UPSTASH_REDIS_REST_TOKEN;
  try { await assert.rejects(() => checkRateLimit("test-production"), RateLimitUnavailable); } finally { process.env = original; }
});
test("shared limiter uses atomic expiry and does not expose raw visitor identity", async () => {
  const original = { ...process.env }; const originalFetch = globalThis.fetch;
  Object.assign(process.env, { UPSTASH_REDIS_REST_URL: "https://redis.example.invalid", UPSTASH_REDIS_REST_TOKEN: "test-only" });
  globalThis.fetch = async (_input, options) => { const command = JSON.parse(String(options?.body)); assert.equal(command[0], "EVAL"); assert.match(command[1], /EXPIRE/); assert.equal(command[3].includes("192.0.2.1"), false); return Response.json({ result: [6, 455] }); };
  try { assert.deepEqual(await checkRateLimit("192.0.2.1"), { allowed: false, retryAfter: 455 }); } finally { globalThis.fetch = originalFetch; process.env = original; }
});
test("shared limiter provider failure does not allow submissions", async () => {
  const original = { ...process.env }; const originalFetch = globalThis.fetch;
  Object.assign(process.env, { UPSTASH_REDIS_REST_URL: "https://redis.example.invalid", UPSTASH_REDIS_REST_TOKEN: "test-only" });
  globalThis.fetch = async () => new Response("Unavailable", { status: 503 });
  try { await assert.rejects(() => checkRateLimit("test-outage"), RateLimitUnavailable); } finally { globalThis.fetch = originalFetch; process.env = original; }
});
