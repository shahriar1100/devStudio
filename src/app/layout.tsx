import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/layout/providers";
import { AnnouncementBar, Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { site } from "@/config/site";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Dev Studio — We Build Your Ideas", template: "%s | Dev Studio" },
  description: site.description,
  applicationName: site.name,
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = { "@context": "https://schema.org", "@type": "Organization", name: site.name, url: site.url, description: site.description, ...(site.email ? { email: site.email } : {}), ...(site.facebook ? { sameAs: [site.facebook] } : {}) };
  return <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning><body className={`${inter.variable} ${space.variable}`}><Providers><a href="#main-content" className="skip-link">Skip to content</a><AnnouncementBar /><Navbar /><main id="main-content" tabIndex={-1}>{children}</main><Footer /></Providers><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /></body></html>;
}
