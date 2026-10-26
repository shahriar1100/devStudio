// Existing Unsplash photographs. These are visual placeholders, not client work or UI screenshots.
// Request an already-compressed source instead of downloading a large PNG before optimization.
const photo = (id: string, width = 1600) => `https://images.unsplash.com/${id}?fm=webp&fit=crop&w=${width}&q=80`;
export const siteImages = {
  hero: photo("photo-1499951360447-b19be8fe80f5", 1400),
  about: photo("photo-1524758631624-e2822e304c36", 1200),
  mobile: photo("photo-1512496015851-a90fb38ba796", 384),
  dashboard: photo("photo-1551288049-bebda4e38f71", 480),
  services: { workspace: photo("photo-1497366754035-f200968a6e72") },
  portfolio: {
    "modina-fashion": photo("photo-1483985988355-763728e1935b"),
    "gadget-pro": photo("photo-1505740420928-5e560c06d30e"),
    "nexa-digital": photo("photo-1460925895917-afdab827c52f"),
    "shopnest": photo("photo-1556742049-0cfed4f6a45d"),
    "analytix-dashboard": photo("photo-1551288049-bebda4e38f71"),
    "urban-living": photo("photo-1600210492486-724fe5c67fb0"),
    "foodie-hub": photo("photo-1517248135467-4c7edcad34c4"),
    "estate-prime": photo("photo-1600596542815-ffad4c1539a9"),
    "eduflow": photo("photo-1522202176988-66273c2fd55f"),
    "fitzone": photo("photo-1534438327276-14e5300c3a48"),
  },
};
