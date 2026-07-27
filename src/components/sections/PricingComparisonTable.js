"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { plans, comparisonRows } from "@/data/pricing";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeUp, viewportOnce, defaultTransition } from "@/lib/motion";

function Cell({ value }) {
  if (value === true) return <Check className="mx-auto size-5 text-gold-600" />;
  if (value === false) return <Minus className="mx-auto size-4 text-ink-300" />;
  return <span className="text-sm text-ink-700">{value}</span>;
}

export default function PricingComparisonTable() {
  return (
    <section className="border-t border-ink-200 py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Compare plans"
          title="Every detail, side by side."
          description="No guessing what's included — here's exactly how each plan compares."
          align="center"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={defaultTransition()}
          className="mt-14 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0"
        >
          <table className="w-full min-w-[860px] border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="w-1/4 py-4 text-left text-sm font-medium text-ink-500">Feature</th>
                {plans.map((plan) => (
                  <th key={plan.key} className="w-[18.75%] py-4 text-center">
                    <span className={cn("font-display text-lg", plan.highlighted && "text-teal-600")}>{plan.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <motion.tbody variants={staggerContainer(0.04)} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              {comparisonRows.map((row, i) => (
                <motion.tr
                  key={row.feature}
                  variants={fadeUp}
                  transition={defaultTransition()}
                  className={i % 2 === 0 ? "bg-cream-50" : ""}
                >
                  <td className="rounded-l-xl py-4 pl-4 text-sm font-medium text-ink-800">{row.feature}</td>
                  <td className="py-4 text-center">
                    <Cell value={row.launch} />
                  </td>
                  <td className="py-4 text-center">
                    <Cell value={row.growth} />
                  </td>
                  <td className="py-4 text-center">
                    <Cell value={row.scale} />
                  </td>
                  <td className="rounded-r-xl py-4 pr-4 text-center">
                    <Cell value={row.enterprise} />
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </motion.div>
      </Container>
    </section>
  );
}
