-- ============================================================================
-- Row Level Security — public reads published content, staff (admin/editor)
-- can manage everything, only admins manage other users.
-- ============================================================================

alter table profiles enable row level security;
alter table media_folders enable row level security;
alter table media enable row level security;
alter table pages enable row level security;
alter table seo_meta enable row level security;
alter table sections enable row level security;
alter table nav_items enable row level security;
alter table social_links enable row level security;
alter table services enable row level security;
alter table treatments enable row level security;
alter table articles enable row level security;
alter table videos enable row level security;
alter table faqs enable row level security;
alter table testimonials enable row level security;
alter table certificates enable row level security;
alter table timeline_events enable row level security;
alter table specialties enable row level security;
alter table settings enable row level security;
alter table content_revisions enable row level security;
alter table audit_logs enable row level security;

-- ---------------------------------------------------------------------------
-- profiles: self read/update own row; admins manage all; role changes are
-- restricted to admins via trigger (RLS alone can't do column-level checks).
-- ---------------------------------------------------------------------------
create policy "profiles_select_self_or_admin" on profiles
  for select using (id = auth.uid() or is_admin());

create policy "profiles_update_self_or_admin" on profiles
  for update using (id = auth.uid() or is_admin());

create policy "profiles_admin_insert" on profiles
  for insert with check (is_admin());

create policy "profiles_admin_delete" on profiles
  for delete using (is_admin());

create function public.guard_profile_role_change()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  if new.role is distinct from old.role and not is_admin() then
    raise exception 'Only admins can change a user role';
  end if;
  return new;
end;
$$;

create trigger guard_profile_role_change
  before update on profiles
  for each row execute procedure public.guard_profile_role_change();

-- ---------------------------------------------------------------------------
-- media / media_folders: public can read, staff can manage
-- ---------------------------------------------------------------------------
create policy "media_public_select" on media for select using (true);
create policy "media_staff_write" on media for all using (is_staff()) with check (is_staff());

create policy "media_folders_public_select" on media_folders for select using (true);
create policy "media_folders_staff_write" on media_folders for all using (is_staff()) with check (is_staff());

-- ---------------------------------------------------------------------------
-- pages: public read, staff write
-- ---------------------------------------------------------------------------
create policy "pages_public_select" on pages for select using (true);
create policy "pages_staff_write" on pages for all using (is_staff()) with check (is_staff());

-- ---------------------------------------------------------------------------
-- seo_meta: public read, staff write
-- ---------------------------------------------------------------------------
create policy "seo_meta_public_select" on seo_meta for select using (true);
create policy "seo_meta_staff_write" on seo_meta for all using (is_staff()) with check (is_staff());

-- ---------------------------------------------------------------------------
-- sections: public reads only published + visible; staff sees/edits all
-- ---------------------------------------------------------------------------
create policy "sections_public_select" on sections
  for select using (status = 'published' and is_visible = true);
create policy "sections_staff_select_all" on sections
  for select using (is_staff());
create policy "sections_staff_write" on sections
  for all using (is_staff()) with check (is_staff());

-- ---------------------------------------------------------------------------
-- nav_items / social_links: public reads visible only, staff manages all
-- ---------------------------------------------------------------------------
create policy "nav_items_public_select" on nav_items for select using (is_visible = true);
create policy "nav_items_staff_select_all" on nav_items for select using (is_staff());
create policy "nav_items_staff_write" on nav_items for all using (is_staff()) with check (is_staff());

create policy "social_links_public_select" on social_links for select using (is_visible = true);
create policy "social_links_staff_select_all" on social_links for select using (is_staff());
create policy "social_links_staff_write" on social_links for all using (is_staff()) with check (is_staff());

-- ---------------------------------------------------------------------------
-- collections gated on status = 'published' (services/treatments/articles/videos)
-- ---------------------------------------------------------------------------
create policy "services_public_select" on services for select using (status = 'published');
create policy "services_staff_select_all" on services for select using (is_staff());
create policy "services_staff_write" on services for all using (is_staff()) with check (is_staff());

create policy "treatments_public_select" on treatments for select using (status = 'published');
create policy "treatments_staff_select_all" on treatments for select using (is_staff());
create policy "treatments_staff_write" on treatments for all using (is_staff()) with check (is_staff());

create policy "articles_public_select" on articles for select using (status = 'published');
create policy "articles_staff_select_all" on articles for select using (is_staff());
create policy "articles_staff_write" on articles for all using (is_staff()) with check (is_staff());

create policy "videos_public_select" on videos for select using (status = 'published');
create policy "videos_staff_select_all" on videos for select using (is_staff());
create policy "videos_staff_write" on videos for all using (is_staff()) with check (is_staff());

-- ---------------------------------------------------------------------------
-- collections gated on is_visible (faqs/testimonials/certificates/timeline/specialties)
-- ---------------------------------------------------------------------------
create policy "faqs_public_select" on faqs for select using (is_visible = true);
create policy "faqs_staff_select_all" on faqs for select using (is_staff());
create policy "faqs_staff_write" on faqs for all using (is_staff()) with check (is_staff());

create policy "testimonials_public_select" on testimonials for select using (is_visible = true);
create policy "testimonials_staff_select_all" on testimonials for select using (is_staff());
create policy "testimonials_staff_write" on testimonials for all using (is_staff()) with check (is_staff());

create policy "certificates_public_select" on certificates for select using (is_visible = true);
create policy "certificates_staff_select_all" on certificates for select using (is_staff());
create policy "certificates_staff_write" on certificates for all using (is_staff()) with check (is_staff());

create policy "timeline_events_public_select" on timeline_events for select using (is_visible = true);
create policy "timeline_events_staff_select_all" on timeline_events for select using (is_staff());
create policy "timeline_events_staff_write" on timeline_events for all using (is_staff()) with check (is_staff());

create policy "specialties_public_select" on specialties for select using (is_visible = true);
create policy "specialties_staff_select_all" on specialties for select using (is_staff());
create policy "specialties_staff_write" on specialties for all using (is_staff()) with check (is_staff());

-- ---------------------------------------------------------------------------
-- settings: public read, staff write
-- ---------------------------------------------------------------------------
create policy "settings_public_select" on settings for select using (true);
create policy "settings_staff_write" on settings for all using (is_staff()) with check (is_staff());

-- ---------------------------------------------------------------------------
-- revisions / audit log: staff can read, admins can read audit log,
-- inserts happen via security-definer server actions only (no public policy)
-- ---------------------------------------------------------------------------
create policy "content_revisions_staff_select" on content_revisions for select using (is_staff());
create policy "content_revisions_staff_insert" on content_revisions for insert with check (is_staff());

create policy "audit_logs_admin_select" on audit_logs for select using (is_admin());
create policy "audit_logs_staff_insert" on audit_logs for insert with check (is_staff());

-- ---------------------------------------------------------------------------
-- storage: public read from the media bucket, staff can upload/manage
-- ---------------------------------------------------------------------------
create policy "media_bucket_public_select" on storage.objects
  for select using (bucket_id = 'media');

create policy "media_bucket_staff_write" on storage.objects
  for insert with check (bucket_id = 'media' and is_staff());

create policy "media_bucket_staff_update" on storage.objects
  for update using (bucket_id = 'media' and is_staff());

create policy "media_bucket_staff_delete" on storage.objects
  for delete using (bucket_id = 'media' and is_staff());
