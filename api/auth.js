import { hasBlobStore, isAuthorized, json } from "../server/admin.js";

export default {
  async fetch(request) {
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
    if (!process.env.ADMIN_PASSWORD) return json({ error: "ADMIN_PASSWORD is not configured." }, 503);
    if (!isAuthorized(request)) return json({ error: "Incorrect admin password." }, 401);
    if (!hasBlobStore()) return json({ error: "Vercel Blob is not connected to this project." }, 503);
    return json({ authenticated: true, storage: "ready" });
  }
};

