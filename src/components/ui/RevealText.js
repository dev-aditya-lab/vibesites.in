"use client";

import { motion } from "framer-motion";
import { EASE_PREMIUM } from "@/lib/motion";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045 },
  },
};

const word = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.7, ease: EASE_PREMIUM },
  },
};

/** Splits text into words and reveals them line-by-line on scroll into view. */
export default function RevealText({ text, className }) {
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px 0px -40px 0px" }}
      style={{ display: "inline" }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span variants={word} className="inline-block">
            {w}
            {i !== words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
