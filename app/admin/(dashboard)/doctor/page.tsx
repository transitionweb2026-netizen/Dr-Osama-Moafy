import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SectionsPageEditor, type SectionRowData } from "@/components/admin/sections/SectionsPageEditor";
import { TestimonialsManager } from "./TestimonialsManager";
import { TimelineManager } from "./TimelineManager";
import {
  CertificatesManager,
  type CertificateWithImage,
} from "../home/CertificatesManager";
import type { TestimonialRow, TimelineEventRow } from "@/types/database";

export const metadata = { title: "Dr. Osama Moafy" };

export default async function AdminDoctorPage() {
  const supabase = await createClient();
  const [{ data: sections }, { data: testimonials }, { data: timeline }, { data: certificates }] =
    await Promise.all([
      supabase
        .from("sections")
        .select("*")
        .eq("page_slug", "about")
        .order("sort_order", { ascending: true }),
      supabase.from("testimonials").select("*").order("sort_order", { ascending: true }),
      supabase.from("timeline_events").select("*").order("sort_order", { ascending: true }),
      supabase
        .from("certificates")
        .select("*, image:media(id, url, filename)")
        .eq("placement", "about")
        .order("sort_order", { ascending: true }),
    ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-admin-text">Dr. Osama Moafy</h1>
      <p className="mt-1 text-sm text-admin-muted">
        Bio content, career timeline, certificates, and patient testimonials. Specialty cards shown
        on this page are managed from{" "}
        <Link href="/admin/home#specialties" className="font-medium text-admin-accent hover:underline">
          Home → Specialties
        </Link>
        .
      </p>

      <div className="mt-6 flex flex-col gap-8">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-admin-text">Page sections</h2>
          <p className="mb-3 text-sm text-admin-muted">
            Bio introduction, credentials summary, and video showcase copy.
          </p>
          <SectionsPageEditor
            pageSlug="about"
            initialSections={(sections ?? []) as SectionRowData[]}
          />
        </section>

        <section>
          <TimelineManager items={(timeline ?? []) as TimelineEventRow[]} />
        </section>

        <section>
          <CertificatesManager
            items={(certificates ?? []) as unknown as CertificateWithImage[]}
            defaultPlacement="about"
            scopeLabel="Shown on this page. Certificates for the Home page are managed there."
          />
        </section>

        <section>
          <TestimonialsManager items={(testimonials ?? []) as TestimonialRow[]} />
        </section>
      </div>
    </div>
  );
}
