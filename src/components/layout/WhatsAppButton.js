"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "@/data/site";
import { EASE_PREMIUM } from "@/lib/motion";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={buildWhatsAppLink(defaultWhatsAppMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Vibesites on WhatsApp"
      className="group fixed bottom-6 right-5 z-40 flex items-center gap-3 rounded-full bg-gold-600 py-3.5 pl-3.5 pr-3.5 text-cream-50 shadow-soft-lg sm:bottom-8 sm:right-8"
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 1.1 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
    >
      <span className="relative flex size-6 shrink-0 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cream-50/40" />
        <MessageCircle className="relative size-6" strokeWidth={2} />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-500 ease-out group-hover:max-w-[9rem] group-focus-visible:max-w-[9rem]">
        Chat with us
      </span>
    </motion.a>
  );
}
