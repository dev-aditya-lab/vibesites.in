"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Vibesites mark + wordmark, with an animated "vibe wave" underline that draws in on mount. */
export default function Logo({ className, tone = "light" }) {
  return (
    <span className={cn("group inline-flex items-center gap-2.5", className)}>
      <Image
        src="/vibesites-logo-1000x1000-no-text.png"
        alt=""
        width={40}
        height={40}
        className="size-9 shrink-0 object-contain"
        priority
      />
      <span className="inline-flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-2xl font-medium tracking-tight",
            tone === "dark" ? "text-cream-50" : "text-ink-900"
          )}
        >
          Vibesites
        </span>
        <svg
          viewBox="0 0 120 10"
          className="mt-0.5 h-2 w-full max-w-[7.5rem]"
          fill="none"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M1 6 C 15 -1, 25 12, 38 5 C 51 -2, 61 12, 74 5 C 87 -2, 97 12, 110 5 C 114 3.5, 117 3, 119 3.5"
            stroke="var(--color-teal-500)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          />
        </svg>
      </span>
    </span>
  );
}
