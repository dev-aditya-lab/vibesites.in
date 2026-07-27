"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { serviceCategories, megaMenuHighlights, getServiceBySlug } from "@/data/services";
import { buildWhatsAppLink } from "@/data/site";
import { EASE_PREMIUM } from "@/lib/motion";

const panelVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: EASE_PREMIUM, staggerChildren: 0.04, delayChildren: 0.04 },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_PREMIUM } },
};

export default function MegaMenu({ onNavigate }) {
  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="absolute inset-x-0 top-full z-40 pt-3"
    >
      <div className="mx-auto max-w-[88rem] px-5 lg:px-12">
        <div className="flex max-h-[calc(100vh-6.5rem)] flex-col overflow-hidden rounded-2xl border border-ink-200 bg-cream-50 shadow-soft-xl">
          <div className="grid min-h-0 shrink grid-cols-3 gap-x-8 gap-y-7 overflow-y-auto p-8">
            {serviceCategories.map((category) => {
              const highlights = (megaMenuHighlights[category.key] || [])
                .map((slug) => getServiceBySlug(slug))
                .filter(Boolean);

              return (
                <motion.div key={category.key} variants={columnVariants}>
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                      <DynamicIcon name={category.icon} className="size-4" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="font-display text-sm text-ink-950">{category.label}</p>
                    </div>
                  </div>

                  <ul className="mt-3 flex flex-col gap-0.5">
                    {highlights.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          onClick={onNavigate}
                          className="group flex items-start gap-2.5 rounded-lg px-2 py-1.5 -mx-2 transition-colors hover:bg-cream-200"
                        >
                          <DynamicIcon
                            name={service.icon}
                            className="mt-0.5 size-4 shrink-0 text-ink-400 transition-colors group-hover:text-teal-600"
                          />
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-ink-800 group-hover:text-ink-950">
                              {service.title}
                            </span>
                            <span className="block truncate text-xs leading-snug text-ink-500">{service.summary}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/services#${category.anchor}`}
                    onClick={onNavigate}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-teal-600 hover:text-teal-700"
                  >
                    See all
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="flex shrink-0 flex-col items-start justify-between gap-4 border-t border-ink-200 bg-cream-200/50 px-8 py-5 sm:flex-row sm:items-center">
            <p className="text-sm text-ink-600">Not sure which service fits your project?</p>
            <div className="flex gap-3">
              <Link
                href="/services"
                onClick={onNavigate}
                className="link-underline text-sm font-medium text-ink-800"
              >
                Browse all services
              </Link>
              <a
                href={buildWhatsAppLink("Hi! I'm not sure which service fits my project — can you help?")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-700"
              >
                <MessageCircle className="size-4" strokeWidth={2.25} />
                Ask us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
