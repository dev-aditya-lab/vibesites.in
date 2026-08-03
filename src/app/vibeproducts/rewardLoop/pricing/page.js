import RLPricingHero from "@/components/rewardloop/sections/RLPricingHero";
import RLPricingModel from "@/components/rewardloop/sections/RLPricingModel";
import RLSetupKit from "@/components/rewardloop/sections/RLSetupKit";
import RLPricingFaq from "@/components/rewardloop/sections/RLPricingFaq";
import RLCTABanner from "@/components/rewardloop/RLCTABanner";
import { rlCtaStats } from "@/data/rewardloop";

export const metadata = {
  title: "Pricing",
  description:
    "RewardLoop pricing: a one-time setup fee (with your QR stand, stickers, and onboarding included), then pay-as-you-go per customer visit — negotiated to fit your restaurant.",
};

export default function RewardLoopPricingPage() {
  return (
    <>
      <RLPricingHero />
      <RLPricingModel />
      <RLSetupKit />
      <RLPricingFaq />
      <RLCTABanner
        heading="Ready to Set Up RewardLoop?"
        description="Tell us about your restaurant and we'll put together a setup fee and pay-as-you-go rate that fits."
        stats={rlCtaStats}
      />
    </>
  );
}
