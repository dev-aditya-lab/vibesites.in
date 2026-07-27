"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import DynamicIcon from "@/components/ui/DynamicIcon";
import Button from "@/components/ui/Button";
import { services, popularServiceSlugs } from "@/data/services";
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
            description="From a five-page brochure site to a full e-commerce platform with a companion app — we scope the right service for where your business actually is."
          />
          <Button href="/services" variant="secondary" className="shrink-0">
            View all services
          </Button>
        </div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {popular.map((service) => (
            <motion.div key={service.slug} variants={fadeUp} transition={defaultTransition()}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-ink-200 bg-cream-50 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-rust-300 hover:shadow-soft-lg"
              >
                <div>
                  <div className="flex size-12 items-center justify-center rounded-xl bg-rust-50 text-rust-600">
                    <DynamicIcon name={service.icon} className="size-6" />
                  </div>
                  <h3 className="mt-6 font-display text-xl text-ink-900">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{service.summary}</p>
                </div>
                <div className="mt-8 flex items-center gap-1.5 text-sm font-medium text-rust-600">
                  Learn more
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
