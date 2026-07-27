/**
 * Shared motion tokens for Framer Motion + GSAP, kept in sync with the
 * CSS easing/duration tokens defined in globals.css.
 */

export const EASE_PREMIUM = [0.16, 1, 0.3, 1];
export const EASE_PREMIUM_IN_OUT = [0.65, 0, 0.35, 1];

export const DURATION = {
  fast: 0.2,
  base: 0.45,
  slow: 0.75,
  slower: 1.1,
};

/** Default transition applied by FadeIn; pass `delay` to offset it. */
export const defaultTransition = (delay = 0) => ({
  duration: DURATION.slow,
  ease: EASE_PREMIUM,
  delay,
});

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer = (stagger = 0.09, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1 },
};

export const viewportOnce = { once: true, margin: "-80px 0px -80px 0px" };
