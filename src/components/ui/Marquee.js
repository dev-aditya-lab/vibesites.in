"use client";

import { cn } from "@/lib/utils";

/**
 * Infinite CSS-driven marquee. Duplicates children once so the loop is seamless.
 * `speed` is seconds for one full pass.
 */
export default function Marquee({ children, speed = 32, reverse = false, className, gap = "gap-10" }) {
  return (
    <div className={cn("group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]", className)}>
      <div
        className={cn("flex shrink-0 items-center", gap)}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn("flex shrink-0 items-center", gap)}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
      </div>
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .group:hover > div {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
