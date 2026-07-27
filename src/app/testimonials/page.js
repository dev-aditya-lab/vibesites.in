import Image from "next/image";
import { Star, Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHero from "@/components/sections/PageHero";
import StatsBand from "@/components/sections/StatsBand";
import CTASection from "@/components/sections/CTASection";
import FadeIn from "@/components/ui/FadeIn";
import { testimonials } from "@/data/testimonials";

export const metadata = {
  title: "Testimonials",
  description: "Read what 200+ clients say about working with Vibesites on their websites, stores, and apps.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Client stories"
        title="Businesses that trusted us — in their own words."
        description="We've kept every one of these unedited. If you'd like to talk to a past client directly, just ask."
        align="center"
      />
      <StatsBand />

      <section className="py-24 lg:py-32">
        <Container>
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
            {testimonials.map((t, i) => (
              <FadeIn
                key={t.name}
                delay={(i % 3) * 0.08}
                className="rounded-2xl border border-ink-200 bg-cream-50 p-8 shadow-soft-sm"
              >
                <Quote className="size-7 text-teal-300" strokeWidth={1.5} />
                <p className="mt-4 leading-relaxed text-ink-800">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <Image src={t.avatar} alt={t.name} width={44} height={44} className="rounded-full" />
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{t.name}</p>
                    <p className="text-xs text-ink-500">
                      {t.role}, {t.company}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-0.5 text-teal-500">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" strokeWidth={0} />
                    ))}
                  </div>
                </div>
                <span className="mt-4 inline-block rounded-full bg-cream-200 px-3 py-1 text-xs font-medium text-ink-600">
                  {t.tag}
                </span>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <CTASection eyebrow="Add your name to the list" title="Ready to become our next testimonial?" />
    </>
  );
}
