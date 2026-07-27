import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { signOut } from "@/lib/admin/actions";
import AdminSidebar from "@/components/admin/AdminSidebar";

const mobileNavItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/by-service", label: "By service" },
  { href: "/admin/by-location", label: "By location" },
];

export default async function AdminProtectedLayout({ children }) {
  const admin = await requireAdmin();

  return (
    <div className="flex min-h-dvh">
      <aside className="hidden w-56 shrink-0 border-r border-ink-200 bg-cream-50 sm:flex sm:flex-col">
        <div className="border-b border-ink-200 px-4 py-4">
          <p className="font-display text-lg text-ink-950">Vibesites</p>
          <p className="text-xs text-ink-500">Admin panel</p>
        </div>
        <div className="flex-1">
          <AdminSidebar isSuperAdmin={admin.role === "super_admin"} />
        </div>
        <div className="border-t border-ink-200 p-4">
          <p className="truncate text-xs font-medium text-ink-800">{admin.email}</p>
          <p className="text-xs text-ink-500">{admin.role === "super_admin" ? "Super admin" : "Admin"}</p>
          <form action={signOut}>
            <button type="submit" className="mt-2 text-xs font-medium text-teal-700 hover:underline">
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-col gap-3 border-b border-ink-200 bg-cream-50 px-4 py-3 sm:hidden">
          <div className="flex items-center justify-between">
            <p className="font-display text-lg text-ink-950">Vibesites Admin</p>
            <form action={signOut}>
              <button type="submit" className="text-xs font-medium text-teal-700 hover:underline">
                Sign out
              </button>
            </form>
          </div>
          <nav className="flex gap-1 overflow-x-auto">
            {mobileNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-md px-3 py-1.5 text-xs font-medium text-ink-700 hover:bg-cream-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="flex-1 overflow-x-hidden p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
