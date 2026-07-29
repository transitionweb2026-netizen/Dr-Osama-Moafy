import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { adminNavItems } from "@/components/admin/nav-items";

export const metadata = { title: "Dashboard" };

async function getStats() {
  const supabase = await createClient();
  const [services, articles, videos, media] = await Promise.all([
    supabase.from("services").select("id", { count: "exact", head: true }),
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase.from("videos").select("id", { count: "exact", head: true }),
    supabase.from("media").select("id", { count: "exact", head: true }),
  ]);

  return {
    ready: !services.error,
    services: services.count ?? 0,
    articles: articles.count ?? 0,
    videos: videos.count ?? 0,
    media: media.count ?? 0,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-admin-text">Dashboard</h1>
      <p className="mt-1 text-sm text-admin-muted">Overview of your site content.</p>

      {!stats.ready && (
        <div className="mt-6 rounded-xl border border-admin-warning/40 bg-admin-warning/10 px-4 py-3 text-sm text-admin-text">
          <strong className="font-semibold">Database not set up yet.</strong> Run the migrations
          in <code>supabase/migrations</code> against your Supabase project to enable content
          management.
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Services" value={stats.services} icon="medical_services" />
        <StatCard label="Articles" value={stats.articles} icon="article" />
        <StatCard label="Videos" value={stats.videos} icon="smart_display" />
        <StatCard label="Media items" value={stats.media} icon="perm_media" />
      </div>

      <h2 className="mt-10 text-lg font-semibold text-admin-text">Manage content</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {adminNavItems
          .filter((item) => item.href !== "/admin")
          .map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl border border-admin-border bg-admin-surface px-4 py-3.5 transition-colors hover:border-admin-accent"
            >
              <span className="material-symbols-outlined flex h-9 w-9 items-center justify-center rounded-lg bg-admin-surface-alt text-admin-accent">
                {item.icon}
              </span>
              <span className="text-sm font-medium text-admin-text">{item.label}</span>
            </Link>
          ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="rounded-xl border border-admin-border bg-admin-surface p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-admin-muted">{label}</span>
        <span className="material-symbols-outlined text-admin-accent">{icon}</span>
      </div>
      <p className="mt-2 text-2xl font-semibold text-admin-text">{value}</p>
    </div>
  );
}
