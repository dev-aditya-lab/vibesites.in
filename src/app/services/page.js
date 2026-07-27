import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import DynamicIcon from "@/components/ui/DynamicIcon";
import PageHero from "@/components/sections/PageHero";
import CTASection from "@/components/sections/CTASection";
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

      {serviceCategories.map((category) => {
        const items = services.filter((s) => s.category === category.key);
        if (items.length === 0) return null;
        return (
          <section key={category.key} id={category.anchor} className="scroll-mt-24 border-t border-ink-200 py-20">
            <Container>
              <h2 className="font-display text-display-sm text-balance text-ink-950">{category.label}</h2>
              <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group flex flex-col justify-between rounded-2xl border border-ink-200 bg-cream-50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-rust-300 hover:shadow-soft-md"
                  >
                    <div>
                      <div className="flex size-11 items-center justify-center rounded-xl bg-rust-50 text-rust-600">
                        <DynamicIcon name={service.icon} className="size-5" />
                      </div>
                      <h3 className="mt-5 font-display text-lg text-ink-900">{service.title}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{service.summary}</p>
                    </div>
                    <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-rust-600">
                      Learn more
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        );
      })}

      <section className="border-t border-ink-200 bg-cream-200/50 py-20">
        <Container>
          <h2 className="font-display text-display-sm text-balance text-ink-950">Business essentials, handled too</h2>
          <p className="mt-3 max-w-xl text-ink-600">
            The supporting pieces every online business needs — we set them up so you don&apos;t have to juggle five different vendors.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {addonServices.map((addon) => (
              <div key={addon.slug} className="rounded-2xl border border-ink-200 bg-cream-50 p-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-olive-50 text-olive-700">
                  <DynamicIcon name={addon.icon} className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-base text-ink-900">{addon.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{addon.summary}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
