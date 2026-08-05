export const siteConfig = {
  name: "Vibesites",
  legalName: "Vibesites",
  proprietor: "Aditya Kumar Gupta",
  tagline: "Websites and apps built to convert.",
  description:
    "Vibesites is a web and app development agency. We design and build fast, beautiful websites, e-commerce stores, and mobile apps that turn visitors into customers.",
  url: "https://vibesites.in",
  email: "hello@vibesites.in",
  whatsapp: {
    display: "+1 555-363-9502",
    e164: "15553639502",
  },
  social: {
    instagram: "https://instagram.com/vibesites.in",
    // linkedin: "https://linkedin.com/company/vibesites",
    // twitter: "https://twitter.com/vibesites",
    facebook: "https://www.facebook.com/profile.php?id=61588770368457",
  },
  address: {
    locality: "Remote-first",
    region: "Worldwide",
  },
  foundedYear: 2019,
  stats: [
    { label: "Projects shipped", value: 240, suffix: "+" },
    { label: "Client rating", value: 4.9, suffix: "/5" },
    { label: "Team members", value: 32, suffix: "+" },
    { label: "Countries served", value: 12, suffix: "+" },
  ],
};

export function buildWhatsAppLink(message) {
  const base = `https://wa.me/${siteConfig.whatsapp.e164}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsAppMessage =
  "Hi Vibesites! I'd like to talk about a website/app project.";
