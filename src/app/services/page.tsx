import { PageHero } from "@/components/ui/elements";
import { BenefitsSection, CTASection, FAQSection, ProcessSection, ServicesSection } from "@/components/home/sections";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Web Design & Development Services", "Explore e-commerce development, landing pages, business websites, WordPress, redesigns, and ongoing website care from Dev Studio.", "/services");
export default function ServicesPage() {
  return <><PageHero eyebrow="Our services" title={<>Your ambition.<br />Our next project.</>} description="Web solutions designed for your business. From a first impression to a fully featured store, we help make the next step possible." /><ServicesSection /><BenefitsSection /><ProcessSection /><FAQSection /><CTASection /></>;
}
