"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import RevealText from "@/components/ui/RevealText";
import { siteConfig } from "@/data/site";
import { EASE_PREMIUM } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const teamStat = siteConfig.stats.find((s) => s.label === "Team members");
const countriesStat = siteConfig.stats.find((s) => s.label === "Countries served");

export default function Hero() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      // Slow scroll-linked parallax on the background photo, scrubbed to scroll position.
      gsap.to(imageRef.current, {
        y: 90,
        scale: 1.06,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-dvh items-center overflow-hidden pb-14 pt-24 sm:pt-28 lg:pb-16 lg:pt-28"
    >
      {/* Background photo, parallaxed via GSAP ScrollTrigger */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <div ref={imageRef} className="absolute inset-0 scale-105">
          <Image
            src="/hero-img1920x1080-laptop.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[75%_center] opacity-45 sm:opacity-70 lg:opacity-100"
          />
        </div>
      </div>

      {/* Readability scrim — near-opaque on mobile, resolving into a left-to-right
          fade on desktop so the copy sits on solid ground while the photo's product
          shots stay visible on the right. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-cream-100/92 to-cream-100/92 lg:bg-linear-to-r lg:from-cream-100 lg:from-40% lg:via-cream-100/55 lg:via-52% lg:to-cream-100/0 lg:to-64%"
      />

      <Container className="relative">
        <div className="lg:max-w-xl xl:max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            className="inline-flex items-center gap-2 rounded-full border border-ink-300 bg-cream-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink-700 backdrop-blur"
          >
            <Star className="size-3.5 fill-gold-500 text-gold-500" strokeWidth={0} />
            4.9/5 average rating from 200+ clients
          </motion.div>

          <h1 className="mt-6 text-display-lg font-medium text-ink-950">
            <RevealText text="240+ sites shipped." />
            <br />
            <RevealText text="All built to " className="text-ink-950" />
            <span className="relative inline-block">
              <RevealText text="convert." className="italic text-teal-500" />
              <motion.svg
                viewBox="0 0 300 20"
                className="pointer-events-none absolute -bottom-2 left-0 h-4 w-full sm:-bottom-3 sm:h-5"
                fill="none"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2.5 12 C 37.5 -2, 62.5 24, 95 10 C 127.5 -4, 152.5 24, 185 10 C 217.5 -4, 242.5 24, 275 10 C 285 7, 292.5 6, 297.5 7"
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
            className="mt-5 text-lg leading-relaxed text-ink-600 sm:text-xl"
          >
            We design and build fast, beautiful websites, online stores, and apps for businesses
            across {countriesStat.value}
            {countriesStat.suffix} countries — engineered to turn visitors into customers, not just exist.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.65 }}
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <Button href="/contact" size="lg">
              Start your project
            </Button>
            <Link
              href="/portfolio"
              className="link-underline group inline-flex items-center gap-2 text-base font-medium text-ink-900"
            >
              See our work
              <ArrowUpRight
                className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.25}
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4"
          >
            <p className="text-sm font-medium text-ink-700">
              {teamStat.value}
              {teamStat.suffix} people on the team
            </p>
            <div className="hidden h-6 w-px bg-ink-300 sm:block" />
            <p className="text-sm font-medium text-ink-700">Building since {siteConfig.foundedYear}</p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
