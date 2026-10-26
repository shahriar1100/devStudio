import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { Breadcrumb, Container, PrimaryButton, SectionHeading } from "@/components/ui/elements";
import { CTASection, ProcessSection } from "@/components/home/sections";
import { ProjectCard } from "@/components/portfolio/project-card";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() { return services.map(service => ({ slug: service.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = services.find(item => item.slug === slug);
  return service ? pageMetadata(service.title, service.description, `/services/${slug}`) : {};
}
export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = services.find(item => item.slug === slug); if (!service) notFound();
  const related = projects.filter(project => service.projectSlugs.includes(project.slug));
  return <><section className="page-hero"><Container><Breadcrumb items={[{ label: "Services", href: "/services" }, { label: service.shortTitle }]} /><span className="eyebrow"><span />Designed around your business</span><h1>{service.title}<span className="blue-dot">.</span></h1><p>{service.description}</p><div className="hero-buttons"><PrimaryButton>Let’s talk about your project</PrimaryButton></div></Container></section><section className="section"><Container className="detail-grid"><div className="detail-prose"><h2>A considered solution.</h2><p>{service.description} We start by understanding your goals, the people using your website, and the practical needs of your team. The final scope is agreed together, with clear deliverables and a plan for launch.</p><h2>What this makes possible</h2><ul className="check-list">{service.benefits.map(benefit => <li key={benefit}><Check size={16} />{benefit}</li>)}</ul><h2>A good fit for</h2><p>{service.audience}</p></div><aside className="detail-panel"><h2>What we can build</h2><ul className="check-list">{service.features.map(feature => <li key={feature}><Check size={16} />{feature}</li>)}</ul><h2 className="mt-8">The toolkit</h2><div className="tags">{service.technologies.map(tech => <span key={tech}>{tech}</span>)}</div><p className="image-disclosure mt-5">The platform and integrations are selected after discovery. Concept examples below illustrate design directions, not verified implementations of this service.</p></aside></Container></section><ProcessSection /><section className="section surface-section"><Container><SectionHeading eyebrow="A little inspiration" title="Related design concepts." description="Explore directions that could inspire your next project. All examples are concepts with stock image placeholders." /><div className="project-grid">{related.map(project => <ProjectCard key={project.slug} project={project} />)}</div></Container></section><CTASection /></>;
}
