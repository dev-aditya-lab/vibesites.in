import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Leads by service" };

export default async function AdminByServicePage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("service_lead_counts")
    .select("id, slug, name, category, lead_count")
    .order("lead_count", { ascending: false });

  const groups = new Map();
  for (const row of data ?? []) {
    const key = row.category || "other";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl text-ink-950">Leads by service</h1>
        <p className="mt-1 text-sm text-ink-600">Browse leads grouped by the service they're interested in.</p>
      </div>

      {[...groups.entries()].map(([category, items]) => (
        <div key={category} className="rounded-lg border border-ink-200 bg-cream-50 p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-ink-500">{category}</p>
          <ul className="mt-3 flex flex-col divide-y divide-ink-100">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-2.5">
                <Link href={`/admin/leads?service=${item.slug}`} className="text-sm text-ink-800 hover:text-teal-700">
                  {item.name}
                </Link>
                <span className="rounded-full bg-cream-200 px-2.5 py-0.5 text-xs font-medium text-ink-700">
                  {item.lead_count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
