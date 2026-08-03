import { MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import RLButton from "./RLButton";
import RLBadge from "./RLBadge";
import { buildRLWhatsAppLink, rlDemoMessage } from "@/data/rewardloop";

export default function RLCTABanner({ eyebrow, heading, description, stats, visual }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-[#1a0508] py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-10 top-8 size-2 rounded-full bg-amber-300 rl-float" />
        <div className="absolute left-1/3 top-16 size-1.5 rounded-full bg-white/70 rl-float" style={{ animationDelay: "0.6s" }} />
        <div className="absolute right-1/4 top-10 size-2 rounded-full bg-brand-300 rl-float" style={{ animationDelay: "1.2s" }} />
        <div className="absolute bottom-10 right-10 size-1.5 rounded-full bg-amber-300 rl-float" style={{ animationDelay: "1.8s" }} />
      </div>

      <Container className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <FadeIn>
          {eyebrow && (
            <RLBadge tone="dark" className="mb-5">
              {eyebrow}
            </RLBadge>
          )}
          <h2 className="text-display-sm text-balance font-extrabold text-white">{heading}</h2>
          <p className="mt-4 max-w-md text-white/70">{description}</p>

          {stats && (
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-extrabold text-white sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-9 flex flex-wrap gap-3">
            <RLButton href="/vibeproducts/rewardLoop/contact" variant="inverse" size="lg">
              Book a Demo
            </RLButton>
            <RLButton href={buildRLWhatsAppLink(rlDemoMessage)} external variant="outline" size="lg" icon={false}>
              <MessageCircle className="size-5" strokeWidth={2.25} />
              Talk to Sales
            </RLButton>
          </div>
        </FadeIn>

        {visual && (
          <FadeIn delay={0.1} className="lg:justify-self-end lg:max-w-md lg:w-full">
            {visual}
          </FadeIn>
        )}
      </Container>
    </section>
  );
}
