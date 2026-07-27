"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { markMaintenanceCyclePaid } from "@/lib/admin/clients-actions";
import { cn } from "@/lib/utils";

function money(n) {
  return `₹${Number(n || 0).toLocaleString("en-IN")}`;
}

export default function MaintenanceTable({ subscriptions }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="overflow-x-auto rounded-lg border border-ink-200 bg-cream-50">
      <table className="w-full min-w-200 text-sm">
        <thead>
          <tr className="border-b border-ink-200 text-left text-xs uppercase tracking-wide text-ink-500">
            <th className="px-3 py-3">Client</th>
            <th className="px-3 py-3">Monthly amount</th>
            <th className="px-3 py-3">Next due</th>
            <th className="px-3 py-3">Last paid</th>
            <th className="px-3 py-3" />
          </tr>
        </thead>
        <tbody>
          {subscriptions.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center text-ink-500">
                No active maintenance subscriptions.
              </td>
            </tr>
          )}
          {subscriptions.map((m) => {
            const overdue = m.next_due_date < today;
            return (
              <tr key={m.id} className={cn("border-b border-ink-100 last:border-0", overdue && "bg-red-50/60")}>
                <td className="px-3 py-3">
                  {m.client && (
                    <Link href={`/admin/clients/${m.client.id}`} className="font-medium text-ink-900 hover:text-teal-700">
                      {m.client.name}
                    </Link>
                  )}
                </td>
                <td className="px-3 py-3 text-ink-700">{money(m.monthly_amount)}</td>
                <td className={`px-3 py-3 ${overdue ? "font-medium text-red-700" : "text-ink-700"}`}>
                  {new Date(m.next_due_date).toLocaleDateString()}
                  {overdue ? " · overdue" : ""}
                </td>
                <td className="px-3 py-3 text-ink-500">{m.last_paid_date ? new Date(m.last_paid_date).toLocaleDateString() : "—"}</td>
                <td className="px-3 py-3">
                  <button
                    onClick={() =>
                      startTransition(async () => {
                        await markMaintenanceCyclePaid(m.id, m.client_id);
                        router.refresh();
                      })
                    }
                    disabled={isPending}
                    className="rounded-md bg-ink-900 px-3 py-1.5 text-xs font-medium text-cream-50 disabled:opacity-40"
                  >
                    Mark cycle paid
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
