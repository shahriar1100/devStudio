import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/about", "/services", "/portfolio", "/pricing", "/contact", "/privacy-policy", "/terms", ...services.map(item => `/services/${item.slug}`), ...projects.map(item => `/portfolio/${item.slug}`)].map(path => ({ url: `${site.url}${path}`, changeFrequency: "monthly", priority: path === "" ? 1 : path.includes("policy") || path === "/terms" ? 0.3 : 0.7 })); }
