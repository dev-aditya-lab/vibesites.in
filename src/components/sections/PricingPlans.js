"use client";

import { motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { plans } from "@/data/pricing";
import { buildWhatsAppLink } from "@/data/site";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeUp, viewportOnce, defaultTransition } from "@/lib/motion";

export default function PricingPlans() {
  return (
    <section className="py-8 lg:py-12">
      <Container>
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.key}
              variants={fadeUp}
              transition={defaultTransition()}
              className={cn(
                "relative flex flex-col rounded-2xl border p-7",
                plan.highlighted
                  ? "border-rust-400 bg-ink-950 text-cream-100 shadow-soft-xl lg:-translate-y-3"
                  : "border-ink-200 bg-cream-50"
              )}
            >
              {plan.badge && (
                <Badge tone="rust" className="absolute -top-3.5 left-7 w-fit">
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
              </div>
              <p className={cn("mt-1 text-xs uppercase tracking-wide", plan.highlighted ? "text-cream-500" : "text-ink-500")}>
                {plan.priceNote} · {plan.bestFor}
              </p>
              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className={cn("mt-0.5 size-4 shrink-0", plan.highlighted ? "text-rust-400" : "text-rust-500")} />
                    <span className={plan.highlighted ? "text-cream-200" : "text-ink-700"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                href={buildWhatsAppLink(`Hi! I'd like to get started with the ${plan.name} plan.`)}
                external
                variant={plan.highlighted ? "inverse" : "primary"}
                className="mt-8 w-full"
                icon={false}
              >
                <MessageCircle className="size-4" strokeWidth={2.25} />
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
