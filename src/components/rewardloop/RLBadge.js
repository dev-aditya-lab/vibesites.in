import { cn } from "@/lib/utils";

const tones = {
  brand: "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200",
  dark: "bg-white/10 text-white ring-1 ring-inset ring-white/25",
  outline: "bg-transparent text-[#1a1114] ring-1 ring-inset ring-black/15",
};

export default function RLBadge({ children, tone = "brand", className, dot = true }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider",
        tones[tone],
        className
      )}
    >
      {dot && <span className={cn("size-1.5 rounded-full", tone === "dark" ? "bg-white" : "bg-brand-600")} />}
      {children}
    </span>
  );
}
