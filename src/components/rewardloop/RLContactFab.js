"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { buildRLWhatsAppLink, rlDemoMessage } from "@/data/rewardloop";
import { EASE_PREMIUM } from "@/lib/motion";

export default function RLContactFab() {
  return (
    <motion.a
      href={buildRLWhatsAppLink(rlDemoMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with RewardLoop on WhatsApp"
      className="group fixed bottom-6 right-5 z-40 flex items-center gap-3 rounded-full bg-brand-600 py-3.5 pl-3.5 pr-3.5 text-white shadow-rl-lg sm:bottom-8 sm:right-8"
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 1.1 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
    >
      <span className="relative flex size-6 shrink-0 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" />
        <MessageCircle className="relative size-6" strokeWidth={2} />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-500 ease-out group-hover:max-w-[9rem] group-focus-visible:max-w-[9rem]">
        Chat with us
      </span>
    </motion.a>
  );
}
