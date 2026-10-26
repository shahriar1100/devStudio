import { Hero } from "@/components/home/hero";
import { AboutPreview, BenefitsSection, CTASection, FAQSection, FeaturedPortfolio, PricingSection, ProcessSection, ServicesSection, TechnologySection, TechnologyStrip, TestimonialSection } from "@/components/home/sections";
import { Container, SectionHeading } from "@/components/ui/elements";
import { DevicePreview } from "@/components/ui/device-preview";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Web Design & Development Agency", "Dev Studio builds thoughtful websites for businesses in Bangladesh and beyond. Explore e-commerce, landing pages, custom development, and creative concepts.", "/");
export default function HomePage() {
  return <><Hero /><TechnologyStrip /><AboutPreview /><ServicesSection /><FeaturedPortfolio /><BenefitsSection /><ProcessSection /><section className="section showcase-section"><Container><SectionHeading centered eyebrow="Designed to go everywhere" title={<>One website.<br /><span className="text-muted">Every device.</span></>} description="Big ideas deserve to feel right on every screen. Explore how a responsive frame adapts." /><DevicePreview /></Container></section><TechnologySection /><PricingSection /><TestimonialSection /><FAQSection /><CTASection /></>;
}
