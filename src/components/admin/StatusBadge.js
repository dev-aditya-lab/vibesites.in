import { STATUS_LABELS, STATUS_STYLES } from "@/lib/admin/constants";
import { cn } from "@/lib/utils";

export default function StatusBadge({ status, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        STATUS_STYLES[status] ?? "bg-ink-100 text-ink-600 border-ink-200",
        className
      )}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
