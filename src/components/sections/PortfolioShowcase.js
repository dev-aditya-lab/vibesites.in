"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { portfolio } from "@/data/portfolio";
import { fadeUp, viewportOnce, defaultTransition } from "@/lib/motion";

const featured = portfolio.slice(0, 4);

export default function PortfolioShowcase() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Results our clients can point to."
            description="A handful of the businesses we've helped design, build, and grow."
          />
          <Button href="/portfolio" variant="secondary" className="shrink-0">
            View full portfolio
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={defaultTransition(i * 0.1)}
            >
              <Link href={`/portfolio/${project.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-100">
                  <Image
                    src={project.thumb}
                    alt={project.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute right-5 top-5 flex size-11 -translate-y-2 items-center justify-center rounded-full bg-cream-50 text-ink-900 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="size-5" />
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl text-ink-900">{project.title}</h3>
                    <p className="mt-1.5 text-sm text-ink-600">{project.category}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-cream-200 px-3 py-1 text-xs font-medium text-ink-600">
                    {project.year}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
