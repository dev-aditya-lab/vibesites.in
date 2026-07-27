"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/admin/StatusBadge";
import RevisionTracker from "@/components/admin/RevisionTracker";
import { PROJECT_STATUSES, PROJECT_STATUS_LABELS, PROJECT_STATUS_STYLES } from "@/lib/admin/client-constants";
import { createProject, updateProjectStatus, incrementRevisionsUsed } from "@/lib/admin/clients-actions";
import { plans } from "@/data/pricing";

const inputClasses =
  "rounded-md border border-ink-300 bg-cream-50 px-3 py-2 text-sm text-ink-900 focus:border-teal-500 focus:outline-none";

export default function ProjectsPanel({ client, allServices }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    projectName: "",
    websiteDomain: "",
    planKey: "",
    revisionsIncluded: "",
    startDate: "",
    deliveryDate: "",
    serviceIds: [],
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const toggleService = (id) => {
    setForm((f) => ({
      ...f,
      serviceIds: f.serviceIds.includes(id) ? f.serviceIds.filter((s) => s !== id) : [...f.serviceIds, id],
    }));
  };

  const submit = () => {
    if (!form.projectName.trim()) return;
    const plan = plans.find((p) => p.key === form.planKey);
    startTransition(async () => {
      await createProject(client.id, { ...form, planName: plan?.name || null });
      setForm({ projectName: "", websiteDomain: "", planKey: "", revisionsIncluded: "", startDate: "", deliveryDate: "", serviceIds: [] });
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
          New project
        </button>
      ) : (
        <div className="rounded-lg border border-ink-200 bg-cream-50 p-4">
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-ink-500">Project name</label>
              <input value={form.projectName} onChange={set("projectName")} className={inputClasses} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-ink-500">Website domain</label>
              <input value={form.websiteDomain} onChange={set("websiteDomain")} className={inputClasses} />
            </div>
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
          </div>

          <div className="mt-3 flex flex-col gap-1">
            <label className="text-xs text-ink-500">Services</label>
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

          <div className="mt-3 flex gap-2">
            <button
              onClick={submit}
              disabled={isPending || !form.projectName.trim()}
              className="rounded-md bg-ink-900 px-3 py-1.5 text-xs font-medium text-cream-50 disabled:opacity-40"
            >
              Save project
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
        {client.projects.length === 0 && <p className="text-sm text-ink-500">No projects yet.</p>}
        {client.projects.map((p) => (
          <div key={p.id} className="rounded-lg border border-ink-200 bg-cream-50 p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-ink-900">{p.project_name}</p>
                <p className="text-xs text-ink-500">
                  {p.website_domain || "No domain set yet"}
                  {p.plan_name ? ` · ${p.plan_name}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={p.status} labels={PROJECT_STATUS_LABELS} styles={PROJECT_STATUS_STYLES} />
                <select
                  defaultValue={p.status}
                  onChange={(e) =>
                    startTransition(async () => {
                      await updateProjectStatus(p.id, client.id, e.target.value);
                      router.refresh();
                    })
                  }
                  disabled={isPending}
                  className="rounded-md border border-ink-300 bg-cream-50 px-2 py-1 text-xs"
                >
                  {PROJECT_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {(p.project_services ?? []).length > 0 && (
              <p className="mt-2 text-xs text-ink-600">
                {p.project_services.map((ps) => ps.service?.name).filter(Boolean).join(", ")}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-4">
              <RevisionTracker used={p.revisions_used} included={p.revisions_included} className="w-56" />
              <div className="flex gap-1">
                <button
                  onClick={() =>
                    startTransition(async () => {
                      await incrementRevisionsUsed(p.id, client.id, -1);
                      router.refresh();
                    })
                  }
                  disabled={isPending || p.revisions_used <= 0}
                  className="rounded-md border border-ink-300 px-2 py-1 text-xs disabled:opacity-40"
                >
                  −
                </button>
                <button
                  onClick={() =>
                    startTransition(async () => {
                      await incrementRevisionsUsed(p.id, client.id, 1);
                      router.refresh();
                    })
                  }
                  disabled={isPending}
                  className="rounded-md border border-ink-300 px-2 py-1 text-xs"
                >
                  + Log revision
                </button>
              </div>
            </div>

            <p className="mt-2 text-xs text-ink-500">
              {p.start_date ? `Started ${new Date(p.start_date).toLocaleDateString()}` : "Start date not set"}
              {p.delivery_date ? ` · Delivered ${new Date(p.delivery_date).toLocaleDateString()}` : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
