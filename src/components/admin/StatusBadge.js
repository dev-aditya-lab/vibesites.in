import { STATUS_LABELS, STATUS_STYLES } from "@/lib/admin/constants";
import { cn } from "@/lib/utils";

export default function StatusBadge({ status, className, labels = STATUS_LABELS, styles = STATUS_STYLES }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[status] ?? "bg-ink-100 text-ink-600 border-ink-200",
        className
      )}
    >
      {labels[status] ?? status}
    </span>
  );
}
