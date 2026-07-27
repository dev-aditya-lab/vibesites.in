import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHero from "@/components/sections/PageHero";
import CTASection from "@/components/sections/CTASection";
import RevealLink from "@/components/ui/RevealLink";
import { posts } from "@/data/blog";

export const metadata = {
  title: "Blog",
  description: "Practical, no-fluff writing on web design, e-commerce, SEO, and mobile app development from the Vibesites team.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Field notes from 240+ projects."
        description="No filler, no gated 'ebooks' — just what we've learned building websites, stores, and apps that actually perform."
      />

      <section className="py-8">
        <Container>
          <RevealLink href={`/blog/${featured.slug}`} className="group grid grid-cols-1 gap-8 rounded-2xl border border-ink-200 bg-cream-50 p-6 lg:grid-cols-2 lg:items-center lg:p-8">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-ink-100">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div>
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
                {featured.category}
              </span>
              <h2 className="mt-4 font-display text-2xl text-balance text-ink-950 sm:text-3xl">{featured.title}</h2>
              <p className="mt-3 leading-relaxed text-ink-600">{featured.excerpt}</p>
              <div className="mt-5 flex items-center gap-3 text-sm text-ink-500">
                <span>{featured.author}</span>
                <span>·</span>
                <span>{featured.readTime}</span>
              </div>
              <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-teal-600">
                Read the article
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </RevealLink>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <RevealLink key={post.slug} href={`/blog/${post.slug}`} className="group block" delay={(i % 3) * 0.08}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-ink-100">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <span className="mt-4 inline-block rounded-full bg-cream-200 px-3 py-1 text-xs font-medium text-ink-600">
                  {post.category}
                </span>
                <h3 className="mt-3 font-display text-xl text-balance text-ink-900">{post.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-3 text-xs text-ink-500">
                  <span>{post.author}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </RevealLink>
            ))}
          </div>
        </Container>
      </section>

      <CTASection eyebrow="Enjoyed this?" title="Let's put this thinking into your next project." />
    </>
  );
}
