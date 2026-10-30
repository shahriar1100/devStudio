import { defaultAdminPassword, hasBlobStore, isAuthorized, json } from "../server/admin.js";

export default {
  async fetch(request) {
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
    if (!isAuthorized(request)) return json({ error: "Incorrect admin password." }, 401);
    return json({
      authenticated: true,
      storage: hasBlobStore() ? "ready" : "not-configured",
      usingDefaultPassword: !process.env.ADMIN_PASSWORD || request.headers.get("authorization") === `Bearer ${defaultAdminPassword}`
    });
  }
};
