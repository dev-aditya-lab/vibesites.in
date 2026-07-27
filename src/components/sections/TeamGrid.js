"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, viewportOnce, defaultTransition } from "@/lib/motion";

export default function TeamGrid({ members }) {
  return (
    <motion.div
      variants={staggerContainer(0.06)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
    >
      {members.map((member) => (
        <motion.div key={member.name} variants={fadeUp} transition={defaultTransition()} className="group">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink-100">
            <Image
              src={member.img}
              alt={member.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <p className="mt-3 font-display text-lg text-ink-900">{member.name}</p>
          <p className="text-sm text-teal-600">{member.role}</p>
          <p className="mt-1.5 text-xs leading-relaxed text-ink-500">{member.bio}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
