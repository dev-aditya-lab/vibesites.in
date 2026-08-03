import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import DynamicIcon from "@/components/ui/DynamicIcon";
import RLPhoneFrame from "@/components/rewardloop/RLPhoneFrame";
import RLStepMock from "@/components/rewardloop/RLStepMock";
import { rlSteps } from "@/data/rewardloop";
import { cn } from "@/lib/utils";

export default function RLStepsTimeline() {
  return (
    <section className="bg-blush-50 py-20 sm:py-24">
      <Container className="flex flex-col gap-16 sm:gap-20">
        {rlSteps.map((step, i) => {
          const reversed = i % 2 === 1;
          return (
            <div key={step.number} className="relative">
              {i > 0 && (
                <span
                  aria-hidden
                  className="absolute -top-8 left-8 hidden h-8 w-px border-l-2 border-dashed border-brand-200 sm:block"
                />
              )}
              <FadeIn
                className={cn(
                  "grid items-center gap-10 rounded-[2rem] border border-black/5 bg-white p-8 shadow-rl-sm sm:p-10 lg:grid-cols-2 lg:gap-16",
                  reversed && "lg:[&>*:first-child]:order-2"
                )}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-600 font-display text-lg font-extrabold text-white">
                      {step.number}
                    </span>
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                      <DynamicIcon name={step.icon} className="size-5" strokeWidth={2} />
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-extrabold text-[#1a1114] sm:text-3xl">{step.title}</h3>
                  <p className="mt-3 max-w-md text-[#1a1114]/65">{step.description}</p>

                  <div className="mt-6 inline-flex items-center gap-2.5 rounded-2xl bg-blush-100 px-4 py-3">
                    <DynamicIcon name={step.tipIcon} className="size-4 shrink-0 text-brand-600" strokeWidth={2} />
                    <span className="text-sm font-medium text-[#1a1114]/70">{step.tip}</span>
                  </div>
                </div>

                <RLPhoneFrame>
                  <RLStepMock type={step.mock} />
                </RLPhoneFrame>
              </FadeIn>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
