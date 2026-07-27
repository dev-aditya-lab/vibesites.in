"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { EASE_PREMIUM } from "@/lib/motion";

export default function ComingSoon({
  eyebrow = "Coming soon",
  title = "This page is on its way.",
  description = "We're still putting this one together. Check back soon, or reach out if you need this info right now.",
  ctaLabel = "Talk to us on WhatsApp",
  ctaHref = "/contact",
}) {
  return (
    <section className="relative overflow-hidden py-32 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 size-[30rem] -translate-x-1/2 rounded-full bg-teal-100/50 blur-3xl" />
      </div>
      <Container className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_PREMIUM }}
          className="flex flex-col items-center"
        >
          <div className="flex size-14 items-center justify-center rounded-full bg-teal-50 text-teal-600 ring-1 ring-inset ring-teal-200">
            <Clock className="size-6" />
          </div>
          <Badge tone="teal" className="mt-6">
            {eyebrow}
          </Badge>
          <h1 className="mt-6 max-w-2xl text-balance font-display text-display-md text-ink-950">{title}</h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-600">{description}</p>
          <Button href={ctaHref} variant="primary" className="mt-8">
            {ctaLabel}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
