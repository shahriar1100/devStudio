import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { isContactConfigured } from "@/lib/contact-config";
import { checkRateLimit } from "@/lib/rate-limit";
export const runtime = "nodejs";
const reply = (message: string, status: number, extraHeaders: Record<string, string> = {}) => NextResponse.json({ message }, { status, headers: { "Cache-Control": "no-store", ...extraHeaders } });
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const allowedOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL || request.url).origin;
  if (origin && origin !== allowedOrigin) return reply("This request could not be verified. Please use the website contact form.", 403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return reply("Please submit the form as JSON.", 415);
  if (Number(request.headers.get("content-length") || 0) > 20000) return reply("Your inquiry is too large.", 413);
  let payload: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply("Please provide your project details.", 400);
    const chunks: Uint8Array[] = []; let length = 0;
    while (true) { const { done, value } = await reader.read(); if (done) break; length += value.byteLength; if (length > 20000) { await reader.cancel(); return reply("Your inquiry is too large.", 413); } chunks.push(value); }
    payload = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch { return reply("The inquiry could not be read. Please check your details.", 400); }
  const result = contactSchema.safeParse(payload);
  if (!result.success) return reply("Please check the required fields and try again.", 400);
  const elapsed = Date.now() - result.data.startedAt;
  if (elapsed < 3000 || elapsed > 86_400_000) return reply("Please take a moment to review your details, or refresh the form if it has been open for a long time.", 400);
  if (!isContactConfigured()) return reply("Sending is currently unavailable. Your inquiry has not been sent. Please try again later.", 503);
  try {
    // Vercel supplies this trusted IP header. Untrusted self-hosted deployments share one conservative bucket.
    const identity = process.env.VERCEL ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "unknown" : "local-shared";
    const limit = await checkRateLimit(identity);
    if (!limit.allowed) return reply("You’ve made several inquiries recently. Please wait a few minutes before trying again.", 429, { "Retry-After": String(limit.retryAfter) });
  } catch { return reply("Sending is temporarily unavailable. Please try again later.", 503); }
  const data = result.data;
  const text = [`New Dev Studio project inquiry`, `Name: ${data.fullName}`, `Email: ${data.email}`, `Phone: ${data.phone || "Not provided"}`, `Business: ${data.businessName || "Not provided"}`, `Service: ${data.service}`, `Budget: ${data.budget}`, "", "Project description:", data.description].join("\n");
  try {
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.CONTACT_FROM_EMAIL, to: [process.env.CONTACT_TO_EMAIL], reply_to: data.email, subject: `Dev Studio inquiry: ${data.service}`, text }), signal: AbortSignal.timeout(15000) });
    if (!response.ok) return reply("We couldn’t send your inquiry. Please try again later.", 502);
    const sent = await response.json() as { id?: string };
    if (!sent.id) return reply("We couldn’t confirm your inquiry was sent. Please try again later.", 502);
    return reply("Your inquiry has been accepted for email delivery. Thank you for sharing your project with Dev Studio.", 200);
  } catch { return reply("We couldn’t confirm delivery. Please try again later.", 502); }
}
