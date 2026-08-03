import RLHowItWorksHero from "@/components/rewardloop/sections/RLHowItWorksHero";
import RLStepsTimeline from "@/components/rewardloop/sections/RLStepsTimeline";
import RLBehindScenes from "@/components/rewardloop/sections/RLBehindScenes";
import RLCTABanner from "@/components/rewardloop/RLCTABanner";
import RLDashboardCard from "@/components/rewardloop/RLDashboardCard";

export const metadata = {
  title: "How It Works",
  description:
    "See exactly how RewardLoop turns a QR code scan into a verified restaurant visit — and how repeat visits unlock real rewards for customers.",
};

export default function HowItWorksPage() {
  return (
    <>
      <RLHowItWorksHero />
      <RLStepsTimeline />
      <RLBehindScenes />
      <RLCTABanner
        eyebrow="Ready to Boost Loyalty?"
        heading="Turn Every Visit Into Loyal Customers"
        description="Join hundreds of restaurants already using RewardLoop to increase repeat visits and grow revenue."
        visual={<RLDashboardCard />}
      />
    </>
  );
}
