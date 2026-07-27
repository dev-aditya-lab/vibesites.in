"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { plans } from "@/data/pricing";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeUp, viewportOnce, defaultTransition } from "@/lib/motion";

const featured = plans.slice(0, 3);

export default function PricingTeaser() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Straightforward, project-based pricing."
          description="No subscriptions, no hidden fees — pick a plan and know exactly what you're getting."
          align="center"
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {featured.map((plan) => (
            <motion.div
              key={plan.key}
              variants={fadeUp}
              transition={defaultTransition()}
              className={cn(
                "flex flex-col rounded-2xl border p-8",
                plan.highlighted
                  ? "border-rust-400 bg-ink-950 text-cream-100 shadow-soft-lg"
                  : "border-ink-200 bg-cream-50"
              )}
            >
              {plan.badge && (
                <Badge tone="rust" className="mb-4 w-fit">
                  {plan.badge}
                </Badge>
              )}
              <h3 className={cn("font-display text-2xl", plan.highlighted ? "text-cream-50" : "text-ink-900")}>
                {plan.name}
              </h3>
              <p className={cn("mt-2 text-sm", plan.highlighted ? "text-cream-400" : "text-ink-600")}>
                {plan.tagline}
              </p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className={cn("font-display text-4xl", plan.highlighted ? "text-cream-50" : "text-ink-950")}>
                  {plan.priceLabel}
                </span>
                <span className={cn("text-sm", plan.highlighted ? "text-cream-400" : "text-ink-500")}>
                  {plan.priceNote}
                </span>
              </div>
              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {plan.features.slice(0, 5).map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={cn("mt-0.5 size-4 shrink-0", plan.highlighted ? "text-rust-400" : "text-rust-500")}
                    />
                    <span className={plan.highlighted ? "text-cream-200" : "text-ink-700"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                href="/pricing"
                variant={plan.highlighted ? "inverse" : "secondary"}
                className="mt-8 w-full"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <Button href="/pricing" variant="ghost">
            Compare all plans in detail
          </Button>
        </div>
      </Container>
    </section>
  );
}
