import Link from "next/link";
import { MessageCircle, Mail, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { InstagramIcon, LinkedinIcon, TwitterIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import Logo from "./Logo";
import { footerNav } from "@/data/nav";
import { siteConfig, buildWhatsAppLink, defaultWhatsAppMessage } from "@/data/site";

const socialLinks = [
  { icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: LinkedinIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: TwitterIcon, href: siteConfig.social.twitter, label: "Twitter" },
  { icon: FacebookIcon, href: siteConfig.social.facebook, label: "Facebook" },
];

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-ink-500">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="link-underline text-sm text-ink-700">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-cream-200">
      <Container className="pt-20">
        <div className="flex flex-col items-start justify-between gap-10 border-b border-ink-800 pb-16 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <h2 className="text-display-sm text-balance font-medium text-cream-50">
              Have a project in mind? Let&apos;s talk about it on WhatsApp.
            </h2>
            <p className="mt-4 text-cream-400">
              Real answers within a few hours, no bots, no ticket queue — just our team.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={buildWhatsAppLink(defaultWhatsAppMessage)} external variant="primary" size="lg" icon={false}>
              <MessageCircle className="size-5" strokeWidth={2.25} />
              Chat on WhatsApp
            </Button>
            <Button href="/contact" variant="inverse" size="lg">
              Contact page
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 py-16 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Logo tone="dark" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream-400">{siteConfig.description}</p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-ink-700 text-cream-300 transition-colors hover:border-rust-400 hover:text-rust-400"
                >
                  <Icon className="size-4" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>
          <FooterColumn title="Company" links={footerNav.company} />
          <FooterColumn title="Services" links={footerNav.services} />
          <FooterColumn title="Resources" links={footerNav.resources} />
          <FooterColumn title="Legal" links={footerNav.legal} />
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-ink-800 py-8 text-xs text-cream-500 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href={`mailto:${siteConfig.email}`} className="link-underline flex items-center gap-1.5">
              <Mail className="size-3.5" />
              {siteConfig.email}
            </a>
            <a
              href={buildWhatsAppLink(defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline flex items-center gap-1.5"
            >
              {siteConfig.whatsapp.display}
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
