import Link from "next/link";
import { ArrowUpRight, Check, Code2, Compass, Gauge, Globe2, Layers, MessageSquare, MonitorSmartphone, ScanSearch, Sparkles } from "lucide-react";
import { Container, PrimaryButton, SecondaryButton, SectionHeading, TextLink } from "@/components/ui/elements";
import { AnimatedSection } from "@/components/animations/animated-section";
import { SiteImage } from "@/components/ui/site-image";
import { ServiceCard } from "@/components/services/service-card";
import { ProjectCard } from "@/components/portfolio/project-card";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { ProcessTimeline } from "./process-timeline";
import { services } from "@/data/services";
import { featuredProjects } from "@/data/projects";
import { siteImages } from "@/data/images";
import { packages } from "@/data/pricing";
import { marqueeTechnologies, technologyGroups } from "@/data/technologies";

export function TechnologyStrip() {
  return <section className="tech-strip" aria-label="Technologies we work with"><Container><p>GOOD IDEAS. GREAT TECHNOLOGY.</p><div className="marquee" tabIndex={0} aria-label="Technologies We Work With. Focus to pause."><div className="marquee-track">{[0, 1].map(copy => <div className="marquee-group" aria-hidden={copy === 1 ? true : undefined} key={copy}>{marqueeTechnologies.map((tech, i) => <span key={tech}><span className="tech-mark" aria-hidden="true">{["⚛", "N", "TS", "W", "≈", "N°", "M", "woo"][i]}</span>{tech}</span>)}</div>)}</div></div></Container></section>;
}
export function AboutPreview() {
  return <section className="section about-preview"><Container className="about-grid"><AnimatedSection className="about-visual"><SiteImage src={siteImages.about} alt="A considered creative office with plants and shared desks — stock workspace photograph" sizes="(max-width: 768px) 90vw, 50vw" /><span className="vertical-caption">A LITTLE STRATEGY. A LOT OF POSSIBILITY.</span><div className="about-visual-note"><Code2 size={30} /><span>We build your ideas.<br /><strong>With purpose, from the start.</strong></span></div></AnimatedSection><AnimatedSection delay={0.1}><SectionHeading eyebrow="A studio with a purpose" title={<>Your vision.<br /><span className="text-muted">Our expertise.</span></>} description="You bring the ambition. We bring the design thinking and development to help it take shape." /><p className="section-body">Dev Studio creates modern websites that help businesses build a professional online presence. From your first landing page to your next online store, every detail starts with your goals.</p><div className="about-checks">{["Business-focused development", "Modern, intuitive UI/UX", "Responsive on every screen", "Custom, scalable functionality"].map(item => <span key={item}><Check size={16} />{item}</span>)}</div><TextLink href="/about">A little more about us</TextLink></AnimatedSection></Container></section>;
}
export function ServicesSection() {
  return <section className="section surface-section"><Container><div className="section-top"><SectionHeading eyebrow="What we do" title={<>Web solutions.<br /><span className="text-muted">Real possibilities.</span></>} description="Thoughtfully designed. Carefully developed. Built around what your business needs next." /><TextLink href="/services">Explore all services</TextLink></div><div className="service-grid">{services.map((service, i) => <AnimatedSection key={service.slug} delay={(i % 3) * 0.06}><ServiceCard service={service} index={i} /></AnimatedSection>)}</div></Container></section>;
}
export function FeaturedPortfolio() {
  return <section id="selected-work" className="section portfolio-section"><Container><div className="section-top"><SectionHeading eyebrow="Selected concepts / 01—06" title={<>Explore our<br /><span className="text-muted">creative work.</span></>} description="Different businesses. Distinct directions. A look at the digital experiences we imagine." /><div className="portfolio-section-note"><span className="concept-pill">A collection of possibilities</span><p>Concept projects with stock photography.<br />A preview of ideas, not completed client work.</p></div></div><div className="project-grid featured-grid">{featuredProjects.map((project, i) => <AnimatedSection key={project.slug} delay={(i % 2) * 0.08}><ProjectCard project={project} sizes="(max-width: 479px) calc(100vw - 40px), (max-width: 767px) calc((100vw - 58px) / 2), (max-width: 1200px) calc((100vw - 94px) / 2), (max-width: 1376px) calc((100vw - 126px) / 2), 625px" /></AnimatedSection>)}</div><div className="section-end"><p>There’s more where that came from.</p><SecondaryButton href="/portfolio">View all 10 concepts</SecondaryButton></div></Container></section>;
}
const benefits = [
  { icon: Sparkles, title: "Modern UI/UX design", description: "Considered interfaces that feel natural to use and true to your brand." },
  { icon: MonitorSmartphone, title: "Fully responsive", description: "A consistent experience, from the smallest screen to a wide desktop." },
  { icon: Compass, title: "Business-focused", description: "Decisions shaped by your customers and what your business needs." },
  { icon: Code2, title: "Clean code", description: "A maintainable foundation that is easier to understand and extend." },
  { icon: ScanSearch, title: "SEO-friendly structure", description: "Semantic pages, useful metadata, and a logical content hierarchy." },
  { icon: Gauge, title: "Performance minded", description: "Careful image delivery and purposeful motion, with less unnecessary weight." },
  { icon: Layers, title: "Room to grow", description: "Flexible components and an architecture that can evolve with your ideas." },
  { icon: MessageSquare, title: "Clear communication", description: "Shared expectations, thoughtful feedback, and a transparent process." },
];
export function BenefitsSection() {
  return <section className="section surface-section"><Container><SectionHeading eyebrow="The Dev Studio difference" title={<>Good websites don’t<br />happen by accident.</>} description="Why businesses choose Dev Studio: care in the details, clarity in the process, and purpose in every decision." /><div className="benefits-grid">{benefits.map(benefit => <article className="benefit" key={benefit.title}><benefit.icon size={25} strokeWidth={1.4} /><h3>{benefit.title}</h3><p>{benefit.description}</p></article>)}</div></Container></section>;
}
export function ProcessSection() {
  return <section className="section"><Container><div className="section-top"><SectionHeading eyebrow="From the first hello to launch" title={<>Big ideas.<br /><span className="text-muted">A clear way forward.</span></>} /><p className="section-side-copy">How we bring your ideas to life.<br />A collaborative process that keeps you involved, informed, and moving forward.</p></div><ProcessTimeline /></Container></section>;
}
export function TechnologyCard({ title, tools }: { title: string; tools: string[] }) {
  return <article className="technology-card"><h3>{title}<ArrowUpRight size={16} /></h3><div>{tools.map(tool => <span key={tool}>{tool}</span>)}</div></article>;
}
export function TechnologySection() {
  return <section className="section technology-section"><Container><div className="section-top"><SectionHeading eyebrow="Our toolkit" title={<>The right tools.<br /><span className="text-muted">For the right reasons.</span></>} description="Technologies behind our solutions, selected to fit your project rather than the other way around." /><Globe2 className="section-decoration" size={80} strokeWidth={0.6} aria-hidden="true" /></div><div className="technology-grid">{technologyGroups.map(group => <TechnologyCard key={group.title} {...group} />)}</div></Container></section>;
}
export function PricingCards() {
  return <><div className="pricing-grid">{packages.map((pkg, i) => <article className={`pricing-card ${pkg.featured ? "pricing-featured" : ""}`} key={pkg.title}>{pkg.featured && <span className="recommended">Built for your next chapter</span>}<span className="card-number">0{i + 1} / {pkg.featured ? "COMMERCE" : i === 0 ? "LAUNCH" : "GROW"}</span><h3>{pkg.title}</h3><p>{pkg.audience}</p><div className="price">Custom quote<span>Thoughtfully scoped for you</span></div><ul>{pkg.features.map(feature => <li key={feature}><Check size={16} />{feature}</li>)}</ul><Link className={`button ${pkg.featured ? "button-primary" : "button-secondary"}`} href={`/contact?service=${encodeURIComponent(pkg.service)}`}>Request a quote <ArrowUpRight size={18} /></Link></article>)}</div><p className="pricing-note">Final pricing depends on project scope and requirements. No one-size-fits-all promises.</p></>;
}
export function PricingSection() {
  return <section className="section surface-section"><Container><SectionHeading centered eyebrow="An investment in your next step" title={<>The right solution.<br /><span className="text-muted">For your business.</span></>} description="Start focused, grow your presence, or take your store online. Let’s find the fit." /><PricingCards /></Container></section>;
}
export function TestimonialSection({ review }: { review?: { quote: string; name: string; role: string } }) {
  return <section className="story-section"><Container>{review ? <figure><blockquote>“{review.quote}”</blockquote><figcaption>{review.name} · {review.role}</figcaption></figure> : <><span className="eyebrow"><span />The next story could be yours</span><h2>Let’s create your next<br /><span className="text-muted">success story.</span></h2><TextLink href="/contact">Start a conversation</TextLink></>}</Container></section>;
}
export function FAQSection() {
  return <section className="section"><Container className="faq-grid"><div><SectionHeading eyebrow="A little clarity" title={<>Good questions.<br /><span className="text-muted">Honest answers.</span></>} description="A few things you might be wondering before we start building together." /><TextLink href="/contact">Have another question?</TextLink></div><FAQAccordion /></Container></section>;
}
export function CTASection() {
  return <section className="cta-section"><Container><div className="cta-inner"><span className="eyebrow"><span />Your next chapter starts here</span><h2>Let’s build something<br /><span>amazing together.</span></h2><p>Have an idea for your next website? Let’s bring it to life.</p><div className="cta-buttons"><PrimaryButton>Start your project</PrimaryButton><SecondaryButton href="/portfolio">View our portfolio</SecondaryButton></div><span className="cta-corner" aria-hidden="true">↗</span><div className="cta-footer"><span>YOU BRING THE IDEA.</span><span>WE BRING IT TO LIFE.</span></div></div></Container></section>;
}
