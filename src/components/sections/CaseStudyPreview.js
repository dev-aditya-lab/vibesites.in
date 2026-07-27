"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { portfolio } from "@/data/portfolio";
import { staggerContainer, fadeUp, viewportOnce, defaultTransition } from "@/lib/motion";

const preview = portfolio.slice(0, 4);

export default function CaseStudyPreview() {
  return (
    <section className="border-t border-ink-200 py-24 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="The work"
            title="Case studies, not headshots."
            description="A hands-on team of developers, designers, and support specialists — judged by what we ship, not who's on the roster."
          />
          <Button href="/portfolio" variant="secondary" className="shrink-0">
            View full portfolio
          </Button>
        </div>

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {preview.map((project) => (
            <motion.div key={project.slug} variants={fadeUp} transition={defaultTransition()} className="group">
              <Link href={`/portfolio/${project.slug}`} className="block">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-ink-100">
                  <Image
                    src={project.thumb}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute right-3 top-3 flex size-9 -translate-y-2 items-center justify-center rounded-full bg-cream-50 text-ink-900 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="size-4" />
                  </div>
                </div>
                <p className="mt-3 text-sm font-semibold text-ink-900">{project.title}</p>
                <p className="text-xs text-ink-500">{project.category}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
