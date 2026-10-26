import Link from "next/link";
import { ArrowUpRight, Code2, Layers, Rocket, Settings2, ShoppingBag, Sparkles } from "lucide-react";
import type { Service } from "@/types/content";
const icons = { store: ShoppingBag, rocket: Rocket, code: Code2, layers: Layers, sparkles: Sparkles, settings: Settings2 };
export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = icons[service.icon];
  return <article className="service-card"><div className="service-top"><span className="service-icon"><Icon size={25} strokeWidth={1.5} /></span><span className="card-number">0{index + 1}</span></div><h3><Link href={`/services/${service.slug}`}>{service.title}</Link></h3><p>{service.description}</p><ul>{service.features.slice(0, 2).map(feature => <li key={feature}>{feature}</li>)}</ul><Link className="service-link" href={`/services/${service.slug}`}>Explore service <ArrowUpRight size={19} /><span className="sr-only">: {service.title}</span></Link></article>;
}
