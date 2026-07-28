"use client";

import { motion } from "framer-motion";
import { Box, ShieldCheck, Zap, Gauge, Lock, Headphones } from "lucide-react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiSupabase,
  SiFirebase,
  SiGithub,
  SiVercel,
  SiGraphql,
} from "react-icons/si";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { techStack, techValueProps } from "@/data/process";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeUp, viewportOnce, defaultTransition, EASE_PREMIUM } from "@/lib/motion";

const techIcons = {
  HTML5: { Icon: SiHtml5, color: "#E34F26" },
  CSS3: { Icon: SiCss, color: "#1572B6" },
  JavaScript: { Icon: SiJavascript, color: "#CA8A04" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  React: { Icon: SiReact, color: "#0891B2" },
  "Next.js": { Icon: SiNextdotjs, color: "#111111" },
  "Node.js": { Icon: SiNodedotjs, color: "#339933" },
  Express: { Icon: SiExpress, color: "#111111" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  MySQL: { Icon: SiMysql, color: "#4479A1" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  Supabase: { Icon: SiSupabase, color: "#0E9C6F" },
  Firebase: { Icon: SiFirebase, color: "#CA8A04" },
  "Git & GitHub": { Icon: SiGithub, color: "#181717" },
  Vercel: { Icon: SiVercel, color: "#111111" },
  "REST & GraphQL APIs": { Icon: SiGraphql, color: "#D6249F" },
};

const valueIcons = { ShieldCheck, Zap, Gauge, Lock, Headphones };

export default function TechStack() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -left-6 -top-6 size-40 opacity-40"
          style={{
            backgroundImage: "radial-gradient(var(--color-ink-300) 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="absolute -top-24 right-[-8%] size-104 rounded-full bg-teal-100/50 blur-3xl" />
      </div>

      <Container>
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: EASE_PREMIUM }}
          >
            <Badge tone="teal" className="gap-1.5">
              <Box className="size-3.5" strokeWidth={2.25} />
              Technology
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.1 }}
            className="mt-6 text-balance font-display text-display-md font-medium text-ink-900"
          >
            Built on tools that{" "}
            <span className="relative whitespace-nowrap text-teal-600">
              scale
              <span aria-hidden className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-teal-400/70" />
            </span>{" "}
            with you.
          </motion.h2>

          <div aria-hidden className="mt-6 flex w-40 items-center gap-3">
            <span className="h-px flex-1 bg-ink-200" />
            <span className="size-1.5 rotate-45 bg-gold-500" />
            <span className="h-px flex-1 bg-ink-200" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600"
          >
            No outdated page builders or locked-in platforms — every project is hand-coded on{" "}
            <span className="font-semibold text-ink-900">modern, production-grade technology.</span>
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {techStack.map((group) => (
            <motion.div
              key={group.category}
              variants={fadeUp}
              transition={defaultTransition()}
              className="flex flex-col rounded-2xl border border-ink-200 bg-cream-50 p-6"
            >
              <div className="flex size-11 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                <DynamicIcon name={group.icon} className="size-5" strokeWidth={1.75} />
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-ink-900">{group.category}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{group.description}</p>

              <div className="mt-5 flex flex-1 flex-col justify-end gap-2 border-t border-ink-200 pt-5">
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const tech = techIcons[item];
                    return (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-700"
                      >
                        {tech && <tech.Icon className="size-3.5 shrink-0" style={{ color: tech.color }} />}
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-8 border-t border-ink-200 pt-10 sm:grid-cols-2 lg:grid-cols-5"
        >
          {techValueProps.map((prop) => {
            const Icon = valueIcons[prop.icon];
            return (
              <motion.div key={prop.title} variants={fadeUp} transition={defaultTransition()} className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-700">
                  {Icon && <Icon className="size-4.5" strokeWidth={1.75} />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{prop.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500">{prop.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
