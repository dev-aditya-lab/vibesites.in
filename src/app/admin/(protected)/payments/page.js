import { queryInvoices, getPaymentTotals } from "@/lib/admin/payments-query";
import PaymentsFilterBar from "@/components/admin/payments/PaymentsFilterBar";
import PaymentsTable from "@/components/admin/payments/PaymentsTable";

export const metadata = { title: "Payments" };

function money(n) {
  return `₹${Number(n || 0).toLocaleString("en-IN")}`;
}

export default async function AdminPaymentsPage({ searchParams }) {
  const params = await searchParams;
  const current = {
    q: params?.q || "",
    status: params?.status || "",
    overdueOnly: params?.overdueOnly === "1",
  };
  const page = Number(params?.page) || 1;

  const [{ invoices, total, pageSize }, totals] = await Promise.all([
    queryInvoices({ page, ...current }),
    getPaymentTotals(),
  ]);

  const queryString = new URLSearchParams(
    Object.entries(current)
      .filter(([, v]) => v)
      .map(([k, v]) => [k, v === true ? "1" : v])
  ).toString();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl text-ink-950">Payments</h1>
        <p className="mt-1 text-sm text-ink-600">Outstanding balances, overdue invoices, and upcoming due dates across all clients.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-ink-200 bg-cream-50 p-4">
          <p className="text-xs uppercase tracking-wide text-ink-500">Total outstanding</p>
          <p className="mt-1 text-xl font-semibold text-ink-950">{money(totals.totalDue)}</p>
        </div>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-xs uppercase tracking-wide text-red-700">Overdue</p>
          <p className="mt-1 text-xl font-semibold text-red-800">{money(totals.overdueAmount)}</p>
          <p className="text-xs text-red-700">{totals.overdueCount} invoice(s)</p>
        </div>
        <div className="rounded-lg border border-ink-200 bg-cream-50 p-4">
          <p className="text-xs uppercase tracking-wide text-ink-500">Due in next 7 days</p>
          <p className="mt-1 text-xl font-semibold text-ink-950">{totals.dueSoonCount} invoice(s)</p>
        </div>
      </div>

      <PaymentsFilterBar current={current} />

      <PaymentsTable invoices={invoices} total={total} page={page} pageSize={pageSize} queryString={queryString} />
    </div>
  );
}
