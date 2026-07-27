import Link from "next/link";
import { notFound } from "next/navigation";
import { getClientById } from "@/lib/admin/clients-query";
import { getAllServices } from "@/lib/admin/leads-query";
import ClientDetail from "@/components/admin/clients/ClientDetail";

export const metadata = { title: "Client detail" };

export default async function AdminClientDetailPage({ params }) {
  const { id } = await params;
  const [client, allServices] = await Promise.all([getClientById(id), getAllServices()]);
  if (!client) notFound();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Link href="/admin/clients" className="text-sm text-teal-700 hover:underline">
          ← Back to clients
        </Link>
        <h1 className="mt-2 font-display text-2xl text-ink-950">{client.name}</h1>
        <p className="mt-1 text-sm text-ink-500">
          {client.company ? `${client.company} · ` : ""}Client since {new Date(client.created_at).toLocaleDateString()}
        </p>
      </div>

      <ClientDetail client={client} allServices={allServices} />
    </div>
  );
}
