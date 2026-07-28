"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";
import Container from "@/components/ui/Container";
import { pricingPolicies } from "@/data/pricing";
import { fadeUp, viewportOnce, defaultTransition } from "@/lib/motion";

export default function PricingPolicies() {
  return (
    <section className="py-8">
      <Container className="max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={defaultTransition()}
          className="rounded-2xl border border-ink-200 bg-cream-50 p-6 sm:p-8"
        >
          <div className="flex items-center gap-2">
            <Info className="size-4 shrink-0 text-teal-600" strokeWidth={2.25} />
            <h3 className="font-display text-base text-ink-900">Good to know</h3>
          </div>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {pricingPolicies.map((policy) => (
              <li key={policy} className="flex items-start gap-2 text-sm text-ink-600">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-ink-400" />
                {policy}
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}
