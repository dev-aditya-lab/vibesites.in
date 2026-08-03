import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import RLLogo from "./RLLogo";
import { InstagramIcon, LinkedinIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { rlFooterNav, rewardLoopConfig } from "@/data/rewardloop";

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-white/45">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RLFooter() {
  return (
    <footer className="bg-[#1a0508] text-white">
      <Container className="pt-16">
        <div className="grid grid-cols-2 gap-10 pb-16 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <RLLogo tone="dark" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">{rewardLoopConfig.description}</p>
            <div className="mt-6 flex gap-3">
              {[InstagramIcon, LinkedinIcon, FacebookIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand-400 hover:text-brand-400"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          <FooterColumn title="Product" links={rlFooterNav.product} />
          <FooterColumn title="For Business" links={rlFooterNav.business} />
          <FooterColumn title="Company" links={rlFooterNav.company} />
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 py-8 text-xs text-white/45 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} RewardLoop by Vibesites. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href={`mailto:${rewardLoopConfig.contactEmail}`} className="flex items-center gap-1.5 hover:text-white">
              <Mail className="size-3.5" />
              {rewardLoopConfig.contactEmail}
            </a>
            <Link href="/" className="flex items-center gap-1.5 hover:text-white">
              Made with ❤️ in India
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
