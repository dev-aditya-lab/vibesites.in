import Container from "@/components/ui/Container";
import StatCounter from "@/components/ui/StatCounter";
import { siteConfig } from "@/data/site";

export default function StatsBand() {
  return (
    <section className="border-y border-ink-200 bg-cream-200/60 py-16">
      <Container>
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <p className="font-display text-4xl text-ink-950 sm:text-5xl">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-ink-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
