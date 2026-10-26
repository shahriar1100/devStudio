const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const site = {
  name: "Dev Studio",
  tagline: "We Build Your Ideas",
  url: configuredUrl.replace(/\/$/, ""),
  description: "Thoughtful design. Powerful development. Dev Studio builds modern websites for businesses in Bangladesh and beyond.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, ""),
};
export const navigation = [
  { href: "/", label: "Home" }, { href: "/about", label: "About" },
  { href: "/services", label: "Services" }, { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Pricing" }, { href: "/contact", label: "Contact" },
];
