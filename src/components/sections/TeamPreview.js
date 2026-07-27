"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { team } from "@/data/team";
import { staggerContainer, fadeUp, viewportOnce, defaultTransition } from "@/lib/motion";

const preview = team.slice(0, 8);

export default function TeamPreview() {
  return (
    <section className="border-t border-ink-200 py-24 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="The people"
            title="A team of 32, working as one."
            description="Designers, engineers, and strategists who've shipped hundreds of projects together."
          />
          <Button href="/team" variant="secondary" className="shrink-0">
            Meet the full team
          </Button>
        </div>

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {preview.map((member) => (
            <motion.div key={member.name} variants={fadeUp} transition={defaultTransition()} className="group">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-ink-100">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-ink-900">{member.name}</p>
              <p className="text-xs text-ink-500">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
