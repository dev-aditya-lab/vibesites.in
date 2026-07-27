import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import CTASection from "@/components/sections/CTASection";
import { portfolio, getPortfolioBySlug } from "@/data/portfolio";

export function generateStaticParams() {
  return portfolio.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getPortfolioBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: { title: `${project.title} | Vibesites`, description: project.summary, images: [project.image] },
  };
}

export default async function PortfolioDetailPage({ params }) {
  const { slug } = await params;
  const project = getPortfolioBySlug(slug);
  if (!project) notFound();

  const currentIndex = portfolio.findIndex((p) => p.slug === slug);
  const next = portfolio[(currentIndex + 1) % portfolio.length];

  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-28 sm:pt-32">
        <Container>
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-ink-600 hover:text-ink-900">
            <ArrowLeft className="size-4" />
            All projects
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Badge tone="teal">{project.category}</Badge>
            <span className="text-sm text-ink-500">{project.year}</span>
          </div>
          <h1 className="mt-6 max-w-4xl text-balance text-display-md font-medium text-ink-950">{project.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">{project.summary}</p>
        </Container>
      </section>

      <Container>
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-ink-100">
          <Image src={project.image} alt={project.title} fill sizes="100vw" priority className="object-cover" />
        </div>
      </Container>

      <section className="py-20">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-12">
            <div>
              <h2 className="font-display text-2xl text-ink-950">The challenge</h2>
              <p className="mt-4 leading-relaxed text-ink-700">{project.challenge}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-ink-950">Our approach</h2>
              <p className="mt-4 leading-relaxed text-ink-700">{project.approach}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-ink-950">The result</h2>
              <p className="mt-4 leading-relaxed text-ink-700">{project.result}</p>
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-ink-200 bg-cream-50 p-7">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-500">Client</h3>
              <p className="mt-2 font-display text-lg text-ink-900">{project.client}</p>
              <h3 className="mt-6 text-xs font-semibold uppercase tracking-widest text-ink-500">Services</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.services.map((s) => (
                  <span key={s} className="rounded-full bg-cream-200 px-3 py-1 text-xs font-medium text-ink-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-ink-950 p-7">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-cream-500">Results at a glance</h3>
              <div className="mt-4 grid grid-cols-1 gap-4">
                {project.stats.map((stat) => (
                  <div key={stat.label} className="flex items-baseline justify-between border-b border-ink-800 pb-3">
                    <span className="text-sm text-cream-400">{stat.label}</span>
                    <span className="font-display text-xl text-teal-400">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button href="/contact" className="w-full">
              Start a similar project
            </Button>
          </aside>
        </Container>
      </section>

      <section className="border-t border-ink-200 py-12">
        <Container>
          <Link
            href={`/portfolio/${next.slug}`}
            className="group flex items-center justify-between gap-6 rounded-2xl border border-ink-200 bg-cream-50 p-8 transition-colors hover:border-teal-300"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-500">Next project</p>
              <p className="mt-2 font-display text-2xl text-ink-950">{next.title}</p>
            </div>
            <ArrowRight className="size-6 shrink-0 text-ink-500 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
