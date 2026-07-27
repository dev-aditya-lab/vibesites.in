import { cn } from "@/lib/utils";

/** "X of Y revisions used" bar + badge, flagged red once usage meets/exceeds the included count. */
export default function RevisionTracker({ used, included, className }) {
  const hasLimit = included > 0;
  const exceeded = hasLimit && used >= included;
  const pct = hasLimit ? Math.min(100, Math.round((used / included) * 100)) : 0;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-ink-600">
          {used} of {hasLimit ? included : "∞"} revisions used
        </span>
        {exceeded && (
          <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[11px] font-medium text-red-700">
            Exceeded
          </span>
        )}
      </div>
      {hasLimit && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
          <div
            className={cn("h-full rounded-full", exceeded ? "bg-red-500" : "bg-teal-600")}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </div>
  );
}
