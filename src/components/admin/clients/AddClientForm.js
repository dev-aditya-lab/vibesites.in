"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClientRecord } from "@/lib/admin/clients-actions";
import { CLIENT_SOURCES } from "@/lib/admin/client-constants";

const inputClasses =
  "rounded-md border border-ink-300 bg-cream-50 px-3 py-2 text-sm text-ink-900 focus:border-teal-500 focus:outline-none";

export default function AddClientForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", address: "", source: "" });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    startTransition(async () => {
      const id = await createClientRecord(form);
      router.push(`/admin/clients/${id}`);
    });
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-fit rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-cream-50 hover:bg-teal-700"
      >
        New client
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-wrap items-end gap-3 rounded-lg border border-ink-200 bg-cream-50 p-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-ink-500">Name *</label>
        <input required value={form.name} onChange={set("name")} className={inputClasses} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-ink-500">Company</label>
        <input value={form.company} onChange={set("company")} className={inputClasses} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-ink-500">Email</label>
        <input type="email" value={form.email} onChange={set("email")} className={inputClasses} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-ink-500">Phone</label>
        <input value={form.phone} onChange={set("phone")} className={inputClasses} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-ink-500">Source</label>
        <select value={form.source} onChange={set("source")} className={inputClasses}>
          <option value="">—</option>
          {CLIENT_SOURCES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={isPending || !form.name.trim()}
        className="rounded-md bg-ink-900 px-4 py-2 text-sm font-medium text-cream-50 disabled:opacity-40"
      >
        Create
      </button>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="rounded-md border border-ink-300 px-4 py-2 text-sm text-ink-700 hover:bg-cream-200"
      >
        Cancel
      </button>
    </form>
  );
}
