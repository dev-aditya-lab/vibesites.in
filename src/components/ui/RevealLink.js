"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce, defaultTransition } from "@/lib/motion";

const MotionLink = motion.create(Link);

/** Scroll-reveal wrapper around a Next Link — for card grids composed in server components. */
export default function RevealLink({ href, className, delay = 0, children, ...props }) {
  return (
    <MotionLink
      href={href}
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={defaultTransition(delay)}
      {...props}
    >
      {children}
    </MotionLink>
  );
}
