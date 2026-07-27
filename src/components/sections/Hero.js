"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import RevealText from "@/components/ui/RevealText";
import { buildWhatsAppLink, defaultWhatsAppMessage, siteConfig } from "@/data/site";
import { EASE_PREMIUM } from "@/lib/motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-36 sm:pt-44 lg:pb-28 lg:pt-52">
      {/* Ambient background shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-[-10%] size-[36rem] rounded-full bg-rust-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-[-15%] size-[28rem] rounded-full bg-olive-200/40 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          className="inline-flex items-center gap-2 rounded-full border border-ink-300 bg-cream-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink-700 backdrop-blur"
        >
          <span className="flex size-1.5 rounded-full bg-olive-500" />
          Meta &amp; WhatsApp Verified Business
        </motion.div>

        <h1 className="mt-8 max-w-5xl text-display-xl font-medium text-ink-950">
          <RevealText text="Websites and apps" />
          <br />
          <RevealText text="built to " className="text-ink-950" />
          <span className="relative inline-block">
            <RevealText text="convert." className="italic text-rust-500" />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.5 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-ink-600 sm:text-xl"
        >
          Vibesites designs and builds fast, beautiful websites, online stores, and mobile apps
          for businesses that need their site to actually win customers — not just exist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href={buildWhatsAppLink(defaultWhatsAppMessage)} external size="lg" icon={false}>
            <MessageCircle className="size-5" strokeWidth={2.25} />
            Chat on WhatsApp
          </Button>
          <Button href="/portfolio" variant="secondary" size="lg">
            See our work
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.8 }}
          className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4"
        >
          <div className="flex items-center gap-1 text-rust-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-current" strokeWidth={0} />
            ))}
            <span className="ml-2 text-sm font-medium text-ink-700">4.9/5 from 200+ clients</span>
          </div>
          <div className="hidden h-6 w-px bg-ink-300 sm:block" />
          <p className="text-sm font-medium text-ink-700">240+ projects shipped since {siteConfig.foundedYear}</p>
        </motion.div>
      </Container>
    </section>
  );
}
