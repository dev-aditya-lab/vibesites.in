"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { portfolio } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = portfolio.slice(0, 6);

/**
 * Desktop: GSAP ScrollTrigger pins the section and scrubs the row horizontally
 * as the user scrolls vertically. Mobile/tablet: a native horizontal
 * scroll-snap row instead — scroll-jacking horizontal panning on touch
 * devices is worse UX than letting the OS handle the swipe directly.
 */
export default function HorizontalShowcase() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        const distance = track.scrollWidth - track.parentElement.offsetWidth;

        const tween = gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: () => `+=${distance}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        return () => tween.scrollTrigger?.kill();
      });

      return () => mm.revert();
    },
    { scope: wrapperRef }
  );

  return (
    <section ref={wrapperRef} className="relative overflow-hidden py-24 lg:h-screen lg:overflow-visible lg:py-0 lg:pt-24">
      <div className="flex h-full flex-col justify-center gap-8 lg:gap-10">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Selected work"
              title="Results our clients can point to."
              description="A handful of the businesses we've helped design, build, and grow."
              size="sm"
            />
          </div>
        </Container>

        <div className="overflow-x-auto lg:overflow-hidden">
          <div
            ref={trackRef}
            className="flex w-max gap-6 px-5 snap-x snap-mandatory sm:px-8 lg:w-max lg:snap-none lg:px-12"
          >
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className="group block w-[78vw] shrink-0 snap-start sm:w-[26rem] lg:w-[30vw]"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-100">
                  <Image
                    src={project.thumb}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 30vw, 78vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute right-5 top-5 flex size-11 -translate-y-2 items-center justify-center rounded-full bg-cream-50 text-ink-900 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="size-5" />
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl text-ink-900">{project.title}</h3>
                    <p className="mt-1.5 text-sm text-ink-600">{project.category}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-cream-200 px-3 py-1 text-xs font-medium text-ink-600">
                    {project.year}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
