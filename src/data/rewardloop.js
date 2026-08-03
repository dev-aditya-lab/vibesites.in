export const rewardLoopConfig = {
  name: "RewardLoop",
  tagline: "The QR-based loyalty & rewards platform for restaurants.",
  description:
    "RewardLoop is a QR-based loyalty & rewards platform that helps restaurants increase repeat visits, customer retention, and lifetime value — effortlessly.",
  url: "https://vibesites.in/vibeproducts/rewardLoop",
  parentUrl: "https://vibesites.in",
  contactEmail: "hello@vibesites.in",
  whatsapp: {
    display: "+1 555-363-9502",
    e164: "15553639502",
  },
};

export function buildRLWhatsAppLink(message) {
  const base = `https://wa.me/${rewardLoopConfig.whatsapp.e164}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const rlDemoMessage = "Hi! I'd like to book a demo of RewardLoop for my restaurant.";

export const rlPrimaryNav = [
  { label: "Product", href: "/vibeproducts/rewardLoop" },
  { label: "How It Works", href: "/vibeproducts/rewardLoop/how-it-works" },
  { label: "Features", href: "/vibeproducts/rewardLoop#features" },
  { label: "Pricing", href: "/vibeproducts/rewardLoop/pricing" },
  { label: "Contact", href: "/vibeproducts/rewardLoop/contact" },
];

export const rlFooterNav = {
  product: [
    { label: "Features", href: "/vibeproducts/rewardLoop#features" },
    { label: "How It Works", href: "/vibeproducts/rewardLoop/how-it-works" },
    { label: "Pricing", href: "/vibeproducts/rewardLoop/pricing" },
  ],
  business: [
    { label: "For Restaurants", href: "/vibeproducts/rewardLoop" },
    { label: "Request a Demo", href: "/vibeproducts/rewardLoop/contact" },
    { label: "Talk to Sales", href: "/vibeproducts/rewardLoop/contact" },
  ],
  company: [
    { label: "About Vibesites", href: "/about" },
    { label: "Contact Us", href: "/vibeproducts/rewardLoop/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
};

/* ---- Hero trust bullets ---- */
export const rlHeroBullets = ["No App for Customers", "Easy to Set Up", "Used by 500+ Restaurants"];

/* ---- Trusted-by marquee (placeholder restaurant names — swap for real logos post-launch) ---- */
export const rlTrustedLogos = [
  "Spice House",
  "Grill Nation",
  "Café Delight",
  "Urban Tadka",
  "Biryani Blues",
  "The Food Court",
];

/* ---- Features grid ---- */
export const rlFeatures = [
  {
    icon: "QrCode",
    title: "QR-Based Check-In",
    description: "Customers check in by scanning a QR, no app required.",
  },
  {
    icon: "ReceiptText",
    title: "Receipt Verification",
    description: "Valid visits using receipt number + location verification.",
  },
  {
    icon: "Sparkles",
    title: "Smart Rewards",
    description: "Create custom rewards and set visit goals.",
  },
  {
    icon: "TrendingUp",
    title: "Real-time Analytics",
    description: "Track visits, redemptions and customer insights.",
  },
  {
    icon: "Users",
    title: "Customer Database",
    description: "Build your own customer list automatically.",
  },
  {
    icon: "Bell",
    title: "Notifications",
    description: "Send offers & reminders to bring customers back.",
  },
  {
    icon: "ShieldCheck",
    title: "Fraud Protection",
    description: "Advanced anti-cheat & location verification system.",
  },
  {
    icon: "LayoutDashboard",
    title: "Easy Dashboard",
    description: "Manage everything from a simple, powerful dashboard.",
  },
];

/* ---- Condensed 5-step "How It Works" preview (used on the home page) ---- */
export const rlStepsPreview = [
  { number: "01", icon: "QrCode", title: "Scan QR Code", description: "Customer scans your restaurant's QR code." },
  { number: "02", icon: "UserRound", title: "Enter Details", description: "They enter their name, phone number and receipt number." },
  { number: "03", icon: "MapPin", title: "Verify Visit", description: "We verify receipt and location to confirm a valid visit." },
  { number: "04", icon: "CheckCircle2", title: "Earn Progress", description: "Visit is added and progress moves toward the next reward." },
  { number: "05", icon: "Gift", title: "Get Rewarded", description: "Complete the goal and unlock exciting rewards!" },
];

/* ---- Full 5-step timeline, used on the How It Works page ---- */
export const rlSteps = [
  {
    number: 1,
    icon: "QrCode",
    title: "Scan QR Code",
    description: "Customers scan your restaurant's QR code from their table.",
    tipIcon: "QrCode",
    tip: "Place QR on tables, bills, or posters.",
    mock: "scan",
  },
  {
    number: 2,
    icon: "UserRound",
    title: "Enter Your Details",
    description: "Add your phone number and name. No OTP required — just real, quick signup.",
    tipIcon: "UserRound",
    tip: "Your information stays secure and private.",
    mock: "details",
  },
  {
    number: 3,
    icon: "ReceiptText",
    title: "Add Receipt Number",
    description: "Enter the receipt number from your restaurant bill.",
    tipIcon: "ReceiptText",
    tip: "One visit = one valid check-in.",
    mock: "receipt",
  },
  {
    number: 4,
    icon: "MapPin",
    title: "Location Verified",
    description: "Your phone's location is checked to make sure you're at the restaurant.",
    tipIcon: "MapPin",
    tip: "Geofenced for genuine visits.",
    mock: "location",
  },
  {
    number: 5,
    icon: "Gift",
    title: "Get Rewarded!",
    description: "Your visit is recorded. Collect more visits to unlock exciting rewards.",
    tipIcon: "Gift",
    tip: "Each visit brings you closer to your reward.",
    mock: "reward",
  },
];

export const rlHowItWorksBullets = ["No App No Downloads", "Check-in in Seconds", "Secure & Anti-Fraud", "Rewards They'll Love"];

/* ---- Behind-the-scenes flow (How It Works page) ---- */
export const rlBehindScenes = [
  { icon: "ServerCog", label: "We validate the receipt and location." },
  { icon: "ShieldCheck", label: "Fraud protection checks ensure genuine visits." },
  { icon: "Database", label: "Visit is saved and progress is updated." },
  { icon: "BellRing", label: "Customer gets notified as they near rewards." },
  { icon: "TrendingUp", label: "You get real-time insights in your dashboard." },
];

/* ---- Owner / customer dual panel ---- */
export const rlOwnerBullets = [
  "Increase repeat visits & customer retention",
  "Build your own customer database",
  "Run unlimited reward campaigns",
  "Easy to use dashboard & insights",
  "No app needed for your customers",
];

export const rlCustomerBullets = [
  "Quick check-in in seconds",
  "Track your progress easily",
  "Exciting rewards await",
  "No app download required",
];

/* ---- Pricing page ---- */
export const rlSetupIncludes = [
  { icon: "QrCode", label: "1 QR Stand", description: "A branded stand for your counter or entrance." },
  { icon: "Sticker", label: "3 QR Stickers", description: "For tables, receipts, or posters around the restaurant." },
  { icon: "Gift", label: "A Few Extra Goodies", description: "Starter marketing material to help you promote the program." },
  { icon: "Settings", label: "Full Setup & Onboarding", description: "We configure your reward rules, dashboard, and train your staff." },
];

export const rlPricingSteps = [
  {
    icon: "PackageCheck",
    title: "One-Time Setup Fee",
    description:
      "A single upfront fee gets your restaurant fully set up — your QR stand, stickers, dashboard, and reward rules, all configured by our team.",
    tag: "Paid once",
  },
  {
    icon: "Repeat",
    title: "Pay As You Go",
    description:
      "After setup, there's no fixed monthly fee. You're billed per customer / verified visit, at a rate we agree on together based on your restaurant's size and volume.",
    tag: "Negotiable",
  },
];

export const rlPricingFaqs = [
  {
    question: "Is there a monthly subscription fee?",
    answer:
      "No. Beyond the one-time setup, RewardLoop runs on a pay-as-you-go model — you only pay for verified customer visits, not a flat monthly rate.",
  },
  {
    question: "How is the pay-as-you-go rate decided?",
    answer:
      "It's negotiated with you directly based on your restaurant's size, footfall, and how many outlets you're running — every restaurant gets a rate that fits, not a one-size-fits-all price.",
  },
  {
    question: "What exactly is in the setup kit?",
    answer: "1 QR stand, 3 QR stickers, and a few extra goodies to help you promote the program, plus full onboarding and staff training.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes — there's no long-term lock-in contract on the pay-as-you-go side.",
  },
];

/* ---- Stats used in dashboard mockups + CTA banners ---- */
export const rlDashboardStats = [
  { label: "Total Visits", value: "2,453", change: "+18.6%" },
  { label: "Unique Customers", value: "1,289", change: "+12.4%" },
  { label: "Rewards Redeemed", value: "320", change: "+22.1%" },
];

export const rlCtaStats = [
  { label: "Restaurants", value: "500+" },
  { label: "Visits Verified", value: "2M+" },
  { label: "Rewards Redeemed", value: "250K+" },
  { label: "Owner Rating", value: "4.9/5" },
];

export const rlTopRewards = [
  { label: "Free Dessert", count: 142, max: 160 },
  { label: "Free Mocktail", count: 96, max: 160 },
];
