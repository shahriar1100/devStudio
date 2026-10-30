import { list, put } from "@vercel/blob";
import { hasBlobStore, isAuthorized, json, sanitizeContent } from "../server/admin.js";

const contentPath = "portfolio-data/projects.json";

async function readContent() {
  const result = await list({ prefix: contentPath, limit: 1 });
  const blob = result.blobs.find(item => item.pathname === contentPath) || result.blobs[0];
  if (!blob) return null;
  const response = await fetch(blob.url, { cache: "no-store" });
  if (!response.ok) throw new Error("Could not read portfolio content.");
  return response.json();
}

export default {
  async fetch(request) {
    if (request.method === "GET") {
      if (!hasBlobStore()) return json({ configured: false, content: null });
      try {
        return json({ configured: true, content: await readContent() });
      } catch (error) {
        return json({ configured: true, content: null, error: error.message }, 500);
      }
    }

    if (request.method === "POST") {
      if (!isAuthorized(request)) return json({ error: "Unauthorized" }, 401);
      if (!hasBlobStore()) return json({ error: "Vercel Blob is not configured." }, 503);
      try {
        const content = sanitizeContent(await request.json());
        if (!content.projects.length) return json({ error: "Add at least one project with a title and image." }, 400);
        const blob = await put(contentPath, JSON.stringify(content), {
          access: "public",
          allowOverwrite: true,
          addRandomSuffix: false,
          contentType: "application/json",
          cacheControlMaxAge: 60
        });
        return json({ saved: true, content, updatedAt: new Date().toISOString(), blobUrl: blob.url });
      } catch (error) {
        return json({ error: error.message || "Could not save portfolio content." }, 500);
      }
    }

    return json({ error: "Method not allowed" }, 405);
  }
};

