import Link from "next/link";
import { ArrowUpRight, ArrowRight, ChevronRight, Code2 } from "lucide-react";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`container ${className}`}>{children}</div>;
}
export function Brand() {
  return <Link className="brand" href="/" aria-label="Dev Studio home"><span className="brand-symbol"><Code2 size={23} strokeWidth={2.4} /></span><span>dev<span className="brand-light">studio</span><span className="brand-dot">.</span></span></Link>;
}
export function PrimaryButton({ children, href = "/contact", className = "" }: { children: ReactNode; href?: string; className?: string }) {
  return <Link className={`button button-primary ${className}`} href={href}>{children}<ArrowUpRight size={18} aria-hidden="true" /></Link>;
}
export function SecondaryButton({ children, href, className = "" }: { children: ReactNode; href: string; className?: string }) {
  return <Link className={`button button-secondary ${className}`} href={href}>{children}<ArrowRight size={17} aria-hidden="true" /></Link>;
}
export function TextLink({ children, href }: { children: ReactNode; href: string }) {
  return <Link href={href} className="text-link">{children}<ArrowUpRight size={18} aria-hidden="true" /></Link>;
}
export function SectionHeading({ eyebrow, title, description, centered = false }: { eyebrow: string; title: ReactNode; description?: string; centered?: boolean }) {
  return <div className={`section-heading ${centered ? "centered" : ""}`}><span className="eyebrow"><span />{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return <nav aria-label="Breadcrumb" className="breadcrumb"><Link href="/">Home</Link>{items.map((item, i) => <span key={item.label}><ChevronRight size={13} aria-hidden="true" />{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current={i === items.length - 1 ? "page" : undefined}>{item.label}</span>}</span>)}</nav>;
}
export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: ReactNode; description: string; children?: ReactNode }) {
  return <section className="page-hero"><Container><Breadcrumb items={[{ label: eyebrow }]} /><span className="eyebrow"><span />{eyebrow}</span><h1>{title}</h1><p>{description}</p>{children}</Container></section>;
}
