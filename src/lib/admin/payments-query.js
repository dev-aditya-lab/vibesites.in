import "server-only";
import { createClient } from "@/lib/supabase/server";

export const PAGE_SIZE = 25;

/** Cross-client invoice list for the payments dashboard. */
export async function queryInvoices({ page = 1, status, overdueOnly, q, sort = "due_date.asc" } = {}) {
  const supabase = await createClient();
  const today = new Date().toISOString().slice(0, 10);

  const [sortColumn, sortDir] = sort.split(".");
  let query = supabase.from("invoices").select("*, client:clients(id,name,company)", { count: "exact" });

  if (status) query = query.eq("status", status);
  if (overdueOnly) query = query.neq("status", "paid").lt("due_date", today);
  if (q) query = query.ilike("invoice_number", `%${q}%`);

  query = query.order(sortColumn || "due_date", { ascending: sortDir !== "desc" });

  const from = (page - 1) * PAGE_SIZE;
  query = query.range(from, from + PAGE_SIZE - 1);

  const { data, error, count } = await query;
  if (error) throw error;
  return { invoices: data ?? [], total: count ?? 0, page, pageSize: PAGE_SIZE };
}

/** Summary cards for the payments dashboard: total due, overdue, due soon. */
export async function getPaymentTotals() {
  const supabase = await createClient();
  const today = new Date().toISOString().slice(0, 10);
  const soonDate = new Date();
  soonDate.setDate(soonDate.getDate() + 7);
  const soon = soonDate.toISOString().slice(0, 10);

  const { data } = await supabase.from("invoices").select("total_amount, amount_paid, due_date").neq("status", "paid");
  const rows = data ?? [];

  const totalDue = rows.reduce((sum, r) => sum + (Number(r.total_amount) - Number(r.amount_paid)), 0);
  const overdueRows = rows.filter((r) => r.due_date && r.due_date < today);
  const overdueAmount = overdueRows.reduce((sum, r) => sum + (Number(r.total_amount) - Number(r.amount_paid)), 0);
  const dueSoonRows = rows.filter((r) => r.due_date && r.due_date >= today && r.due_date <= soon);

  return {
    totalDue,
    overdueCount: overdueRows.length,
    overdueAmount,
    dueSoonCount: dueSoonRows.length,
  };
}
