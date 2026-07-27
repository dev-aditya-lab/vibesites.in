import { cn } from "@/lib/utils";

const tones = {
  teal: "bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-200",
  gold: "bg-gold-50 text-gold-700 ring-1 ring-inset ring-gold-200",
  ink: "bg-ink-900 text-cream-100",
  outline: "bg-transparent text-ink-700 ring-1 ring-inset ring-ink-300",
};

export default function Badge({ children, tone = "teal", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
