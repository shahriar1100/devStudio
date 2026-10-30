import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Container, PrimaryButton } from "@/components/ui/elements";
import { SiteImage } from "@/components/ui/site-image";

export function Hero() {
  return (
    <section className="sales-hero">
      <Container>
        <div className="sales-hero-grid">
          <div className="sales-hero-copy">
            <span className="offer-pill"><Sparkles size={15} /> Limited launch offer</span>
            <h1>Landing page that turns <span>clicks into customers.</span></h1>
            <p>Modern UI/UX, fast loading and Facebook Pixel setup—everything you need to start selling online.</p>
            <div className="hero-price"><strong>৳2,500</strong><span>Landing Page + Pixel Setup</span></div>
            <div className="hero-buttons">
              <PrimaryButton href="/contact?service=Landing%20Page">Get started for ৳2,500</PrimaryButton>
              <a className="plain-link" href="#offer">See what&apos;s included <ArrowUpRight size={17} /></a>
            </div>
            <div className="sales-trust">
              <span><Check size={15} /> Mobile responsive</span>
              <span><Check size={15} /> Conversion focused</span>
              <span><Check size={15} /> Pixel ready</span>
            </div>
          </div>
          <div className="sales-hero-visual">
            <SiteImage
              src="/images/landing-page-ui-hero.png"
              alt="Modern landing page UI and UX shown on desktop and mobile screens"
              sizes="(max-width: 767px) calc(100vw - 40px), 52vw"
              priority
            />
            <span className="visual-badge"><span>●</span> Designed to convert</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
