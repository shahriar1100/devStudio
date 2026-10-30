"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { ArrowRight, ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { navigation } from "@/config/site";
import { Brand, Container } from "@/components/ui/elements";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return <button type="button" className="theme-control" aria-label="Toggle light and dark theme" title="Toggle light and dark theme" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}><Moon className="light-theme-icon" size={20} aria-hidden="true" /><Sun className="dark-theme-icon" size={20} aria-hidden="true" /></button>;
}
export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return <div className="announcement"><Container><span><span aria-hidden="true">✦</span> Landing Page + Pixel Setup</span><Link href="/contact?service=Landing%20Page">Claim offer <ArrowRight size={14} /></Link><button aria-label="Dismiss announcement" onClick={() => setDismissed(true)}><X size={15} /></button></Container></div>;
}
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => { dialogRef.current?.close(); setOpen(false); triggerRef.current?.focus(); };
  const show = () => { dialogRef.current?.showModal(); setOpen(true); };
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onResize = () => { if (window.innerWidth >= 1024) { dialogRef.current?.close(); setOpen(false); } };
    window.addEventListener("resize", onResize);
    return () => { document.body.style.overflow = previous; window.removeEventListener("resize", onResize); };
  }, [open]);
  const active = (href: string) => href === "/" ? pathname === href : pathname.startsWith(href);
  return <header className={`header ${scrolled ? "scrolled" : ""}`}><Container className="nav-inner"><Brand /><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined}>{item.label}</Link>)}</nav><div className="nav-actions"><ThemeToggle /><Link className="button button-primary nav-cta" href="/contact?service=Landing%20Page">Get the offer <ArrowUpRight size={17} /></Link><button ref={triggerRef} className="icon-button mobile-trigger" aria-label="Open navigation" aria-expanded={open} aria-controls="mobile-navigation" onClick={show}><Menu size={23} /></button></div></Container><dialog ref={dialogRef} id="mobile-navigation" className="mobile-dialog" aria-label="Site navigation" onCancel={() => { setOpen(false); triggerRef.current?.focus(); }} onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) close(); }}><div className="mobile-drawer"><div className="drawer-header"><Brand /><button autoFocus className="icon-button" aria-label="Close navigation" onClick={close}><X /></button></div><p className="eyebrow">Explore Dev Studio</p><nav aria-label="Mobile navigation">{navigation.map((item, i) => <Link onClick={close} key={item.href} href={item.href} aria-current={active(item.href) ? "page" : undefined}><span className="nav-number">0{i + 1}</span>{item.label}<ArrowUpRight size={20} /></Link>)}</nav><p className="drawer-caption">A focused landing page for your next campaign.</p><Link onClick={close} href="/contact?service=Landing%20Page" className="button button-primary">Get the offer <ArrowUpRight size={18} /></Link></div></dialog></header>;
}
