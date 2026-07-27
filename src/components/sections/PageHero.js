"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import RevealText from "@/components/ui/RevealText";
import { EASE_PREMIUM } from "@/lib/motion";

export default function PageHero({ eyebrow, title, description, align = "left" }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-[-10%] size-[30rem] rounded-full bg-rust-100/50 blur-3xl" />
      </div>
      <Container className={align === "center" ? "text-center" : ""}>
        {eyebrow && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE_PREMIUM }}>
            <Badge tone="rust">{eyebrow}</Badge>
          </motion.div>
        )}
        <h1 className={`mt-6 text-display-lg font-medium text-ink-950 ${align === "center" ? "mx-auto max-w-4xl text-balance" : "max-w-4xl text-balance"}`}>
          <RevealText text={title} />
        </h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.35 }}
            className={`mt-6 max-w-2xl text-lg leading-relaxed text-ink-600 ${align === "center" ? "mx-auto" : ""}`}
          >
            {description}
          </motion.p>
        )}
      </Container>
    </section>
  );
}
