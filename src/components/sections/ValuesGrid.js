"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { values } from "@/data/values";
import { staggerContainer, fadeUp, viewportOnce, defaultTransition } from "@/lib/motion";

export default function ValuesGrid() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading eyebrow="What we believe" title="The principles behind every project." />
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={fadeUp}
              transition={defaultTransition()}
              className="rounded-2xl border border-ink-200 bg-cream-50 p-8"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <DynamicIcon name={value.icon} className="size-6" />
              </div>
              <h3 className="mt-6 font-display text-xl text-ink-900">{value.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-600">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
