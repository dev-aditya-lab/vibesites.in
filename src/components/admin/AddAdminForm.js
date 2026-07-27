"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createAdminAccount } from "@/lib/admin/actions";

export default function AddAdminForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", role: "admin" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    startTransition(async () => {
      try {
        await createAdminAccount(form);
        setForm({ email: "", password: "", role: "admin" });
        setSuccess(true);
        router.refresh();
      } catch (err) {
        setError(err?.message || "Could not create admin account.");
      }
    });
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 rounded-lg border border-ink-200 bg-cream-50 p-5">
      <p className="text-sm font-semibold text-ink-900">Add admin</p>
      {error && <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}
      {success && (
        <p className="rounded-md border border-teal-200 bg-teal-50 px-3 py-2 text-xs text-teal-700">
          Admin account created.
        </p>
      )}
      <input
        type="email"
        required
        placeholder="Email"
        value={form.email}
        onChange={update("email")}
        className="rounded-md border border-ink-300 bg-cream-50 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
      />
      <input
        type="password"
        required
        minLength={8}
        placeholder="Temporary password (min 8 characters)"
        value={form.password}
        onChange={update("password")}
        className="rounded-md border border-ink-300 bg-cream-50 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
      />
      <select
        value={form.role}
        onChange={update("role")}
        className="rounded-md border border-ink-300 bg-cream-50 px-3 py-2 text-sm"
      >
        <option value="admin">Admin</option>
        <option value="super_admin">Super admin</option>
      </select>
      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-cream-50 hover:bg-teal-700 disabled:opacity-50"
      >
        {isPending ? "Creating…" : "Create admin account"}
      </button>
    </form>
  );
}
