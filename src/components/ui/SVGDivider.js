"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * A decorative divider line that draws itself (stroke-dasharray technique)
 * as it scrolls into view, scrubbed to scroll position via GSAP ScrollTrigger.
 */
export default function SVGDivider({ stroke = "var(--color-teal-500)", className }) {
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
          start: "top 85%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });
    },
    { scope: wrapRef }
  );

  return (
    <div ref={wrapRef} className={cn("w-full", className)}>
      <svg viewBox="0 0 1200 60" className="h-10 w-full sm:h-14" fill="none" preserveAspectRatio="none">
        <path
          ref={pathRef}
          d="M0 30 C 100 5, 200 55, 300 30 S 500 5, 600 30 S 800 55, 900 30 S 1100 5, 1200 30"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
