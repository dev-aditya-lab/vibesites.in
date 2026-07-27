"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Large, illustrative connecting line that draws through the 5 process-step
 * icons as the section scrolls into view (desktop only — the grid stacks on
 * smaller breakpoints, where a horizontal connector wouldn't read correctly).
 */
export default function ProcessConnector() {
  const pathRef = useRef(null);
  const wrapRef = useRef(null);

  useGSAP(
    () => {
      const path = pathRef.current;
      if (!path) return;
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 0.6,
        },
      });
    },
    { scope: wrapRef }
  );

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-[94px] z-0 hidden h-6 -translate-y-1/2 lg:block"
    >
      <svg viewBox="0 0 1000 40" className="h-full w-full" fill="none" preserveAspectRatio="none">
        <path
          ref={pathRef}
          d="M100 20 C 167 6, 233 34, 300 20 S 433 6, 500 20 S 633 34, 700 20 S 833 6, 900 20"
          stroke="var(--color-gold-500)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
