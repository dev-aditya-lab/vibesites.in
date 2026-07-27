"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Card({ children, className, hover = true, as = "div" }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-ink-200/70 bg-cream-50 p-8 shadow-soft-sm",
        hover && "transition-shadow duration-500 hover:shadow-soft-lg",
        className
      )}
      whileHover={hover ? { y: -6, scale: 1.015 } : undefined}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
