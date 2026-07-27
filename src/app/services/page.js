import Container from "@/components/ui/Container";
import DynamicIcon from "@/components/ui/DynamicIcon";
import RevealLink from "@/components/ui/RevealLink";
import FadeIn from "@/components/ui/FadeIn";
import PageHero from "@/components/sections/PageHero";
import CTASection from "@/components/sections/CTASection";
import { ArrowUpRight } from "lucide-react";
import { serviceCategories, services, addonServices } from "@/data/services";

export const metadata = {
  title: "Services",
  description:
    "Web design, development, e-commerce, mobile apps, SEO, and platform builds — explore every service Vibesites offers.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything your business needs to show up and sell online."
        description="Whether you need a five-page brochure site or a full commerce platform with a companion app, here's exactly what we build — and how it helps."
      />

      <nav aria-label="Service categories" className="sticky top-20 z-30 border-y border-ink-200 bg-cream-100/90 backdrop-blur-md">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
            {serviceCategories.map((category) => (
              <a
                key={category.key}
                href={`#${category.anchor}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-teal-300 hover:text-teal-700"
              >
                <DynamicIcon name={category.icon} className="size-3.5" />
                {category.label}
              </a>
            ))}
          </div>
        </Container>
      </nav>

      {serviceCategories.map((category) => {
        const items = services.filter((s) => s.category === category.key);
        if (items.length === 0) return null;
        return (
          <section key={category.key} id={category.anchor} className="scroll-mt-36 border-b border-ink-200 py-20">
            <Container>
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <DynamicIcon name={category.icon} className="size-6" />
                </div>
                <div>
                  <h2 className="font-display text-display-sm text-balance text-ink-950">{category.label}</h2>
                  <p className="mt-2 max-w-xl text-ink-600">{category.description}</p>
                </div>
              </div>
              <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((service, i) => (
                  <RevealLink
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    delay={(i % 3) * 0.07}
                    className="group flex flex-col justify-between rounded-2xl border border-ink-200 bg-cream-50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-teal-300 hover:shadow-soft-md"
                  >
                    <div>
                      <div className="flex size-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                        <DynamicIcon name={service.icon} className="size-5" />
                      </div>
                      <h3 className="mt-5 font-display text-lg text-ink-900">{service.title}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{service.summary}</p>
                    </div>
                    <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-teal-600">
                      Learn more
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </RevealLink>
                ))}
              </div>
            </Container>
          </section>
        );
      })}

      <section className="bg-cream-200/50 py-20">
        <Container>
          <h2 className="font-display text-display-sm text-balance text-ink-950">Business essentials, handled too</h2>
          <p className="mt-3 max-w-xl text-ink-600">
            The supporting pieces every online business needs — we set them up so you don&apos;t have to juggle five different vendors.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {addonServices.map((addon, i) => (
              <FadeIn
                key={addon.slug}
                delay={(i % 4) * 0.07}
                className="rounded-2xl border border-ink-200 bg-cream-50 p-6"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                  <DynamicIcon name={addon.icon} className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-base text-ink-900">{addon.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{addon.summary}</p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
