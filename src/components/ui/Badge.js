import { cn } from "@/lib/utils";

const tones = {
  rust: "bg-rust-50 text-rust-700 ring-1 ring-inset ring-rust-200",
  olive: "bg-olive-50 text-olive-700 ring-1 ring-inset ring-olive-200",
  ink: "bg-ink-900 text-cream-100",
  outline: "bg-transparent text-ink-700 ring-1 ring-inset ring-ink-300",
};

export default function Badge({ children, tone = "rust", className }) {
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
