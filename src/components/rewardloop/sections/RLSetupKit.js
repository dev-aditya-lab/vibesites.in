import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import DynamicIcon from "@/components/ui/DynamicIcon";
import RLBadge from "@/components/rewardloop/RLBadge";
import { rlSetupIncludes } from "@/data/rewardloop";

export default function RLSetupKit() {
  return (
    <section className="bg-blush-50 py-24 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <RLBadge className="mx-auto">In Every Setup</RLBadge>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="mt-5 text-display-sm text-balance font-extrabold text-[#1a1114]">
              What&apos;s in Your Setup Kit
            </h2>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="mt-4 text-[#1a1114]/65">
              The one-time setup fee isn&apos;t just software — it comes with everything you need on day one.
            </p>
          </FadeIn>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rlSetupIncludes.map((item, i) => (
            <FadeIn key={item.label} delay={0.05 * i}>
              <div className="h-full rounded-3xl border border-black/5 bg-white p-6 text-center">
                <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <DynamicIcon name={item.icon} className="size-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-[#1a1114]">{item.label}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#1a1114]/60">{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
