import { siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { portfolio } from "@/data/portfolio";
import { posts } from "@/data/blog";

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/pricing",
  "/team",
  "/portfolio",
  "/testimonials",
  "/faq",
  "/blog",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
  "/refund-policy",
];

export default function sitemap() {
  const now = new Date();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const serviceEntries = services.map((s) => ({
    url: `${siteConfig.url}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const portfolioEntries = portfolio.map((p) => ({
    url: `${siteConfig.url}/portfolio/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogEntries = posts.map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticEntries, ...serviceEntries, ...portfolioEntries, ...blogEntries];
}
