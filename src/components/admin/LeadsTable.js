"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/admin/StatusBadge";
import { LEAD_STATUSES, FORM_TYPE_LABELS } from "@/lib/admin/constants";
import { bulkUpdateStatus, bulkAddTag, deleteLeads } from "@/lib/admin/actions";
import { leadsToCsv, downloadCsv } from "@/lib/admin/csv";

export default function LeadsTable({ leads, total, page, pageSize, queryString }) {
  const router = useRouter();
  const [selected, setSelected] = useState(() => new Set());
  const [bulkStatus, setBulkStatus] = useState("");
  const [bulkTag, setBulkTag] = useState("");
  const [isPending, startTransition] = useTransition();

  const allSelected = leads.length > 0 && leads.every((l) => selected.has(l.id));
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const qs = queryString ? `${queryString}&` : "";

  const toggleAll = () => {
    setSelected((prev) => {
      if (allSelected) return new Set();
      return new Set(leads.map((l) => l.id));
    });
  };

  const toggleOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedIds = [...selected];

  const runBulkStatus = () => {
    if (!bulkStatus || selectedIds.length === 0) return;
    startTransition(async () => {
      await bulkUpdateStatus(selectedIds, bulkStatus);
      router.refresh();
    });
  };

  const runBulkTag = () => {
    if (!bulkTag.trim() || selectedIds.length === 0) return;
    startTransition(async () => {
      await bulkAddTag(selectedIds, bulkTag.trim());
      setBulkTag("");
      router.refresh();
    });
  };

  const runDelete = () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Delete ${selectedIds.length} lead(s)? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteLeads(selectedIds);
      setSelected(new Set());
      router.refresh();
    });
  };

  const exportCsv = () => {
    const rows = leads.filter((l) => selected.has(l.id));
    if (rows.length === 0) return;
    downloadCsv(`leads-${Date.now()}.csv`, leadsToCsv(rows));
  };

  return (
    <div className="flex flex-col gap-3">
      {selectedIds.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-teal-300 bg-teal-50 px-4 py-3 text-sm">
          <span className="font-medium text-teal-800">{selectedIds.length} selected</span>

          <select
            value={bulkStatus}
            onChange={(e) => setBulkStatus(e.target.value)}
            className="rounded-md border border-ink-300 bg-cream-50 px-2 py-1.5 text-sm"
          >
            <option value="">Set status…</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <button
            onClick={runBulkStatus}
            disabled={!bulkStatus || isPending}
            className="rounded-md bg-ink-900 px-3 py-1.5 text-xs font-medium text-cream-50 disabled:opacity-40"
          >
            Apply
          </button>

          <input
            value={bulkTag}
            onChange={(e) => setBulkTag(e.target.value)}
            placeholder="Add tag…"
            className="rounded-md border border-ink-300 bg-cream-50 px-2 py-1.5 text-sm"
          />
          <button
            onClick={runBulkTag}
            disabled={!bulkTag.trim() || isPending}
            className="rounded-md bg-ink-900 px-3 py-1.5 text-xs font-medium text-cream-50 disabled:opacity-40"
          >
            Add tag
          </button>

          <button onClick={exportCsv} className="rounded-md border border-ink-300 px-3 py-1.5 text-xs font-medium hover:bg-cream-200">
            Export CSV
          </button>
          <button
            onClick={runDelete}
            disabled={isPending}
            className="ml-auto rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-ink-200 bg-cream-50">
        <table className="w-full min-w-230 text-sm">
          <thead>
            <tr className="border-b border-ink-200 text-left text-xs uppercase tracking-wide text-ink-500">
              <th className="w-10 px-4 py-3">
                <input type="checkbox" checked={allSelected} onChange={toggleAll} aria-label="Select all" />
              </th>
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Form</th>
              <th className="px-3 py-3">Contact</th>
              <th className="px-3 py-3">Services</th>
              <th className="px-3 py-3">Location</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-ink-500">
                  No leads match these filters.
                </td>
              </tr>
            )}
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-ink-100 last:border-0 hover:bg-cream-200/60">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.has(lead.id)}
                    onChange={() => toggleOne(lead.id)}
                    aria-label={`Select ${lead.name}`}
                  />
                </td>
                <td className="px-3 py-3">
                  <Link href={`/admin/leads/${lead.id}`} className="font-medium text-ink-900 hover:text-teal-700">
                    {lead.name}
                  </Link>
                  {lead.company && <p className="text-xs text-ink-500">{lead.company}</p>}
                </td>
                <td className="px-3 py-3">
                  <span className="inline-flex items-center rounded-full border border-ink-200 bg-cream-100 px-2 py-0.5 text-xs font-medium text-ink-700">
                    {FORM_TYPE_LABELS[lead.form_type] ?? lead.form_type}
                  </span>
                </td>
                <td className="px-3 py-3 text-ink-700">
                  {lead.email && <p>{lead.email}</p>}
                  {lead.phone && <p className="text-xs text-ink-500">{lead.phone}</p>}
                </td>
                <td className="px-3 py-3 text-ink-700">
                  {(lead.lead_services ?? []).map((ls) => ls.service?.name).filter(Boolean).join(", ") || "—"}
                </td>
                <td className="px-3 py-3 text-ink-700">{lead.location_text || "—"}</td>
                <td className="px-3 py-3">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-3 py-3 text-ink-500">{new Date(lead.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-ink-600">
        <span>
          {total === 0 ? "0 results" : `Page ${page} of ${totalPages} · ${total} total`}
        </span>
        <div className="flex gap-2">
          <Link
            aria-disabled={page <= 1}
            href={`/admin/leads?${qs}page=${Math.max(1, page - 1)}`}
            className={`rounded-md border border-ink-300 px-3 py-1.5 ${page <= 1 ? "pointer-events-none opacity-40" : "hover:bg-cream-200"}`}
          >
            Previous
          </Link>
          <Link
            aria-disabled={page >= totalPages}
            href={`/admin/leads?${qs}page=${Math.min(totalPages, page + 1)}`}
            className={`rounded-md border border-ink-300 px-3 py-1.5 ${page >= totalPages ? "pointer-events-none opacity-40" : "hover:bg-cream-200"}`}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
