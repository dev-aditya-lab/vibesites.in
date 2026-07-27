import { requireSuperAdmin } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";
import AddAdminForm from "@/components/admin/AddAdminForm";

export const metadata = { title: "Admins" };

export default async function AdminAdminsPage() {
  await requireSuperAdmin();
  const supabase = await createClient();
  const { data: admins } = await supabase
    .from("profiles")
    .select("id, email, role, last_login_at, created_at")
    .order("created_at", { ascending: true });

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl text-ink-950">Admins</h1>
        <p className="mt-1 text-sm text-ink-600">Manage who has access to this panel.</p>
      </div>

      <div className="rounded-lg border border-ink-200 bg-cream-50 p-5">
        <p className="text-sm font-semibold text-ink-900">Current admins</p>
        <ul className="mt-3 flex flex-col divide-y divide-ink-100">
          {(admins ?? []).map((a) => (
            <li key={a.id} className="flex items-center justify-between py-2.5 text-sm">
              <div>
                <p className="font-medium text-ink-900">{a.email}</p>
                <p className="text-xs text-ink-500">
                  Last login: {a.last_login_at ? new Date(a.last_login_at).toLocaleString() : "Never"}
                </p>
              </div>
              <span className="rounded-full border border-ink-200 px-2.5 py-0.5 text-xs font-medium text-ink-700">
                {a.role === "super_admin" ? "Super admin" : "Admin"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <AddAdminForm />
    </div>
  );
}
