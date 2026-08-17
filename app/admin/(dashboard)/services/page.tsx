import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SectionsPageEditor, type SectionRowData } from "@/components/admin/sections/SectionsPageEditor";
import { ServicesListClient } from "./ServicesListClient";
import type { ServiceWithImage } from "./ServiceForm";
import { TreatmentsListClient } from "./treatments/TreatmentsListClient";
import type { TreatmentWithImage } from "./treatments/TreatmentForm";

export const metadata = { title: "Services" };

export default async function AdminServicesPage() {
  const supabase = await createClient();
  const [{ data: services }, { data: treatments }, { data: sections }] = await Promise.all([
    supabase
      .from("services")
      .select("*, image:media(id, url, filename)")
      .order("sort_order", { ascending: true }),
    supabase
      .from("treatments")
      .select("*, image:media(id, url, filename)")
      .order("sort_order", { ascending: true }),
    supabase
      .from("sections")
      .select("*")
      .eq("page_slug", "services")
      .order("sort_order", { ascending: true }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-admin-text">Services</h1>
      <p className="mt-1 text-sm text-admin-muted">
        Every controller for the Services page: the care grid, the treatments carousel, and
        free-form section text.
      </p>
      <p className="mt-1 text-sm text-admin-muted">
        Looking for the &ldquo;Specialized Expertise&rdquo; cards grid (the 9 icon cards)? Those
        are managed in{" "}
        <Link href="/admin/home#specialties" className="font-medium text-admin-accent hover:underline">
          Home &rarr; Specialties
        </Link>
        {" "}— set an item&apos;s placement to &ldquo;Services&rdquo; to control whether it shows up here.
      </p>

      <div className="mt-6 flex flex-col gap-8">
        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-admin-text">
                Comprehensive Neural Care grid
              </h2>
              <p className="text-sm text-admin-muted">Drag to reorder.</p>
            </div>
            <Link
              href="/admin/services/new"
              className="flex items-center gap-2 rounded-lg bg-admin-accent px-4 py-2.5 text-sm font-semibold text-admin-accent-contrast hover:opacity-90"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              New service
            </Link>
          </div>
          <ServicesListClient services={(services ?? []) as unknown as ServiceWithImage[]} />
        </section>

        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-admin-text">Treatments carousel</h2>
              <p className="text-sm text-admin-muted">
                Each item can open a detail popup with symptoms, diagnosis, treatment, and
                recovery information.
              </p>
            </div>
            <Link
              href="/admin/services/treatments/new"
              className="flex items-center gap-2 rounded-lg border border-admin-border px-4 py-2.5 text-sm font-medium text-admin-text hover:bg-admin-surface-alt"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              New treatment
            </Link>
          </div>
          <TreatmentsListClient treatments={(treatments ?? []) as unknown as TreatmentWithImage[]} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-admin-text">Page sections</h2>
          <p className="mb-3 text-sm text-admin-muted">
            Why Choose Us, Patient Journey, and other free-form copy on the Services page.
          </p>
          <SectionsPageEditor
            pageSlug="services"
            initialSections={(sections ?? []) as SectionRowData[]}
          />
        </section>
      </div>
    </div>
  );
}
