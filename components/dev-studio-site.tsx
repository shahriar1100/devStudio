"use client";

import { useEffect, useState } from "react";

const services = [
  { icon: "⌘", number: "01", title: "Web & SaaS Products", copy: "Fast, conversion-focused websites and scalable platforms designed around real customer journeys.", items: ["Marketing & product sites", "Dashboards and portals", "SaaS product development"], link: "Discuss a web project" },
  { icon: "◇", number: "02", title: "Product Design", copy: "Research-led UX and polished interfaces that make complex products feel calm and intuitive.", items: ["Product strategy & UX", "UI systems and prototypes", "Design audits"], link: "Shape your product" },
  { icon: "↯", number: "03", title: "Business Automation", copy: "Connected workflows that remove repetitive work and give your team reliable operational visibility.", items: ["Process automation", "CRM & API integrations", "AI-assisted workflows"], link: "Automate your workflow" },
  { icon: "▣", number: "04", title: "Mobile Experiences", copy: "Responsive web apps and cross-platform mobile products with thoughtful interaction and speed.", items: ["iOS & Android apps", "Progressive web apps", "Mobile product design"], link: "Build a mobile app" },
  { icon: "◎", number: "05", title: "Commerce Systems", copy: "Flexible storefronts and internal commerce tools made for smooth buying and easier management.", items: ["Custom e-commerce", "Payments & subscriptions", "Inventory workflows"], link: "Upgrade your commerce" },
  { icon: "◈", number: "06", title: "Cloud & Integrations", copy: "Secure backends, deployment pipelines and integrations that keep every part of your product in sync.", items: ["Backend architecture", "Cloud infrastructure", "Third-party integrations"], link: "Plan your architecture" },
];

const projects = [
  { title: "Northstar Operations", brand: "Northstar", tag: "Product platform", type: "SAAS · PRODUCT DESIGN", line: "Operations, simplified.", copy: "A unified workspace concept for service teams managing projects, clients and delivery.", image: "https://images.unsplash.com/photo-1751257983922-a627088d4c21?auto=format&fit=crop&q=82&w=1600", alt: "Modern green workspace with laptop", wide: true },
  { title: "Flowdesk HQ", brand: "Flowdesk", tag: "Automation", type: "AUTOMATION · INTERNAL TOOL", line: "Work that moves itself.", copy: "Workflow automation and team visibility in one calm interface.", image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&q=82&w=1200", alt: "Developer working in a modern office" },
  { title: "Arc Market", brand: "Arc Market", tag: "Commerce", type: "ECOMMERCE · WEB APP", line: "A sharper way to shop.", copy: "A modern commerce concept designed for discovery and frictionless checkout.", image: "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&dpr=1&w=1200", alt: "Hands coding on a laptop" },
  { title: "Buildlane Cloud", brand: "Buildlane", tag: "Developer tools", type: "PLATFORM · ENGINEERING", line: "Ship with confidence.", copy: "A delivery dashboard concept for product teams shipping across environments.", image: "https://images.unsplash.com/photo-1730130054404-c2bd8e7038c2?auto=format&fit=crop&q=82&w=1600", alt: "Software developer using multiple screens", wide: true },
];

const principles = [
  ["⌁", "Business-first thinking", "Every feature connects to a customer need, operational win or growth objective.", "Strategy before screens"],
  ["✦", "Design with clarity", "We remove friction and visual noise so users always know what to do next.", "Simple, never generic"],
  ["⌘", "Engineering discipline", "Maintainable code, sensible architecture and performance built in from day one.", "Made for the long run"],
  ["↗", "Fast collaboration", "Short feedback loops, visible progress and direct access to the people doing the work.", "No project fog"],
  ["◎", "Reliable delivery", "A clear roadmap from discovery through launch, followed by measured improvement.", "Momentum that lasts"],
];

const processSteps = [
  ["01", "Discover", "Goals, users, constraints and the opportunity worth solving.", "Workshop · Research"],
  ["02", "Define", "A focused scope, product roadmap and technical direction.", "Strategy · Architecture"],
  ["03", "Design", "Flows, prototypes and an expressive interface system.", "UX · UI · Prototype"],
  ["04", "Build", "Iterative engineering with visible progress and QA throughout.", "Development · Testing"],
  ["05", "Launch & improve", "Production release, handover and continuous optimization.", "Deploy · Measure · Evolve"],
];

const stacks = [
  ["</>", "Frontend", "Responsive, accessible interfaces with a strong performance foundation.", ["React", "Next.js", "TypeScript", "HTML/CSS"]],
  ["▤", "Backend", "Reliable services, secure APIs and business logic designed to evolve.", ["Node.js", "Postgres", "REST", "Serverless"]],
  ["▯", "Mobile", "Cross-platform experiences with native-feeling interaction and speed.", ["React Native", "PWA", "Expo"]],
  ["↯", "Automation", "Connected operations that reduce manual work and surface the right data.", ["n8n", "Webhooks", "AI APIs", "Zapier"]],
  ["◫", "Systems", "Commerce, billing, content and CRM integrations across your stack.", ["Stripe", "Shopify", "CMS", "CRM"]],
  ["☁", "Cloud & DevOps", "Deployment, monitoring and infrastructure for confident releases.", ["Cloudflare", "Vercel", "Docker", "CI/CD"]],
];

function Brand() {
  return <span className="brand"><span className="brand-mark"><i /><i /><i /></span><span>Dev<span>Studio</span></span></span>;
}

function Heading({ label, title, copy, dark = false }: { label: string; title: string; copy: string; dark?: boolean }) {
  return <div className={`section-heading centered reveal${dark ? " dark" : ""}`}><div className={`eyebrow${dark ? " light" : ""}`}><span />{label}</div><h2>{title}</h2><p>{copy}</p></div>;
}

function DashboardPreview() {
  return <div className="hero-visual reveal delay-1" aria-label="Product delivery dashboard preview">
    <div className="dashboard-frame"><div className="window-bar"><span /><span /><span /><b>studio.dev / delivery</b><i>Live</i></div><div className="dashboard-body">
      <aside><div className="mini-logo">DS</div><span className="active" /><span /><span /><span /><small /></aside>
      <div className="dash-main"><div className="dash-head"><div><small>Good morning, team</small><strong>Project command center</strong></div><button>+ New sprint</button></div>
        <div className="metric-row"><div><small>Delivery</small><strong>94%</strong><i className="cyan" /></div><div><small>Velocity</small><strong>+28%</strong><i className="lime" /></div><div><small>Open tasks</small><strong>18</strong><i className="blue" /></div></div>
        <div className="chart-panel"><div className="panel-title"><span>Build velocity</span><small>Last 8 weeks</small></div><div className="chart">{[35,51,44,68,58,76,72,92].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></div>
        <div className="activity"><div><span className="status-dot lime" /><p><b>Design system</b><small>Ready for development</small></p><em>Done</em></div><div><span className="status-dot cyan" /><p><b>Automation flow</b><small>QA review in progress</small></p><em>Review</em></div></div>
      </div></div></div>
    <div className="float-card float-a"><span>✓</span><div><b>Release deployed</b><small>Production · just now</small></div></div><div className="float-card float-b"><span>↗</span><div><b>28% faster</b><small>This sprint</small></div></div>
  </div>;
}

export default function DevStudioSite() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.08, rootMargin: "0px 0px -45px" });
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => { document.body.classList.toggle("menu-open", menuOpen); return () => document.body.classList.remove("menu-open"); }, [menuOpen]);
  const closeMenu = () => setMenuOpen(false);

  return <>
    <header className="site-header" id="top"><div className="shell nav-wrap"><a href="#top" aria-label="Dev Studio home"><Brand /></a><button className={`menu-toggle${menuOpen ? " open" : ""}`} aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><span /><span /></button><nav className={`nav-links${menuOpen ? " open" : ""}`} aria-label="Primary navigation"><a href="#services" onClick={closeMenu}>Services</a><a href="#work" onClick={closeMenu}>Work</a><a href="#process" onClick={closeMenu}>Process</a><a href="#stack" onClick={closeMenu}>Stack</a><a className="nav-cta" href="#contact" onClick={closeMenu}>Start a project <span>↗</span></a></nav></div></header>
    <main>
      <section className="hero"><div className="hero-grid" /><div className="orb orb-one" /><div className="orb orb-two" /><div className="shell hero-layout"><div className="hero-copy reveal"><div className="eyebrow light"><span />Product design · Development · Automation</div><h1>We build software that turns <em>bold ideas</em> into growth.</h1><p>Dev Studio partners with ambitious teams to design, build and scale websites, SaaS platforms, mobile products and intelligent business systems.</p><div className="hero-actions"><a className="button button-primary" href="#contact">Plan your project <span>↗</span></a><a className="button button-ghost" href="#work"><span className="play">▶</span> Explore our work</a></div><div className="hero-proof"><div><strong>Strategy first</strong><span>Clear scope & roadmap</span></div><div><strong>Built to scale</strong><span>Modern, reliable stacks</span></div><div><strong>One studio</strong><span>Design through delivery</span></div></div></div><DashboardPreview /></div><div className="hero-wave" /></section>
      <section className="section services" id="services"><div className="shell"><Heading label="What we do" title="Everything you need to launch and scale a digital product." copy="One focused team for product thinking, expressive design, resilient engineering and the systems that keep your operation moving." /><div className="service-grid">{services.map((service, index) => <article className={`service-card reveal delay-${index % 3}`} key={service.title}><div className="icon-box">{service.icon}</div><span className="card-num">{service.number}</span><h3>{service.title}</h3><p>{service.copy}</p><ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul><a href="#contact">{service.link} <b>↗</b></a></article>)}</div></div></section>
      <section className="section work" id="work"><div className="shell"><div className="section-heading split reveal"><div><div className="eyebrow"><span />Selected work</div><h2>Digital experiences built around real business goals.</h2></div><p>Concept projects that show how we approach clarity, usability and measurable product outcomes across different industries.</p></div><div className="project-grid">{projects.map((project, index) => <article className={`project-card${project.wide ? " project-wide" : ""} reveal${index % 2 ? " delay-1" : ""}`} key={project.title}><div className="project-image"><img src={project.image} alt={project.alt} loading="lazy" /><span>{project.tag}</span><div className="image-overlay"><b>{project.brand}</b><small>{project.line}</small></div></div><div className="project-info"><div><small>{project.type}</small><h3>{project.title}</h3><p>{project.copy}</p></div><a href="#contact" aria-label={`Discuss a project like ${project.title}`}>↗</a></div></article>)}</div></div></section>
      <section className="section systems"><div className="shell"><Heading label="Internal systems" title="The software behind a smoother business." copy="We also create operational tools that replace scattered spreadsheets and manual handoffs with a single source of truth." /><div className="system-showcase">{[["DS / OPS","Management portal","Studio Operations Hub","Leads, clients, projects, invoices and delivery health in one focused dashboard.",["CRM","Analytics","Workflow","Billing"]],["DS / COMMERCE","Business portal","Unified Commerce Console","Orders, catalog, customers and fulfilment flows without the operational noise.",["Inventory","Orders","Payments","Support"]]].map((system, index) => <article className={`system-card reveal${index ? " delay-1" : ""}`} key={String(system[2])}><div className="system-top"><span>{String(system[0])}</span><small>{String(system[1])}</small></div><h3>{String(system[2])}</h3><p>{String(system[3])}</p><div className={`system-ui${index ? " alt" : ""}`}><div className="sys-nav" /><div className="sys-stat"><span /><span /><span /></div>{index ? <div className="sys-table"><i /><i /><i /></div> : <div className="sys-chart"><i /></div>}</div><div className="tags">{(system[4] as string[]).map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div></div></section>
      <section className="section principles"><div className="shell"><Heading label="Why Dev Studio" title="A product partner focused on useful outcomes." copy="Small, senior and practical. We make decisions quickly, communicate clearly and design every detail around the people using it." /><div className="principle-grid">{principles.map((item, index) => <article className={`reveal delay-${index % 3}`} key={item[1]}><b>{String(index + 1).padStart(2,"0")}</b><div className="icon-box">{item[0]}</div><h3>{item[1]}</h3><p>{item[2]}</p><span>{item[3]}</span></article>)}</div></div></section>
      <section className="process" id="process"><div className="process-grid" /><div className="shell"><Heading dark label="Our process" title="A clear path from first conversation to launch." copy="Structured enough to keep momentum. Flexible enough to learn as we build." /><div className="process-layout"><div className="process-orbit reveal"><div className="orbit-ring ring-1" /><div className="orbit-ring ring-2" /><div className="orbit-ring ring-3" /><div className="orbit-core"><span>Dev</span><b>Studio</b><small>Product delivery</small></div>{processSteps.map((step, index) => <div className={`orbit-node n${index + 1}`} key={step[0]}><i>{step[0]}</i><span>{step[1]}</span></div>)}</div><div className="process-steps">{processSteps.map((step, index) => <article className={`reveal${index % 2 ? " delay-1" : ""}`} key={step[0]}><span>{step[0]}</span><div><h3>{step[1]}</h3><p>{step[2]}</p><small>{step[3]}</small></div></article>)}</div></div></div></section>
      <section className="section stack" id="stack"><div className="shell"><Heading label="Technology stack" title="Modern tools for products that stay fast." copy="We choose technology around the product—not trends—balancing delivery speed, maintainability and room to grow." /><div className="stack-grid">{stacks.map((stack, index) => <article className={`reveal delay-${index % 3}`} key={String(stack[1])}><div className="stack-title"><div className="icon-box">{String(stack[0])}</div><span>{String(stack[1])}</span><small>{index < 3 ? "Core" : "Scale"}</small></div><p>{String(stack[2])}</p><div className="tags">{(stack[3] as string[]).map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div>
        <div className="cta-panel reveal" id="contact"><div className="cta-copy"><div className="eyebrow light"><span />Start a project</div><h2>Ready to build something your business can grow on?</h2><p>Tell us what you are planning. We will help turn the idea into a clear, buildable next step.</p><div className="hero-actions"><a className="button button-primary" href="mailto:hello@devstudio.com?subject=New%20project%20inquiry">hello@devstudio.com <span>↗</span></a><a className="button button-ghost" href="#top">Back to top ↑</a></div></div><div className="launch-card"><div className="launch-head"><span>Launch plan</span><small>Typical first steps</small></div><ul>{[["01","Project workshop","Goals, users and scope","1–2 days"],["02","Product blueprint","UX and technical plan","1 week"],["03","Build sprint","Design and development","2–8 weeks"]].map((step) => <li key={step[0]}><i>{step[0]}</i><p><b>{step[1]}</b><small>{step[2]}</small></p><em>{step[3]}</em></li>)}</ul><div className="launch-progress"><span><i /></span><small>From idea to a clear launch plan</small></div></div></div>
      </div></section>
    </main>
    <footer><div className="shell footer-grid"><div className="footer-brand"><a href="#top"><Brand /></a><p>Designing and building useful software for ambitious teams.</p><div className="availability"><i /> Available for selected projects</div></div><div><h4>Explore</h4><a href="#services">Services</a><a href="#work">Work</a><a href="#process">Process</a><a href="#stack">Technology</a></div><div><h4>Services</h4><a href="#services">Web & SaaS</a><a href="#services">Product design</a><a href="#services">Automation</a><a href="#services">Mobile apps</a></div><div><h4>Contact</h4><a href="mailto:hello@devstudio.com">hello@devstudio.com</a><span>Dhaka · Working worldwide</span><a href="#contact">Start a project ↗</a></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} Dev Studio. Built with care.</span><div><span>Privacy</span><span>Terms</span></div></div></footer>
  </>;
}
