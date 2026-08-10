-- ============================================================================
-- Osama Mowafy Neurosurgery CMS — Phase 1 schema
-- Content, media, SEO, settings, collections, auth roles, revisions, audit log.
-- ============================================================================

create extension if not exists pgcrypto;

-- ============================================================================
-- ENUMS
-- ============================================================================
create type user_role as enum ('admin', 'editor');
create type content_status as enum ('draft', 'published');

-- ============================================================================
-- PROFILES — extends auth.users with role + display info
-- ============================================================================
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  role user_role not null default 'editor',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-create a profile row whenever a new auth user signs up.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Helper predicates used throughout RLS policies below.
create function public.current_role()
returns user_role
language sql stable security definer set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create function public.is_staff()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid());
$$;

create function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- ============================================================================
-- MEDIA LIBRARY
-- ============================================================================
create table media_folders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  parent_id uuid references media_folders(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table media (
  id uuid primary key default gen_random_uuid(),
  folder_id uuid references media_folders(id) on delete set null,
  filename text not null,
  storage_path text not null unique,
  url text not null,
  mime_type text,
  width int,
  height int,
  size_bytes int,
  alt_text_en text not null default '',
  alt_text_ar text not null default '',
  uploaded_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- PAGES — one row per manageable page, used to key SEO + sections
-- ============================================================================
create table pages (
  slug text primary key,
  label text not null
);

insert into pages (slug, label) values
  ('home', 'Home'),
  ('about', 'Dr. Osama Mowafy'),
  ('services', 'Services'),
  ('videos', 'Videos'),
  ('blog', 'Articles'),
  ('contact', 'Contact');

-- ============================================================================
-- SEO — per page, per locale
-- ============================================================================
create table seo_meta (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null references pages(slug) on delete cascade,
  locale text not null check (locale in ('en', 'ar')),
  title text,
  description text,
  canonical_path text,
  robots text not null default 'index,follow',
  og_title text,
  og_description text,
  og_image_id uuid references media(id) on delete set null,
  twitter_card text not null default 'summary_large_image',
  schema_markup jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references profiles(id) on delete set null,
  unique (page_slug, locale)
);

-- ============================================================================
-- SECTIONS — free-form JSONB content per page/section/locale.
-- Mirrors the shape already used by the site's next-intl message files, so
-- existing content can be migrated in directly with no data reshaping.
-- ============================================================================
create table sections (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null references pages(slug) on delete cascade,
  section_key text not null,
  content_en jsonb not null default '{}',
  content_ar jsonb not null default '{}',
  is_visible boolean not null default true,
  sort_order int not null default 0,
  status content_status not null default 'published',
  updated_at timestamptz not null default now(),
  updated_by uuid references profiles(id) on delete set null,
  unique (page_slug, section_key)
);

-- ============================================================================
-- REPEATABLE COLLECTIONS (full CRUD + drag-reorder via sort_order)
-- ============================================================================
create table nav_items (
  id uuid primary key default gen_random_uuid(),
  label_en text not null,
  label_ar text not null,
  href text not null,
  sort_order int not null default 0,
  is_visible boolean not null default true
);

create table social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  url text not null,
  icon text,
  sort_order int not null default 0,
  is_visible boolean not null default true
);

create table services (
  id uuid primary key default gen_random_uuid(),
  placement text not null default 'home_grid',
  title_en text not null,
  title_ar text not null,
  description_en text,
  description_ar text,
  overview_en text,
  overview_ar text,
  key_points_en jsonb not null default '[]',
  key_points_ar jsonb not null default '[]',
  image_id uuid references media(id) on delete set null,
  icon text,
  sort_order int not null default 0,
  status content_status not null default 'published',
  updated_at timestamptz not null default now()
);

create table treatments (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_ar text not null,
  description_en text,
  description_ar text,
  overview_en text,
  overview_ar text,
  symptoms_en jsonb not null default '[]',
  symptoms_ar jsonb not null default '[]',
  diagnosis_en text,
  diagnosis_ar text,
  treatment_en text,
  treatment_ar text,
  recovery_en text,
  recovery_ar text,
  faq_en text,
  faq_ar text,
  image_id uuid references media(id) on delete set null,
  has_detail boolean not null default false,
  sort_order int not null default 0,
  status content_status not null default 'published',
  updated_at timestamptz not null default now()
);

create table articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_en text not null,
  title_ar text not null,
  excerpt_en text,
  excerpt_ar text,
  body_en text,
  body_ar text,
  category_en text,
  category_ar text,
  read_time_en text,
  read_time_ar text,
  cover_image_id uuid references media(id) on delete set null,
  is_featured boolean not null default false,
  sort_order int not null default 0,
  status content_status not null default 'published',
  published_at timestamptz,
  updated_at timestamptz not null default now()
);

create table videos (
  id uuid primary key default gen_random_uuid(),
  placement text not null default 'insights',
  title_en text not null,
  title_ar text not null,
  description_en text,
  description_ar text,
  duration text,
  category_en text,
  category_ar text,
  thumbnail_id uuid references media(id) on delete set null,
  video_url text,
  sort_order int not null default 0,
  status content_status not null default 'published',
  updated_at timestamptz not null default now()
);

create table faqs (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null default 'home',
  question_en text not null,
  question_ar text not null,
  answer_en text not null,
  answer_ar text not null,
  sort_order int not null default 0,
  is_visible boolean not null default true
);

create table testimonials (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_ar text not null,
  quote_en text not null,
  quote_ar text not null,
  initials text,
  rating int not null default 5,
  sort_order int not null default 0,
  is_visible boolean not null default true
);

create table certificates (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_ar text not null,
  subtitle_en text,
  subtitle_ar text,
  meta_en text,
  meta_ar text,
  image_id uuid references media(id) on delete set null,
  sort_order int not null default 0,
  is_visible boolean not null default true
);

create table timeline_events (
  id uuid primary key default gen_random_uuid(),
  period text not null,
  title_en text not null,
  title_ar text not null,
  description_en text,
  description_ar text,
  sort_order int not null default 0,
  is_visible boolean not null default true
);

create table specialties (
  id uuid primary key default gen_random_uuid(),
  placement text not null default 'home',
  title_en text not null,
  title_ar text not null,
  description_en text,
  description_ar text,
  image_id uuid references media(id) on delete set null,
  icon text,
  sort_order int not null default 0,
  is_visible boolean not null default true
);

-- ============================================================================
-- GLOBAL SETTINGS — key/value JSONB, one row per settings group
-- ============================================================================
create table settings (
  key text primary key,
  value jsonb not null default '{}',
  updated_at timestamptz not null default now(),
  updated_by uuid references profiles(id) on delete set null
);

insert into settings (key, value) values
  ('branding', '{"siteNameEn":"Osama Mowafy Neurosurgery","siteNameAr":"د. أسامة موافي لجراحات المخ والأعصاب","doctorName":"Dr. Osama Mowafy","tagline":"Precision Beyond Perception","logoUrl":null,"faviconUrl":null,"ogImageUrl":null}'),
  ('contact', '{"phone":"+20 2 1234 5678","whatsapp":"+20 100 234 5678","whatsappNumber":"201002345678","email":"care@osamamowafy.com","addressLine":"Medical District East, Tower B, 4th Floor, Suite 402, New Cairo, Egypt","hours":"Sat - Wed: 10:00 AM - 08:00 PM","mapsEmbedUrl":null}'),
  ('integrations', '{"gaId":null,"gtmId":null,"metaPixelId":null}'),
  ('cookieBanner', '{"enabled":false,"textEn":"","textAr":""}'),
  ('footer', '{"blurbEn":"Dr. Osama Mowafy is dedicated to advancing the field of neurosurgery with technical precision and compassionate, patient-centered care.","blurbAr":"يكرّس الدكتور أسامة موافي خبرته لتطوير جراحة المخ والأعصاب من خلال الدقة التقنية العالية والرعاية الإنسانية التي تضع المريض في المقام الأول.","quickLinksLabelEn":"Quick Links","quickLinksLabelAr":"روابط سريعة","legalLabelEn":"Legal","legalLabelAr":"الشؤون القانونية","contactLabelEn":"Contact","contactLabelAr":"التواصل","privacyPolicyEn":"Privacy Policy","privacyPolicyAr":"سياسة الخصوصية","termsOfServiceEn":"Terms of Service","termsOfServiceAr":"الشروط والأحكام","copyrightEn":"©️ {year} Osama Mowafy Neurosurgery. All rights reserved.","copyrightAr":"©️ {year} أسامة موافي لجراحات المخ والأعصاب. جميع الحقوق محفوظة."}')
on conflict (key) do nothing;

-- ============================================================================
-- REVISIONS + AUDIT LOG
-- ============================================================================
create table content_revisions (
  id uuid primary key default gen_random_uuid(),
  table_name text not null,
  row_id uuid not null,
  snapshot jsonb not null,
  action text not null,
  changed_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  action text not null,
  table_name text,
  row_id uuid,
  diff jsonb,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- STORAGE — public media bucket
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;
