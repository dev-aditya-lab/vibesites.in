"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce, defaultTransition } from "@/lib/motion";

/** Generic scroll-triggered fade-up wrapper for non-text elements. */
export default function FadeIn({ children, delay = 0, className, as = "div", variants = fadeUp }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={defaultTransition(delay)}
    >
      {children}
    </MotionTag>
  );
}
