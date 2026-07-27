import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Leads by location" };

export default async function AdminByLocationPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("location_lead_counts")
    .select("id, name, lead_count")
    .order("lead_count", { ascending: false });

  const locations = data ?? [];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl text-ink-950">Leads by location</h1>
        <p className="mt-1 text-sm text-ink-600">Browse leads grouped by tagged city/region.</p>
      </div>

      <div className="rounded-lg border border-ink-200 bg-cream-50 p-5">
        {locations.length === 0 ? (
          <p className="text-sm text-ink-500">No location tags yet. Add one from a lead's detail page.</p>
        ) : (
          <ul className="flex flex-col divide-y divide-ink-100">
            {locations.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-2.5">
                <Link href={`/admin/leads?location=${encodeURIComponent(item.name)}`} className="text-sm text-ink-800 hover:text-teal-700">
                  {item.name}
                </Link>
                <span className="rounded-full bg-cream-200 px-2.5 py-0.5 text-xs font-medium text-ink-700">
                  {item.lead_count}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
