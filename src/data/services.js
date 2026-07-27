export const serviceCategories = [
  { key: "web", label: "Web Design & Development", anchor: "web" },
  { key: "ecommerce", label: "E-Commerce", anchor: "ecommerce" },
  { key: "apps", label: "Mobile App Development", anchor: "apps" },
  { key: "marketing", label: "Marketing", anchor: "marketing" },
  { key: "platforms", label: "Platforms", anchor: "platforms" },
  { key: "addons", label: "Business Essentials", anchor: "addons" },
];

export const popularServiceSlugs = [
  "custom-website-design",
  "website-development",
  "ecommerce-development",
  "wordpress-development",
  "shopify-development",
  "seo-services",
  "mobile-app-development",
  "crm-development",
  "erp-development",
];

export const services = [
  {
    slug: "static-website-design",
    title: "Static Website Design",
    category: "web",
    icon: "FileCode2",
    summary: "Fast, lightweight sites for businesses that need to make a sharp first impression without ongoing content changes.",
    description:
      "A static website is the fastest way to get a professional, credible presence online. We hand-code every page for speed and clarity, so it loads instantly, ranks well, and holds up on any device. It's the right call when your content doesn't change daily and your priority is speed, cost-efficiency, and rock-solid reliability.",
    features: [
      "Hand-built HTML/CSS/JS or Next.js static export",
      "Sub-second load times, 95+ Core Web Vitals scores",
      "Mobile-first, pixel-perfect responsive layouts",
      "On-page SEO structure baked in from day one",
      "Free hosting setup guidance",
    ],
    idealFor: "Portfolios, brochure sites, landing pages, personal brands.",
    turnaround: "5–10 business days",
  },
  {
    slug: "dynamic-website-design",
    title: "Dynamic Website Design",
    category: "web",
    icon: "Layers",
    summary: "Database-backed sites where your content, users, and pages can change and grow without a rebuild.",
    description:
      "When your business needs logins, a content management system, filtered listings, or anything that changes based on who's looking, you need a dynamic build. We architect the backend and admin tooling so you (or your team) can update content confidently, without ever touching code.",
    features: [
      "Custom CMS or headless CMS integration",
      "User accounts, dashboards, and role-based access",
      "Dynamic content, search, and filtering",
      "Scalable database architecture",
      "Admin training and documentation included",
    ],
    idealFor: "Directories, membership sites, SaaS marketing sites, portals.",
    turnaround: "3–6 weeks",
  },
  {
    slug: "ecommerce-solutions",
    title: "E-Commerce Solutions",
    category: "ecommerce",
    icon: "ShoppingCart",
    summary: "Full online stores built to convert browsers into buyers, from catalog to checkout to fulfillment.",
    description:
      "We build stores that sell — not just stores that exist. From product architecture and merchandising to a frictionless checkout and post-purchase flows, every decision is made to reduce cart abandonment and increase average order value.",
    features: [
      "Shopify, WooCommerce, or custom storefronts",
      "Secure payment gateway integration",
      "Inventory, shipping, and tax configuration",
      "Conversion-optimized product and cart pages",
      "Analytics and abandoned-cart recovery setup",
    ],
    idealFor: "Retail brands, D2C launches, multi-product catalogs.",
    turnaround: "3–8 weeks",
  },
  {
    slug: "web-maintenance",
    title: "Web Maintenance",
    category: "web",
    icon: "Wrench",
    summary: "Ongoing updates, monitoring, and support so your site stays fast, secure, and current.",
    description:
      "A website is never really 'done.' We keep your platform, plugins, and dependencies updated, monitor uptime and speed, patch security issues proactively, and make the small content edits that keep your site accurate — so you never have to think about it.",
    features: [
      "Monthly updates, backups, and security patches",
      "Uptime and performance monitoring",
      "Priority bug fixes",
      "Minor content and design edits included",
      "Monthly health report",
    ],
    idealFor: "Any live site that needs to stay healthy long-term.",
    turnaround: "Ongoing, monthly retainer",
  },
  {
    slug: "custom-website-design",
    title: "Custom Website Design",
    category: "web",
    icon: "PenTool",
    summary: "A fully bespoke design and build, engineered around your brand and business goals — nothing templated.",
    description:
      "This is our flagship offering: a website designed from a blank canvas around your brand, your customers, and your goals. We handle strategy, UX, visual design, animation, and development end-to-end, producing a site that looks and feels unmistakably yours.",
    features: [
      "Discovery and UX strategy workshop",
      "Fully custom visual design system",
      "Bespoke animation and micro-interactions",
      "Hand-coded, framework-based development",
      "Dedicated project manager and design lead",
    ],
    idealFor: "Brands who need to stand out and own their category.",
    turnaround: "4–10 weeks",
  },
  {
    slug: "basic-website-design",
    title: "Basic Website Design",
    category: "web",
    icon: "LayoutTemplate",
    summary: "A polished, template-based site that gets you online quickly on a lean budget.",
    description:
      "Not every business needs a from-scratch build on day one. We start from a premium template and tailor the layout, colors, copy, and imagery to your brand, giving you a genuinely good-looking site fast — with a clear upgrade path to custom later.",
    features: [
      "Curated premium template selection",
      "Full brand customization (colors, fonts, imagery)",
      "Up to 5 pages included",
      "Mobile-responsive out of the box",
      "Quick turnaround",
    ],
    idealFor: "New businesses and tight-timeline launches.",
    turnaround: "3–5 business days",
  },
  {
    slug: "website-redesign",
    title: "Website Redesign",
    category: "web",
    icon: "RefreshCw",
    summary: "A ground-up refresh of an outdated site — same domain, entirely new impression.",
    description:
      "If your current site is hurting conversions, feels dated, or simply doesn't reflect where your business is today, we audit what's underperforming, keep what works (SEO equity, structure), and rebuild the rest with modern design and performance standards.",
    features: [
      "Full UX and performance audit of the existing site",
      "SEO-safe migration plan",
      "Modernized visual design and content structure",
      "Before/after conversion benchmarking",
      "Redirect mapping to preserve search rankings",
    ],
    idealFor: "Established businesses with a site 3+ years old.",
    turnaround: "3–6 weeks",
  },
  {
    slug: "corporate-website",
    title: "Corporate Website",
    category: "web",
    icon: "Building2",
    summary: "A credible, structured web presence for established companies, investors, and enterprise buyers.",
    description:
      "Corporate sites need to do a different job: build trust with investors, partners, press, and enterprise buyers at scale. We design for clarity, governance, and multi-department content needs, with the polish that signals stability.",
    features: [
      "Multi-department content architecture",
      "Leadership, investor, and press sections",
      "Careers and multi-location support",
      "Accessibility (WCAG) compliance",
      "Enterprise-grade hosting recommendations",
    ],
    idealFor: "Established companies, multi-location businesses.",
    turnaround: "4–8 weeks",
  },
  {
    slug: "micro-website",
    title: "Micro Website",
    category: "web",
    icon: "Sparkles",
    summary: "A focused, single-purpose site for a campaign, event, or product launch.",
    description:
      "Sometimes you need one page to do one job exceptionally well — sell an event, launch a product, or run a campaign. We design tight, high-conversion micro-sites that go live fast and can be retired or repurposed just as easily.",
    features: [
      "1–3 page focused build",
      "Campaign-specific copy and design",
      "Built-in lead capture / RSVP forms",
      "Fast turnaround",
      "Easy analytics tracking setup",
    ],
    idealFor: "Product launches, events, promotions, campaigns.",
    turnaround: "2–4 business days",
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    category: "apps",
    icon: "Smartphone",
    summary: "Native and cross-platform apps designed for real daily use, not just app-store screenshots.",
    description:
      "We design and build mobile apps end-to-end — UX flows, UI design, development, and store submission. Whether you need a native Android app or a cross-platform build that ships to iOS and Android from one codebase, we scope the right approach for your budget and timeline.",
    features: [
      "Product strategy and UX flow mapping",
      "Native Android or React Native builds",
      "Backend/API integration",
      "App Store & Play Store submission support",
      "Post-launch monitoring and updates",
    ],
    idealFor: "Startups and businesses launching a mobile product.",
    turnaround: "6–14 weeks",
  },
  {
    slug: "android-app-development",
    title: "Android App Development",
    category: "apps",
    icon: "Bot",
    summary: "Native Android apps built with Kotlin for performance-critical, deeply integrated experiences.",
    description:
      "When your app needs to squeeze the most out of Android — background services, hardware access, deep OS integration — native is the right call. We build in Kotlin with modern Android architecture so your app is fast, stable, and maintainable.",
    features: [
      "Native Kotlin development",
      "Material Design 3 UI",
      "Play Store optimization and submission",
      "Push notifications and analytics",
      "Ongoing version support",
    ],
    idealFor: "Android-first or performance-critical apps.",
    turnaround: "5–12 weeks",
  },
  {
    slug: "react-native-app-development",
    title: "React Native App Development",
    category: "apps",
    icon: "Layers3",
    summary: "One codebase, both app stores — ship faster without compromising on native feel.",
    description:
      "React Native lets us build for iOS and Android simultaneously, cutting cost and time-to-market while still delivering a native look and feel. It's our default recommendation for most startups and product teams that need to move fast.",
    features: [
      "Single codebase for iOS + Android",
      "Native-feeling UI and gestures",
      "Shared logic with your web app where useful",
      "Over-the-air update support",
      "App Store & Play Store submission support",
    ],
    idealFor: "Startups launching on both platforms at once.",
    turnaround: "6–12 weeks",
  },
  {
    slug: "seo-services",
    title: "SEO",
    category: "marketing",
    icon: "Search",
    summary: "Technical, on-page, and content SEO that compounds — built into the site, not bolted on after.",
    description:
      "Search visibility isn't a plugin, it's an outcome of how a site is built and maintained. We handle technical SEO (site speed, structured data, crawlability), on-page optimization, and ongoing content strategy so your rankings grow month over month.",
    features: [
      "Technical SEO audit and fixes",
      "Keyword research and content mapping",
      "On-page optimization (titles, schema, internal linking)",
      "Monthly ranking and traffic reporting",
      "Local SEO / Google Business Profile setup",
    ],
    idealFor: "Any business that needs to be found on Google.",
    turnaround: "Ongoing, monthly retainer",
  },
  {
    slug: "content-writing",
    title: "Content Writing",
    category: "marketing",
    icon: "FileEdit",
    summary: "Persuasive, on-brand copy that reads like it was written for one visitor, not everyone.",
    description:
      "Great design can only take a page so far — the words are what move people to act. Our writers craft page copy, blog content, and product descriptions that speak directly to your customer's situation and guide them toward a decision.",
    features: [
      "Website and landing page copywriting",
      "SEO-optimized blog content",
      "Product and service descriptions",
      "Brand tone-of-voice guidelines",
      "Unlimited revision rounds within scope",
    ],
    idealFor: "Any site that needs copy that actually converts.",
    turnaround: "3–7 business days per batch",
  },
  {
    slug: "wordpress-development",
    title: "WordPress Development",
    category: "platforms",
    icon: "Feather",
    summary: "Custom WordPress builds that stay easy to manage without looking or feeling like a template.",
    description:
      "WordPress powers a huge share of the web for good reason — it's flexible and easy to hand off. We build custom themes and blocks rather than relying on bloated page builders, so your site stays fast, secure, and genuinely custom.",
    features: [
      "Custom theme and block development",
      "Plugin selection and configuration",
      "Editor-friendly content structure",
      "Security hardening",
      "Speed optimization (caching, image delivery)",
    ],
    idealFor: "Content-heavy sites, blogs, teams that self-manage content.",
    turnaround: "3–6 weeks",
  },
  {
    slug: "shopify-development",
    title: "Shopify Development",
    category: "platforms",
    icon: "ShoppingBag",
    summary: "Custom Shopify themes and app integrations built for conversion, not just checkout.",
    description:
      "Shopify handles the commerce plumbing so we can focus on what actually drives sales — merchandising, custom sections, upsell flows, and a checkout experience tuned for your product. We build custom themes rather than stock templates.",
    features: [
      "Custom Shopify theme development",
      "App integrations (reviews, subscriptions, upsells)",
      "Product and collection page optimization",
      "Shopify Payments and shipping setup",
      "Post-launch conversion tracking",
    ],
    idealFor: "D2C brands and product businesses on Shopify.",
    turnaround: "3–7 weeks",
  },
  {
    slug: "crm-development",
    title: "CRM Development",
    category: "addons",
    icon: "Contact",
    summary: "Custom CRM tooling that fits how your sales team actually works, not the other way around.",
    description:
      "Off-the-shelf CRMs often force your process to bend around the software. We build custom CRM systems and integrations that track leads, automate follow-ups, and give your team the exact view they need to close deals.",
    features: [
      "Custom lead and pipeline tracking",
      "Automated follow-up workflows",
      "Third-party integrations (email, WhatsApp, forms)",
      "Role-based dashboards and reporting",
      "Data migration from existing tools",
    ],
    idealFor: "Sales-driven businesses outgrowing spreadsheets.",
    turnaround: "4–10 weeks",
  },
  {
    slug: "erp-development",
    title: "ERP Development",
    category: "addons",
    icon: "Boxes",
    summary: "Operational software that connects inventory, orders, and finance into one system of record.",
    description:
      "As operations scale past spreadsheets and disconnected tools, a custom ERP keeps inventory, procurement, orders, and finance in sync in real time. We design modules around your actual operational workflow, not a generic template.",
    features: [
      "Inventory and order management modules",
      "Finance and reporting dashboards",
      "Multi-user, role-based permissions",
      "Integration with existing business tools",
      "Staff training and documentation",
    ],
    idealFor: "Growing operations teams managing complex workflows.",
    turnaround: "6–16 weeks",
  },
];

export const addonServices = [
  {
    slug: "business-email",
    title: "Business Email Setup",
    icon: "Mail",
    summary: "Professional @yourdomain.com inboxes set up and configured for your whole team.",
  },
  {
    slug: "domain-registration",
    title: "Domain Registration",
    icon: "Globe",
    summary: "We find, register, and configure the right domain so your brand owns its address.",
  },
  {
    slug: "hosting",
    title: "Hosting",
    icon: "Server",
    summary: "Fast, secure, monitored hosting matched to your site's actual traffic and needs.",
  },
  {
    slug: "it-consulting",
    title: "IT Consulting",
    icon: "Headphones",
    summary: "Straight-talk technical advice on stack, tooling, and infrastructure decisions.",
  },
];

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category) {
  return services.filter((s) => s.category === category);
}
