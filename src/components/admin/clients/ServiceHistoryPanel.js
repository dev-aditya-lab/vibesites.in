"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addServiceHistoryEntry } from "@/lib/admin/clients-actions";

const inputClasses =
  "rounded-md border border-ink-300 bg-cream-50 px-3 py-2 text-sm text-ink-900 focus:border-teal-500 focus:outline-none";

function money(n) {
  return n === null || n === undefined ? "—" : `₹${Number(n).toLocaleString("en-IN")}`;
}

export default function ServiceHistoryPanel({ client }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ projectId: "", serviceName: "", amount: "", date: new Date().toISOString().slice(0, 10), notes: "" });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = () => {
    if (!form.serviceName.trim()) return;
    startTransition(async () => {
      await addServiceHistoryEntry(client.id, form);
      setForm({ projectId: "", serviceName: "", amount: "", date: new Date().toISOString().slice(0, 10), notes: "" });
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
          Log a service / extra order
        </button>
      ) : (
        <div className="rounded-lg border border-ink-200 bg-cream-50 p-4">
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-ink-500">Service name</label>
              <input value={form.serviceName} onChange={set("serviceName")} placeholder="e.g. Business email setup" className={inputClasses} />
            </div>
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
              <label className="text-xs text-ink-500">Amount</label>
              <input type="number" min="0" step="0.01" value={form.amount} onChange={set("amount")} className={inputClasses} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-ink-500">Date</label>
              <input type="date" value={form.date} onChange={set("date")} className={inputClasses} />
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <label className="text-xs text-ink-500">Notes</label>
            <textarea value={form.notes} onChange={set("notes")} rows={2} className={inputClasses} />
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={submit}
              disabled={isPending || !form.serviceName.trim()}
              className="rounded-md bg-ink-900 px-3 py-1.5 text-xs font-medium text-cream-50 disabled:opacity-40"
            >
              Save entry
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

      <div className="flex flex-col gap-2">
        {client.serviceHistory.length === 0 && <p className="text-sm text-ink-500">No extra services logged yet.</p>}
        {client.serviceHistory.map((s) => {
          const project = client.projects.find((p) => p.id === s.project_id);
          return (
            <div key={s.id} className="flex items-center justify-between rounded-lg border border-ink-200 bg-cream-50 p-4">
              <div>
                <p className="text-sm font-medium text-ink-900">{s.service_name}</p>
                <p className="text-xs text-ink-500">
                  {new Date(s.date).toLocaleDateString()}
                  {project ? ` · ${project.project_name}` : ""}
                </p>
                {s.notes && <p className="mt-1 text-sm text-ink-700">{s.notes}</p>}
              </div>
              <p className="text-sm font-medium text-ink-900">{money(s.amount)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
