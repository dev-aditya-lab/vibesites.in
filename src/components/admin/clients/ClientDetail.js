"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import OverviewPanel from "@/components/admin/clients/OverviewPanel";
import QuotationsPanel from "@/components/admin/clients/QuotationsPanel";
import ProjectsPanel from "@/components/admin/clients/ProjectsPanel";
import AgreementsPanel from "@/components/admin/clients/AgreementsPanel";
import InvoicesPanel from "@/components/admin/clients/InvoicesPanel";
import MaintenancePanel from "@/components/admin/clients/MaintenancePanel";
import ServiceHistoryPanel from "@/components/admin/clients/ServiceHistoryPanel";
import ClientNotes from "@/components/admin/clients/ClientNotes";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "quotations", label: "Quotations" },
  { key: "projects", label: "Projects" },
  { key: "agreements", label: "Agreements" },
  { key: "invoices", label: "Invoices" },
  { key: "maintenance", label: "Maintenance" },
  { key: "services", label: "Service history" },
  { key: "notes", label: "Notes" },
];

function count(list) {
  return list.length > 0 ? list.length : null;
}

export default function ClientDetail({ client, allServices }) {
  const [tab, setTab] = useState("overview");

  const counts = {
    quotations: count(client.quotations),
    projects: count(client.projects),
    agreements: count(client.agreements),
    invoices: count(client.invoices),
    maintenance: count(client.maintenance),
    services: count(client.serviceHistory),
    notes: count(client.notes),
  };

  return (
    <div className="flex flex-col gap-5">
      <nav className="flex flex-wrap gap-1 border-b border-ink-200">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "rounded-t-md px-3 py-2 text-sm font-medium transition-colors",
              tab === t.key ? "border-b-2 border-teal-600 text-teal-700" : "text-ink-600 hover:text-ink-900"
            )}
          >
            {t.label}
            {counts[t.key] ? <span className="ml-1.5 text-xs text-ink-400">{counts[t.key]}</span> : null}
          </button>
        ))}
      </nav>

      {tab === "overview" && <OverviewPanel client={client} />}
      {tab === "quotations" && <QuotationsPanel client={client} allServices={allServices} />}
      {tab === "projects" && <ProjectsPanel client={client} allServices={allServices} />}
      {tab === "agreements" && <AgreementsPanel client={client} />}
      {tab === "invoices" && <InvoicesPanel client={client} />}
      {tab === "maintenance" && <MaintenancePanel client={client} />}
      {tab === "services" && <ServiceHistoryPanel client={client} />}
      {tab === "notes" && <ClientNotes client={client} />}
    </div>
  );
}
