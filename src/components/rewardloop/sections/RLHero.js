import Image from "next/image";
import { CheckCircle2, PlayCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import RLBadge from "@/components/rewardloop/RLBadge";
import RLButton from "@/components/rewardloop/RLButton";
import { rlHeroBullets } from "@/data/rewardloop";

export default function RLHero() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-linear-to-b from-blush-100 via-blush-50 to-white pt-24 pb-16 sm:pt-28">
      {/* Hidden on mobile — the photo has no room to breathe on narrow
          viewports and was just cropping into a distracting phone sliver
          behind the text. Sm+ only, where it's capped at its native 1920px
          width and centered so it's never upscaled past source resolution
          (that upscaling is what previously read as "stretched/blurry"). */}
      <div className="absolute inset-0 mx-auto hidden h-full w-full max-w-[1920px] sm:block">
        <Image
          src="/rewardloop/rewardloop-hero.jpg"
          alt=""
          fill
          priority
          sizes="1920px"
          quality={95}
          className="object-cover object-right"
        />
      </div>
      {/* Left-aligned and width-capped (not full-bleed) so the fade only
          ever sits behind the text column — the product photo on the right
          stays completely clean, with no white haze over it. */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 hidden w-3/5 bg-linear-to-r from-white from-40% via-white/70 to-transparent sm:block lg:w-[42%]"
      />

      <Container className="relative">
        <div className="max-w-xl">
          <FadeIn>
            <RLBadge>#1 Loyalty System for Restaurants</RLBadge>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="mt-6 text-display-lg text-balance font-extrabold text-[#1a1114]">
              Turn First-Time Guests Into <span className="text-brand-600">Loyal Regulars</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#1a1114]/70">
              RewardLoop is a QR-based loyalty &amp; rewards platform that helps restaurants increase repeat visits,
              customer retention, and lifetime value — effortlessly.
            </p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <div className="mt-9 flex flex-wrap gap-3">
              <RLButton href="/vibeproducts/rewardLoop/contact" size="lg">
                Book a Demo
              </RLButton>
              <RLButton href="/vibeproducts/rewardLoop/how-it-works" variant="outlineDark" size="lg" icon={false}>
                <PlayCircle className="size-5" strokeWidth={2} />
                See How It Works
              </RLButton>
            </div>
          </FadeIn>
          <FadeIn delay={0.32}>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {rlHeroBullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2 text-sm font-medium text-[#1a1114]/75">
                  <CheckCircle2 className="size-4 text-brand-600" strokeWidth={2.25} />
                  {bullet}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
