"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/admin/StatusBadge";
import CopyButton from "@/components/admin/CopyButton";
import { LEAD_STATUSES, FORM_TYPE_LABELS } from "@/lib/admin/constants";
import {
  updateLeadStatus,
  addLeadNote,
  addLeadService,
  removeLeadService,
  addLeadLocation,
  removeLeadLocation,
  addLeadTag,
  removeLeadTag,
} from "@/lib/admin/actions";

function Chip({ children, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-cream-100 px-2.5 py-1 text-xs text-ink-700">
      {children}
      {onRemove && (
        <button onClick={onRemove} aria-label="Remove" className="text-ink-400 hover:text-red-600">
          ×
        </button>
      )}
    </span>
  );
}

export default function LeadDetail({ lead, allServices }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [noteText, setNoteText] = useState("");
  const [newService, setNewService] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newTag, setNewTag] = useState("");

  const refresh = () => router.refresh();

  const linkedServiceIds = new Set((lead.lead_services ?? []).map((ls) => ls.service?.id));
  const availableServices = allServices.filter((s) => !linkedServiceIds.has(s.id));

  const handleStatusChange = (e) => {
    const status = e.target.value;
    startTransition(async () => {
      await updateLeadStatus(lead.id, status);
      refresh();
    });
  };

  const submitNote = () => {
    if (!noteText.trim()) return;
    startTransition(async () => {
      await addLeadNote(lead.id, noteText.trim());
      setNoteText("");
      refresh();
    });
  };

  const infoRows = [
    ["Form", FORM_TYPE_LABELS[lead.form_type] ?? lead.form_type],
    ["Email", lead.email, true],
    ["Phone", lead.phone, true],
    ["WhatsApp", lead.whatsapp_number, true],
    ["Company", lead.company],
    ["Location (submitted)", lead.location_text],
    ["Budget", lead.budget_range],
    ["Source page", lead.source_page],
  ].filter(([, v]) => v);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className="flex flex-col gap-6">
        <div className="rounded-lg border border-ink-200 bg-cream-50 p-5">
          <p className="text-sm font-semibold text-ink-900">Submitted details</p>
          <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {infoRows.map(([label, value, copyable]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-wide text-ink-500">{label}</dt>
                <dd className="mt-0.5 flex items-center gap-1.5 text-sm text-ink-900">
                  {value}
                  {copyable && <CopyButton value={value} label={label} />}
                </dd>
              </div>
            ))}
          </dl>
          {lead.message && (
            <div className="mt-4 border-t border-ink-100 pt-4">
              <dt className="text-xs uppercase tracking-wide text-ink-500">Message</dt>
              <dd className="mt-1 whitespace-pre-wrap text-sm text-ink-800">{lead.message}</dd>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-ink-200 bg-cream-50 p-5">
          <p className="text-sm font-semibold text-ink-900">Notes</p>
          <div className="mt-3 flex flex-col gap-2">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              rows={2}
              placeholder="Log a follow-up…"
              className="w-full rounded-md border border-ink-300 bg-cream-50 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
            />
            <button
              onClick={submitNote}
              disabled={isPending || !noteText.trim()}
              className="w-fit rounded-md bg-ink-900 px-3 py-1.5 text-xs font-medium text-cream-50 disabled:opacity-40"
            >
              Add note
            </button>
          </div>
          <ul className="mt-4 flex flex-col gap-3">
            {lead.notes.length === 0 && <li className="text-sm text-ink-500">No notes yet.</li>}
            {lead.notes.map((note) => (
              <li key={note.id} className="border-t border-ink-100 pt-3 first:border-0 first:pt-0">
                <p className="text-sm text-ink-800">{note.note}</p>
                <p className="mt-1 text-xs text-ink-500">
                  {note.author_email} · {new Date(note.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-lg border border-ink-200 bg-cream-50 p-5">
          <p className="text-xs uppercase tracking-wide text-ink-500">Status</p>
          <div className="mt-2 flex items-center gap-3">
            <StatusBadge status={lead.status} />
            <select
              defaultValue={lead.status}
              onChange={handleStatusChange}
              disabled={isPending}
              className="rounded-md border border-ink-300 bg-cream-50 px-2 py-1.5 text-sm"
            >
              {LEAD_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="rounded-lg border border-ink-200 bg-cream-50 p-5">
          <p className="text-xs uppercase tracking-wide text-ink-500">Services</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(lead.lead_services ?? []).map((ls) => (
              <Chip
                key={ls.service?.id}
                onRemove={() =>
                  startTransition(async () => {
                    await removeLeadService(lead.id, ls.service.id);
                    refresh();
                  })
                }
              >
                {ls.service?.name}
              </Chip>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <select
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              className="flex-1 rounded-md border border-ink-300 bg-cream-50 px-2 py-1.5 text-sm"
            >
              <option value="">Add service…</option>
              {availableServices.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <button
              onClick={() =>
                newService &&
                startTransition(async () => {
                  await addLeadService(lead.id, newService);
                  setNewService("");
                  refresh();
                })
              }
              disabled={!newService || isPending}
              className="rounded-md bg-ink-900 px-3 py-1.5 text-xs font-medium text-cream-50 disabled:opacity-40"
            >
              Add
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-ink-200 bg-cream-50 p-5">
          <p className="text-xs uppercase tracking-wide text-ink-500">Location tags</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(lead.lead_locations ?? []).map((ll) => (
              <Chip
                key={ll.location?.id}
                onRemove={() =>
                  startTransition(async () => {
                    await removeLeadLocation(lead.id, ll.location.id);
                    refresh();
                  })
                }
              >
                {ll.location?.name}
              </Chip>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              placeholder="e.g. Patna"
              className="flex-1 rounded-md border border-ink-300 bg-cream-50 px-2 py-1.5 text-sm"
            />
            <button
              onClick={() =>
                newLocation.trim() &&
                startTransition(async () => {
                  await addLeadLocation(lead.id, newLocation.trim());
                  setNewLocation("");
                  refresh();
                })
              }
              disabled={!newLocation.trim() || isPending}
              className="rounded-md bg-ink-900 px-3 py-1.5 text-xs font-medium text-cream-50 disabled:opacity-40"
            >
              Add
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-ink-200 bg-cream-50 p-5">
          <p className="text-xs uppercase tracking-wide text-ink-500">Custom tags</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(lead.lead_tags ?? []).map((lt) => (
              <Chip
                key={lt.tag?.id}
                onRemove={() =>
                  startTransition(async () => {
                    await removeLeadTag(lead.id, lt.tag.id);
                    refresh();
                  })
                }
              >
                {lt.tag?.name}
              </Chip>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="e.g. urgent, referral"
              className="flex-1 rounded-md border border-ink-300 bg-cream-50 px-2 py-1.5 text-sm"
            />
            <button
              onClick={() =>
                newTag.trim() &&
                startTransition(async () => {
                  await addLeadTag(lead.id, newTag.trim());
                  setNewTag("");
                  refresh();
                })
              }
              disabled={!newTag.trim() || isPending}
              className="rounded-md bg-ink-900 px-3 py-1.5 text-xs font-medium text-cream-50 disabled:opacity-40"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
