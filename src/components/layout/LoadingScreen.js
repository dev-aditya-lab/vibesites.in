"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_PREMIUM } from "@/lib/motion";

const LoaderScene = dynamic(() => import("@/components/three/LoaderScene"), { ssr: false });

const SESSION_KEY = "vibesites-intro-played";

export default function LoadingScreen() {
  const [phase, setPhase] = useState("skip"); // skip | intro | exiting | done

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyPlayed = sessionStorage.getItem(SESSION_KEY);

    if (reduceMotion || alreadyPlayed) {
      setPhase("done");
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");
    setPhase("intro");

    const exitTimer = setTimeout(() => setPhase("exiting"), 1700);
    const doneTimer = setTimeout(() => setPhase("done"), 2500);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = phase === "intro" || phase === "exiting" ? "hidden" : "";
  }, [phase]);

  if (phase === "done" || phase === "skip") return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          animate={{ y: phase === "exiting" ? "-100%" : 0 }}
          transition={{ duration: 0.85, ease: EASE_PREMIUM }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
        >
          <motion.div
            animate={{ opacity: phase === "exiting" ? 0 : 1 }}
            transition={{ duration: 0.35, ease: EASE_PREMIUM }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: 0.05 }}
              className="size-28 sm:size-36"
            >
              <LoaderScene className="h-full w-full" />
            </motion.div>
            <span className="mt-2 font-display text-4xl font-medium tracking-tight text-cream-50 sm:text-5xl">
              Vibesites
            </span>
            <svg viewBox="0 0 240 16" className="mt-3 h-4 w-48 sm:w-56" fill="none" preserveAspectRatio="none">
              <motion.path
                d="M2 8 C 30 -2, 50 18, 76 8 C 102 -2, 122 18, 148 8 C 174 -2, 194 18, 220 8 C 226 6, 234 5, 238 6"
                stroke="var(--color-teal-400)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.1, ease: EASE_PREMIUM, delay: 0.15 }}
              />
            </svg>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-cream-500"
            >
              Web &amp; App Development
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
