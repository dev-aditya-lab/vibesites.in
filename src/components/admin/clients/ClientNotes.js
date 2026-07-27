"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addClientNote } from "@/lib/admin/clients-actions";

export default function ClientNotes({ client }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [noteText, setNoteText] = useState("");

  const submitNote = () => {
    if (!noteText.trim()) return;
    startTransition(async () => {
      await addClientNote(client.id, noteText.trim());
      setNoteText("");
      router.refresh();
    });
  };

  return (
    <div className="rounded-lg border border-ink-200 bg-cream-50 p-5">
      <p className="text-sm font-semibold text-ink-900">Notes</p>
      <div className="mt-3 flex flex-col gap-2">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          rows={2}
          placeholder="Log a call, decision, or follow-up…"
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
        {client.notes.length === 0 && <li className="text-sm text-ink-500">No notes yet.</li>}
        {client.notes.map((note) => (
          <li key={note.id} className="border-t border-ink-100 pt-3 first:border-0 first:pt-0">
            <p className="text-sm text-ink-800">{note.note}</p>
            <p className="mt-1 text-xs text-ink-500">
              {note.author_email} · {new Date(note.created_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
