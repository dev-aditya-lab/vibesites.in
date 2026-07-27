import { Clock, ShieldCheck, MessagesSquare } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHero from "@/components/sections/PageHero";
import QuoteForm from "@/components/sections/QuoteForm";

export const metadata = {
  title: "Get a Quote",
  description:
    "Tell us about your website, store, or app project and get a clear, fixed quote back from Vibesites — no obligation, no sales pressure.",
  alternates: { canonical: "/quote" },
};

const reassurances = [
  {
    icon: Clock,
    title: "Fast turnaround",
    description: "We review every submission and reply with next steps within a few business hours.",
  },
  {
    icon: ShieldCheck,
    title: "No-obligation quote",
    description: "You get clear scope and pricing first — there's no pressure to commit on the spot.",
  },
  {
    icon: MessagesSquare,
    title: "A real person replies",
    description: "No auto-responder chains — someone from our team reads and answers personally.",
  },
];

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Get a quote"
        title="Tell us about your project — get a fixed price back."
        description="Share a few details about what you're building and we'll follow up with clear scope, timeline, and pricing — no obligation."
        align="center"
      />

      <section className="pb-24 lg:pb-32">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col gap-4">
            {reassurances.map((item) => (
              <div key={item.title} className="rounded-2xl border border-ink-200 bg-cream-50 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                    <item.icon className="size-5" strokeWidth={1.75} />
                  </div>
                  <p className="font-medium text-ink-900">{item.title}</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{item.description}</p>
              </div>
            ))}
          </div>

          <QuoteForm sourcePage="/quote" />
        </Container>
      </section>
    </>
  );
}
