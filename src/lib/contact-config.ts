export function isContactConfigured() {
  const emailReady = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL && process.env.CONTACT_TO_EMAIL);
  const limiterReady = process.env.NODE_ENV !== "production" || Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
  return emailReady && limiterReady;
}
