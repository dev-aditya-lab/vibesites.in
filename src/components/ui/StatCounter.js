"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

export default function StatCounter({ value, suffix = "", prefix = "", className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px -60px 0px" });
  const [display, setDisplay] = useState(0);
  const isDecimal = !Number.isInteger(value);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(isDecimal ? Number(v.toFixed(1)) : Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value, isDecimal]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
