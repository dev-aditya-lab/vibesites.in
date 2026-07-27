import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHero from "@/components/sections/PageHero";
import ValuesGrid from "@/components/sections/ValuesGrid";
import CaseStudyPreview from "@/components/sections/CaseStudyPreview";
import StatsBand from "@/components/sections/StatsBand";
import CTASection from "@/components/sections/CTASection";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "About Us",
  description:
    "Vibesites is a web and app development agency founded in 2019. Learn our story, our values, and why 240+ businesses trust us with their web presence.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Vibesites"
        title="We started Vibesites because most agency websites felt like the agency didn't believe their own pitch."
        description="If a company's site is meant to prove they can build a great one for you, most fail that test immediately. We built ours — and every client's — to pass it."
      />

      <Container>
        <p className="border-y border-ink-200 py-6 text-center font-display text-xl text-balance text-ink-800 sm:text-2xl">
          Backed by a big in-house team of developers, designers, and support specialists — working together on
          every project.
        </p>
      </Container>

      <section className="py-8 lg:py-12">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-100">
              <Image
                src="/about.png"
                alt="The Vibesites team collaborating"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-display text-display-sm text-balance text-ink-950">Our story</h2>
              <p className="mt-6 leading-relaxed text-ink-700">
                Vibesites started in {siteConfig.foundedYear} as a two-person freelance shop building websites for
                local businesses that couldn&apos;t afford — or didn&apos;t want to deal with — a traditional
                agency. The first few projects taught us something that shaped everything since: clients don&apos;t
                actually want a website. They want more customers, more bookings, more sales. The website is just
                the vehicle.
              </p>
              <p className="mt-4 leading-relaxed text-ink-700">
                That distinction changed how we work. Every project starts with your business goal, not a blank
                Figma canvas. Today we&apos;re a team of 32 — developers, designers, and a dedicated support crew
                working side by side on every build — and we run nearly every client relationship straight through
                WhatsApp. No ticket queues, no account managers relaying messages. Just direct answers from the
                people doing the work.
              </p>
              <p className="mt-4 leading-relaxed text-ink-700">
                We&apos;ve since shipped 240+ projects across e-commerce, SaaS, healthcare, hospitality, and
                everything in between — and we still review every single launch before it goes live.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <StatsBand />
      <ValuesGrid />
      <CaseStudyPreview />
      <CTASection
        eyebrow="Work with us"
        title="Curious if we're the right fit for your project?"
        description="Send us a message on WhatsApp with a bit about what you're building — we'll tell you honestly if we're the right team for it."
      />
    </>
  );
}
