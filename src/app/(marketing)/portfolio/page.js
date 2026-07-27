import PageHero from "@/components/sections/PageHero";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "Portfolio",
  description: "Explore real projects Vibesites has designed and built — websites, e-commerce stores, and mobile apps with measurable results.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Projects our clients are proud to show off."
        description="Every project below shipped with a clear goal — more bookings, more sales, more signups. Here's what happened after launch."
      />
      <PortfolioGrid />
      <CTASection eyebrow="Your project could be next" title="Let's build something worth showing off." />
    </>
  );
}
