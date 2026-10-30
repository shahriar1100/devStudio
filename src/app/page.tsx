import { BarChart3, Check, Gauge, LayoutTemplate, MousePointerClick } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { Container, PrimaryButton, SectionHeading } from "@/components/ui/elements";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Landing Page + Pixel Setup — ৳2,500",
  "Get a modern, conversion-focused landing page with Facebook Pixel setup for only ৳2,500.",
  "/",
);

const benefits = [
  { icon: LayoutTemplate, title: "Modern UI/UX", text: "Clean design built around your offer." },
  { icon: MousePointerClick, title: "Sales focused", text: "Clear sections and calls to action." },
  { icon: Gauge, title: "Fast & responsive", text: "Smooth on mobile, tablet and desktop." },
  { icon: BarChart3, title: "Pixel setup", text: "Track visitors and campaign results." },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="mini-benefits" aria-label="Why choose this offer">
        <Container>
          {benefits.map(({ icon: Icon, title, text }) => (
            <article key={title}><Icon size={22} /><div><h2>{title}</h2><p>{text}</p></div></article>
          ))}
        </Container>
      </section>

      <section id="offer" className="section simple-offer">
        <Container className="simple-offer-grid">
          <div>
            <SectionHeading
              eyebrow="One simple package"
              title={<>Launch your offer.<br /><span className="text-muted">Start getting leads.</span></>}
              description="No confusing packages. Just the essentials your campaign needs."
            />
            <ul className="offer-list">
              {["Custom landing page design", "Mobile responsive development", "Facebook Pixel installation", "Lead-focused CTA setup", "Basic on-page SEO"].map(item => <li key={item}><Check size={17} />{item}</li>)}
            </ul>
          </div>
          <aside className="offer-card">
            <span>LANDING PAGE + PIXEL</span>
            <div className="offer-card-price">৳2,500</div>
            <p>A focused setup to launch your next campaign quickly.</p>
            <PrimaryButton href="/contact?service=Landing%20Page">Book this offer</PrimaryButton>
            <small>Tell us about your product. We&apos;ll handle the page.</small>
          </aside>
        </Container>
      </section>

      <section className="short-cta">
        <Container>
          <div><span>Ready to sell online?</span><h2>Let&apos;s build your landing page.</h2></div>
          <PrimaryButton href="/contact?service=Landing%20Page">Start now — ৳2,500</PrimaryButton>
        </Container>
      </section>
    </>
  );
}
