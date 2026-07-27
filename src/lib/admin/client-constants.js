export const QUOTATION_STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
  { value: "expired", label: "Expired" },
];
export const QUOTATION_STATUS_LABELS = Object.fromEntries(QUOTATION_STATUSES.map((s) => [s.value, s.label]));
export const QUOTATION_STATUS_STYLES = {
  draft: "bg-ink-100 text-ink-600 border-ink-200",
  sent: "bg-teal-50 text-teal-700 border-teal-200",
  accepted: "bg-teal-100 text-teal-800 border-teal-300",
  rejected: "bg-red-50 text-red-700 border-red-200",
  expired: "bg-ink-100 text-ink-500 border-ink-200",
};

export const PROJECT_STATUSES = [
  { value: "in_progress", label: "In progress" },
  { value: "delivered", label: "Delivered" },
  { value: "in_maintenance", label: "In maintenance" },
  { value: "on_hold", label: "On hold" },
  { value: "closed", label: "Closed" },
];
export const PROJECT_STATUS_LABELS = Object.fromEntries(PROJECT_STATUSES.map((s) => [s.value, s.label]));
export const PROJECT_STATUS_STYLES = {
  in_progress: "bg-gold-100 text-gold-800 border-gold-300",
  delivered: "bg-teal-100 text-teal-800 border-teal-300",
  in_maintenance: "bg-teal-50 text-teal-700 border-teal-200",
  on_hold: "bg-gold-50 text-gold-700 border-gold-200",
  closed: "bg-ink-100 text-ink-600 border-ink-200",
};

export const AGREEMENT_TYPES = [
  { value: "initial", label: "Initial" },
  { value: "addendum", label: "Addendum" },
  { value: "renewal", label: "Renewal" },
];
export const AGREEMENT_TYPE_LABELS = Object.fromEntries(AGREEMENT_TYPES.map((t) => [t.value, t.label]));
export const AGREEMENT_TYPE_STYLES = {
  initial: "bg-teal-50 text-teal-700 border-teal-200",
  addendum: "bg-gold-50 text-gold-700 border-gold-200",
  renewal: "bg-ink-100 text-ink-700 border-ink-200",
};

export const INVOICE_TYPES = [
  { value: "advance", label: "Advance" },
  { value: "milestone", label: "Milestone" },
  { value: "final", label: "Final" },
  { value: "maintenance", label: "Maintenance" },
  { value: "other", label: "Other" },
];
export const INVOICE_TYPE_LABELS = Object.fromEntries(INVOICE_TYPES.map((t) => [t.value, t.label]));

export const INVOICE_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "partial", label: "Partial" },
  { value: "paid", label: "Paid" },
  { value: "overdue", label: "Overdue" },
];
export const INVOICE_STATUS_LABELS = Object.fromEntries(INVOICE_STATUSES.map((s) => [s.value, s.label]));
export const INVOICE_STATUS_STYLES = {
  pending: "bg-ink-100 text-ink-600 border-ink-200",
  partial: "bg-gold-100 text-gold-800 border-gold-300",
  paid: "bg-teal-100 text-teal-800 border-teal-300",
  overdue: "bg-red-50 text-red-700 border-red-200",
};

export const MAINTENANCE_STATUSES = [
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "cancelled", label: "Cancelled" },
];
export const MAINTENANCE_STATUS_LABELS = Object.fromEntries(MAINTENANCE_STATUSES.map((s) => [s.value, s.label]));
export const MAINTENANCE_STATUS_STYLES = {
  active: "bg-teal-100 text-teal-800 border-teal-300",
  paused: "bg-gold-50 text-gold-700 border-gold-200",
  cancelled: "bg-ink-100 text-ink-500 border-ink-200",
};

export const CLIENT_SOURCES = ["Referral", "Website form", "Direct", "Social media", "Other"];
