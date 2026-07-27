import "server-only";
import { createClient } from "@/lib/supabase/server";

export const PAGE_SIZE = 25;

const emptyResult = (page) => ({ leads: [], total: 0, page, pageSize: PAGE_SIZE });

/**
 * Combinable-filter lead search. Each active filter (service/location/tag) is
 * resolved to an indexed id-set from its join table, then intersected in JS —
 * cheap because each set is bounded by how many leads carry that one tag, not
 * the full table. Status/search/sort/pagination stay as real SQL, so this
 * scales with lead volume rather than degrading into a full-table scan.
 */
export async function queryLeads({
  page = 1,
  status,
  service,
  location,
  tag,
  formType,
  q,
  sort = "created_at.desc",
} = {}) {
  const supabase = await createClient();
  const idFilterSets = [];

  if (service) {
    const { data: svc } = await supabase.from("services").select("id").eq("slug", service).maybeSingle();
    if (!svc) return emptyResult(page);
    const { data: rows } = await supabase.from("lead_services").select("lead_id").eq("service_id", svc.id);
    idFilterSets.push(new Set((rows ?? []).map((r) => r.lead_id)));
  }
  if (location) {
    const { data: loc } = await supabase.from("locations").select("id").eq("name", location).maybeSingle();
    if (!loc) return emptyResult(page);
    const { data: rows } = await supabase.from("lead_locations").select("lead_id").eq("location_id", loc.id);
    idFilterSets.push(new Set((rows ?? []).map((r) => r.lead_id)));
  }
  if (tag) {
    const { data: t } = await supabase.from("tags").select("id").eq("name", tag).maybeSingle();
    if (!t) return emptyResult(page);
    const { data: rows } = await supabase.from("lead_tags").select("lead_id").eq("tag_id", t.id);
    idFilterSets.push(new Set((rows ?? []).map((r) => r.lead_id)));
  }

  let allowedIds = null;
  if (idFilterSets.length > 0) {
    allowedIds = [...idFilterSets[0]].filter((id) => idFilterSets.every((set) => set.has(id)));
    if (allowedIds.length === 0) return emptyResult(page);
  }

  const [sortColumn, sortDir] = sort.split(".");
  let query = supabase
    .from("leads")
    .select(
      `id, name, email, phone, whatsapp_number, company, location_text, budget_range, status, source_page, form_type, created_at,
       lead_services(service:services(id,slug,name)),
       lead_locations(location:locations(id,name)),
       lead_tags(tag:tags(id,name))`,
      { count: "exact" }
    );

  if (allowedIds) query = query.in("id", allowedIds);
  if (status) query = query.eq("status", status);
  if (formType) query = query.eq("form_type", formType);
  if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,company.ilike.%${q}%`);

  query = query.order(sortColumn || "created_at", { ascending: sortDir === "asc" });

  const from = (page - 1) * PAGE_SIZE;
  query = query.range(from, from + PAGE_SIZE - 1);

  const { data, error, count } = await query;
  if (error) throw error;

  return { leads: data ?? [], total: count ?? 0, page, pageSize: PAGE_SIZE };
}

export async function getLeadById(id) {
  const supabase = await createClient();
  const { data: lead, error } = await supabase
    .from("leads")
    .select(
      `*,
       lead_services(service:services(id,slug,name)),
       lead_locations(location:locations(id,name)),
       lead_tags(tag:tags(id,name))`
    )
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  if (!lead) return null;

  const { data: notes } = await supabase
    .from("lead_notes")
    .select("id, note, author_email, created_at")
    .eq("lead_id", id)
    .order("created_at", { ascending: false });

  return { ...lead, notes: notes ?? [] };
}

export async function getAllServices() {
  const supabase = await createClient();
  const { data } = await supabase.from("services").select("id, slug, name, category").order("name");
  return data ?? [];
}

export async function getAllLocations() {
  const supabase = await createClient();
  const { data } = await supabase.from("locations").select("id, name").order("name");
  return data ?? [];
}

export async function getAllTags() {
  const supabase = await createClient();
  const { data } = await supabase.from("tags").select("id, name").order("name");
  return data ?? [];
}
