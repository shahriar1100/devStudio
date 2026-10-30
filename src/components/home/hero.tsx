import { ArrowDown, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Container, PrimaryButton } from "@/components/ui/elements";
import { SiteImage } from "@/components/ui/site-image";

export function Hero() {
  return (
    <section className="agency-hero">
      <div className="agency-hero-glow" aria-hidden="true" />
      <Container>
        <div className="agency-hero-grid">
          <div className="agency-hero-copy">
            <span className="agency-kicker"><Sparkles size={15} /> Web design for growing businesses</span>
            <h1>Build a better<br /><span>online presence.</span></h1>
            <p>Clean landing pages designed to turn visitors into customers—without unnecessary complexity.</p>
            <div className="agency-hero-actions">
              <PrimaryButton href="/contact?service=Landing%20Page">Get started</PrimaryButton>
              <a href="#services">Explore services <ArrowDown size={17} /></a>
            </div>
            <div className="agency-proof">
              <span><Check size={15} /> Modern UI/UX</span>
              <span><Check size={15} /> Mobile responsive</span>
              <span><Check size={15} /> Pixel setup</span>
            </div>
          </div>
          <div className="agency-hero-preview">
            <SiteImage
              src="/images/landing-page-ui-hero.png"
              alt="Landing page UI shown on desktop and mobile"
              sizes="(max-width: 767px) calc(100vw - 40px), 48vw"
              priority
            />
            <div className="agency-floating-card"><span>Launch offer</span><strong>Now booking</strong><small>Landing Page + Pixel</small></div>
            <span className="agency-preview-tag">Designed to convert <ArrowUpRight size={14} /></span>
          </div>
        </div>
      </Container>
    </section>
  );
}
