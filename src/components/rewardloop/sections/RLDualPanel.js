import { CheckCircle2, Gift } from "lucide-react";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import RLButton from "@/components/rewardloop/RLButton";
import RLDashboardCard from "@/components/rewardloop/RLDashboardCard";
import { rlOwnerBullets, rlCustomerBullets } from "@/data/rewardloop";

export default function RLDualPanel() {
  return (
    <section className="bg-blush-50 py-24 sm:py-28">
      <Container className="grid gap-6 lg:grid-cols-2">
        <FadeIn className="rounded-3xl border border-black/5 bg-white p-8 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-600">For Restaurant Owners</p>
          <h3 className="mt-3 font-display text-2xl font-extrabold text-balance text-[#1a1114] sm:text-3xl">
            Grow Your Business with Happy, Returning Customers
          </h3>
          <ul className="mt-6 flex flex-col gap-3">
            {rlOwnerBullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5 text-sm text-[#1a1114]/70">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-600" strokeWidth={2.25} />
                {bullet}
              </li>
            ))}
          </ul>
          <RLButton href="/vibeproducts/rewardLoop/contact" className="mt-7">
            Book a Demo
          </RLButton>

          <div className="mt-8">
            <RLDashboardCard />
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="flex flex-col rounded-3xl border border-black/5 bg-white p-8 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-600">For Customers</p>
          <h3 className="mt-3 font-display text-2xl font-extrabold text-balance text-[#1a1114] sm:text-3xl">
            More Visits. More Rewards. More Reasons to Come Back.
          </h3>
          <ul className="mt-6 flex flex-col gap-3">
            {rlCustomerBullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5 text-sm text-[#1a1114]/70">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-600" strokeWidth={2.25} />
                {bullet}
              </li>
            ))}
          </ul>

          <div className="relative mt-10 flex flex-1 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-10">
            <div aria-hidden className="absolute -left-6 top-6 size-2 rounded-full bg-white/40 rl-float" />
            <div aria-hidden className="absolute right-8 top-10 size-1.5 rounded-full bg-amber-300 rl-float" style={{ animationDelay: "0.5s" }} />
            <div aria-hidden className="absolute bottom-8 left-10 size-1.5 rounded-full bg-white/40 rl-float" style={{ animationDelay: "1s" }} />
            <div className="relative flex flex-col items-center gap-3 text-center">
              <span className="flex size-16 items-center justify-center rounded-2xl bg-white/15 text-white">
                <Gift className="size-8" strokeWidth={1.75} />
              </span>
              <p className="font-display text-lg font-extrabold text-white">Reward Unlocked!</p>
              <p className="text-sm text-white/70">Free Dessert · Show this code to staff</p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
