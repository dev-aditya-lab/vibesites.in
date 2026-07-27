import Hero from "@/components/sections/Hero";
import LogoMarquee from "@/components/sections/LogoMarquee";
import ServicesGrid from "@/components/sections/ServicesGrid";
import StatsBand from "@/components/sections/StatsBand";
import ProcessSteps from "@/components/sections/ProcessSteps";
import PortfolioShowcase from "@/components/sections/PortfolioShowcase";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingTeaser from "@/components/sections/PricingTeaser";
import IndustriesBand from "@/components/sections/IndustriesBand";
import FaqPreview from "@/components/sections/FaqPreview";
import CTASection from "@/components/sections/CTASection";

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
      <PortfolioShowcase />
      <TestimonialsSection />
      <PricingTeaser />
      <IndustriesBand />
      <FaqPreview />
      <CTASection />
    </>
  );
}
