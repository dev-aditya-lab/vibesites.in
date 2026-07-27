import Container from "@/components/ui/Container";
import Marquee from "@/components/ui/Marquee";
import { clientLogos } from "@/data/process";

export default function LogoMarquee() {
  return (
    <section className="border-y border-ink-200 bg-cream-50 py-10">
      <Container>
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-ink-500">
          Trusted by teams who take their brand seriously
        </p>
      </Container>
      <Marquee speed={28}>
        {clientLogos.map((name) => (
          <span
            key={name}
            className="font-display text-2xl font-medium text-ink-300 transition-colors hover:text-ink-500"
          >
            {name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
