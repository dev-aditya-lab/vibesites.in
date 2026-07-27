import PageHero from "@/components/sections/PageHero";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "Portfolio",
  description: "Concept projects from Vibesites — websites, e-commerce stores, and mobile apps built to the same standard as client work.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Concept work that shows how we build."
        description="We're a new studio, so instead of padding this page with claims we can't back up, we build real projects for ourselves. Each one below is a self-initiated concept — real code, real design decisions, no invented client or results."
      />
      <PortfolioGrid />
      <CTASection eyebrow="Your project could be next" title="Let's build your first case study together." />
    </>
  );
}
