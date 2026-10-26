export type ProjectFilter = "All Projects" | "E-commerce" | "Landing Pages" | "Agency Websites" | "Dashboards" | "Other Websites";
export interface Project {
  slug: string; name: string; title: string; category: string; filter: ProjectFilter;
  description: string; features: string[]; technologies: string[];
  image: string; imageAlt: string; accent: string; objective: string; approach: string;
  liveUrl?: string;
}
export interface Service {
  slug: string; title: string; shortTitle: string; icon: "store" | "rocket" | "code" | "layers" | "sparkles" | "settings";
  description: string; features: string[]; benefits: string[]; audience: string; technologies: string[]; projectSlugs: string[];
}
