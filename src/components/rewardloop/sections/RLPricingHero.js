import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import RLBadge from "@/components/rewardloop/RLBadge";

export default function RLPricingHero() {
  return (
    <section className="pb-16 pt-32 text-center sm:pt-40">
      <Container>
        <FadeIn>
          <RLBadge className="mx-auto">Simple, Honest Pricing</RLBadge>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h1 className="mx-auto mt-6 max-w-2xl text-display-md text-balance font-extrabold text-[#1a1114]">
            One Setup. <span className="text-brand-600">Pay As You Grow.</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.16}>
          <p className="mx-auto mt-5 max-w-lg text-[#1a1114]/65">
            No confusing tiers, no surprise monthly bills. A single setup fee gets you started, then you only pay
            for the customers who actually come back.
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
