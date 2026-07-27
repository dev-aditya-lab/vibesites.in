"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import DynamicIcon from "@/components/ui/DynamicIcon";
import Button from "@/components/ui/Button";
import { services, popularServiceSlugs, serviceCategories, getServicesByCategory } from "@/data/services";
import { staggerContainer, fadeUp, viewportOnce, defaultTransition } from "@/lib/motion";

export default function ServicesGrid() {
  const popular = popularServiceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean);

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What we do"
            title="Every service your website or app needs, under one roof."
            description="From a five-page brochure site to a full e-commerce platform with a companion app and the marketing to back it — six practice areas, thirty services, one team."
          />
          <Button href="/services" variant="secondary" className="shrink-0">
            View all services
          </Button>
        </div>

        {/* Tier 1: category groups — the macro view */}
        <motion.div
          variants={staggerContainer(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {serviceCategories.map((category) => {
            const count = getServicesByCategory(category.key).length;
            return (
              <motion.div key={category.key} variants={fadeUp} transition={defaultTransition()}>
                <Link
                  href={`/services#${category.anchor}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-ink-200 bg-cream-50 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-teal-300 hover:shadow-soft-lg"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-teal-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="relative">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                      <DynamicIcon name={category.icon} className="size-6" />
                    </div>
                    <h3 className="mt-6 font-display text-xl text-ink-900">{category.label}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">{category.description}</p>
                  </div>
                  <div className="relative mt-8 flex items-center justify-between text-sm font-medium text-teal-600">
                    <span>
                      {count} service{count !== 1 ? "s" : ""}
                    </span>
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Tier 2: most-requested services — the micro view */}
        <div className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-500">Most requested</p>
          <motion.div
            variants={staggerContainer(0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-5 flex flex-wrap gap-3"
          >
            {popular.map((service) => (
              <motion.div key={service.slug} variants={fadeUp} transition={defaultTransition()}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-ink-200 bg-cream-50 py-2.5 pl-3 pr-4 transition-all duration-300 hover:border-teal-300 hover:bg-cream-200"
                >
                  <span className="flex size-7 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                    <DynamicIcon name={service.icon} className="size-3.5" />
                  </span>
                  <span className="text-sm font-medium text-ink-800">{service.title}</span>
                  <ArrowRight className="size-3.5 text-ink-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-teal-600" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
