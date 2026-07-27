import "server-only";
import { createClient } from "@/lib/supabase/server";

export const PAGE_SIZE = 25;

const emptyResult = (page) => ({ clients: [], total: 0, page, pageSize: PAGE_SIZE });

/**
 * Client list search/filter. "overdue"/"maintenanceDueSoon"/"revisionsExceeded"
 * resolve against the client_summary view (not directly filterable via
 * PostgREST embedding since it's a plain view, not an FK relationship) into an
 * id-set first, then intersected with the main query — same shape as the
 * service/location/tag filters in queryLeads.
 */
export async function queryClients({
  page = 1,
  q,
  source,
  overdue,
  maintenanceDueSoon,
  revisionsExceeded,
  sort = "created_at.desc",
} = {}) {
  const supabase = await createClient();

  let allowedIds = null;
  if (overdue || maintenanceDueSoon || revisionsExceeded) {
    const { data: summaries } = await supabase
      .from("client_summary")
      .select("client_id, overdue_invoice_count, next_maintenance_due, projects_revisions_exceeded");
    const soon = new Date();
    soon.setDate(soon.getDate() + 7);
    const soonStr = soon.toISOString().slice(0, 10);

    allowedIds = (summaries ?? [])
      .filter((s) => {
        if (overdue && !(s.overdue_invoice_count > 0)) return false;
        if (maintenanceDueSoon && !(s.next_maintenance_due && s.next_maintenance_due <= soonStr)) return false;
        if (revisionsExceeded && !(s.projects_revisions_exceeded > 0)) return false;
        return true;
      })
      .map((s) => s.client_id);
    if (allowedIds.length === 0) return emptyResult(page);
  }

  const [sortColumn, sortDir] = sort.split(".");
  let query = supabase.from("clients").select("*", { count: "exact" });

  if (allowedIds) query = query.in("id", allowedIds);
  if (source) query = query.eq("source", source);
  if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,company.ilike.%${q}%`);

  query = query.order(sortColumn || "created_at", { ascending: sortDir === "asc" });

  const from = (page - 1) * PAGE_SIZE;
  query = query.range(from, from + PAGE_SIZE - 1);

  const { data, error, count } = await query;
  if (error) throw error;

  const ids = (data ?? []).map((c) => c.id);
  const { data: summaries } = ids.length
    ? await supabase.from("client_summary").select("*").in("client_id", ids)
    : { data: [] };
  const summaryMap = new Map((summaries ?? []).map((s) => [s.client_id, s]));

  const clients = (data ?? []).map((c) => ({ ...c, summary: summaryMap.get(c.id) ?? null }));

  return { clients, total: count ?? 0, page, pageSize: PAGE_SIZE };
}

export async function getClientById(id) {
  const supabase = await createClient();
  const { data: client, error } = await supabase.from("clients").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  if (!client) return null;

  const [
    { data: quotations },
    { data: projects },
    { data: agreements },
    { data: invoices },
    { data: maintenance },
    { data: serviceHistory },
    { data: notes },
  ] = await Promise.all([
    supabase
      .from("quotations")
      .select("*, quotation_services(service:services(id,slug,name))")
      .eq("client_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("projects")
      .select("*, project_services(service:services(id,slug,name))")
      .eq("client_id", id)
      .order("created_at", { ascending: false }),
    supabase.from("agreements").select("*").eq("client_id", id).order("created_at", { ascending: false }),
    supabase
      .from("invoices")
      .select("*, invoice_payments(id, amount, paid_date, payment_method, note, created_at)")
      .eq("client_id", id)
      .order("created_at", { ascending: false }),
    supabase.from("maintenance_subscriptions").select("*").eq("client_id", id).order("created_at", { ascending: false }),
    supabase.from("service_history").select("*").eq("client_id", id).order("date", { ascending: false }),
    supabase.from("client_notes").select("id, note, author_email, created_at").eq("client_id", id).order("created_at", { ascending: false }),
  ]);

  return {
    ...client,
    quotations: quotations ?? [],
    projects: projects ?? [],
    agreements: agreements ?? [],
    invoices: (invoices ?? []).map((inv) => ({
      ...inv,
      invoice_payments: (inv.invoice_payments ?? []).sort((a, b) => new Date(b.paid_date) - new Date(a.paid_date)),
    })),
    maintenance: maintenance ?? [],
    serviceHistory: serviceHistory ?? [],
    notes: notes ?? [],
  };
}
