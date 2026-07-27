"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Marquee from "@/components/ui/Marquee";
import { testimonials } from "@/data/testimonials";

function TestimonialCard({ t }) {
  return (
    <div className="flex w-[22rem] shrink-0 flex-col gap-5 rounded-2xl border border-ink-200 bg-cream-50 p-8 shadow-soft-sm sm:w-[26rem]">
      <Quote className="size-7 text-teal-300" strokeWidth={1.5} />
      <p className="text-[0.95rem] leading-relaxed text-ink-800">&ldquo;{t.quote}&rdquo;</p>
      <div className="mt-auto flex items-center gap-3 pt-2">
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
    </div>
  );
}

export default function TestimonialsSection() {
  const firstHalf = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const secondHalf = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <section className="overflow-hidden py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Client stories"
          title="Don't take our word for it."
          description="200+ businesses have trusted us with their web presence. Here's what a few of them have to say."
          align="center"
        />
      </Container>

      <div className="mt-16 flex flex-col gap-6">
        <Marquee speed={55} gap="gap-6">
          {firstHalf.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </Marquee>
        <Marquee speed={55} reverse gap="gap-6">
          {secondHalf.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
