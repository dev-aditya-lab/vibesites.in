import "server-only";
import { createClient } from "@/lib/supabase/server";

export async function getDashboardStats() {
  const supabase = await createClient();

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    { count: total },
    { count: newThisWeek },
    { count: newThisMonth },
    byService,
    byLocation,
    byStatus,
    byFormType,
    byProduct,
  ] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", startOfWeek.toISOString()),
    supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", startOfMonth.toISOString()),
    supabase
      .from("service_lead_counts")
      .select("id, slug, name, lead_count")
      .gt("lead_count", 0)
      .order("lead_count", { ascending: false })
      .limit(8),
    supabase
      .from("location_lead_counts")
      .select("id, name, lead_count")
      .gt("lead_count", 0)
      .order("lead_count", { ascending: false })
      .limit(8),
    supabase.from("leads").select("status"),
    supabase.from("leads").select("form_type"),
    supabase.from("leads").select("product").not("product", "is", null),
  ]);

  const statusCounts = {};
  for (const row of byStatus.data ?? []) {
    statusCounts[row.status] = (statusCounts[row.status] ?? 0) + 1;
  }

  const formTypeCounts = {};
  for (const row of byFormType.data ?? []) {
    formTypeCounts[row.form_type] = (formTypeCounts[row.form_type] ?? 0) + 1;
  }

  const productCounts = {};
  for (const row of byProduct.data ?? []) {
    productCounts[row.product] = (productCounts[row.product] ?? 0) + 1;
  }

  return {
    total: total ?? 0,
    newThisWeek: newThisWeek ?? 0,
    newThisMonth: newThisMonth ?? 0,
    byService: byService.data ?? [],
    byLocation: byLocation.data ?? [],
    byStatus: statusCounts,
    byFormType: formTypeCounts,
    byProduct: productCounts,
  };
}
