export const LEAD_STATUSES = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "in_progress", label: "In progress" },
  { value: "converted", label: "Converted" },
  { value: "closed", label: "Closed" },
  { value: "not_interested", label: "Not interested" },
];

export const STATUS_LABELS = Object.fromEntries(LEAD_STATUSES.map((s) => [s.value, s.label]));

export const FORM_TYPES = [
  { value: "contact", label: "Contact" },
  { value: "quote", label: "Quote" },
];

export const FORM_TYPE_LABELS = Object.fromEntries(FORM_TYPES.map((f) => [f.value, f.label]));

export const STATUS_STYLES = {
  new: "bg-teal-50 text-teal-700 border-teal-200",
  contacted: "bg-gold-50 text-gold-700 border-gold-200",
  in_progress: "bg-gold-100 text-gold-800 border-gold-300",
  converted: "bg-teal-100 text-teal-800 border-teal-300",
  closed: "bg-ink-100 text-ink-600 border-ink-200",
  not_interested: "bg-ink-100 text-ink-500 border-ink-200",
};
