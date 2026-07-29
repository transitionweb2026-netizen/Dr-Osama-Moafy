import { createClient } from "@/lib/supabase/server";
import { SectionsPageEditor, type SectionRowData } from "@/components/admin/sections/SectionsPageEditor";

export const metadata = { title: "Contact" };

export default async function AdminContactPage() {
  const supabase = await createClient();
  const { data: sections } = await supabase
    .from("sections")
    .select("*")
    .eq("page_slug", "contact")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-admin-text">Contact</h1>
      <p className="mt-1 text-sm text-admin-muted">
        Free-form copy on the Contact page. Phone, WhatsApp, email, address, and hours live in{" "}
        <span className="font-medium text-admin-text">Global Settings → Contact information</span>
        , since they&rsquo;re shared across the navbar, footer, and every page&rsquo;s contact
        widgets.
      </p>

      <div className="mt-6">
        <SectionsPageEditor
          pageSlug="contact"
          initialSections={(sections ?? []) as SectionRowData[]}
        />
      </div>
    </div>
  );
}
