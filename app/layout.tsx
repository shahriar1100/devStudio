import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dev Studio — Software built for growth",
  description: "Dev Studio builds high-performance websites, SaaS products, mobile experiences, and business automation.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
