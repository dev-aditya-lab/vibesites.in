"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import RLLogo from "./RLLogo";
import RLButton from "./RLButton";
import { rlPrimaryNav, rlDemoMessage, buildRLWhatsAppLink } from "@/data/rewardloop";
import { cn } from "@/lib/utils";
import { EASE_PREMIUM } from "@/lib/motion";

export default function RLHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 pt-3 transition-colors duration-500 sm:pt-4",
        menuOpen && "bg-blush-50"
      )}
    >
      <Container>
        <div
          className={cn(
            "flex h-16 items-center justify-between gap-4 rounded-full border px-4 transition-all duration-500 lg:px-4 xl:px-6",
            menuOpen
              ? "border-transparent bg-blush-50 shadow-none"
              : scrolled
                ? "border-black/10 bg-white/95 shadow-rl-md backdrop-blur-md"
                : "border-white/60 bg-white/70 shadow-rl-sm backdrop-blur-md"
          )}
        >
          <RLLogo className="relative z-10" />

          <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
            {rlPrimaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-semibold tracking-tight text-[#1a1114]/80 transition-colors hover:text-[#1a1114]",
                    active && "text-brand-600"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <RLButton href={buildRLWhatsAppLink(rlDemoMessage)} external variant="ghost" size="md" icon={false}>
              Talk to Sales
            </RLButton>
            <RLButton href="/vibeproducts/rewardLoop/contact" variant="primary" size="md">
              Book a Demo
            </RLButton>
          </div>

          <button
            className="relative z-10 flex size-11 items-center justify-center rounded-full border border-black/10 lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: EASE_PREMIUM }}
            className="overflow-hidden bg-blush-50 lg:hidden"
          >
            <Container className="flex h-[calc(100dvh-5rem)] flex-col justify-between overflow-y-auto py-10">
              <nav className="flex flex-col gap-1">
                {rlPrimaryNav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE_PREMIUM, delay: 0.08 * i }}
                  >
                    <Link href={item.href} className="block border-b border-black/10 py-5 font-display text-2xl font-bold text-[#1a1114]">
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="flex flex-col gap-3">
                <RLButton href={buildRLWhatsAppLink(rlDemoMessage)} external variant="outlineDark" icon={false} className="w-full">
                  Talk to Sales
                </RLButton>
                <RLButton href="/vibeproducts/rewardLoop/contact" variant="primary" className="w-full">
                  Book a Demo
                </RLButton>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
