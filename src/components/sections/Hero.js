"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, ArrowRight, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import RevealText from "@/components/ui/RevealText";
import { buildWhatsAppLink, defaultWhatsAppMessage, siteConfig } from "@/data/site";
import { EASE_PREMIUM } from "@/lib/motion";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const sectionRef = useRef(null);
  const orbOneRef = useRef(null);
  const orbTwoRef = useRef(null);

  useGSAP(
    () => {
      // Scroll-linked parallax — the two properties below (y) are driven by scroll position.
      gsap.to(orbOneRef.current, {
        y: 160,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(orbTwoRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });

      // Continuous idle drift — always running, independent of scroll, so the
      // background never sits still even before the visitor interacts at all.
      gsap.to(orbOneRef.current, {
        x: 50,
        scale: 1.1,
        duration: 9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(orbTwoRef.current, {
        x: -40,
        scale: 1.12,
        duration: 11,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.6,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-36">
      {/* Ambient background shapes, parallaxed via GSAP ScrollTrigger */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div ref={orbOneRef} className="absolute -top-24 right-[-10%] size-[36rem] rounded-full bg-teal-200/40 blur-3xl" />
        <div ref={orbTwoRef} className="absolute bottom-0 left-[-15%] size-[28rem] rounded-full bg-gold-200/40 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Procedural 3D centerpiece — desktop only, disabled on mobile for performance/battery */}
      <div className="pointer-events-none absolute right-[2%] top-1/2 hidden aspect-square w-104 max-w-[36%] -translate-y-1/2 lg:block xl:w-120">
        <HeroScene className="h-full w-full" />
      </div>

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          className="inline-flex items-center gap-2 rounded-full border border-ink-300 bg-cream-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink-700 backdrop-blur"
        >
          <span className="flex size-1.5 rounded-full bg-gold-500" />
          Trusted by 200+ Businesses Worldwide
        </motion.div>

        <h1 className="mt-8 max-w-5xl text-display-xl font-medium text-ink-950">
          <RevealText text="Websites and apps" />
          <br />
          <RevealText text="built to " className="text-ink-950" />
          <span className="relative inline-block">
            <RevealText text="convert." className="italic text-teal-500" />
            <motion.svg
              viewBox="0 0 300 20"
              className="pointer-events-none absolute -bottom-2 left-0 h-4 w-full sm:-bottom-3 sm:h-5"
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M2 14 C 40 4, 80 18, 120 10 S 200 2, 240 12 S 280 16, 298 8"
                stroke="var(--color-gold-500)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: EASE_PREMIUM, delay: 1.15 }}
              />
            </motion.svg>
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
          <div className="flex items-center gap-1 text-teal-500">
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
