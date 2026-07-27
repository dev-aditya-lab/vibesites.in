"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { AGREEMENT_TYPES, AGREEMENT_TYPE_LABELS, AGREEMENT_TYPE_STYLES } from "@/lib/admin/client-constants";
import { addAgreement, deleteAgreement } from "@/lib/admin/clients-actions";

const inputClasses =
  "rounded-md border border-ink-300 bg-cream-50 px-3 py-2 text-sm text-ink-900 focus:border-teal-500 focus:outline-none";

export default function AgreementsPanel({ client }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ projectId: "", agreementType: "initial", driveLink: "", signedDate: "", notes: "" });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = () => {
    if (!form.driveLink.trim()) return;
    startTransition(async () => {
      await addAgreement(client.id, form);
      setForm({ projectId: "", agreementType: "initial", driveLink: "", signedDate: "", notes: "" });
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
          New agreement
        </button>
      ) : (
        <div className="rounded-lg border border-ink-200 bg-cream-50 p-4">
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-ink-500">Type</label>
              <select value={form.agreementType} onChange={set("agreementType")} className={inputClasses}>
                {AGREEMENT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
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
              <label className="text-xs text-ink-500">Signed date</label>
              <input type="date" value={form.signedDate} onChange={set("signedDate")} className={inputClasses} />
            </div>
            <div className="flex flex-1 flex-col gap-1" style={{ minWidth: "16rem" }}>
              <label className="text-xs text-ink-500">Google Drive link *</label>
              <input value={form.driveLink} onChange={set("driveLink")} placeholder="https://drive.google.com/…" className={inputClasses} />
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <label className="text-xs text-ink-500">Notes</label>
            <textarea value={form.notes} onChange={set("notes")} rows={2} className={inputClasses} />
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={submit}
              disabled={isPending || !form.driveLink.trim()}
              className="rounded-md bg-ink-900 px-3 py-1.5 text-xs font-medium text-cream-50 disabled:opacity-40"
            >
              Save agreement
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
        {client.agreements.length === 0 && <p className="text-sm text-ink-500">No agreements on file yet.</p>}
        {client.agreements.map((a) => {
          const project = client.projects.find((p) => p.id === a.project_id);
          return (
            <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-ink-200 bg-cream-50 p-4">
              <div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={a.agreement_type} labels={AGREEMENT_TYPE_LABELS} styles={AGREEMENT_TYPE_STYLES} />
                  {project && <span className="text-xs text-ink-500">{project.project_name}</span>}
                </div>
                <p className="mt-1 text-xs text-ink-500">
                  {a.signed_date ? `Signed ${new Date(a.signed_date).toLocaleDateString()}` : "Signed date not set"}
                </p>
                {a.notes && <p className="mt-1 text-sm text-ink-700">{a.notes}</p>}
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={a.drive_link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-md border border-ink-300 px-3 py-1.5 text-xs font-medium text-ink-700 hover:border-teal-300 hover:text-teal-700"
                >
                  <ExternalLink className="size-3.5" />
                  Open in Drive
                </a>
                <button
                  onClick={() =>
                    startTransition(async () => {
                      await deleteAgreement(a.id, client.id);
                      router.refresh();
                    })
                  }
                  disabled={isPending}
                  className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-40"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
