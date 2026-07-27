"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/admin/StatusBadge";
import { INVOICE_TYPES, INVOICE_TYPE_LABELS, INVOICE_STATUS_LABELS, INVOICE_STATUS_STYLES } from "@/lib/admin/client-constants";
import { createInvoice, recordInvoicePayment } from "@/lib/admin/clients-actions";

const inputClasses =
  "rounded-md border border-ink-300 bg-cream-50 px-3 py-2 text-sm text-ink-900 focus:border-teal-500 focus:outline-none";

function money(n) {
  return `₹${Number(n || 0).toLocaleString("en-IN")}`;
}

function PaymentForm({ invoice, clientId, onDone }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({ amount: "", paidDate: new Date().toISOString().slice(0, 10), paymentMethod: "", note: "" });
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const remaining = Number(invoice.total_amount) - Number(invoice.amount_paid);

  const submit = () => {
    if (!form.amount) return;
    startTransition(async () => {
      await recordInvoicePayment(invoice.id, clientId, form);
      onDone();
      router.refresh();
    });
  };

  return (
    <div className="mt-3 flex flex-wrap items-end gap-2 rounded-md border border-teal-200 bg-teal-50 p-3">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-ink-500">Amount (remaining {money(remaining)})</label>
        <input type="number" min="0" step="0.01" value={form.amount} onChange={set("amount")} className={`${inputClasses} w-32`} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-ink-500">Date</label>
        <input type="date" value={form.paidDate} onChange={set("paidDate")} className={inputClasses} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-ink-500">Method</label>
        <input value={form.paymentMethod} onChange={set("paymentMethod")} placeholder="UPI, bank transfer…" className={inputClasses} />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-ink-500">Note</label>
        <input value={form.note} onChange={set("note")} className={inputClasses} />
      </div>
      <button
        onClick={submit}
        disabled={isPending || !form.amount}
        className="rounded-md bg-ink-900 px-3 py-1.5 text-xs font-medium text-cream-50 disabled:opacity-40"
      >
        Record payment
      </button>
      <button onClick={onDone} className="rounded-md border border-ink-300 px-3 py-1.5 text-xs font-medium hover:bg-cream-200">
        Cancel
      </button>
    </div>
  );
}

export default function InvoicesPanel({ client }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [payingId, setPayingId] = useState(null);
  const [form, setForm] = useState({ projectId: "", type: "advance", totalAmount: "", dueDate: "", driveLink: "" });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = () => {
    if (!form.totalAmount) return;
    startTransition(async () => {
      await createInvoice(client.id, form);
      setForm({ projectId: "", type: "advance", totalAmount: "", dueDate: "", driveLink: "" });
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
          New invoice
        </button>
      ) : (
        <div className="rounded-lg border border-ink-200 bg-cream-50 p-4">
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-ink-500">Type</label>
              <select value={form.type} onChange={set("type")} className={inputClasses}>
                {INVOICE_TYPES.map((t) => (
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
              <label className="text-xs text-ink-500">Total amount</label>
              <input type="number" min="0" step="0.01" value={form.totalAmount} onChange={set("totalAmount")} className={inputClasses} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-ink-500">Due date</label>
              <input type="date" value={form.dueDate} onChange={set("dueDate")} className={inputClasses} />
            </div>
            <div className="flex flex-1 flex-col gap-1" style={{ minWidth: "16rem" }}>
              <label className="text-xs text-ink-500">Drive link (optional)</label>
              <input value={form.driveLink} onChange={set("driveLink")} placeholder="Invoice PDF link…" className={inputClasses} />
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={submit}
              disabled={isPending || !form.totalAmount}
              className="rounded-md bg-ink-900 px-3 py-1.5 text-xs font-medium text-cream-50 disabled:opacity-40"
            >
              Save invoice
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
        {client.invoices.length === 0 && <p className="text-sm text-ink-500">No invoices yet.</p>}
        {client.invoices.map((inv) => (
          <div key={inv.id} className="rounded-lg border border-ink-200 bg-cream-50 p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-ink-900">
                  {inv.invoice_number} · {INVOICE_TYPE_LABELS[inv.type] ?? inv.type}
                </p>
                <p className="text-xs text-ink-500">
                  {money(inv.amount_paid)} of {money(inv.total_amount)} paid
                  {inv.due_date ? ` · due ${new Date(inv.due_date).toLocaleDateString()}` : ""}
                </p>
              </div>
              <StatusBadge status={inv.status} labels={INVOICE_STATUS_LABELS} styles={INVOICE_STATUS_STYLES} />
            </div>

            {inv.invoice_payments?.length > 0 && (
              <ul className="mt-3 flex flex-col gap-1.5 border-t border-ink-100 pt-3">
                {inv.invoice_payments.map((p) => (
                  <li key={p.id} className="flex items-center justify-between text-xs text-ink-600">
                    <span>
                      {money(p.amount)} · {new Date(p.paid_date).toLocaleDateString()}
                      {p.payment_method ? ` · ${p.payment_method}` : ""}
                    </span>
                    {p.note && <span className="text-ink-400">{p.note}</span>}
                  </li>
                ))}
              </ul>
            )}

            {inv.drive_link && (
              <a href={inv.drive_link} target="_blank" rel="noreferrer noopener" className="mt-2 inline-block text-xs text-teal-700 hover:underline">
                View invoice document
              </a>
            )}

            <div className="mt-3">
              {inv.status === "paid" ? (
                <span className="text-xs font-medium text-teal-700">Fully paid</span>
              ) : payingId === inv.id ? (
                <PaymentForm invoice={inv} clientId={client.id} onDone={() => setPayingId(null)} />
              ) : (
                <button
                  onClick={() => setPayingId(inv.id)}
                  className="rounded-md border border-ink-300 px-3 py-1.5 text-xs font-medium hover:bg-cream-200"
                >
                  Record payment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
