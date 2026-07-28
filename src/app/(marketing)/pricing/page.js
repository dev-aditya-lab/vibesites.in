import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import PageHero from "@/components/sections/PageHero";
import PricingConversion from "@/components/sections/PricingConversion";
import PricingComparisonTable from "@/components/sections/PricingComparisonTable";
import TechStack from "@/components/sections/TechStack";
import CTASection from "@/components/sections/CTASection";
import { pricingFaqs } from "@/data/pricing";

export const metadata = {
  title: "Pricing",
  description:
    "Simple, one-time project pricing for websites, e-commerce stores, and apps — no subscriptions, no hidden fees. Compare plans and find the right fit.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Pricing that's honest about what you're paying for."
        description="One-time, project-based plans — pick what fits, know exactly what's included, and pay nothing recurring unless you want ongoing support."
        align="center"
      />
      <PricingConversion />
      <PricingComparisonTable />
      <TechStack />

      <section className="border-t border-ink-200 py-24 lg:py-32">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Objections, answered" title="Before you ask." align="center" />
          <div className="mt-14">
            <Accordion items={pricingFaqs} />
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Still not sure which plan?"
        title="Tell us your budget, we'll tell you what's realistic."
        description="No pressure, no upsell script — just an honest recommendation over WhatsApp."
      />
    </>
  );
}
