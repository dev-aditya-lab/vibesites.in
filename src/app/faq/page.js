import Container from "@/components/ui/Container";
import Accordion from "@/components/ui/Accordion";
import PageHero from "@/components/sections/PageHero";
import CTASection from "@/components/sections/CTASection";
import { faqCategories } from "@/data/faq";

export const metadata = {
  title: "FAQ",
  description: "Answers to the most common questions about working with Vibesites — process, pricing, timelines, and support.",
  alternates: { canonical: "/faq" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategories.flatMap((c) =>
    c.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    }))
  ),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero
        eyebrow="FAQ"
        title="Everything you're wondering before you reach out."
        description="Can't find your answer here? Just ask us directly on WhatsApp — real answers, no waiting for a support ticket."
        align="center"
      />

      <section className="py-8 pb-24 lg:pb-32">
        <Container className="max-w-3xl">
          {faqCategories.map((category) => (
            <div key={category.category} className="border-t border-ink-200 py-12 first:border-t-0 first:pt-0">
              <h2 className="font-display text-2xl text-ink-950">{category.category}</h2>
              <div className="mt-4">
                <Accordion items={category.items} />
              </div>
            </div>
          ))}
        </Container>
      </section>

      <CTASection eyebrow="Still have questions?" title="Ask us directly — we reply fast." />
    </>
  );
}
