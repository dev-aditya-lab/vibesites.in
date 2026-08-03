import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { rlTrustedLogos } from "@/data/rewardloop";

export default function RLTrustedMarquee() {
  const items = [...rlTrustedLogos, ...rlTrustedLogos];

  return (
    <section className="border-y border-black/5 bg-white py-10">
      <Container className="flex items-center gap-4">
        <button
          aria-label="Scroll left"
          className="hidden size-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-[#1a1114]/50 transition-colors hover:border-black/30 hover:text-[#1a1114] sm:flex"
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="min-w-0 flex-1">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-[#1a1114]/40">
            Trusted by restaurant owners across India
          </p>
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="rl-marquee-track flex w-max items-center gap-14">
              {items.map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="whitespace-nowrap font-display text-xl font-bold text-[#1a1114]/25"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          aria-label="Scroll right"
          className="hidden size-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-[#1a1114]/50 transition-colors hover:border-black/30 hover:text-[#1a1114] sm:flex"
        >
          <ChevronRight className="size-4" />
        </button>
      </Container>
    </section>
  );
}
