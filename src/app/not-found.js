import { MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/data/site";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[85dvh] items-center overflow-hidden py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rust-100/60 blur-3xl" />
      </div>
      <Container className="text-center">
        <svg viewBox="0 0 200 40" className="mx-auto h-24 w-full max-w-md sm:h-32" fill="none">
          <path
            d="M2 32 C 20 5, 40 5, 55 32 S 90 5, 100 32 S 135 5, 145 32 S 180 5, 198 32"
            stroke="var(--color-rust-500)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <h1 className="mt-6 font-display text-display-lg text-ink-950">404</h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink-600">
          This page went off-brief. Let&apos;s get you back to somewhere that actually converts.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" size="lg">
            Back to homepage
          </Button>
          <Button href={buildWhatsAppLink("Hi! I landed on a broken link on your site.")} external variant="secondary" size="lg" icon={false}>
            <MessageCircle className="size-5" strokeWidth={2.25} />
            Tell us what broke
          </Button>
        </div>
      </Container>
    </section>
  );
}
