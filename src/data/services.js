export const serviceCategories = [
  { key: "web", label: "Web Design & Development", anchor: "web", icon: "Globe", description: "Sites built from scratch to convert, on any budget." },
  { key: "ecommerce", label: "E-Commerce", anchor: "ecommerce", icon: "ShoppingCart", description: "Stores engineered to turn browsers into buyers." },
  { key: "apps", label: "Mobile Apps", anchor: "apps", icon: "Smartphone", description: "Native and cross-platform apps people actually use." },
  { key: "marketing", label: "Marketing & Brand", anchor: "marketing", icon: "Megaphone", description: "Get found, get remembered, get chosen." },
  { key: "platforms", label: "Platforms & Integrations", anchor: "platforms", icon: "Blocks", description: "WordPress, Shopify, and the tools that connect them." },
  { key: "addons", label: "Business Essentials", anchor: "addons", icon: "Briefcase", description: "The supporting pieces every online business needs." },
];

export const popularServiceSlugs = [
  "custom-website-design",
  "web-app-development",
  "ecommerce-solutions",
  "wordpress-development",
  "shopify-development",
  "seo-services",
  "mobile-app-development",
  "crm-development",
  "erp-development",
];

/** Curated per-category picks shown in the header mega menu (not the full category list). */
export const megaMenuHighlights = {
  web: ["custom-website-design", "landing-page-design", "web-app-development"],
  ecommerce: ["ecommerce-solutions", "payment-gateway-integration"],
  apps: ["mobile-app-development", "react-native-app-development", "chatbot-whatsapp-integration"],
  marketing: ["seo-services", "content-writing", "logo-brand-identity"],
  platforms: ["wordpress-development", "shopify-development", "cms-setup"],
  addons: ["crm-development", "erp-development"],
};

export const services = [
  // ---- Web Design & Development ----
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
    slug: "landing-page-design",
    title: "Landing Page Design",
    category: "web",
    icon: "MousePointerClick",
    summary: "A single, obsessively-focused page built around one goal: getting the visitor to act.",
    description:
      "No navigation to wander off into, no competing messages — just a tightly written, conversion-tested page built around one offer. We design and A/B-ready every element around the single action you need visitors to take, whether that's a signup, a purchase, or a booking.",
    features: [
      "Conversion-focused copy and layout",
      "Above-the-fold offer clarity",
      "Built-in lead capture and analytics events",
      "Mobile-first, fast-loading build",
      "Optional A/B test variant setup",
    ],
    idealFor: "Ad campaigns, product launches, lead-gen offers.",
    turnaround: "3–5 business days",
  },
  {
    slug: "web-app-development",
    title: "Web App Development",
    category: "web",
    icon: "AppWindow",
    summary: "Interactive, logic-driven web applications — dashboards, portals, and internal tools, not just marketing pages.",
    description:
      "When your product is the software itself — a dashboard, a booking system, an internal tool — you need engineering, not just design. We build full-stack web applications with real business logic, user accounts, and data behind them, architected to scale as your usage grows.",
    features: [
      "Full-stack architecture and database design",
      "User authentication and role-based permissions",
      "Custom dashboards and data visualizations",
      "API-first backend, ready to connect to other tools",
      "Cloud deployment and scaling setup",
    ],
    idealFor: "SaaS products, internal tools, customer portals.",
    turnaround: "6–14 weeks",
  },
  {
    slug: "website-migration",
    title: "Website Migration",
    category: "web",
    icon: "ArrowRightLeft",
    summary: "Move platforms, hosts, or frameworks without losing traffic, rankings, or your mind.",
    description:
      "Migrations fail quietly — a missed redirect here, a broken form there, and months later you're wondering where the traffic went. We plan migrations URL by URL, with a full redirect map and staging environment testing, so the only thing that changes for your visitors is that everything works better.",
    features: [
      "Full site and URL audit before migration",
      "301 redirect mapping to preserve SEO",
      "Staging environment testing before go-live",
      "Zero-downtime cutover planning",
      "Post-migration ranking and traffic monitoring",
    ],
    idealFor: "Businesses switching platforms, hosts, or frameworks.",
    turnaround: "2–5 weeks",
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

  // ---- E-Commerce ----
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
    slug: "payment-gateway-integration",
    title: "Payment Gateway Integration",
    category: "ecommerce",
    icon: "CreditCard",
    summary: "Accept payments smoothly and securely, wherever your customers are.",
    description:
      "A clunky checkout is where sales go to die. We integrate the right payment providers for your market — cards, wallets, local methods — with a checkout flow tested for speed and trust, and PCI-compliant handling throughout.",
    features: [
      "Stripe, PayPal, Razorpay, or regional gateway setup",
      "Multiple currency and local payment method support",
      "PCI-compliant, secure checkout flow",
      "Subscription and recurring billing support",
      "Fraud and failed-payment handling",
    ],
    idealFor: "Any store or app that needs to get paid reliably.",
    turnaround: "1–2 weeks",
  },

  // ---- Mobile Apps ----
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
    slug: "chatbot-whatsapp-integration",
    title: "Chatbot & WhatsApp Integration",
    category: "apps",
    icon: "MessagesSquare",
    summary: "Automate first responses and routine questions without losing the human touch.",
    description:
      "We build chatbots and WhatsApp Business API integrations that handle FAQs, capture leads, and route conversations to your team when it matters — so you respond faster without hiring a bigger support team.",
    features: [
      "WhatsApp Business API setup",
      "Custom chatbot flows and FAQ automation",
      "Lead capture and CRM handoff",
      "Website live-chat integration",
      "Human handoff for complex conversations",
    ],
    idealFor: "Businesses with high inbound message volume.",
    turnaround: "2–4 weeks",
  },

  // ---- Marketing & Brand ----
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
    slug: "ui-ux-audit-redesign",
    title: "UI/UX Audit & Redesign",
    category: "marketing",
    icon: "ClipboardCheck",
    summary: "A structured review of why visitors leave without converting — and a plan to fix it.",
    description:
      "Sometimes the fastest win isn't a full rebuild — it's fixing what's quietly broken. We run a structured usability audit against your analytics and real user behavior, then deliver prioritized, high-impact design fixes ranked by effort versus expected lift.",
    features: [
      "Full usability and conversion audit",
      "Heatmap and user behavior analysis",
      "Prioritized fix list ranked by impact",
      "Before/after mockups for key pages",
      "Implementation support included",
    ],
    idealFor: "Sites with traffic but disappointing conversion rates.",
    turnaround: "1–3 weeks",
  },
  {
    slug: "logo-brand-identity",
    title: "Logo & Brand Identity",
    category: "marketing",
    icon: "Palette",
    summary: "A visual identity your website, socials, and print materials can all stand on.",
    description:
      "Before we design a single web page, some clients need the brand itself: a logo, a color and type system, and usage guidelines that keep everything — web, social, business cards — looking like the same company. We design identities built to hold up across every surface.",
    features: [
      "Logo design with multiple concepts",
      "Color palette and typography system",
      "Brand guidelines document",
      "Social media and print-ready asset kit",
      "Unlimited revisions within scope",
    ],
    idealFor: "New businesses or brands overdue for a refresh.",
    turnaround: "1–3 weeks",
  },
  {
    slug: "social-media-setup-branding",
    title: "Social Media Page Setup & Branding",
    category: "marketing",
    icon: "Share2",
    summary: "Professional, on-brand social profiles that match the quality of your new website.",
    description:
      "A great website undercut by a half-finished Instagram bio and a stretched logo on Facebook sends the wrong signal. We set up and brand your core social profiles to match your new site — consistent visuals, complete profiles, ready to post from day one.",
    features: [
      "Profile setup across key platforms",
      "On-brand cover images and profile assets",
      "Bio and link-in-bio optimization",
      "Highlight covers and templates (Instagram)",
      "Posting style guide for your team",
    ],
    idealFor: "Businesses launching or refreshing their social presence.",
    turnaround: "3–5 business days",
  },
  {
    slug: "analytics-tracking-setup",
    title: "Analytics & Tracking Setup",
    category: "marketing",
    icon: "LineChart",
    summary: "Know exactly where your visitors come from and what they do before you scale spend.",
    description:
      "You can't improve what you can't measure. We set up analytics and conversion tracking correctly from day one — goals, events, and dashboards tied to what actually matters to your business, not just pageviews.",
    features: [
      "Google Analytics 4 and Tag Manager setup",
      "Conversion goal and event tracking",
      "Ad platform pixel integration (Meta, Google)",
      "Custom reporting dashboard",
      "Monthly performance summary (optional)",
    ],
    idealFor: "Anyone running paid ads or tracking growth seriously.",
    turnaround: "3–5 business days",
  },

  // ---- Platforms & Integrations ----
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
    slug: "cms-setup",
    title: "Content Management System Setup",
    category: "platforms",
    icon: "Database",
    summary: "Edit your own site confidently, without needing a developer for every text change.",
    description:
      "We set up and structure a CMS — headless or traditional — around how your team actually publishes, with clear content models and an editor experience that doesn't require a manual. You get the freedom to update; we keep the guardrails in place so nothing breaks.",
    features: [
      "CMS selection matched to your team's workflow",
      "Custom content models and field structures",
      "Editor role and permission setup",
      "Team training session included",
      "Documentation for ongoing use",
    ],
    idealFor: "Teams that publish or update content regularly.",
    turnaround: "1–3 weeks",
  },
  {
    slug: "api-integration",
    title: "API Integration",
    category: "platforms",
    icon: "Plug",
    summary: "Connect your website to the tools your business already runs on.",
    description:
      "Your website shouldn't be an island. We connect your site to CRMs, inventory systems, booking tools, shipping providers, and internal APIs — so data flows automatically instead of being re-typed by hand.",
    features: [
      "Third-party and custom API integration",
      "Webhook and automation setup",
      "Data sync between site and internal systems",
      "Error handling and monitoring",
      "Documentation for your dev team",
    ],
    idealFor: "Businesses connecting a site to existing software.",
    turnaround: "1–4 weeks",
  },
  {
    slug: "website-speed-performance-optimization",
    title: "Website Speed & Performance Optimization",
    category: "platforms",
    icon: "Gauge",
    summary: "Shave seconds off load time — and watch bounce rate and rankings respond.",
    description:
      "Page speed affects rankings, conversion, and how premium your brand feels within the first two seconds. We audit and fix the real bottlenecks — images, scripts, hosting, render-blocking resources — with before/after benchmarks so you can see the impact.",
    features: [
      "Full Core Web Vitals audit",
      "Image and asset optimization",
      "Script and third-party tag cleanup",
      "Caching and CDN configuration",
      "Before/after performance report",
    ],
    idealFor: "Any existing site that feels slow or scores poorly on PageSpeed.",
    turnaround: "1–2 weeks",
  },

  // ---- Business Essentials (with full detail pages) ----
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
