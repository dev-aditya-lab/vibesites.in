import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import CTASection from "@/components/sections/CTASection";
import { posts, getPostBySlug } from "@/data/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, images: [post.coverImage], type: "article" },
  };
}

function ContentBlock({ block, i }) {
  if (block.type === "h2") {
    return (
      <h2 key={i} className="mt-10 font-display text-2xl text-ink-950">
        {block.text}
      </h2>
    );
  }
  if (block.type === "ul") {
    return (
      <ul key={i} className="mt-4 flex flex-col gap-2">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-3 leading-relaxed text-ink-700">
            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-teal-500" />
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p key={i} className="mt-4 leading-relaxed text-ink-700">
      {block.text}
    </p>
  );
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    image: post.coverImage,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="pb-10 pt-28 sm:pt-32">
        <Container className="max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-ink-600 hover:text-ink-900">
            <ArrowLeft className="size-4" />
            All articles
          </Link>
          <span className="mt-8 inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
            {post.category}
          </span>
          <h1 className="mt-5 text-balance text-display-sm font-medium text-ink-950 sm:text-display-md">{post.title}</h1>
          <div className="mt-6 flex items-center gap-3 text-sm text-ink-500">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </time>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </Container>
      </section>

      <Container className="max-w-3xl">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-ink-100">
          <Image src={post.coverImage} alt={post.title} fill sizes="(min-width: 768px) 768px, 100vw" priority className="object-cover" />
        </div>
      </Container>

      <section className="py-16">
        <Container as="article" className="max-w-3xl">
          {post.content.map((block, i) => (
            <ContentBlock key={i} block={block} i={i} />
          ))}
        </Container>
      </section>

      {related.length > 0 && (
        <section className="border-t border-ink-200 py-16">
          <Container className="max-w-3xl">
            <h2 className="font-display text-xl text-ink-950">More on {post.category}</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group block rounded-xl border border-ink-200 bg-cream-50 p-5">
                  <h3 className="font-display text-lg text-ink-900 group-hover:text-teal-600">{p.title}</h3>
                  <p className="mt-2 text-sm text-ink-600">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}
