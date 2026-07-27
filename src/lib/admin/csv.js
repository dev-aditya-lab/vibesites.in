function escapeCsvField(value) {
  const str = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

export function leadsToCsv(leads) {
  const headers = [
    "Form",
    "Name",
    "Email",
    "Phone",
    "WhatsApp",
    "Company",
    "Location",
    "Services",
    "Budget",
    "Status",
    "Source page",
    "Created at",
  ];

  const rows = leads.map((lead) => [
    lead.form_type,
    lead.name,
    lead.email,
    lead.phone,
    lead.whatsapp_number,
    lead.company,
    lead.location_text,
    (lead.lead_services ?? []).map((ls) => ls.service?.name).filter(Boolean).join("; "),
    lead.budget_range,
    lead.status,
    lead.source_page,
    lead.created_at,
  ]);

  return [headers, ...rows].map((row) => row.map(escapeCsvField).join(",")).join("\n");
}

export function downloadCsv(filename, csvContent) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
