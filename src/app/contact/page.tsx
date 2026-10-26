import { Check, Globe2, Mail, MessageSquare } from "lucide-react";
import { Container, PageHero } from "@/components/ui/elements";
import { ContactForm } from "@/components/contact/contact-form";
import { isContactConfigured } from "@/lib/contact-config";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Contact — Let’s Build Your Next Website", "Tell Dev Studio about your website idea. Discuss your project, explore the right service, and request a custom quote for your business.", "/contact");
export const dynamic = "force-dynamic";
export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  return <><PageHero eyebrow="Let’s talk" title={<>Big things start<br />with a hello<span className="blue-dot">.</span></>} description="A new idea, a fresh direction, or a website ready for its next chapter. We’d love to hear what you have in mind." /><section className="section"><Container className="contact-grid"><div className="contact-intro"><span className="eyebrow"><span />Your idea belongs here</span><h2>Let’s make<br />something meaningful.</h2><p>Tell us a little about your business and what you’re looking to build. A rough idea is a perfectly good place to start.</p><div className="contact-point"><Globe2 size={22} /><div><h3>Local roots. Global outlook.</h3><p>Based in Bangladesh.<br />Collaborating with businesses worldwide.</p></div></div><div className="contact-point"><MessageSquare size={22} /><div><h3>A conversation, not a commitment.</h3><p>Let’s understand your goals and explore the right direction together.</p></div></div>{site.email && <div className="contact-point"><Mail size={22} /><div><h3>Prefer email?</h3><a href={`mailto:${site.email}`}>{site.email}</a></div></div>}<ul className="check-list">{["Share your idea and requirements", "Discuss the approach and project scope", "Get a proposal shaped around your needs"].map(item => <li key={item}><Check size={15} />{item}</li>)}</ul></div><ContactForm enabled={isContactConfigured()} initialService={service} /></Container></section></>;
}
