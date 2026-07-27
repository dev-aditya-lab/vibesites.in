/** Single source of truth for deriving an invoice's status from its amounts/due date. */
export function computeInvoiceStatus({ totalAmount, amountPaid, dueDate }) {
  const total = Number(totalAmount) || 0;
  const paid = Number(amountPaid) || 0;
  if (total > 0 && paid >= total) return "paid";
  const today = new Date().toISOString().slice(0, 10);
  if (dueDate && dueDate < today) return "overdue";
  if (paid > 0) return "partial";
  return "pending";
}
