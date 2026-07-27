import { MessageCircle, Mail, Clock, Globe2 } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import PageHero from "@/components/sections/PageHero";
import ContactForm from "@/components/sections/ContactForm";
import { siteConfig, buildWhatsAppLink, defaultWhatsAppMessage } from "@/data/site";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Vibesites over WhatsApp, email, or our contact form to start your website or app project.",
  alternates: { canonical: "/contact" },
};

const infoCards = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    detail: siteConfig.whatsapp.display,
    description: "Our fastest channel — usually a reply within a few hours.",
    action: { label: "Start chat", href: buildWhatsAppLink(defaultWhatsAppMessage), external: true },
  },
  {
    icon: Mail,
    title: "Email",
    detail: siteConfig.email,
    description: "For longer briefs, files, or formal proposals.",
    action: { label: "Send email", href: `mailto:${siteConfig.email}`, external: true },
  },
  {
    icon: Clock,
    title: "Response time",
    detail: "Within a few hours",
    description: "We reply during business hours across most timezones.",
  },
  {
    icon: Globe2,
    title: "Where we work",
    detail: "Remote-first, worldwide",
    description: "We've shipped projects across 18+ countries.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about your project — we'll take it from there."
        description="Fill out the form or message us directly on WhatsApp. Either way, a real person on our team reads and replies."
      />

      <section className="pb-24 lg:pb-32">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col gap-4">
            {infoCards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-ink-200 bg-cream-50 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                    <card.icon className="size-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{card.title}</p>
                    <p className="font-medium text-ink-900">{card.detail}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{card.description}</p>
                {card.action && (
                  <Button
                    href={card.action.href}
                    external={card.action.external}
                    variant="secondary"
                    size="md"
                    className="mt-4 w-full"
                  >
                    {card.action.label}
                  </Button>
                )}
              </div>
            ))}
          </div>

          <ContactForm />
        </Container>
      </section>
    </>
  );
}
