"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import RevealText from "@/components/ui/RevealText";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "@/data/site";
import { fadeUp, viewportOnce, defaultTransition } from "@/lib/motion";

export default function CTASection({
  eyebrow = "Let's build something",
  title = "Ready to make your website work harder?",
  description = "Tell us about your project on WhatsApp and we'll get back to you within a few hours — no forms, no sales scripts.",
}) {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-100/60 blur-3xl" />
      </div>
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={defaultTransition()}
          className="mx-auto flex max-w-3xl flex-col items-center rounded-[2.5rem] border border-ink-200 bg-cream-50 px-8 py-16 text-center shadow-soft-lg sm:px-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">{eyebrow}</span>
          <h2 className="mt-5 text-display-sm text-balance font-medium text-ink-950">
            <RevealText text={title} />
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-600">{description}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href={buildWhatsAppLink(defaultWhatsAppMessage)} external size="lg" icon={false}>
              <MessageCircle className="size-5" strokeWidth={2.25} />
              Chat on WhatsApp
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Contact form
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
