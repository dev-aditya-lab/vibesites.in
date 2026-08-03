import Link from "next/link";
import { Infinity as InfinityIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RLLogo({ tone = "light", className }) {
  const dark = tone === "dark";
  return (
    <Link href="/vibeproducts/rewardLoop" className={cn("group inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl",
          dark ? "bg-white/10 text-brand-400" : "bg-brand-50 text-brand-600"
        )}
      >
        <InfinityIcon className="size-5" strokeWidth={2.5} />
      </span>
      <span className={cn("font-display text-xl font-extrabold tracking-tight", dark ? "text-white" : "text-[#1a1114]")}>
        Reward<span className="text-brand-600">Loop</span>
      </span>
    </Link>
  );
}
