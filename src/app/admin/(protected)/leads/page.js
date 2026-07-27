import { queryLeads, getAllServices, getAllLocations, getAllTags } from "@/lib/admin/leads-query";
import LeadsFilterBar from "@/components/admin/LeadsFilterBar";
import LeadsTable from "@/components/admin/LeadsTable";

export const metadata = { title: "Leads" };

export default async function AdminLeadsPage({ searchParams }) {
  const params = await searchParams;
  const current = {
    q: params?.q || "",
    status: params?.status || "",
    service: params?.service || "",
    location: params?.location || "",
    tag: params?.tag || "",
    formType: params?.formType || "",
    sort: params?.sort || "created_at.desc",
  };
  const page = Number(params?.page) || 1;

  const [{ leads, total, pageSize }, services, locations, tags] = await Promise.all([
    queryLeads({ page, ...current }),
    getAllServices(),
    getAllLocations(),
    getAllTags(),
  ]);

  const queryString = new URLSearchParams(
    Object.fromEntries(Object.entries(current).filter(([, v]) => v))
  ).toString();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl text-ink-950">Leads</h1>
        <p className="mt-1 text-sm text-ink-600">Filter, triage, and act on incoming leads.</p>
      </div>

      <LeadsFilterBar services={services} locations={locations} tags={tags} current={current} />

      <LeadsTable leads={leads} total={total} page={page} pageSize={pageSize} queryString={queryString} />
    </div>
  );
}
