"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/data/site";
import { EASE_PREMIUM } from "@/lib/motion";

export default function NotFoundContent() {
  return (
    <section className="relative flex min-h-[85dvh] items-center overflow-hidden py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-100/60 blur-3xl" />
      </div>
      <Container className="text-center">
        <svg viewBox="0 0 200 40" className="mx-auto h-24 w-full max-w-md sm:h-32" fill="none">
          <motion.path
            d="M2 32 C 20 5, 40 5, 55 32 S 90 5, 100 32 S 135 5, 145 32 S 180 5, 198 32"
            stroke="var(--color-teal-500)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.3, ease: EASE_PREMIUM, delay: 0.2 }}
          />
        </svg>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 1.1 }}
          className="mt-6 font-display text-display-lg text-ink-950"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 1.25 }}
          className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink-600"
        >
          This page went off-brief. Let&apos;s get you back to somewhere that actually converts.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 1.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/" size="lg">
            Back to homepage
          </Button>
          <Button href={buildWhatsAppLink("Hi! I landed on a broken link on your site.")} external variant="secondary" size="lg" icon={false}>
            <MessageCircle className="size-5" strokeWidth={2.25} />
            Tell us what broke
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
