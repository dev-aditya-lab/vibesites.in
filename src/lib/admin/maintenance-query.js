import "server-only";
import { createClient } from "@/lib/supabase/server";

/** Cross-client maintenance subscriptions for the maintenance dashboard. */
export async function queryMaintenanceSubscriptions({ status = "active" } = {}) {
  const supabase = await createClient();
  let query = supabase
    .from("maintenance_subscriptions")
    .select("*, client:clients(id,name,company)")
    .order("next_due_date", { ascending: true });
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}
