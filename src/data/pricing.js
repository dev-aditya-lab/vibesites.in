export const plans = [
  {
    key: "launch",
    name: "Launch",
    tagline: "Get online fast, without cutting corners.",
    price: 6999,
    priceLabel: "₹6,999",
    priceNote: "one-time",
    bestFor: "New businesses & personal brands",
    cta: "Start with Launch",
    highlighted: false,
    features: [
      "Up to 5 pages",
      "Premium template, fully brand-customized",
      "Mobile-first responsive design",
      "Basic on-page SEO setup",
      "Contact form + WhatsApp integration",
      "2 rounds of revisions",
      "5-business-day turnaround",
      "14-day post-launch support",
    ],
  },
  {
    key: "growth",
    name: "Growth",
    tagline: "A fully custom site engineered to convert.",
    price: 12999,
    priceLabel: "₹12,999",
    priceNote: "one-time",
    bestFor: "Growing businesses ready to stand out",
    cta: "Start with Growth",
    highlighted: true,
    badge: "Most Popular",
    features: [
      "Up to 10 pages",
      "100% custom design system",
      "CMS for self-editing content",
      "Advanced on-page + technical SEO",
      "Custom animation & micro-interactions",
      "Blog / content hub included",
      "4 rounds of revisions",
      "3–5 week turnaround",
      "60-day post-launch support",
    ],
  },
  {
    key: "scale",
    name: "Scale",
    tagline: "E-commerce and complex builds, done right.",
    price: 19999,
    priceLabel: "From ₹19,999",
    priceNote: "one-time",
    bestFor: "E-commerce, apps & multi-feature platforms",
    cta: "Start with Scale",
    highlighted: false,
    features: [
      "Unlimited core pages",
      "Full custom design + UX strategy sprint",
      "E-commerce or web-app functionality",
      "Third-party integrations (CRM, payments, ERP)",
      "Advanced SEO + performance optimization",
      "Unlimited revisions within scope",
      "6–12 week turnaround",
      "90-day post-launch support",
    ],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    tagline: "Custom scope for complex, multi-team projects.",
    price: null,
    priceLabel: "Custom Quote",
    priceNote: "project-based",
    bestFor: "Corporations, platforms & multi-app ecosystems",
    cta: "Talk to us",
    highlighted: false,
    features: [
      "Everything in Scale",
      "Dedicated project & design team",
      "Multi-platform (web + mobile + backend)",
      "Custom integrations & data migration",
      "SLA-backed support",
      "Ongoing retainer options available",
    ],
  },
];

export const comparisonRows = [
  { feature: "Pages included", launch: "Up to 5", growth: "Up to 10", scale: "Unlimited", enterprise: "Unlimited" },
  { feature: "Design approach", launch: "Premium template", growth: "Fully custom", scale: "Custom + UX strategy", enterprise: "Custom, multi-team" },
  { feature: "Content management system", launch: false, growth: true, scale: true, enterprise: true },
  { feature: "E-commerce functionality", launch: false, growth: "Add-on", scale: true, enterprise: true },
  { feature: "Custom animation & interactions", launch: false, growth: true, scale: true, enterprise: true },
  { feature: "On-page SEO setup", launch: true, growth: true, scale: true, enterprise: true },
  { feature: "Technical SEO audit", launch: false, growth: true, scale: true, enterprise: true },
  { feature: "Blog / content hub", launch: false, growth: true, scale: true, enterprise: true },
  { feature: "Third-party integrations", launch: false, growth: "Basic", scale: "Advanced", enterprise: "Unlimited" },
  { feature: "Revision rounds", launch: "2", growth: "4", scale: "Unlimited (in scope)", enterprise: "Unlimited (in scope)" },
  { feature: "Dedicated project manager", launch: false, growth: true, scale: true, enterprise: true },
  { feature: "Post-launch support", launch: "14 days", growth: "60 days", scale: "90 days", enterprise: "SLA-backed" },
  { feature: "Typical turnaround", launch: "5 business days", growth: "3–5 weeks", scale: "6–12 weeks", enterprise: "Fully scoped" },
];

export const pricingFaqs = [
  {
    question: "Is this really a one-time payment, not a subscription?",
    answer:
      "Yes. Every plan is project-based — you pay once for the design and build. The only ongoing cost is optional: hosting, domain renewal, or a maintenance retainer if you want us to keep managing the site after launch.",
  },
  {
    question: "What happens if I need more pages or features than my plan includes?",
    answer:
      "We'll quote the difference transparently before any work starts — no surprise invoices. Most clients upgrade tiers or add scoped extras, and we always tell you the cost upfront.",
  },
  {
    question: "Do I own the final website and code?",
    answer:
      "100%. Once the project is paid in full, the code, design files, and content are entirely yours — no lock-in, no recurring license fees.",
  },
  {
    question: "Can I pay in installments?",
    answer:
      "Yes. Standard terms are 50% to start and 50% on delivery, and larger Scale/Enterprise projects can be split into milestone payments.",
  },
  {
    question: "What if I'm not happy with the design?",
    answer:
      "Every plan includes structured revision rounds, and we run an alignment call before development starts to lock in direction. If something's off, you tell us and we fix it within the included rounds — no debate.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "If we haven't started design work, you're eligible for a full refund. Once design work begins, refunds are prorated based on work completed — see our Refund Policy for full details.",
  },
];
