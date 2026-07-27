import Link from "next/link";
import { CLIENT_SOURCES } from "@/lib/admin/client-constants";

const inputClasses =
  "rounded-md border border-ink-300 bg-cream-50 px-3 py-2 text-sm text-ink-900 focus:border-teal-500 focus:outline-none";

export default function ClientsFilterBar({ current }) {
  return (
    <form method="GET" className="flex flex-wrap items-end gap-3 rounded-lg border border-ink-200 bg-cream-50 p-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="q" className="text-xs font-medium text-ink-500">
          Search
        </label>
        <input
          id="q"
          name="q"
          type="text"
          defaultValue={current.q}
          placeholder="Name, email, company…"
          className={inputClasses}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="source" className="text-xs font-medium text-ink-500">
          Source
        </label>
        <select id="source" name="source" defaultValue={current.source} className={inputClasses}>
          <option value="">All sources</option>
          {CLIENT_SOURCES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-2 rounded-md border border-ink-300 bg-cream-50 px-3 py-2 text-sm">
        <input type="checkbox" name="overdue" value="1" defaultChecked={current.overdue} />
        Overdue payment
      </label>

      <label className="flex items-center gap-2 rounded-md border border-ink-300 bg-cream-50 px-3 py-2 text-sm">
        <input type="checkbox" name="maintenanceDueSoon" value="1" defaultChecked={current.maintenanceDueSoon} />
        Maintenance due soon
      </label>

      <label className="flex items-center gap-2 rounded-md border border-ink-300 bg-cream-50 px-3 py-2 text-sm">
        <input type="checkbox" name="revisionsExceeded" value="1" defaultChecked={current.revisionsExceeded} />
        Revisions exceeded
      </label>

      <button type="submit" className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-cream-50 hover:bg-teal-700">
        Apply filters
      </button>
      {(current.q || current.source || current.overdue || current.maintenanceDueSoon || current.revisionsExceeded) && (
        <Link href="/admin/clients" className="rounded-md border border-ink-300 px-4 py-2 text-sm text-ink-700 hover:bg-cream-200">
          Clear
        </Link>
      )}
    </form>
  );
}
