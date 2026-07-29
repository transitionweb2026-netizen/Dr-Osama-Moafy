"use client";

import { useState } from "react";
import Link from "next/link";
import { logout } from "@/app/admin/actions";
import type { Profile } from "@/types/database";
import { SidebarNav } from "./SidebarNav";
import { ThemeToggle } from "./ThemeToggle";

export function AdminShell({
  profile,
  children,
}: {
  profile: Profile;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-admin-bg text-admin-text">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-e border-admin-border bg-admin-surface lg:flex">
        <SidebarBrand />
        <SidebarNav />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <aside className="relative flex h-full w-64 flex-col border-e border-admin-border bg-admin-surface">
            <SidebarBrand />
            <SidebarNav onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-admin-border bg-admin-surface px-4 lg:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-admin-muted hover:bg-admin-surface-alt hover:text-admin-text lg:hidden"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          <div className="flex flex-1 items-center justify-end gap-3">
            <ThemeToggle />

            <div className="hidden flex-col items-end text-right sm:flex">
              <span className="text-sm font-medium text-admin-text">
                {profile.display_name || profile.email}
              </span>
              <span className="text-xs capitalize text-admin-muted">{profile.role}</span>
            </div>

            <form action={logout}>
              <button
                type="submit"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-admin-border text-admin-muted transition-colors hover:bg-admin-surface-alt hover:text-admin-danger"
                aria-label="Sign out"
                title="Sign out"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

function SidebarBrand() {
  return (
    <Link
      href="/admin"
      className="flex h-16 shrink-0 items-center gap-2.5 border-b border-admin-border px-5"
    >
      <span className="material-symbols-outlined flex h-8 w-8 items-center justify-center rounded-lg bg-admin-accent text-[18px] text-admin-accent-contrast">
        shield_person
      </span>
      <span className="text-sm font-semibold leading-tight text-admin-text">
        NeuroPrecision
        <br />
        <span className="font-normal text-admin-muted">Admin</span>
      </span>
    </Link>
  );
}
