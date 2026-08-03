import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import DynamicIcon from "@/components/ui/DynamicIcon";
import RLButton from "@/components/rewardloop/RLButton";
import { rlPricingSteps } from "@/data/rewardloop";

export default function RLPricingModel() {
  return (
    <section className="pb-24 sm:pb-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          {rlPricingSteps.map((step, i) => (
            <FadeIn key={step.title} delay={0.06 * i}>
              <div className="relative flex h-full flex-col rounded-3xl border border-black/5 bg-white p-8 shadow-rl-sm sm:p-10">
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <DynamicIcon name={step.icon} className="size-6" strokeWidth={1.75} />
                  </span>
                  <span className="rounded-full bg-blush-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
                    {step.tag}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-extrabold text-[#1a1114]">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-[#1a1114]/65">{step.description}</p>
                {i < rlPricingSteps.length - 1 && (
                  <ArrowRight
                    className="absolute -right-3 top-1/2 hidden size-6 -translate-y-1/2 text-brand-200 lg:block"
                    strokeWidth={2}
                  />
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.16} className="mt-8 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-[#1a1114]/55">
            Every restaurant is different — get a setup fee and pay-as-you-go rate tailored to yours.
          </p>
          <RLButton href="/vibeproducts/rewardLoop/contact" size="lg">
            Get a Custom Quote
          </RLButton>
        </FadeIn>
      </Container>
    </section>
  );
}
