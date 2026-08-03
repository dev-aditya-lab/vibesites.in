import { PartyPopper, Smartphone, Timer, ShieldCheck, Gift } from "lucide-react";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import RLBadge from "@/components/rewardloop/RLBadge";
import { rlHowItWorksBullets } from "@/data/rewardloop";

const bulletIcons = [Smartphone, Timer, ShieldCheck, Gift];

export default function RLHowItWorksHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-24 size-2 rounded-full bg-brand-300 rl-float" />
        <div className="absolute left-[15%] top-40 size-1.5 rounded-full bg-amber-300 rl-float" style={{ animationDelay: "0.4s" }} />
        <div className="absolute right-[10%] top-28 size-2 rounded-full bg-brand-300 rl-float" style={{ animationDelay: "0.8s" }} />
        <div className="absolute right-[16%] top-48 size-1.5 rounded-full bg-amber-300 rl-float" style={{ animationDelay: "1.2s" }} />
      </div>

      <Container className="relative text-center">
        <FadeIn>
          <RLBadge className="mx-auto">Simple for Your Customers</RLBadge>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h1 className="mx-auto mt-6 max-w-2xl text-display-md text-balance font-extrabold text-[#1a1114]">
            How <span className="text-brand-600">RewardLoop</span> Works
          </h1>
        </FadeIn>
        <FadeIn delay={0.16}>
          <p className="mx-auto mt-5 max-w-lg text-[#1a1114]/65">
            We&apos;ve made loyalty effortless. Your customers don&apos;t need an app — just a quick scan and a few taps.
          </p>
        </FadeIn>

        <FadeIn delay={0.24}>
          <div className="mx-auto mt-9 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-black/5 bg-white p-2 shadow-rl-sm">
            {rlHowItWorksBullets.map((bullet, i) => {
              const Icon = bulletIcons[i];
              return (
                <span
                  key={bullet}
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-[#1a1114]/75 sm:text-sm"
                >
                  <Icon className="size-4 text-brand-600" strokeWidth={2} />
                  {bullet}
                </span>
              );
            })}
            <span className="hidden text-brand-500 sm:flex">
              <PartyPopper className="size-5" strokeWidth={1.75} />
            </span>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
