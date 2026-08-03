import { MessageCircle, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import RLBadge from "@/components/rewardloop/RLBadge";
import RLContactForm from "@/components/rewardloop/RLContactForm";
import { rewardLoopConfig, buildRLWhatsAppLink, rlDemoMessage } from "@/data/rewardloop";

export const metadata = {
  title: "Book a Demo",
  description: "Get RewardLoop set up for your restaurant. Tell us a little about your restaurant and our team will reach out within 24 hours.",
};

const nextSteps = [
  "We call or WhatsApp you within 24 hours.",
  "We help you set your reward and print your table QR.",
  "You go live — no app, no setup fee to start.",
];

export default function RewardLoopContactPage() {
  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <FadeIn>
          <RLBadge>Get Started</RLBadge>
          <h1 className="mt-5 text-display-sm text-balance font-extrabold text-[#1a1114]">
            Let&apos;s Build Loyalty for Your Restaurant
          </h1>
          <p className="mt-4 max-w-md text-[#1a1114]/65">
            RewardLoop is onboarded restaurant-by-restaurant by our team — there&apos;s no self-serve signup yet.
            Share a few details below and we&apos;ll set everything up for you.
          </p>

          <div className="mt-8 rounded-3xl border border-black/5 bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600">What happens next</p>
            <ol className="mt-4 flex flex-col gap-4">
              {nextSteps.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm text-[#1a1114]/70">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-600">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={buildRLWhatsAppLink(rlDemoMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-[#1a1114] transition-colors hover:border-brand-300"
            >
              <MessageCircle className="size-4 text-brand-600" strokeWidth={2.25} />
              Chat on WhatsApp
            </a>
            <a
              href={`mailto:${rewardLoopConfig.contactEmail}`}
              className="flex items-center gap-2.5 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-[#1a1114] transition-colors hover:border-brand-300"
            >
              <Mail className="size-4 text-brand-600" strokeWidth={2.25} />
              {rewardLoopConfig.contactEmail}
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <RLContactForm />
        </FadeIn>
      </Container>
    </section>
  );
}
