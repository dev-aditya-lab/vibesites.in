"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import CopyButton from "@/components/admin/CopyButton";
import { updateClientRecord } from "@/lib/admin/clients-actions";

const inputClasses =
  "rounded-md border border-ink-300 bg-cream-50 px-3 py-2 text-sm text-ink-900 focus:border-teal-500 focus:outline-none";

function money(n) {
  return `₹${Number(n || 0).toLocaleString("en-IN")}`;
}

export default function OverviewPanel({ client }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: client.name || "",
    company: client.company || "",
    email: client.email || "",
    phone: client.phone || "",
    address: client.address || "",
    source: client.source || "",
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const save = () => {
    startTransition(async () => {
      await updateClientRecord(client.id, form);
      setEditing(false);
      router.refresh();
    });
  };

  const amountDue = client.invoices
    .filter((inv) => inv.status !== "paid")
    .reduce((sum, inv) => sum + (Number(inv.total_amount) - Number(inv.amount_paid)), 0);
  const overdueCount = client.invoices.filter((inv) => inv.status === "overdue").length;
  const revisionsExceeded = client.projects.filter((p) => p.revisions_included > 0 && p.revisions_used >= p.revisions_included).length;
  const nextMaintenanceDue = client.maintenance
    .filter((m) => m.status === "active")
    .map((m) => m.next_due_date)
    .sort()[0];

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="rounded-lg border border-ink-200 bg-cream-50 p-5 lg:col-span-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-ink-900">Profile</p>
          {!editing && (
            <button onClick={() => setEditing(true)} className="text-xs font-medium text-teal-700 hover:underline">
              Edit
            </button>
          )}
        </div>

        {editing ? (
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-ink-500">Name</label>
              <input value={form.name} onChange={set("name")} className={inputClasses} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-ink-500">Company</label>
              <input value={form.company} onChange={set("company")} className={inputClasses} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-ink-500">Email</label>
              <input value={form.email} onChange={set("email")} className={inputClasses} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-ink-500">Phone</label>
              <input value={form.phone} onChange={set("phone")} className={inputClasses} />
            </div>
            <div className="flex flex-col gap-1 sm:col-span-2">
              <label className="text-xs text-ink-500">Address</label>
              <input value={form.address} onChange={set("address")} className={inputClasses} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-ink-500">Source</label>
              <input value={form.source} onChange={set("source")} className={inputClasses} />
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={save}
                disabled={isPending}
                className="rounded-md bg-ink-900 px-3 py-1.5 text-xs font-medium text-cream-50 disabled:opacity-40"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="rounded-md border border-ink-300 px-3 py-1.5 text-xs font-medium hover:bg-cream-200"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-500">Company</dt>
              <dd className="mt-0.5 text-sm text-ink-900">{client.company || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-500">Source</dt>
              <dd className="mt-0.5 text-sm text-ink-900">{client.source || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-500">Email</dt>
              <dd className="mt-0.5 flex items-center gap-1.5 text-sm text-ink-900">
                {client.email || "—"}
                {client.email && <CopyButton value={client.email} label="email" />}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink-500">Phone</dt>
              <dd className="mt-0.5 flex items-center gap-1.5 text-sm text-ink-900">
                {client.phone || "—"}
                {client.phone && <CopyButton value={client.phone} label="phone number" />}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs uppercase tracking-wide text-ink-500">Address</dt>
              <dd className="mt-0.5 text-sm text-ink-900">{client.address || "—"}</dd>
            </div>
          </dl>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="rounded-lg border border-ink-200 bg-cream-50 p-4">
          <p className="text-xs uppercase tracking-wide text-ink-500">Amount due</p>
          <p className="mt-1 text-xl font-semibold text-ink-950">{money(amountDue)}</p>
          {overdueCount > 0 && <p className="mt-1 text-xs font-medium text-red-700">{overdueCount} overdue invoice(s)</p>}
        </div>
        <div className="rounded-lg border border-ink-200 bg-cream-50 p-4">
          <p className="text-xs uppercase tracking-wide text-ink-500">Next maintenance due</p>
          <p className="mt-1 text-sm font-medium text-ink-900">
            {nextMaintenanceDue ? new Date(nextMaintenanceDue).toLocaleDateString() : "No active subscription"}
          </p>
        </div>
        {revisionsExceeded > 0 && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-xs font-medium text-red-700">{revisionsExceeded} project(s) have exceeded included revisions</p>
          </div>
        )}
      </div>
    </div>
  );
}
