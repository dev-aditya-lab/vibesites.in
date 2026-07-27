"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Menu, X, ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Logo from "./Logo";
import MegaMenu from "./MegaMenu";
import { primaryNav } from "@/data/nav";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "@/data/site";
import { cn } from "@/lib/utils";
import { EASE_PREMIUM } from "@/lib/motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const openServices = () => {
    clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleCloseServices = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || menuOpen || servicesOpen ? "bg-cream-100/90 shadow-soft-sm backdrop-blur-md" : "bg-transparent"
      )}
      onMouseLeave={scheduleCloseServices}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="relative z-10">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {primaryNav.map((item) => {
              const active = pathname === item.href;

              if (item.megaMenu) {
                return (
                  <div key={item.href} onMouseEnter={openServices}>
                    <Link
                      href={item.href}
                      aria-expanded={servicesOpen}
                      onFocus={openServices}
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium tracking-tight text-ink-800 transition-colors",
                        (active || servicesOpen) && "text-teal-600"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn("size-3.5 transition-transform duration-300", servicesOpen && "rotate-180")}
                      />
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "link-underline text-sm font-medium tracking-tight text-ink-800",
                    active && "text-teal-600"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button
              href={buildWhatsAppLink(defaultWhatsAppMessage)}
              external
              variant="secondary"
              size="md"
              icon={false}
            >
              <MessageCircle className="size-4" strokeWidth={2.25} />
              WhatsApp Us
            </Button>
            <Button href="/contact" variant="primary" size="md">
              Get a Quote
            </Button>
          </div>

          <button
            className="relative z-10 flex size-11 items-center justify-center rounded-full border border-ink-300 lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {servicesOpen && (
          <div onMouseEnter={openServices}>
            <MegaMenu onNavigate={() => setServicesOpen(false)} />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: EASE_PREMIUM }}
            className="overflow-hidden bg-cream-100 lg:hidden"
          >
            <Container className="flex h-[calc(100dvh-5rem)] flex-col justify-between overflow-y-auto py-10">
              <nav className="flex flex-col gap-1">
                {primaryNav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE_PREMIUM, delay: 0.08 * i }}
                  >
                    <Link
                      href={item.href}
                      className="block border-b border-ink-200 py-5 font-display text-3xl text-ink-900"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="flex flex-col gap-3">
                <Button
                  href={buildWhatsAppLink(defaultWhatsAppMessage)}
                  external
                  variant="secondary"
                  icon={false}
                  className="w-full"
                >
                  <MessageCircle className="size-4" strokeWidth={2.25} />
                  WhatsApp Us
                </Button>
                <Button href="/contact" variant="primary" className="w-full">
                  Get a Quote
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
