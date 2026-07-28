"use client";

import { motion } from "framer-motion";
import { CreditCard, ShieldCheck, Code2, MessageCircle, Lock, HeartHandshake } from "lucide-react";
import Container from "@/components/ui/Container";
import { trustStrip } from "@/data/pricing";
import { staggerContainer, fadeUp, viewportOnce, defaultTransition } from "@/lib/motion";

const icons = { CreditCard, ShieldCheck, Code2, MessageCircle, Lock, HeartHandshake };

export default function PricingTrustStrip() {
  return (
    <section className="py-8">
      <Container>
        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 rounded-2xl border border-ink-200 bg-cream-50 px-6 py-6 sm:px-10"
        >
          {trustStrip.map(({ icon, label }) => {
            const Icon = icons[icon];
            return (
              <motion.div
                key={label}
                variants={fadeUp}
                transition={defaultTransition()}
                className="flex items-center gap-2 text-sm font-medium text-ink-700"
              >
                {Icon && <Icon className="size-4 shrink-0 text-teal-600" strokeWidth={2.25} />}
                {label}
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
