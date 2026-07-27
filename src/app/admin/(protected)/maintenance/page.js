import { queryMaintenanceSubscriptions } from "@/lib/admin/maintenance-query";
import MaintenanceTable from "@/components/admin/maintenance/MaintenanceTable";

export const metadata = { title: "Maintenance" };

export default async function AdminMaintenancePage() {
  const subscriptions = await queryMaintenanceSubscriptions({ status: "active" });
  const today = new Date().toISOString().slice(0, 10);
  const overdueCount = subscriptions.filter((m) => m.next_due_date < today).length;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl text-ink-950">Maintenance</h1>
        <p className="mt-1 text-sm text-ink-600">Active monthly maintenance subscriptions, sorted by next due date.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-ink-200 bg-cream-50 p-4">
          <p className="text-xs uppercase tracking-wide text-ink-500">Active subscriptions</p>
          <p className="mt-1 text-xl font-semibold text-ink-950">{subscriptions.length}</p>
        </div>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-xs uppercase tracking-wide text-red-700">Overdue</p>
          <p className="mt-1 text-xl font-semibold text-red-800">{overdueCount}</p>
        </div>
      </div>

      <MaintenanceTable subscriptions={subscriptions} />
    </div>
  );
}
