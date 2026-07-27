import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MessageCircle, Clock, Users, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import DynamicIcon from "@/components/ui/DynamicIcon";
import CTASection from "@/components/sections/CTASection";
import { services, getServiceBySlug, serviceCategories } from "@/data/services";
import { buildWhatsAppLink } from "@/data/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: `${service.title} | Vibesites`, description: service.summary },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const category = serviceCategories.find((c) => c.key === service.category);
  const related = services.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.description,
    provider: { "@type": "ProfessionalService", name: "Vibesites" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <section className="relative overflow-hidden pb-16 pt-28 sm:pt-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 right-[-10%] size-[30rem] rounded-full bg-rust-100/50 blur-3xl" />
        </div>
        <Container>
          <nav className="mb-8 flex items-center gap-2 text-sm text-ink-500">
            <Link href="/services" className="link-underline">
              Services
            </Link>
            <span>/</span>
            <span className="text-ink-700">{category?.label}</span>
          </nav>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="flex size-14 items-center justify-center rounded-2xl bg-rust-50 text-rust-600">
                <DynamicIcon name={service.icon} className="size-7" />
              </div>
              <h1 className="mt-6 text-display-md text-balance font-medium text-ink-950">{service.title}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">{service.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href={buildWhatsAppLink(`Hi! I'd like a quote for ${service.title}.`)} external icon={false}>
                  <MessageCircle className="size-4" strokeWidth={2.25} />
                  Get a quote on WhatsApp
                </Button>
                <Button href="/pricing" variant="secondary">
                  See pricing
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-ink-200 bg-cream-50 p-7 shadow-soft-sm">
              <div className="flex items-center gap-3">
                <Clock className="size-5 text-rust-500" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink-500">Typical turnaround</p>
                  <p className="font-medium text-ink-900">{service.turnaround}</p>
                </div>
              </div>
              <div className="h-px bg-ink-200" />
              <div className="flex items-center gap-3">
                <Users className="size-5 text-rust-500" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink-500">Ideal for</p>
                  <p className="font-medium text-ink-900">{service.idealFor}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-ink-200 py-20">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Badge tone="rust">What&apos;s included</Badge>
            <h2 className="mt-5 font-display text-display-sm text-balance text-ink-950">
              Everything you need, nothing you don&apos;t.
            </h2>
            <ul className="mt-8 flex flex-col gap-4">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 rounded-xl border border-ink-200 bg-cream-50 p-4">
                  <Check className="mt-0.5 size-5 shrink-0 text-rust-500" />
                  <span className="text-ink-800">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl bg-ink-950 p-7 text-cream-100">
              <h3 className="font-display text-xl text-cream-50">Not sure this is the right fit?</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream-400">
                Message us with a bit about your business and we&apos;ll tell you honestly whether this service — or
                something else — is the right starting point.
              </p>
              <Button
                href={buildWhatsAppLink(`Hi! I'm considering ${service.title} but want advice first.`)}
                external
                variant="inverse"
                className="mt-6 w-full"
                icon={false}
              >
                <MessageCircle className="size-4" strokeWidth={2.25} />
                Ask us on WhatsApp
              </Button>
            </div>

            {related.length > 0 && (
              <div className="rounded-2xl border border-ink-200 bg-cream-50 p-7">
                <h3 className="font-display text-lg text-ink-900">Related services</h3>
                <ul className="mt-4 flex flex-col gap-1">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/services/${r.slug}`}
                        className="group flex items-center justify-between gap-2 rounded-lg px-2 py-2.5 text-sm text-ink-700 transition-colors hover:bg-cream-200"
                      >
                        {r.title}
                        <ArrowUpRight className="size-4 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
