export interface Package { title: string; audience: string; features: string[]; service: string; featured?: boolean }
export const packages: Package[] = [
  { title: "Single Product Landing Page", audience: "For one big idea that needs a focused introduction.", features: ["Custom landing page design", "Mobile-responsive layout", "Product & benefit sections", "Lead or order inquiry form", "Basic technical SEO", "Launch assistance"], service: "Landing Page" },
  { title: "Business Website", audience: "For businesses ready for a stronger digital presence.", features: ["Custom multi-page website", "Responsive UI/UX design", "Service & company pages", "Contact form integration", "SEO-friendly structure", "Content management options"], service: "Business Website" },
  { title: "E-commerce Website", audience: "For brands ready to make their next move online.", features: ["Custom online storefront", "Product & category management", "Cart & checkout integration", "Payment gateway setup", "Order management", "Handover & launch support"], service: "E-commerce Website", featured: true },
];
