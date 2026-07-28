"use client";

import { motion } from "framer-motion";
import { Check, ArrowDown, Lock, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { plans } from "@/data/pricing";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeUp, viewportOnce, defaultTransition } from "@/lib/motion";

export default function PricingPlans({ onSelectPlan }) {
  const selectPlan = (plan) => {
    onSelectPlan?.(plan);
    document.getElementById("get-quote")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-8 lg:py-12">
      <Container>
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:items-start"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.key}
              variants={fadeUp}
              transition={defaultTransition()}
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative flex flex-col rounded-2xl border p-7",
                plan.highlighted
                  ? "border-teal-400 bg-ink-950 text-cream-100 shadow-soft-xl lg:-mt-3"
                  : "border-ink-200 bg-cream-50"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-7 flex flex-wrap items-center gap-2">
                  <Badge tone={plan.badgeTone || "teal"} className="w-fit">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <h3 className={cn("font-display text-2xl", plan.highlighted ? "text-cream-50" : "text-ink-900")}>
                {plan.name}
              </h3>
              {plan.subBadge && (
                <p className={cn("mt-1.5 text-xs font-medium", plan.highlighted ? "text-teal-400" : "text-gold-700")}>
                  ★ {plan.subBadge}
                </p>
              )}
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
              {plan.valueStack && (
                <p className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-teal-500/15 px-3 py-1 text-xs font-semibold text-teal-400">
                  <Sparkles className="size-3.5" strokeWidth={2.5} />
                  {plan.valueStack}
                </p>
              )}

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {plan.everythingIn && (
                  <li
                    className={cn(
                      "-mt-1 mb-1 text-xs font-semibold uppercase tracking-wide",
                      plan.highlighted ? "text-teal-400" : "text-teal-600"
                    )}
                  >
                    Everything in {plan.everythingIn}, plus:
                  </li>
                )}
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className={cn("mt-0.5 size-4 shrink-0", plan.highlighted ? "text-teal-400" : "text-teal-500")} />
                    <span className={plan.highlighted ? "text-cream-200" : "text-ink-700"}>{f}</span>
                  </li>
                ))}
                {plan.lockedFeatures && (
                  <>
                    <li className="mt-2 border-t border-ink-200/70 pt-4 text-xs font-semibold uppercase tracking-wide text-ink-400">
                      Unlocks with Growth
                    </li>
                    {plan.lockedFeatures.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm opacity-60">
                        <Lock className="mt-0.5 size-3.5 shrink-0 text-ink-400" strokeWidth={2.25} />
                        <span className="text-ink-500">{f}</span>
                      </li>
                    ))}
                  </>
                )}
              </ul>

              {plan.stack && (
                <div
                  className={cn(
                    "mt-6 border-t pt-4",
                    plan.highlighted ? "border-cream-500/20" : "border-ink-200"
                  )}
                >
                  <p
                    className={cn(
                      "mb-2.5 text-xs font-semibold uppercase tracking-wide",
                      plan.highlighted ? "text-cream-500" : "text-ink-500"
                    )}
                  >
                    Built with
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {plan.stack.map((tech) => (
                      <span
                        key={tech}
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
                          plan.highlighted
                            ? "bg-cream-100/10 text-cream-200 ring-1 ring-inset ring-cream-100/20"
                            : "bg-cream-100 text-ink-600 ring-1 ring-inset ring-ink-200"
                        )}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <motion.button
                type="button"
                onClick={() => selectPlan(plan)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "group relative mt-8 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3 text-sm font-medium tracking-tight transition-colors duration-300",
                  plan.highlighted ? "bg-cream-100 text-ink-900 hover:bg-cream-200" : "bg-teal-500 text-cream-50"
                )}
              >
                {!plan.highlighted && (
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 bg-teal-700 transition-transform duration-500 ease-premium group-hover:scale-x-100"
                  />
                )}
                <span className="relative inline-flex items-center gap-2">{plan.cta}</span>
                <ArrowDown className="relative size-4 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={2.25} />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
