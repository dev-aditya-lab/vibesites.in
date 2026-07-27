import { queryClients } from "@/lib/admin/clients-query";
import ClientsFilterBar from "@/components/admin/clients/ClientsFilterBar";
import ClientsTable from "@/components/admin/clients/ClientsTable";
import AddClientForm from "@/components/admin/clients/AddClientForm";

export const metadata = { title: "Clients" };

export default async function AdminClientsPage({ searchParams }) {
  const params = await searchParams;
  const current = {
    q: params?.q || "",
    source: params?.source || "",
    overdue: params?.overdue === "1",
    maintenanceDueSoon: params?.maintenanceDueSoon === "1",
    revisionsExceeded: params?.revisionsExceeded === "1",
  };
  const page = Number(params?.page) || 1;

  const { clients, total, pageSize } = await queryClients({ page, ...current });

  const queryString = new URLSearchParams(
    Object.entries(current)
      .filter(([, v]) => v)
      .map(([k, v]) => [k, v === true ? "1" : v])
  ).toString();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-ink-950">Clients</h1>
          <p className="mt-1 text-sm text-ink-600">
            Quotations, projects, agreements, payments, and maintenance — all in one place.
          </p>
        </div>
      </div>

      <AddClientForm />

      <ClientsFilterBar current={current} />

      <ClientsTable clients={clients} total={total} page={page} pageSize={pageSize} queryString={queryString} />
    </div>
  );
}
