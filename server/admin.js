import { timingSafeEqual } from "node:crypto";

export const defaultAdminPassword = "DevStudio@2026";

export function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" }
  });
}

export function isAuthorized(request) {
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || "";
  if (!supplied) return false;
  const suppliedBuffer = Buffer.from(supplied);
  const acceptedPasswords = [process.env.ADMIN_PASSWORD, defaultAdminPassword].filter(Boolean);
  return acceptedPasswords.some(password => {
    const expectedBuffer = Buffer.from(password);
    return expectedBuffer.length === suppliedBuffer.length && timingSafeEqual(expectedBuffer, suppliedBuffer);
  });
}

export function hasBlobStore() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export function sanitizeContent(input) {
  const settings = input?.settings || {};
  const projects = Array.isArray(input?.projects) ? input.projects.slice(0, 50) : [];
  const cleanText = (value, limit) => String(value || "").trim().slice(0, limit);
  const cleanUrl = (value, limit) => {
    const url = cleanText(value, limit);
    return /^(https?:\/\/|\/|assets\/)/i.test(url) ? url : "";
  };

  return {
    settings: {
      sectionLabel: cleanText(settings.sectionLabel, 80),
      sectionTitle: cleanText(settings.sectionTitle, 100),
      sectionDescription: cleanText(settings.sectionDescription, 240)
    },
    projects: projects.map((project, index) => ({
      id: cleanText(project.id, 80) || `project-${index + 1}`,
      title: cleanText(project.title, 100),
      category: cleanText(project.category, 100),
      description: cleanText(project.description, 500),
      image: cleanUrl(project.image, 1000),
      alt: cleanText(project.alt, 180),
      link: cleanUrl(project.link, 1000)
    })).filter(project => project.title && project.image)
  };
}
