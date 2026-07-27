"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { EASE_PREMIUM } from "@/lib/motion";

export default function LegalLayout({ title, updated, children }) {
  return (
    <section className="pb-24 pt-28 sm:pt-32">
      <Container className="max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          className="font-display text-display-sm text-balance text-ink-950"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.15 }}
          className="mt-4 text-sm text-ink-500"
        >
          Last updated: {updated}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.28 }}
          className="mt-12 flex flex-col gap-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-ink-950 [&_h2]:mt-2 [&_p]:leading-relaxed [&_p]:text-ink-700 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:text-ink-700 [&_li]:leading-relaxed"
        >
          {children}
        </motion.div>
      </Container>
    </section>
  );
}
