-- ============================================================================
-- certificates: independent per-page placement (home/about), matching
-- specialties' existing pattern.
-- services / treatments / videos: slugs for real routed detail pages.
-- ============================================================================

alter table certificates add column placement text not null default 'home';
create index certificates_placement_idx on certificates(placement);

alter table services add column slug text;
alter table treatments add column slug text;
alter table videos add column slug text;

update services set slug = 'service-' || id::text where slug is null;
update treatments set slug = 'treatment-' || id::text where slug is null;
update videos set slug = 'video-' || id::text where slug is null;

alter table services alter column slug set not null;
alter table treatments alter column slug set not null;
alter table videos alter column slug set not null;
alter table services add constraint services_slug_unique unique (slug);
alter table treatments add constraint treatments_slug_unique unique (slug);
alter table videos add constraint videos_slug_unique unique (slug);
create index services_slug_idx on services(slug);
create index treatments_slug_idx on treatments(slug);
create index videos_slug_idx on videos(slug);
