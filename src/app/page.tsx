import { BarChart3, Check, Code2, Gauge, LayoutTemplate, Search, ShoppingCart } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { Container, PrimaryButton, SectionHeading, TextLink } from "@/components/ui/elements";
import { SiteImage } from "@/components/ui/site-image";
import { ContactForm } from "@/components/contact/contact-form";
import { isContactConfigured } from "@/lib/contact-config";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Web Design Agency — Landing Page + Pixel Setup",
  "Dev Studio creates modern, conversion-focused landing pages with Facebook Pixel setup.",
  "/",
);

const services = [
  { icon: LayoutTemplate, title: "Landing Page", text: "Focused pages built to generate leads and sales." },
  { icon: ShoppingCart, title: "E-commerce", text: "Simple online stores that make buying easy." },
  { icon: Code2, title: "Business Website", text: "A polished website that builds trust in your brand." },
  { icon: Search, title: "SEO Setup", text: "A clean structure that helps people find you." },
];

const reasons = [
  "Clean, modern UI/UX",
  "Mobile-first development",
  "Clear sales-focused structure",
  "Fast and easy communication",
  "Facebook Pixel setup included",
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="agency-strip" aria-label="Our strengths">
        <Container>
          <span><LayoutTemplate size={20} /><strong>Thoughtful design</strong><small>Clear and professional</small></span>
          <span><Gauge size={20} /><strong>Fast experience</strong><small>Built for every screen</small></span>
          <span><BarChart3 size={20} /><strong>Ready to track</strong><small>Pixel setup included</small></span>
        </Container>
      </section>

      <section className="section agency-about">
        <Container className="agency-about-grid">
          <div>
            <SectionHeading
              eyebrow="About Dev Studio"
              title={<>Web solutions with<br /><span className="text-muted">a clear purpose.</span></>}
              description="We design focused websites for businesses that want to look professional and sell online."
            />
            <p>From the first screen to the final call to action, every detail is shaped around your offer and your customer.</p>
            <TextLink href="/about">More about us</TextLink>
          </div>
          <div className="agency-about-visual">
            <SiteImage src="/images/landing-page-ui-hero.png" alt="Modern responsive website interface" sizes="(max-width: 767px) calc(100vw - 40px), 46vw" />
            <span><strong>UI/UX</strong> that makes the next step obvious.</span>
          </div>
        </Container>
      </section>

      <section id="services" className="section agency-services">
        <Container className="agency-services-layout">
          <div className="agency-services-intro">
            <SectionHeading
              eyebrow="Our services"
              title={<>Solutions that<br />move you forward.</>}
              description="Choose what your business needs now. Keep it simple and grow from there."
            />
            <PrimaryButton href="/contact">Talk to us</PrimaryButton>
          </div>
          <div className="agency-service-grid">
            {services.map(({ icon: Icon, title, text }) => (
              <article key={title}><span><Icon size={23} /></span><h3>{title}</h3><p>{text}</p><TextLink href="/services">Learn more</TextLink></article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section agency-offer">
        <Container>
          <div className="agency-offer-copy">
            <span>FEATURED OFFER</span>
            <h2>Landing Page + Pixel Setup</h2>
            <p>Everything you need to launch a focused campaign.</p>
          </div>
          <PrimaryButton href="/contact?service=Landing%20Page">Book this offer</PrimaryButton>
        </Container>
      </section>

      <section className="section agency-contact-section">
        <Container className="agency-contact-grid">
          <div className="agency-reasons">
            <SectionHeading
              eyebrow="Why work with us"
              title={<>Small team.<br /><span className="text-muted">Focused work.</span></>}
              description="A straightforward process, practical decisions and a website built around your goal."
            />
            <ul>{reasons.map(reason => <li key={reason}><Check size={17} />{reason}</li>)}</ul>
          </div>
          <div className="agency-form-wrap">
            <span className="agency-form-label">Start a conversation</span>
            <h2>Tell us what you need.</h2>
            <ContactForm enabled={isContactConfigured()} initialService="Landing Page" />
          </div>
        </Container>
      </section>
    </>
  );
}
