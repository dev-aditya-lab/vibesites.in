"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { industries } from "@/data/process";
import { staggerContainer, fadeUp, viewportOnce, defaultTransition } from "@/lib/motion";

export default function IndustriesBand() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Who we work with"
          title="Built for every kind of business."
          description="Whatever you're building, we've likely shipped something like it."
          align="center"
        />

        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.name}
              variants={fadeUp}
              transition={defaultTransition()}
              className="flex flex-col items-center gap-4 rounded-2xl border border-ink-200 bg-cream-50 px-4 py-8 text-center transition-colors duration-300 hover:border-gold-300"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-gold-50 text-gold-700">
                <DynamicIcon name={industry.icon} className="size-6" />
              </div>
              <p className="text-sm font-medium text-ink-800">{industry.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
