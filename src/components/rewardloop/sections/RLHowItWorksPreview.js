import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import DynamicIcon from "@/components/ui/DynamicIcon";
import RLBadge from "@/components/rewardloop/RLBadge";
import { rlStepsPreview } from "@/data/rewardloop";

export default function RLHowItWorksPreview() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <RLBadge className="mx-auto">Simple for Guests. Powerful for You.</RLBadge>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="mt-5 text-display-sm text-balance font-extrabold text-[#1a1114]">
              How <span className="text-brand-600">RewardLoop</span> Works
            </h2>
          </FadeIn>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {rlStepsPreview.map((step, i) => (
            <FadeIn key={step.number} delay={0.06 * i} className="relative">
              <div className="h-full rounded-3xl border border-black/5 bg-blush-50 p-6 text-center">
                <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-rl-sm">
                  <DynamicIcon name={step.icon} className="size-6" strokeWidth={2} />
                </span>
                <p className="mt-4 text-xs font-bold tracking-widest text-brand-600">{step.number}</p>
                <h3 className="mt-1 font-display text-base font-bold text-[#1a1114]">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#1a1114]/60">{step.description}</p>
              </div>
              {i < rlStepsPreview.length - 1 && (
                <ArrowRight
                  className="absolute -right-3 top-1/2 z-10 hidden size-5 -translate-y-1/2 text-brand-300 lg:block"
                  strokeWidth={2.5}
                />
              )}
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
