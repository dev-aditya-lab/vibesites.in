import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import RLBadge from "@/components/rewardloop/RLBadge";
import RLFaqAccordion from "@/components/rewardloop/RLFaqAccordion";
import { rlPricingFaqs } from "@/data/rewardloop";

export default function RLPricingFaq() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container className="mx-auto max-w-3xl">
        <div className="text-center">
          <FadeIn>
            <RLBadge className="mx-auto">Questions</RLBadge>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="mt-5 text-display-sm text-balance font-extrabold text-[#1a1114]">Pricing, Answered</h2>
          </FadeIn>
        </div>

        <FadeIn delay={0.16} className="mt-10 rounded-3xl border border-black/5 bg-blush-50 px-6 sm:px-8">
          <RLFaqAccordion items={rlPricingFaqs} />
        </FadeIn>
      </Container>
    </section>
  );
}
