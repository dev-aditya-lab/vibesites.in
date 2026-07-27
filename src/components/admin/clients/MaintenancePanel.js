"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/admin/StatusBadge";
import { MAINTENANCE_STATUSES, MAINTENANCE_STATUS_LABELS, MAINTENANCE_STATUS_STYLES } from "@/lib/admin/client-constants";
import { createMaintenanceSubscription, updateMaintenanceStatus, markMaintenanceCyclePaid } from "@/lib/admin/clients-actions";
import { cn } from "@/lib/utils";

const inputClasses =
  "rounded-md border border-ink-300 bg-cream-50 px-3 py-2 text-sm text-ink-900 focus:border-teal-500 focus:outline-none";

function money(n) {
  return `₹${Number(n || 0).toLocaleString("en-IN")}`;
}

export default function MaintenancePanel({ client }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ projectId: "", monthlyAmount: "", billingDay: "1", nextDueDate: "" });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const today = new Date().toISOString().slice(0, 10);

  const submit = () => {
    if (!form.monthlyAmount || !form.nextDueDate) return;
    startTransition(async () => {
      await createMaintenanceSubscription(client.id, form);
      setForm({ projectId: "", monthlyAmount: "", billingDay: "1", nextDueDate: "" });
      setShowForm(false);
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-fit rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-cream-50 hover:bg-teal-700"
        >
          New maintenance subscription
        </button>
      ) : (
        <div className="rounded-lg border border-ink-200 bg-cream-50 p-4">
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-ink-500">Project</label>
              <select value={form.projectId} onChange={set("projectId")} className={inputClasses}>
                <option value="">Not tied to a project</option>
                {client.projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.project_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-ink-500">Monthly amount</label>
              <input type="number" min="0" step="0.01" value={form.monthlyAmount} onChange={set("monthlyAmount")} className={inputClasses} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-ink-500">Billing day</label>
              <input type="number" min="1" max="28" value={form.billingDay} onChange={set("billingDay")} className={`${inputClasses} w-20`} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-ink-500">Next due date</label>
              <input type="date" value={form.nextDueDate} onChange={set("nextDueDate")} className={inputClasses} />
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={submit}
              disabled={isPending || !form.monthlyAmount || !form.nextDueDate}
              className="rounded-md bg-ink-900 px-3 py-1.5 text-xs font-medium text-cream-50 disabled:opacity-40"
            >
              Save subscription
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="rounded-md border border-ink-300 px-3 py-1.5 text-xs font-medium hover:bg-cream-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {client.maintenance.length === 0 && <p className="text-sm text-ink-500">No maintenance subscriptions yet.</p>}
        {client.maintenance.map((m) => {
          const overdue = m.status === "active" && m.next_due_date < today;
          return (
            <div
              key={m.id}
              className={cn("rounded-lg border p-4", overdue ? "border-red-300 bg-red-50" : "border-ink-200 bg-cream-50")}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-ink-900">{money(m.monthly_amount)} / month</p>
                  <p className={cn("text-xs", overdue ? "font-medium text-red-700" : "text-ink-500")}>
                    Next due {new Date(m.next_due_date).toLocaleDateString()}
                    {overdue ? " · overdue" : ""}
                    {m.last_paid_date ? ` · last paid ${new Date(m.last_paid_date).toLocaleDateString()}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={m.status} labels={MAINTENANCE_STATUS_LABELS} styles={MAINTENANCE_STATUS_STYLES} />
                  <select
                    defaultValue={m.status}
                    onChange={(e) =>
                      startTransition(async () => {
                        await updateMaintenanceStatus(m.id, client.id, e.target.value);
                        router.refresh();
                      })
                    }
                    disabled={isPending}
                    className="rounded-md border border-ink-300 bg-cream-50 px-2 py-1 text-xs"
                  >
                    {MAINTENANCE_STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {m.status === "active" && (
                <button
                  onClick={() =>
                    startTransition(async () => {
                      await markMaintenanceCyclePaid(m.id, client.id);
                      router.refresh();
                    })
                  }
                  disabled={isPending}
                  className="mt-3 rounded-md bg-ink-900 px-3 py-1.5 text-xs font-medium text-cream-50 disabled:opacity-40"
                >
                  Mark this cycle paid
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
