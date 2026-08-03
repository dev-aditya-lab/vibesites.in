"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/admin/nav";

export default function AdminSidebar({ isSuperAdmin }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const items = isSuperAdmin ? [...navItems, { href: "/admin/admins", label: "Admins" }] : navItems;

  return (
    <nav className="flex flex-col gap-1 p-3">
      {items.map((item) => {
        const [itemPath, itemQuery] = item.href.split("?");
        const active = itemQuery
          ? pathname === itemPath && new URLSearchParams(itemQuery).get("product") === searchParams.get("product")
          : item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href) && !searchParams.get("product");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active ? "bg-teal-600 text-cream-50" : "text-ink-700 hover:bg-cream-200"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
