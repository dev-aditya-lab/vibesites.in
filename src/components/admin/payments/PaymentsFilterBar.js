import Link from "next/link";
import { INVOICE_STATUSES } from "@/lib/admin/client-constants";

const inputClasses =
  "rounded-md border border-ink-300 bg-cream-50 px-3 py-2 text-sm text-ink-900 focus:border-teal-500 focus:outline-none";

export default function PaymentsFilterBar({ current }) {
  return (
    <form method="GET" className="flex flex-wrap items-end gap-3 rounded-lg border border-ink-200 bg-cream-50 p-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="q" className="text-xs font-medium text-ink-500">
          Invoice #
        </label>
        <input id="q" name="q" type="text" defaultValue={current.q} placeholder="INV-2026-…" className={inputClasses} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="status" className="text-xs font-medium text-ink-500">
          Status
        </label>
        <select id="status" name="status" defaultValue={current.status} className={inputClasses}>
          <option value="">All statuses</option>
          {INVOICE_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-2 rounded-md border border-ink-300 bg-cream-50 px-3 py-2 text-sm">
        <input type="checkbox" name="overdueOnly" value="1" defaultChecked={current.overdueOnly} />
        Overdue only
      </label>

      <button type="submit" className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-cream-50 hover:bg-teal-700">
        Apply filters
      </button>
      {(current.q || current.status || current.overdueOnly) && (
        <Link href="/admin/payments" className="rounded-md border border-ink-300 px-4 py-2 text-sm text-ink-700 hover:bg-cream-200">
          Clear
        </Link>
      )}
    </form>
  );
}
