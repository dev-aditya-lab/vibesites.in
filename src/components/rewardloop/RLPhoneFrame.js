import { cn } from "@/lib/utils";

/** Reusable CSS phone-chrome frame used to mock up the customer-facing screens. */
export default function RLPhoneFrame({ children, className }) {
  return (
    <div className={cn("relative mx-auto w-[260px] sm:w-[280px]", className)}>
      <div className="relative rounded-[2.5rem] border-[10px] border-[#161016] bg-[#161016] shadow-rl-xl">
        <div className="absolute inset-x-0 top-0 z-10 flex justify-center pt-1.5">
          <div className="h-5 w-24 rounded-full bg-[#161016]" />
        </div>
        <div className="h-110 overflow-hidden rounded-[1.9rem] bg-white">{children}</div>
      </div>
    </div>
  );
}
