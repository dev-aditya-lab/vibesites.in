export const primaryNav = [
  { label: "Services", href: "/services", megaMenu: true },
  { label: "Products", href: "/vibeproducts/rewardLoop", productsMenu: true },
  { label: "Work", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  // { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Vibesites' own SaaS products, shown in the navbar "Products" dropdown. */
export const products = [
  {
    key: "rewardloop",
    name: "RewardLoop",
    tagline: "QR-based loyalty & rewards for restaurants",
    href: "/vibeproducts/rewardLoop",
    icon: "Infinity",
    status: "live",
  },
  {
    key: "next-product",
    name: "New Product",
    tagline: "Something new is brewing — stay tuned",
    href: null,
    icon: "Sparkles",
    status: "soon",
  },
];

export const footerNav = {
  company: [
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Get a Quote", href: "/quote" },
  ],
  services: [
    { label: "Web Design & Development", href: "/services#web" },
    { label: "E-Commerce Solutions", href: "/services#ecommerce" },
    { label: "Mobile App Development", href: "/services#apps" },
    { label: "SEO & Content", href: "/services#marketing" },
    { label: "WordPress & Shopify", href: "/services#platforms" },
  ],
  resources: [
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
    { label: "Testimonials", href: "/testimonials" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
};
