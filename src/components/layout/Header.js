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
import ProductsMenu from "./ProductsMenu";
import { primaryNav } from "@/data/nav";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "@/data/site";
import { cn } from "@/lib/utils";
import { EASE_PREMIUM } from "@/lib/motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const closeTimer = useRef(null);
  const closeTimerProducts = useRef(null);
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
    setProductsOpen(false);
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

  const openProducts = () => {
    clearTimeout(closeTimerProducts.current);
    setProductsOpen(true);
  };
  const scheduleCloseProducts = () => {
    closeTimerProducts.current = setTimeout(() => setProductsOpen(false), 150);
  };

  return (
    <header
      className={cn("fixed inset-x-0 top-0 z-50 pt-3 transition-colors duration-500 sm:pt-4", menuOpen && "bg-cream-100")}
      onMouseLeave={() => {
        scheduleCloseServices();
        scheduleCloseProducts();
      }}
    >
      <Container>
        <div
          className={cn(
            "flex h-16 items-center justify-between gap-4 rounded-full border px-4 transition-all duration-500 lg:px-4 xl:px-6",
            menuOpen
              ? "border-transparent bg-cream-100 shadow-none"
              : scrolled || servicesOpen || productsOpen
                ? "border-ink-200/70 bg-cream-50/95 shadow-soft-md backdrop-blur-md"
                : "border-cream-50/60 bg-cream-50/70 shadow-soft-sm backdrop-blur-md"
          )}
        >
          <Link href="/" className="relative z-10">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-5 xl:gap-8 lg:flex">
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

              if (item.productsMenu) {
                return (
                  <div key={item.href} className="relative" onMouseEnter={openProducts}>
                    <Link
                      href={item.href}
                      aria-expanded={productsOpen}
                      onFocus={openProducts}
                      className={cn(
                        "relative flex items-center gap-1 text-sm font-medium tracking-tight text-ink-800 transition-colors",
                        (active || productsOpen) && "text-teal-600"
                      )}
                    >
                      <motion.span
                        aria-hidden
                        className="absolute -inset-x-3 -inset-y-2 -z-10 rounded-full bg-teal-400/15"
                        animate={{ opacity: [0.35, 0.75, 0.35], scale: [0.92, 1, 0.92] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                      />
                      {item.label}
                      <ChevronDown
                        className={cn("size-3.5 transition-transform duration-300", productsOpen && "rotate-180")}
                      />
                      <motion.span
                        aria-hidden
                        className="absolute -right-3.5 -top-2.5 rounded-full bg-teal-600 px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none tracking-wide text-cream-50"
                        animate={{ scale: [1, 1.12, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      >
                        New
                      </motion.span>
                    </Link>
                    <AnimatePresence>
                      {productsOpen && (
                        <div onMouseEnter={openProducts} onMouseLeave={scheduleCloseProducts}>
                          <ProductsMenu onNavigate={() => setProductsOpen(false)} />
                        </div>
                      )}
                    </AnimatePresence>
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

          <div className="hidden items-center gap-2 xl:gap-3 lg:flex">
            <Button
              href={buildWhatsAppLink(defaultWhatsAppMessage)}
              external
              variant="secondary"
              size="md"
              icon={false}
            >
              <MessageCircle className="size-4" strokeWidth={2.25} />
              <span className="hidden xl:inline">WhatsApp Us</span>
            </Button>
            <Button href="/quote" variant="primary" size="md">
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
                <Button href="/quote" variant="primary" className="w-full">
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
