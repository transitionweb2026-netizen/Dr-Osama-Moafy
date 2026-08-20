import { createClient } from "@/lib/supabase/server";
import { SectionsPageEditor, type SectionRowData } from "@/components/admin/sections/SectionsPageEditor";
import { FaqsManager } from "./FaqsManager";
import { CertificatesManager, type CertificateWithImage } from "./CertificatesManager";
import { SpecialtiesManager, type SpecialtyWithImage } from "./SpecialtiesManager";
import type { FaqRow } from "@/types/database";

export const metadata = { title: "Home" };

export default async function AdminHomePage() {
  const supabase = await createClient();
  const [{ data: sections }, { data: faqs }, { data: certificates }, { data: specialties }] =
    await Promise.all([
      supabase
        .from("sections")
        .select("*")
        .eq("page_slug", "home")
        .order("sort_order", { ascending: true }),
      supabase
        .from("faqs")
        .select("*")
        .eq("page_slug", "home")
        .order("sort_order", { ascending: true }),
      supabase
        .from("certificates")
        .select("*, image:media(id, url, filename)")
        .eq("placement", "home")
        .order("sort_order", { ascending: true }),
      supabase
        .from("specialties")
        .select("*, image:media(id, url, filename)")
        .order("sort_order", { ascending: true }),
    ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-admin-text">Home</h1>
      <p className="mt-1 text-sm text-admin-muted">
        Every controller for the Home page: free-form section text, FAQs, certificates, and
        specialties.
      </p>

      <div className="mt-6 flex flex-col gap-8">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-admin-text">Page sections</h2>
          <p className="mb-3 text-sm text-admin-muted">
            Hero, intro, trust, and call-to-action copy. Add a field for anything not already
            listed.
          </p>
          <SectionsPageEditor pageSlug="home" initialSections={(sections ?? []) as SectionRowData[]} />
        </section>

        <section>
          <FaqsManager items={(faqs ?? []) as FaqRow[]} />
        </section>

        <section>
          <CertificatesManager
            items={(certificates ?? []) as unknown as CertificateWithImage[]}
            defaultPlacement="home"
            scopeLabel="Shown on the Home page. Certificates for the Dr. Osama Moafy page are managed there."
          />
        </section>

        <section id="specialties" className="scroll-mt-6">
          <SpecialtiesManager items={(specialties ?? []) as unknown as SpecialtyWithImage[]} />
        </section>
      </div>
    </div>
  );
}
