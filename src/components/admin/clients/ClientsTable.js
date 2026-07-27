import Link from "next/link";
import CopyButton from "@/components/admin/CopyButton";

function money(n) {
  return `₹${Number(n || 0).toLocaleString("en-IN")}`;
}

export default function ClientsTable({ clients, total, page, pageSize, queryString }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const qs = queryString ? `${queryString}&` : "";

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-x-auto rounded-lg border border-ink-200 bg-cream-50">
        <table className="w-full min-w-240 text-sm">
          <thead>
            <tr className="border-b border-ink-200 text-left text-xs uppercase tracking-wide text-ink-500">
              <th className="px-3 py-3">Client</th>
              <th className="px-3 py-3">Contact</th>
              <th className="px-3 py-3">Source</th>
              <th className="px-3 py-3">Amount due</th>
              <th className="px-3 py-3">Flags</th>
              <th className="px-3 py-3">Added</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-ink-500">
                  No clients match these filters.
                </td>
              </tr>
            )}
            {clients.map((client) => {
              const summary = client.summary ?? {};
              return (
                <tr key={client.id} className="border-b border-ink-100 last:border-0 hover:bg-cream-200/60">
                  <td className="px-3 py-3">
                    <Link href={`/admin/clients/${client.id}`} className="font-medium text-ink-900 hover:text-teal-700">
                      {client.name}
                    </Link>
                    {client.company && <p className="text-xs text-ink-500">{client.company}</p>}
                  </td>
                  <td className="px-3 py-3 text-ink-700">
                    {client.email && (
                      <p className="flex items-center gap-1">
                        {client.email}
                        <CopyButton value={client.email} label="email" />
                      </p>
                    )}
                    {client.phone && (
                      <p className="flex items-center gap-1 text-xs text-ink-500">
                        {client.phone}
                        <CopyButton value={client.phone} label="phone number" />
                      </p>
                    )}
                  </td>
                  <td className="px-3 py-3 text-ink-700">{client.source || "—"}</td>
                  <td className="px-3 py-3 text-ink-700">{money(summary.amount_due)}</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-1">
                      {summary.overdue_invoice_count > 0 && (
                        <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
                          Overdue
                        </span>
                      )}
                      {summary.projects_revisions_exceeded > 0 && (
                        <span className="inline-flex items-center rounded-full border border-gold-300 bg-gold-50 px-2 py-0.5 text-xs font-medium text-gold-800">
                          Revisions exceeded
                        </span>
                      )}
                      {!summary.overdue_invoice_count && !summary.projects_revisions_exceeded && (
                        <span className="text-ink-400">—</span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-ink-500">{new Date(client.created_at).toLocaleDateString()}</td>
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
            href={`/admin/clients?${qs}page=${Math.max(1, page - 1)}`}
            className={`rounded-md border border-ink-300 px-3 py-1.5 ${page <= 1 ? "pointer-events-none opacity-40" : "hover:bg-cream-200"}`}
          >
            Previous
          </Link>
          <Link
            aria-disabled={page >= totalPages}
            href={`/admin/clients?${qs}page=${Math.min(totalPages, page + 1)}`}
            className={`rounded-md border border-ink-300 px-3 py-1.5 ${page >= totalPages ? "pointer-events-none opacity-40" : "hover:bg-cream-200"}`}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
