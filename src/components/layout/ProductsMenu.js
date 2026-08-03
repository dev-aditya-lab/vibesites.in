"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { products } from "@/data/nav";
import { EASE_PREMIUM } from "@/lib/motion";

const panelVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: EASE_PREMIUM, staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_PREMIUM } },
};

export default function ProductsMenu({ onNavigate }) {
  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="absolute left-1/2 top-full z-40 w-[22rem] -translate-x-1/2 pt-3"
    >
      <div className="overflow-hidden rounded-2xl border border-ink-200 bg-cream-50 p-3 shadow-soft-xl">
        <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-widest text-ink-400">
          Vibesites Products
        </p>

        <div className="flex flex-col gap-1.5">
          {products.map((product) => {
            const isLive = product.status === "live";

            const cardContent = (
              <>
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                    isLive ? "bg-teal-50 text-teal-600" : "bg-gold-50 text-gold-600"
                  }`}
                >
                  <DynamicIcon name={product.icon} className="size-5" strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-ink-900">{product.name}</span>
                    {isLive ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-teal-700">
                        <span className="relative flex size-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-500/70" />
                          <span className="relative inline-flex size-1.5 rounded-full bg-teal-600" />
                        </span>
                        Live
                      </span>
                    ) : (
                      <span className="text-shimmer-gold text-[10px] font-extrabold uppercase tracking-wide">
                        Launching Soon
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-ink-500">{product.tagline}</span>
                </span>
                {isLive && (
                  <ArrowRight className="size-4 shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:text-teal-600" />
                )}
              </>
            );

            if (!isLive) {
              return (
                <motion.div
                  key={product.key}
                  variants={itemVariants}
                  className="group flex cursor-default items-center gap-3 rounded-xl px-3 py-3 opacity-70"
                >
                  {cardContent}
                </motion.div>
              );
            }

            return (
              <motion.div key={product.key} variants={itemVariants}>
                <Link
                  href={product.href}
                  onClick={onNavigate}
                  className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-cream-200"
                >
                  {cardContent}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
