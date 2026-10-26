import { Container, PageHero } from "@/components/ui/elements";
import { PortfolioFilter } from "@/components/portfolio/portfolio-filter";
import { CTASection } from "@/components/home/sections";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Portfolio — 10 Digital Design Concepts", "Explore ten original website and interface concepts, from fashion storefronts to dashboards. All projects are clearly labeled concepts with stock placeholders.", "/portfolio");
export default function PortfolioPage() {
  return <><PageHero eyebrow="Our portfolio" title={<>Our work speaks<br />through design<span className="blue-dot">.</span></>} description="Explore creative digital experiences and modern interface concepts. Ten ideas. Ten different possibilities."><span className="concept-pill">Concept projects · stock photographs, not live website screenshots</span></PageHero><section className="section"><Container><PortfolioFilter /></Container></section><CTASection /></>;
}
