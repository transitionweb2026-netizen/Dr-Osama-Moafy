import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { NavItemRow } from "@/types/database";
import { NavItemsListClient } from "./NavItemsListClient";

export const metadata = { title: "Navbar" };

export default async function AdminNavbarPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("nav_items")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-admin-text">Navbar</h1>
          <p className="mt-1 text-sm text-admin-muted">
            Links shown in the site header, in order. Drag to reorder.
          </p>
        </div>
        <Link
          href="/admin/navbar/new"
          className="flex items-center gap-2 rounded-lg bg-admin-accent px-4 py-2.5 text-sm font-semibold text-admin-accent-contrast hover:opacity-90"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New item
        </Link>
      </div>

      <div className="mt-6">
        <NavItemsListClient items={(data ?? []) as NavItemRow[]} />
      </div>
    </div>
  );
}
