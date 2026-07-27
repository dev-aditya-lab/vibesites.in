import Link from "next/link";
import StatusBadge from "@/components/admin/StatusBadge";
import { INVOICE_TYPE_LABELS, INVOICE_STATUS_LABELS, INVOICE_STATUS_STYLES } from "@/lib/admin/client-constants";

function money(n) {
  return `₹${Number(n || 0).toLocaleString("en-IN")}`;
}

export default function PaymentsTable({ invoices, total, page, pageSize, queryString }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const qs = queryString ? `${queryString}&` : "";
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-x-auto rounded-lg border border-ink-200 bg-cream-50">
        <table className="w-full min-w-220 text-sm">
          <thead>
            <tr className="border-b border-ink-200 text-left text-xs uppercase tracking-wide text-ink-500">
              <th className="px-3 py-3">Invoice</th>
              <th className="px-3 py-3">Client</th>
              <th className="px-3 py-3">Type</th>
              <th className="px-3 py-3">Amount</th>
              <th className="px-3 py-3">Due date</th>
              <th className="px-3 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-ink-500">
                  No invoices match these filters.
                </td>
              </tr>
            )}
            {invoices.map((inv) => {
              const overdue = inv.status !== "paid" && inv.due_date && inv.due_date < today;
              return (
                <tr key={inv.id} className="border-b border-ink-100 last:border-0 hover:bg-cream-200/60">
                  <td className="px-3 py-3 font-medium text-ink-900">{inv.invoice_number}</td>
                  <td className="px-3 py-3">
                    {inv.client && (
                      <Link href={`/admin/clients/${inv.client.id}`} className="text-ink-900 hover:text-teal-700">
                        {inv.client.name}
                      </Link>
                    )}
                  </td>
                  <td className="px-3 py-3 text-ink-700">{INVOICE_TYPE_LABELS[inv.type] ?? inv.type}</td>
                  <td className="px-3 py-3 text-ink-700">
                    {money(inv.amount_paid)} / {money(inv.total_amount)}
                  </td>
                  <td className={`px-3 py-3 ${overdue ? "font-medium text-red-700" : "text-ink-700"}`}>
                    {inv.due_date ? new Date(inv.due_date).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge status={inv.status} labels={INVOICE_STATUS_LABELS} styles={INVOICE_STATUS_STYLES} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-ink-600">
        <span>{total === 0 ? "0 results" : `Page ${page} of ${totalPages} · ${total} total`}</span>
        <div className="flex gap-2">
          <Link
            aria-disabled={page <= 1}
            href={`/admin/payments?${qs}page=${Math.max(1, page - 1)}`}
            className={`rounded-md border border-ink-300 px-3 py-1.5 ${page <= 1 ? "pointer-events-none opacity-40" : "hover:bg-cream-200"}`}
          >
            Previous
          </Link>
          <Link
            aria-disabled={page >= totalPages}
            href={`/admin/payments?${qs}page=${Math.min(totalPages, page + 1)}`}
            className={`rounded-md border border-ink-300 px-3 py-1.5 ${page >= totalPages ? "pointer-events-none opacity-40" : "hover:bg-cream-200"}`}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
