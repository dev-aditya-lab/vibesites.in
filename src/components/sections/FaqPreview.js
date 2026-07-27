import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import { faqCategories } from "@/data/faq";

const previewItems = faqCategories.flatMap((c) => c.items).slice(0, 5);

export default function FaqPreview() {
  return (
    <section className="py-24 lg:py-32">
      <Container className="max-w-4xl">
        <SectionHeading eyebrow="FAQ" title="Questions we hear a lot." align="center" />
        <FadeIn delay={0.1} className="mt-14">
          <Accordion items={previewItems} />
        </FadeIn>
        <div className="mt-10 text-center">
          <Button href="/faq" variant="secondary">
            See the full FAQ
          </Button>
        </div>
      </Container>
    </section>
  );
}
