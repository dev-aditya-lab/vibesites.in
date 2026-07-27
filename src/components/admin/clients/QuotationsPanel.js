"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/admin/StatusBadge";
import { QUOTATION_STATUSES, QUOTATION_STATUS_LABELS, QUOTATION_STATUS_STYLES } from "@/lib/admin/client-constants";
import { createQuotation, updateQuotationStatus, convertQuotationToProject } from "@/lib/admin/clients-actions";
import { plans } from "@/data/pricing";

const inputClasses =
  "rounded-md border border-ink-300 bg-cream-50 px-3 py-2 text-sm text-ink-900 focus:border-teal-500 focus:outline-none";

function money(n) {
  return `₹${Number(n || 0).toLocaleString("en-IN")}`;
}

function ConvertForm({ quotation, clientId, onDone }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    projectName: quotation.plan_name ? `${quotation.plan_name} project` : "",
    websiteDomain: "",
    revisionsIncluded: "",
    startDate: "",
    deliveryDate: "",
  });
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = () => {
    if (!form.projectName.trim()) return;
    startTransition(async () => {
      await convertQuotationToProject(quotation.id, clientId, form);
      onDone();
      router.refresh();
    });
  };

  return (
    <div className="mt-3 flex flex-wrap items-end gap-2 rounded-md border border-teal-200 bg-teal-50 p-3">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-ink-500">Project name</label>
        <input value={form.projectName} onChange={set("projectName")} className={inputClasses} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-ink-500">Website domain</label>
        <input value={form.websiteDomain} onChange={set("websiteDomain")} className={inputClasses} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-ink-500">Revisions included</label>
        <input type="number" min="0" value={form.revisionsIncluded} onChange={set("revisionsIncluded")} className={`${inputClasses} w-24`} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-ink-500">Start date</label>
        <input type="date" value={form.startDate} onChange={set("startDate")} className={inputClasses} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-ink-500">Delivery date</label>
        <input type="date" value={form.deliveryDate} onChange={set("deliveryDate")} className={inputClasses} />
      </div>
      <button
        onClick={submit}
        disabled={isPending || !form.projectName.trim()}
        className="rounded-md bg-ink-900 px-3 py-1.5 text-xs font-medium text-cream-50 disabled:opacity-40"
      >
        Create project
      </button>
      <button onClick={onDone} className="rounded-md border border-ink-300 px-3 py-1.5 text-xs font-medium hover:bg-cream-200">
        Cancel
      </button>
    </div>
  );
}

export default function QuotationsPanel({ client, allServices }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [converting, setConverting] = useState(null);
  const [form, setForm] = useState({ planKey: "", amount: "", status: "draft", validUntil: "", notes: "", serviceIds: [] });

  const convertedQuotationIds = new Set(client.projects.map((p) => p.quotation_id).filter(Boolean));

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleService = (id) => {
    setForm((f) => ({
      ...f,
      serviceIds: f.serviceIds.includes(id) ? f.serviceIds.filter((s) => s !== id) : [...f.serviceIds, id],
    }));
  };

  const submit = () => {
    const plan = plans.find((p) => p.key === form.planKey);
    startTransition(async () => {
      await createQuotation(client.id, {
        planKey: plan?.key || null,
        planName: plan?.name || null,
        amount: form.amount,
        status: form.status,
        validUntil: form.validUntil,
        notes: form.notes,
        serviceIds: form.serviceIds,
      });
      setForm({ planKey: "", amount: "", status: "draft", validUntil: "", notes: "", serviceIds: [] });
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
          New quotation
        </button>
      ) : (
        <div className="rounded-lg border border-ink-200 bg-cream-50 p-4">
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-ink-500">Plan</label>
              <select value={form.planKey} onChange={set("planKey")} className={inputClasses}>
                <option value="">Custom / none</option>
                {plans.map((p) => (
                  <option key={p.key} value={p.key}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-ink-500">Amount</label>
              <input type="number" min="0" value={form.amount} onChange={set("amount")} className={inputClasses} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-ink-500">Status</label>
              <select value={form.status} onChange={set("status")} className={inputClasses}>
                {QUOTATION_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-ink-500">Valid until</label>
              <input type="date" value={form.validUntil} onChange={set("validUntil")} className={inputClasses} />
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-1">
            <label className="text-xs text-ink-500">Services quoted</label>
            <div className="flex flex-wrap gap-2">
              {allServices.map((s) => (
                <label
                  key={s.id}
                  className="flex items-center gap-1.5 rounded-full border border-ink-200 bg-cream-100 px-2.5 py-1 text-xs text-ink-700"
                >
                  <input type="checkbox" checked={form.serviceIds.includes(s.id)} onChange={() => toggleService(s.id)} />
                  {s.name}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-1">
            <label className="text-xs text-ink-500">Notes</label>
            <textarea value={form.notes} onChange={set("notes")} rows={2} className={inputClasses} />
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={submit}
              disabled={isPending}
              className="rounded-md bg-ink-900 px-3 py-1.5 text-xs font-medium text-cream-50 disabled:opacity-40"
            >
              Save quotation
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
        {client.quotations.length === 0 && <p className="text-sm text-ink-500">No quotations yet.</p>}
        {client.quotations.map((q) => (
          <div key={q.id} className="rounded-lg border border-ink-200 bg-cream-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-ink-900">{q.plan_name || "Custom quotation"}</p>
                <p className="text-xs text-ink-500">
                  {money(q.amount)} · {q.valid_until ? `valid until ${new Date(q.valid_until).toLocaleDateString()}` : "no expiry set"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={q.status} labels={QUOTATION_STATUS_LABELS} styles={QUOTATION_STATUS_STYLES} />
                <select
                  defaultValue={q.status}
                  onChange={(e) =>
                    startTransition(async () => {
                      await updateQuotationStatus(q.id, client.id, e.target.value);
                      router.refresh();
                    })
                  }
                  disabled={isPending}
                  className="rounded-md border border-ink-300 bg-cream-50 px-2 py-1 text-xs"
                >
                  {QUOTATION_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {(q.quotation_services ?? []).length > 0 && (
              <p className="mt-2 text-xs text-ink-600">
                {q.quotation_services.map((qs) => qs.service?.name).filter(Boolean).join(", ")}
              </p>
            )}
            {q.notes && <p className="mt-2 text-sm text-ink-700">{q.notes}</p>}

            <div className="mt-3">
              {convertedQuotationIds.has(q.id) ? (
                <span className="text-xs font-medium text-teal-700">Converted to a project</span>
              ) : converting === q.id ? (
                <ConvertForm quotation={q} clientId={client.id} onDone={() => setConverting(null)} />
              ) : (
                <button
                  onClick={() => setConverting(q.id)}
                  className="rounded-md border border-ink-300 px-3 py-1.5 text-xs font-medium hover:bg-cream-200"
                >
                  Convert to project
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
