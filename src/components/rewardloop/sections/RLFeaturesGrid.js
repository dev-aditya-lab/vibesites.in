import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import DynamicIcon from "@/components/ui/DynamicIcon";
import RLBadge from "@/components/rewardloop/RLBadge";
import { rlFeatures } from "@/data/rewardloop";

export default function RLFeaturesGrid() {
  return (
    <section id="features" className="scroll-mt-28 bg-blush-50 py-24 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <RLBadge className="mx-auto">Built for Restaurants. Loved by Customers.</RLBadge>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="mt-5 text-display-sm text-balance font-extrabold text-[#1a1114]">
              Everything You Need to Build Lasting <span className="text-brand-600">Customer Loyalty</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="mt-4 text-[#1a1114]/65">
              Powerful features that help you attract, engage and retain more customers.
            </p>
          </FadeIn>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rlFeatures.map((feature, i) => (
            <FadeIn key={feature.title} delay={0.05 * (i % 4)}>
              <div className="group h-full rounded-3xl border border-black/5 bg-white p-6 shadow-rl-sm transition-shadow duration-300 hover:shadow-rl-md">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <DynamicIcon name={feature.icon} className="size-5" strokeWidth={2} />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-[#1a1114]">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#1a1114]/60">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
