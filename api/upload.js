import { put } from "@vercel/blob";
import { hasBlobStore, isAuthorized, json } from "../server/admin.js";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const maxSize = 4 * 1024 * 1024;

export default {
  async fetch(request) {
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
    if (!isAuthorized(request)) return json({ error: "Unauthorized" }, 401);
    if (!hasBlobStore()) return json({ error: "Vercel Blob is not configured." }, 503);

    try {
      const formData = await request.formData();
      const file = formData.get("file");
      if (!file || typeof file.arrayBuffer !== "function") return json({ error: "Choose an image to upload." }, 400);
      if (!allowedTypes.has(file.type)) return json({ error: "Use a JPG, PNG, WebP or GIF image." }, 400);
      if (file.size > maxSize) return json({ error: "Image must be 4 MB or smaller." }, 400);

      const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "project-image";
      const blob = await put(`portfolio-images/${Date.now()}-${safeName}`, file, {
        access: "public",
        addRandomSuffix: true,
        cacheControlMaxAge: 31536000
      });
      return json({ uploaded: true, url: blob.url, pathname: blob.pathname });
    } catch (error) {
      return json({ error: error.message || "Image upload failed." }, 500);
    }
  }
};

