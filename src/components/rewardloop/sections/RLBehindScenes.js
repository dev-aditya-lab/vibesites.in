import { ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import DynamicIcon from "@/components/ui/DynamicIcon";
import { rlBehindScenes } from "@/data/rewardloop";

export default function RLBehindScenes() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <FadeIn className="mx-auto max-w-2xl rounded-[2rem] border border-black/5 bg-blush-50 p-8 text-center sm:p-10">
          <h2 className="font-display text-2xl font-extrabold text-[#1a1114] sm:text-3xl">
            What Happens Behind the Scenes?
          </h2>
          <p className="mt-3 text-sm text-[#1a1114]/60">
            RewardLoop works 24/7 to keep everything accurate, secure and rewarding.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-8">
            {rlBehindScenes.map((item, i) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="flex w-32 flex-col items-center gap-2.5 sm:w-36">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-rl-sm">
                    <DynamicIcon name={item.icon} className="size-5" strokeWidth={1.75} />
                  </span>
                  <p className="text-xs leading-snug text-[#1a1114]/65">{item.label}</p>
                </div>
                {i < rlBehindScenes.length - 1 && (
                  <ChevronRight className="hidden size-4 shrink-0 text-brand-300 sm:block" strokeWidth={2.5} />
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
