import { createClient } from "@/lib/supabase/server";
import type { FooterSettings, SocialLinkRow } from "@/types/database";
import { FooterTextForm } from "./FooterTextForm";
import { SocialLinksManager } from "./SocialLinksManager";

export const metadata = { title: "Footer" };

const DEFAULT_FOOTER: FooterSettings = {
  blurbEn: "",
  blurbAr: "",
  quickLinksLabelEn: "",
  quickLinksLabelAr: "",
  legalLabelEn: "",
  legalLabelAr: "",
  contactLabelEn: "",
  contactLabelAr: "",
  privacyPolicyEn: "",
  privacyPolicyAr: "",
  termsOfServiceEn: "",
  termsOfServiceAr: "",
  copyrightEn: "",
  copyrightAr: "",
};

export default async function AdminFooterPage() {
  const supabase = await createClient();
  const [{ data: settingsRow }, { data: socialLinks }] = await Promise.all([
    supabase.from("settings").select("value").eq("key", "footer").single(),
    supabase.from("social_links").select("*").order("sort_order", { ascending: true }),
  ]);

  const footer = { ...DEFAULT_FOOTER, ...(settingsRow?.value ?? {}) } as FooterSettings;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-admin-text">Footer</h1>
      <p className="mt-1 text-sm text-admin-muted">
        Footer text and social links shown at the bottom of every page.
      </p>

      <div className="mt-6 flex flex-col gap-6">
        <FooterTextForm value={footer} />
        <SocialLinksManager items={(socialLinks ?? []) as SocialLinkRow[]} />
      </div>
    </div>
  );
}
