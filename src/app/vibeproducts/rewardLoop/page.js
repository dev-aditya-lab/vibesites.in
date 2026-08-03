import RLHero from "@/components/rewardloop/sections/RLHero";
import RLTrustedMarquee from "@/components/rewardloop/sections/RLTrustedMarquee";
import RLFeaturesGrid from "@/components/rewardloop/sections/RLFeaturesGrid";
import RLHowItWorksPreview from "@/components/rewardloop/sections/RLHowItWorksPreview";
import RLDualPanel from "@/components/rewardloop/sections/RLDualPanel";
import RLCTABanner from "@/components/rewardloop/RLCTABanner";
import { rlCtaStats, rewardLoopConfig } from "@/data/rewardloop";

export const metadata = {
  title: "Turn First-Time Guests Into Loyal Regulars",
  description: rewardLoopConfig.description,
};

export default function RewardLoopHomePage() {
  return (
    <>
      <RLHero />
      <RLTrustedMarquee />
      <RLFeaturesGrid />
      <RLHowItWorksPreview />
      <RLDualPanel />
      <RLCTABanner
        heading="Ready to Build Loyalty That Lasts?"
        description="Join hundreds of restaurants already using RewardLoop to increase repeat visits and grow revenue."
        stats={rlCtaStats}
      />
    </>
  );
}
