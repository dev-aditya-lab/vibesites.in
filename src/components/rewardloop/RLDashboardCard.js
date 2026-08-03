import { Star } from "lucide-react";
import { rlDashboardStats, rlTopRewards } from "@/data/rewardloop";

/** Decorative dashboard mockup — mimics the RewardLoop owner dashboard for marketing screenshots. No live data. */
export default function RLDashboardCard({ className }) {
  return (
    <div className={`rounded-3xl border border-black/5 bg-white p-5 shadow-rl-lg sm:p-6 ${className || ""}`}>
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {rlDashboardStats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-blush-50 p-3 sm:p-4">
            <p className="truncate text-[11px] font-medium text-[#1a1114]/55 sm:text-xs">{stat.label}</p>
            <p className="mt-1 font-display text-lg font-extrabold text-[#1a1114] sm:text-2xl">{stat.value}</p>
            <p className="mt-0.5 text-[11px] font-semibold text-emerald-600">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-black/5 p-4">
        <p className="text-xs font-semibold text-[#1a1114]/60">Visits Over Time</p>
        <svg viewBox="0 0 300 90" className="mt-2 h-20 w-full" preserveAspectRatio="none">
          <polyline
            points="0,70 30,55 60,62 90,40 120,50 150,30 180,45 210,25 240,35 270,15 300,10"
            fill="none"
            stroke="var(--color-brand-600)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="mt-1 flex justify-between text-[10px] text-[#1a1114]/40">
          <span>May 1</span>
          <span>May 8</span>
          <span>May 15</span>
          <span>May 22</span>
          <span>May 29</span>
        </div>
      </div>

      <div className="mt-5 space-y-2.5">
        <p className="text-xs font-semibold text-[#1a1114]/60">Top Rewards</p>
        {rlTopRewards.map((reward) => (
          <div key={reward.label} className="flex items-center gap-3">
            <span className="w-24 shrink-0 truncate text-xs font-medium text-[#1a1114]/75 sm:w-28">{reward.label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-blush-100">
              <div
                className="h-full rounded-full bg-brand-500"
                style={{ width: `${Math.round((reward.count / reward.max) * 100)}%` }}
              />
            </div>
            <span className="w-8 shrink-0 text-right text-xs font-semibold text-[#1a1114]/60">{reward.count}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#1a0508] px-4 py-3">
        <div className="flex items-center gap-1 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-current" />
          ))}
        </div>
        <p className="text-xs font-semibold text-white/80">4.9/5 · 200+ restaurants</p>
      </div>
    </div>
  );
}
