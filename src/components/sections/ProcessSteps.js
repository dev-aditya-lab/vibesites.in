"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { processSteps } from "@/data/process";
import { staggerContainer, fadeUp, viewportOnce, defaultTransition } from "@/lib/motion";

export default function ProcessSteps() {
  return (
    <section className="bg-ink-950 py-24 text-cream-100 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="A process built for zero surprises."
          description="No black-box agencies here. You'll always know exactly what stage your project is at and what happens next."
          tone="dark"
        />

        <motion.ol
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-ink-800 sm:grid-cols-2 lg:grid-cols-5"
        >
          {processSteps.map((step) => (
            <motion.li
              key={step.step}
              variants={fadeUp}
              transition={defaultTransition()}
              className="flex flex-col gap-5 bg-ink-950 p-8"
            >
              <span className="font-display text-sm text-rust-400">{step.step}</span>
              <div className="flex size-11 items-center justify-center rounded-full border border-ink-700 text-cream-200">
                <DynamicIcon name={step.icon} className="size-5" />
              </div>
              <h3 className="font-display text-xl text-cream-50">{step.title}</h3>
              <p className="text-sm leading-relaxed text-cream-400">{step.description}</p>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}
