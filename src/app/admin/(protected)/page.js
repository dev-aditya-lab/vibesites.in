import Link from "next/link";
import { getDashboardStats } from "@/lib/admin/dashboard-query";
import { LEAD_STATUSES, FORM_TYPES, PRODUCTS } from "@/lib/admin/constants";

export const metadata = { title: "Dashboard" };

function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border border-ink-200 bg-cream-50 p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-ink-500">{label}</p>
      <p className="mt-2 font-display text-3xl text-ink-950">{value}</p>
    </div>
  );
}

function BreakdownList({ title, items, hrefBase, paramKey, nameKey }) {
  const max = Math.max(1, ...items.map((i) => i.lead_count));
  return (
    <div className="rounded-lg border border-ink-200 bg-cream-50 p-5">
      <p className="text-sm font-semibold text-ink-900">{title}</p>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-ink-500">No tagged leads yet.</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={`${hrefBase}?${paramKey}=${encodeURIComponent(item[nameKey])}`}
                className="flex items-center justify-between gap-3 text-sm text-ink-700 hover:text-teal-700"
              >
                <span className="truncate">{item.name}</span>
                <span className="shrink-0 font-medium text-ink-900">{item.lead_count}</span>
              </Link>
              <div className="mt-1 h-1.5 rounded-full bg-cream-200">
                <div
                  className="h-1.5 rounded-full bg-teal-500"
                  style={{ width: `${(item.lead_count / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl text-ink-950">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-600">Overview of incoming leads.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total leads" value={stats.total} />
        <StatCard label="New this week" value={stats.newThisWeek} />
        <StatCard label="New this month" value={stats.newThisMonth} />
      </div>

      <div className="rounded-lg border border-ink-200 bg-cream-50 p-5">
        <p className="text-sm font-semibold text-ink-900">By form</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {FORM_TYPES.map((f) => (
            <Link
              key={f.value}
              href={`/admin/leads?formType=${f.value}`}
              className="flex items-center gap-2 rounded-md border border-ink-200 px-3 py-2 text-sm hover:border-teal-300"
            >
              <span className="text-ink-600">{f.label}</span>
              <span className="font-semibold text-ink-950">{stats.byFormType[f.value] ?? 0}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-ink-200 bg-cream-50 p-5">
        <p className="text-sm font-semibold text-ink-900">By product</p>
        <p className="mt-1 text-xs text-ink-500">Leads from Vibesites-owned products, kept separate from agency leads.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {PRODUCTS.map((p) => (
            <Link
              key={p.value}
              href={`/admin/leads?product=${p.value}`}
              className="flex items-center gap-2 rounded-md border border-ink-200 px-3 py-2 text-sm hover:border-teal-300"
            >
              <span className="text-ink-600">{p.label}</span>
              <span className="font-semibold text-ink-950">{stats.byProduct[p.value] ?? 0}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-ink-200 bg-cream-50 p-5">
        <p className="text-sm font-semibold text-ink-900">By status</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {LEAD_STATUSES.map((s) => (
            <Link
              key={s.value}
              href={`/admin/leads?status=${s.value}`}
              className="flex items-center gap-2 rounded-md border border-ink-200 px-3 py-2 text-sm hover:border-teal-300"
            >
              <span className="text-ink-600">{s.label}</span>
              <span className="font-semibold text-ink-950">{stats.byStatus[s.value] ?? 0}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BreakdownList title="By service" items={stats.byService} hrefBase="/admin/leads" paramKey="service" nameKey="slug" />
        <BreakdownList title="By location" items={stats.byLocation} hrefBase="/admin/leads" paramKey="location" nameKey="name" />
      </div>
    </div>
  );
}
