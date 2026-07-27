import Link from "next/link";
import { notFound } from "next/navigation";
import { getLeadById, getAllServices } from "@/lib/admin/leads-query";
import LeadDetail from "@/components/admin/LeadDetail";

export const metadata = { title: "Lead detail" };

export default async function AdminLeadDetailPage({ params }) {
  const { id } = await params;
  const [lead, allServices] = await Promise.all([getLeadById(id), getAllServices()]);
  if (!lead) notFound();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Link href="/admin/leads" className="text-sm text-teal-700 hover:underline">
          ← Back to leads
        </Link>
        <h1 className="mt-2 font-display text-2xl text-ink-950">{lead.name}</h1>
        <p className="mt-1 text-sm text-ink-500">
          Submitted {new Date(lead.created_at).toLocaleString()}
        </p>
      </div>

      <LeadDetail lead={lead} allServices={allServices} />
    </div>
  );
}
