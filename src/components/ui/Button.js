"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_PREMIUM } from "@/lib/motion";

const MotionLink = motion.create(Link);

const variants = {
  primary: "bg-teal-500 text-cream-50",
  secondary: "bg-transparent text-ink-900 border border-ink-300 hover:border-ink-900",
  inverse: "bg-cream-100 text-ink-900 hover:bg-cream-200",
  ghost: "bg-transparent text-ink-900 hover:bg-ink-100",
};

const sweepVariants = new Set(["primary"]);

const sizes = {
  md: "text-sm px-5 py-3",
  lg: "text-base px-7 py-4",
};

export default function Button({
  children,
  href,
  external,
  variant = "primary",
  size = "md",
  icon = true,
  className,
  onClick,
  type = "button",
  ...props
}) {
  const hasSweep = sweepVariants.has(variant);

  const classes = cn(
    "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-colors duration-300",
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      {hasSweep && (
        <span
          aria-hidden
          className="absolute inset-0 origin-left scale-x-0 bg-teal-700 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        />
      )}
      <span className="relative inline-flex items-center gap-2">{children}</span>
      {icon && (
        <ArrowUpRight
          className="relative size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2.25}
        />
      )}
    </>
  );

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.3, ease: EASE_PREMIUM },
  };

  if (href && external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...motionProps}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  if (href) {
    return (
      <MotionLink href={href} className={classes} {...motionProps} {...props}>
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} className={classes} {...motionProps} {...props}>
      {content}
    </motion.button>
  );
}
