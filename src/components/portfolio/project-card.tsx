import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import { SiteImage } from "@/components/ui/site-image";
export function ProjectCard({ project, sizes }: { project: Project; sizes?: string }) {
  return <article className="project-card"><Link className="project-visual" href={`/portfolio/${project.slug}`} aria-label={`View ${project.name} concept project`} style={{ backgroundColor: project.accent }}><SiteImage src={project.image} alt={project.imageAlt} sizes={sizes} /><span className="concept-badge">Concept project</span><span className="project-arrow"><ArrowUpRight size={23} /></span><span className="image-caption">Stock photography · visual placeholder</span></Link><div className="project-info"><div className="project-category">{project.category}</div><h3><Link href={`/portfolio/${project.slug}`}>{project.name}</Link></h3><p>{project.description}</p><div className="project-bottom"><div className="tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div><Link href={`/portfolio/${project.slug}`} className="project-details-link" aria-label={`View details for ${project.name}`}><ArrowUpRight size={18} /><span className="sr-only">View details</span></Link></div></div></article>;
}
