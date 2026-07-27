import Hero from "@/components/sections/Hero";
import LogoMarquee from "@/components/sections/LogoMarquee";
import ServicesGrid from "@/components/sections/ServicesGrid";
import StatsBand from "@/components/sections/StatsBand";
import ProcessSteps from "@/components/sections/ProcessSteps";
import HorizontalShowcase from "@/components/sections/HorizontalShowcase";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingTeaser from "@/components/sections/PricingTeaser";
import IndustriesBand from "@/components/sections/IndustriesBand";
import FaqPreview from "@/components/sections/FaqPreview";
import CTASection from "@/components/sections/CTASection";
import Container from "@/components/ui/Container";
import SVGDivider from "@/components/ui/SVGDivider";

export const metadata = {
  title: "Web & App Development Agency",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <ServicesGrid />
      <StatsBand />
      <ProcessSteps />
      <HorizontalShowcase />
      <Container>
        <SVGDivider stroke="var(--color-teal-500)" />
      </Container>
      <TestimonialsSection />
      <PricingTeaser />
      <IndustriesBand />
      <FaqPreview />
      <CTASection />
    </>
  );
}
