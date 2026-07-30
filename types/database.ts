// Hand-written to match supabase/migrations/00000000000001_cms_schema.sql.
// Regenerate with `supabase gen types typescript` once the Supabase CLI/MCP
// has access to the live project, then this file can be replaced wholesale.

export type UserRole = "admin" | "editor";
export type ContentStatus = "draft" | "published";

export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface MediaFolder {
  id: string;
  name: string;
  parent_id: string | null;
  created_at: string;
}

export interface Media {
  id: string;
  folder_id: string | null;
  filename: string;
  storage_path: string;
  url: string;
  mime_type: string | null;
  width: number | null;
  height: number | null;
  size_bytes: number | null;
  alt_text_en: string;
  alt_text_ar: string;
  uploaded_by: string | null;
  created_at: string;
}

export interface Page {
  slug: string;
  label: string;
}

export interface SeoMeta {
  id: string;
  page_slug: string;
  locale: "en" | "ar";
  title: string | null;
  description: string | null;
  canonical_path: string | null;
  robots: string;
  og_title: string | null;
  og_description: string | null;
  og_image_id: string | null;
  twitter_card: string;
  schema_markup: Record<string, unknown> | null;
  updated_at: string;
  updated_by: string | null;
}

export interface Section {
  id: string;
  page_slug: string;
  section_key: string;
  content_en: Record<string, unknown>;
  content_ar: Record<string, unknown>;
  is_visible: boolean;
  sort_order: number;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

export interface NavItemRow {
  id: string;
  label_en: string;
  label_ar: string;
  href: string;
  sort_order: number;
  is_visible: boolean;
}

export interface SocialLinkRow {
  id: string;
  platform: string;
  url: string;
  icon: string | null;
  sort_order: number;
  is_visible: boolean;
}

export interface ServiceRow {
  id: string;
  slug: string;
  placement: string;
  title_en: string;
  title_ar: string;
  description_en: string | null;
  description_ar: string | null;
  overview_en: string | null;
  overview_ar: string | null;
  key_points_en: string[];
  key_points_ar: string[];
  image_id: string | null;
  icon: string | null;
  sort_order: number;
  status: ContentStatus;
  updated_at: string;
}

export interface TreatmentRow {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  description_en: string | null;
  description_ar: string | null;
  overview_en: string | null;
  overview_ar: string | null;
  symptoms_en: string[];
  symptoms_ar: string[];
  diagnosis_en: string | null;
  diagnosis_ar: string | null;
  treatment_en: string | null;
  treatment_ar: string | null;
  recovery_en: string | null;
  recovery_ar: string | null;
  faq_en: string | null;
  faq_ar: string | null;
  image_id: string | null;
  has_detail: boolean;
  sort_order: number;
  status: ContentStatus;
  updated_at: string;
}

export interface ArticleRow {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  excerpt_en: string | null;
  excerpt_ar: string | null;
  body_en: string | null;
  body_ar: string | null;
  category_en: string | null;
  category_ar: string | null;
  read_time_en: string | null;
  read_time_ar: string | null;
  cover_image_id: string | null;
  is_featured: boolean;
  sort_order: number;
  status: ContentStatus;
  published_at: string | null;
  updated_at: string;
}

export interface VideoRow {
  id: string;
  slug: string;
  placement: string;
  title_en: string;
  title_ar: string;
  description_en: string | null;
  description_ar: string | null;
  duration: string | null;
  category_en: string | null;
  category_ar: string | null;
  thumbnail_id: string | null;
  video_url: string | null;
  sort_order: number;
  status: ContentStatus;
  updated_at: string;
}

export interface FaqRow {
  id: string;
  page_slug: string;
  question_en: string;
  question_ar: string;
  answer_en: string;
  answer_ar: string;
  sort_order: number;
  is_visible: boolean;
}

export interface TestimonialRow {
  id: string;
  name_en: string;
  name_ar: string;
  quote_en: string;
  quote_ar: string;
  initials: string | null;
  rating: number;
  sort_order: number;
  is_visible: boolean;
}

export interface CertificateRow {
  id: string;
  title_en: string;
  title_ar: string;
  subtitle_en: string | null;
  subtitle_ar: string | null;
  meta_en: string | null;
  meta_ar: string | null;
  image_id: string | null;
  sort_order: number;
  is_visible: boolean;
  placement: string;
}

export interface TimelineEventRow {
  id: string;
  period: string;
  title_en: string;
  title_ar: string;
  description_en: string | null;
  description_ar: string | null;
  sort_order: number;
  is_visible: boolean;
}

export interface SpecialtyRow {
  id: string;
  placement: string;
  title_en: string;
  title_ar: string;
  description_en: string | null;
  description_ar: string | null;
  image_id: string | null;
  icon: string | null;
  sort_order: number;
  is_visible: boolean;
}

export interface BrandingSettings {
  siteName: string;
  doctorName: string;
  tagline: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  ogImageUrl: string | null;
}

export interface ContactSettings {
  phone: string;
  whatsapp: string;
  whatsappNumber: string;
  email: string;
  addressLine: string;
  hours: string;
  mapsEmbedUrl: string | null;
}

export interface IntegrationSettings {
  gaId: string | null;
  gtmId: string | null;
  metaPixelId: string | null;
}

export interface CookieBannerSettings {
  enabled: boolean;
  textEn: string;
  textAr: string;
}

export interface FooterSettings {
  blurbEn: string;
  blurbAr: string;
  quickLinksLabelEn: string;
  quickLinksLabelAr: string;
  legalLabelEn: string;
  legalLabelAr: string;
  contactLabelEn: string;
  contactLabelAr: string;
  privacyPolicyEn: string;
  privacyPolicyAr: string;
  termsOfServiceEn: string;
  termsOfServiceAr: string;
  copyrightEn: string;
  copyrightAr: string;
}

export interface SettingsMap {
  branding: BrandingSettings;
  contact: ContactSettings;
  integrations: IntegrationSettings;
  cookieBanner: CookieBannerSettings;
  footer: FooterSettings;
}

export interface SettingsRow<K extends keyof SettingsMap = keyof SettingsMap> {
  key: K;
  value: SettingsMap[K];
  updated_at: string;
  updated_by: string | null;
}

export interface ContentRevision {
  id: string;
  table_name: string;
  row_id: string;
  snapshot: Record<string, unknown>;
  action: string;
  changed_by: string | null;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  table_name: string | null;
  row_id: string | null;
  diff: Record<string, unknown> | null;
  created_at: string;
}
