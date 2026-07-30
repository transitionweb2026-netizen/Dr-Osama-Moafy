// Populates every CMS table from the current site's real content:
// messages/en.json + messages/ar.json (read directly, not retyped, so all
// text is byte-identical to the live site) plus the media/icon lookups built
// in earlier migration steps. Run with: npm run migrate:content
//
// Cannot import lib/supabase/admin.ts here — "server-only" throws
// unconditionally outside Next's bundler. Service-role client built directly.

import { createClient } from "@supabase/supabase-js";
import * as fs from "node:fs";
import * as path from "node:path";
import en from "../messages/en.json";
import ar from "../messages/ar.json";
import { mediaManifest } from "./data/media-manifest";
import {
  aboutSpecialtyIcons,
  servicesSpecialtyIcons,
  homeSpecialtyIcons,
  patientJourneyIcons,
  whyChooseUsIcons,
  whyWatchIcons,
  treatmentDetailedIndexes,
  socialLinkIcons,
} from "./data/component-arrays";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set (.env.local)");
}
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const FORCE = process.argv.includes("--force");

// ---------------------------------------------------------------------------
// Media lookup: manifest slug -> Storage public URL (built from media-map.json
// written by migrate-media.ts, cross-checked against the live `media` table).
// ---------------------------------------------------------------------------
const mediaMapPath = path.join(__dirname, "data", "media-map.json");
const urlToId: Record<string, string> = JSON.parse(fs.readFileSync(mediaMapPath, "utf8"));
const slugToUrl: Record<string, string> = {};
const slugToId: Record<string, string> = {};
for (const entry of mediaManifest) {
  const id = urlToId[entry.url];
  if (!id) throw new Error(`No media id for slug "${entry.slug}" — run migrate:media first.`);
  slugToId[entry.slug] = id;
}

function mediaId(slug: string): string {
  const id = slugToId[slug];
  if (!id) throw new Error(`Unknown media slug: ${slug}`);
  return id;
}

async function loadMediaUrls() {
  const { data, error } = await supabase.from("media").select("id, url");
  if (error) throw new Error(`Failed to load media urls: ${error.message}`);
  const idToUrl: Record<string, string> = {};
  for (const row of data ?? []) idToUrl[row.id] = row.url;
  for (const slug of Object.keys(slugToId)) {
    slugToUrl[slug] = idToUrl[slugToId[slug]];
  }
}

function mediaUrl(slug: string): string {
  const url = slugToUrl[slug];
  if (!url) throw new Error(`Unknown media slug (url): ${slug}`);
  return url;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------------------------------------------------------------------------
// Image-slug positional mappings — verified against each component's source
// array during research; documented per source file for auditability.
// ---------------------------------------------------------------------------
const HOME_SPECIALTY_IMAGE_SLUGS = [
  "video-robotic-precision",
  "video-patient-recovery",
  "home-specialty-functional-restoration",
]; // sections/home/Specialties.tsx images[0..2]

const ABOUT_SPECIALTY_IMAGE_SLUGS = [
  "specialty-minimally-invasive-spine",
  "specialty-neuro-oncology",
  "specialty-functional-neurosurgery",
]; // sections/about/SpecialtiesCarousel.tsx cards[0..2].image (cards[3..8].image are null)

const SERVICES_GRID_IMAGE_SLUGS = [
  "service-brain-tumor-treatment",
  "service-spine-surgery",
  "service-herniated-disc",
  "service-endoscopic-surgery",
  "service-peripheral-nerve-surgery",
  "specialty-neuro-oncology",
  "service-skull-base-surgery",
  "service-hydrocephalus",
  "specialty-functional-neurosurgery",
  "specialty-minimally-invasive-spine",
]; // sections/home/ServicesGrid.tsx images[0..9]

const TREATMENT_IMAGE_SLUGS = [
  "service-spine-surgery",
  "service-brain-tumor-treatment",
  "service-herniated-disc",
  "service-endoscopic-surgery",
  "services-hero-operating-theater",
  "service-herniated-disc",
  "service-endoscopic-surgery",
  "service-brain-tumor-treatment",
  "service-spine-surgery",
]; // sections/services/TreatmentsCarousel.tsx images[0..8]

const ARTICLE_FEATURED_IMAGE_SLUG = "article-featured-spine-surgery";
const ARTICLE_IMAGE_SLUGS = [
  "article-post-operative-care",
  "article-glioma-treatment",
  "article-spinal-implants",
  "article-neuro-regenerative",
  "article-first-consultation",
  "article-lifestyle-nerve-health",
]; // sections/blog/ArticlesInteractive.tsx articleImages[0..5]

const EDU_SHORTS_IMAGE_SLUGS = [
  "video-neural-mapping-tech",
  "video-robotic-precision",
  "video-patient-recovery",
]; // sections/home/EducationalShorts.tsx images[0..2]

const INSIGHTS_IMAGE_SLUGS = [
  "service-skull-base-surgery",
  "service-herniated-disc",
  "service-endoscopic-surgery",
  "service-hydrocephalus",
  "service-peripheral-nerve-surgery",
  "video-patient-story-1",
]; // sections/videos/SurgicalInsights.tsx images[0..5]

const PATIENT_STORIES_IMAGE_SLUGS = [
  "video-patient-story-1",
  "service-peripheral-nerve-surgery",
  "service-hydrocephalus",
]; // sections/videos/PatientStories.tsx images[0..2]

const HOME_CERT_IMAGE_SLUGS = [
  "home-certificate-board-neurological",
  "home-certificate-robotic-surgery",
  "home-certificate-cancer-center",
]; // sections/home/Certificates.tsx images[0..2]

const ABOUT_CERT_IMAGE_SLUGS = [
  "about-certificate-board",
  "about-certificate-fellowship",
  "about-certificate-license",
  "about-certificate-training",
]; // sections/about/ExperienceTimeline.tsx certImages[0..3]

// ---------------------------------------------------------------------------
// Idempotency guard
// ---------------------------------------------------------------------------
async function seedTable(
  table: string,
  rows: Record<string, unknown>[],
  filter?: { column: string; value: string }
): Promise<void> {
  let query = supabase.from(table).select("id", { count: "exact", head: true });
  if (filter) query = query.eq(filter.column, filter.value);
  const { count } = await query;

  if ((count ?? 0) > 0 && !FORCE) {
    console.log(`skip  ${table}${filter ? `(${filter.value})` : ""}: already has ${count} row(s)`);
    return;
  }
  if ((count ?? 0) > 0 && FORCE) {
    let del = supabase.from(table).delete();
    del = filter ? del.eq(filter.column, filter.value) : del.gte("sort_order", -1);
    await del;
  }

  const { error } = await supabase.from(table).insert(rows as never[]);
  if (error) throw new Error(`Insert into ${table} failed: ${error.message}`);
  console.log(`done  ${table}${filter ? `(${filter.value})` : ""}: inserted ${rows.length} row(s)`);
}

// ---------------------------------------------------------------------------
// specialties (18 = home 3 + services 6 + about 9)
// ---------------------------------------------------------------------------
async function migrateSpecialties() {
  const rows: Record<string, unknown>[] = [];

  en.Home.specialties.items.forEach((item, i) => {
    rows.push({
      placement: "home",
      title_en: item.title,
      title_ar: ar.Home.specialties.items[i].title,
      description_en: item.description,
      description_ar: ar.Home.specialties.items[i].description,
      icon: homeSpecialtyIcons[i],
      image_id: mediaId(HOME_SPECIALTY_IMAGE_SLUGS[i]),
      sort_order: i,
      is_visible: true,
    });
  });

  en.Services.specialtiesGrid.items.forEach((item, i) => {
    rows.push({
      placement: "services",
      title_en: item.title,
      title_ar: ar.Services.specialtiesGrid.items[i].title,
      description_en: item.description,
      description_ar: ar.Services.specialtiesGrid.items[i].description,
      icon: servicesSpecialtyIcons[i],
      image_id: null,
      sort_order: i,
      is_visible: true,
    });
  });

  en.About.specialties.items.forEach((item, i) => {
    rows.push({
      placement: "about",
      title_en: item.title,
      title_ar: ar.About.specialties.items[i].title,
      description_en: item.description,
      description_ar: ar.About.specialties.items[i].description,
      icon: aboutSpecialtyIcons[i],
      image_id: i < 3 ? mediaId(ABOUT_SPECIALTY_IMAGE_SLUGS[i]) : null,
      sort_order: i,
      is_visible: true,
    });
  });

  await seedTable("specialties", rows);
}

// ---------------------------------------------------------------------------
// services (10) — Home.servicesGrid.items + details
// ---------------------------------------------------------------------------
async function migrateServices() {
  const rows = en.Home.servicesGrid.items.map((item, i) => {
    const detail = en.Home.servicesGrid.details[String(i) as keyof typeof en.Home.servicesGrid.details];
    const detailAr = ar.Home.servicesGrid.details[String(i) as keyof typeof ar.Home.servicesGrid.details];
    const title_en = item.title;
    return {
      slug: slugify(title_en),
      placement: "home_grid",
      title_en,
      title_ar: ar.Home.servicesGrid.items[i].title,
      description_en: item.description,
      description_ar: ar.Home.servicesGrid.items[i].description,
      overview_en: detail.overview,
      overview_ar: detailAr.overview,
      key_points_en: detail.points,
      key_points_ar: detailAr.points,
      image_id: mediaId(SERVICES_GRID_IMAGE_SLUGS[i]),
      icon: null,
      sort_order: i,
      status: "published",
    };
  });
  await seedTable("services", rows);
}

// ---------------------------------------------------------------------------
// treatments (9) — Services.treatments.items + details (only [0,1] detailed)
// ---------------------------------------------------------------------------
async function migrateTreatments() {
  const rows = en.Services.treatments.items.map((item, i) => {
    const hasDetail = treatmentDetailedIndexes.includes(i);
    const detail = hasDetail
      ? en.Services.treatments.details[String(i) as keyof typeof en.Services.treatments.details]
      : null;
    const detailAr = hasDetail
      ? ar.Services.treatments.details[String(i) as keyof typeof ar.Services.treatments.details]
      : null;
    const title_en = item.title;
    return {
      slug: slugify(title_en),
      title_en,
      title_ar: ar.Services.treatments.items[i].title,
      description_en: item.description,
      description_ar: ar.Services.treatments.items[i].description,
      overview_en: detail?.overview ?? null,
      overview_ar: detailAr?.overview ?? null,
      symptoms_en: detail?.symptoms ?? [],
      symptoms_ar: detailAr?.symptoms ?? [],
      diagnosis_en: detail?.diagnosis ?? null,
      diagnosis_ar: detailAr?.diagnosis ?? null,
      treatment_en: detail?.treatment ?? null,
      treatment_ar: detailAr?.treatment ?? null,
      recovery_en: detail?.recovery ?? null,
      recovery_ar: detailAr?.recovery ?? null,
      faq_en: detail?.faq ?? null,
      faq_ar: detailAr?.faq ?? null,
      image_id: mediaId(TREATMENT_IMAGE_SLUGS[i]),
      has_detail: hasDetail,
      sort_order: i,
      status: "published",
    };
  });
  await seedTable("treatments", rows);
}

// ---------------------------------------------------------------------------
// articles (7) — Blog.featured + Blog.articles, shared placeholder body
// ---------------------------------------------------------------------------
function buildArticleBody(locale: "en" | "ar"): string {
  const p = locale === "en" ? en.Blog.popup : ar.Blog.popup;
  const marker = locale === "en" ? "⚠️ Placeholder – Replace Later" : "⚠️ نص مؤقت – يُرجى استبداله لاحقًا";
  return [
    marker,
    "",
    `## ${p.clinicalOverviewTitle}`,
    p.clinicalOverviewBody,
    "",
    `- ${p.point1}`,
    `- ${p.point2}`,
    `- ${p.point3}`,
    `- ${p.point4}`,
    "",
    `> ${p.pullQuote}`,
    `> ${p.pullQuoteAttribution}`,
    "",
    `## ${p.outcomesTitle}`,
    p.outcomesBody,
    "",
    p.contactPrompt,
  ].join("\n");
}

async function migrateArticles() {
  const bodyEn = buildArticleBody("en");
  const bodyAr = buildArticleBody("ar");

  const featured = en.Blog.featured;
  const featuredAr = ar.Blog.featured;
  const rows: Record<string, unknown>[] = [
    {
      slug: slugify(featured.title),
      title_en: featured.title,
      title_ar: featuredAr.title,
      excerpt_en: featured.excerpt,
      excerpt_ar: featuredAr.excerpt,
      body_en: bodyEn,
      body_ar: bodyAr,
      category_en: featured.category,
      category_ar: featuredAr.category,
      read_time_en: featured.readTime,
      read_time_ar: featuredAr.readTime,
      cover_image_id: mediaId(ARTICLE_FEATURED_IMAGE_SLUG),
      is_featured: true,
      sort_order: 0,
      status: "published",
      published_at: new Date(featured.date).toISOString(),
    },
  ];

  en.Blog.articles.forEach((item, i) => {
    rows.push({
      slug: slugify(item.title),
      title_en: item.title,
      title_ar: ar.Blog.articles[i].title,
      excerpt_en: item.excerpt,
      excerpt_ar: ar.Blog.articles[i].excerpt,
      body_en: bodyEn,
      body_ar: bodyAr,
      category_en: item.category,
      category_ar: ar.Blog.articles[i].category,
      read_time_en: item.readTime,
      read_time_ar: ar.Blog.articles[i].readTime,
      cover_image_id: mediaId(ARTICLE_IMAGE_SLUGS[i]),
      is_featured: false,
      sort_order: i + 1,
      status: "published",
      published_at: new Date(item.date).toISOString(),
    });
  });

  await seedTable("articles", rows);
}

// ---------------------------------------------------------------------------
// videos (12) — Home.educationalShorts (3) + Videos.insights (6) +
// Videos.patientStories (3). video_url stays null (no real videos exist).
// ---------------------------------------------------------------------------
async function migrateVideos() {
  const rows: Record<string, unknown>[] = [];

  en.Home.educationalShorts.items.forEach((item, i) => {
    rows.push({
      slug: slugify(item.title),
      placement: "home",
      title_en: item.title,
      title_ar: ar.Home.educationalShorts.items[i].title,
      description_en: null,
      description_ar: null,
      duration: item.duration,
      category_en: item.category,
      category_ar: ar.Home.educationalShorts.items[i].category,
      thumbnail_id: mediaId(EDU_SHORTS_IMAGE_SLUGS[i]),
      video_url: null,
      sort_order: i,
      status: "published",
    });
  });

  en.Videos.insights.items.forEach((item, i) => {
    rows.push({
      slug: slugify(item.title),
      placement: "insights",
      title_en: item.title,
      title_ar: ar.Videos.insights.items[i].title,
      description_en: item.description,
      description_ar: ar.Videos.insights.items[i].description,
      duration: item.duration,
      category_en: null,
      category_ar: null,
      thumbnail_id: mediaId(INSIGHTS_IMAGE_SLUGS[i]),
      video_url: null,
      sort_order: i,
      status: "published",
    });
  });

  en.Videos.patientStories.items.forEach((item, i) => {
    rows.push({
      slug: slugify(item.title),
      placement: "patient_stories",
      title_en: item.title,
      title_ar: ar.Videos.patientStories.items[i].title,
      description_en: null,
      description_ar: null,
      duration: null,
      category_en: null,
      category_ar: null,
      thumbnail_id: mediaId(PATIENT_STORIES_IMAGE_SLUGS[i]),
      video_url: null,
      sort_order: i,
      status: "published",
    });
  });

  await seedTable("videos", rows);
}

// ---------------------------------------------------------------------------
// faqs (13) — Home.faq (3, page_slug home) + Services.faq (10, page_slug services)
// ---------------------------------------------------------------------------
async function migrateFaqs() {
  const rows: Record<string, unknown>[] = [];

  en.Home.faq.items.forEach((item, i) => {
    rows.push({
      page_slug: "home",
      question_en: item.question,
      question_ar: ar.Home.faq.items[i].question,
      answer_en: item.answer,
      answer_ar: ar.Home.faq.items[i].answer,
      sort_order: i,
      is_visible: true,
    });
  });

  en.Services.faq.items.forEach((item, i) => {
    rows.push({
      page_slug: "services",
      question_en: item.question,
      question_ar: ar.Services.faq.items[i].question,
      answer_en: item.answer,
      answer_ar: ar.Services.faq.items[i].answer,
      sort_order: i,
      is_visible: true,
    });
  });

  await seedTable("faqs", rows);
}

// ---------------------------------------------------------------------------
// testimonials (6) — About.testimonials.items
// ---------------------------------------------------------------------------
async function migrateTestimonials() {
  const rows = en.About.testimonials.items.map((item, i) => ({
    name_en: item.name,
    name_ar: ar.About.testimonials.items[i].name,
    quote_en: item.quote,
    quote_ar: ar.About.testimonials.items[i].quote,
    initials: item.initials,
    rating: 5,
    sort_order: i,
    is_visible: true,
  }));
  await seedTable("testimonials", rows);
}

// ---------------------------------------------------------------------------
// certificates (7) — Home.certificates (3, placement home) +
// About.experience.certificates (4, placement about)
// ---------------------------------------------------------------------------
async function migrateCertificates() {
  const rows: Record<string, unknown>[] = [];

  en.Home.certificates.items.forEach((item, i) => {
    rows.push({
      placement: "home",
      title_en: item.title,
      title_ar: ar.Home.certificates.items[i].title,
      subtitle_en: item.subtitle,
      subtitle_ar: ar.Home.certificates.items[i].subtitle,
      meta_en: item.meta,
      meta_ar: ar.Home.certificates.items[i].meta,
      image_id: mediaId(HOME_CERT_IMAGE_SLUGS[i]),
      sort_order: i,
      is_visible: true,
    });
  });

  en.About.experience.certificates.forEach((item, i) => {
    rows.push({
      placement: "about",
      title_en: item.title,
      title_ar: ar.About.experience.certificates[i].title,
      subtitle_en: null,
      subtitle_ar: null,
      meta_en: null,
      meta_ar: null,
      image_id: mediaId(ABOUT_CERT_IMAGE_SLUGS[i]),
      sort_order: i,
      is_visible: true,
    });
  });

  await seedTable("certificates", rows);
}

// ---------------------------------------------------------------------------
// timeline_events (3) — About.experience.timeline
// ---------------------------------------------------------------------------
async function migrateTimelineEvents() {
  const rows = en.About.experience.timeline.map((item, i) => ({
    period: item.period,
    title_en: item.title,
    title_ar: ar.About.experience.timeline[i].title,
    description_en: item.description,
    description_ar: ar.About.experience.timeline[i].description,
    sort_order: i,
    is_visible: true,
  }));
  await seedTable("timeline_events", rows);
}

// ---------------------------------------------------------------------------
// nav_items (6) — constants/site.ts navItems + Nav.* labels
// ---------------------------------------------------------------------------
async function migrateNavItems() {
  const navItems = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "services", href: "/services" },
    { key: "videos", href: "/videos" },
    { key: "blog", href: "/blog" },
    { key: "contact", href: "/contact" },
  ] as const;

  const rows = navItems.map((item, i) => ({
    label_en: en.Nav[item.key as keyof typeof en.Nav],
    label_ar: ar.Nav[item.key as keyof typeof ar.Nav],
    href: item.href,
    sort_order: i,
    is_visible: true,
  }));
  await seedTable("nav_items", rows);
}

// ---------------------------------------------------------------------------
// social_links (6) — dedupes the original constants/site.ts set
// (facebook/linkedin/youtube) with HeroContactWidget.tsx's own set
// (instagram/facebook/tiktok/whatsapp). WhatsApp number read from the
// settings.contact row (constants/site.ts no longer exists — this data now
// lives in the database).
// ---------------------------------------------------------------------------
async function migrateSocialLinks() {
  const { data: contactSettings } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "contact")
    .single();
  const whatsappNumber = (contactSettings?.value as { whatsappNumber: string }).whatsappNumber;

  const platforms = [
    { platform: "facebook", url: "#" },
    { platform: "linkedin", url: "#" },
    { platform: "youtube", url: "#" },
    { platform: "instagram", url: "#" },
    { platform: "tiktok", url: "#" },
    { platform: "whatsapp", url: `https://wa.me/${whatsappNumber}` },
  ];
  const rows = platforms.map((p, i) => ({
    platform: p.platform,
    url: p.url,
    icon: socialLinkIcons[p.platform],
    sort_order: i,
    is_visible: true,
  }));
  await seedTable("social_links", rows);
}

// ---------------------------------------------------------------------------
// sections (38) — one row per messages namespace not covered by a dedicated
// table. Images stored as plain Storage URL + alt inside the JSONB content
// (sections has no image_id FK). Small item-arrays with no dedicated table
// (whyTrust.points, journey.steps, whyChooseUs.items, whyWatch.items,
// experience badges, bookCta features, contact form/messageBar arrays) are
// kept as JSON arrays, edited via the admin's generic raw-JSON field type.
// ---------------------------------------------------------------------------
async function migrateSections() {
  type SectionRow = {
    page_slug: string;
    section_key: string;
    content_en: Record<string, unknown>;
    content_ar: Record<string, unknown>;
    sort_order: number;
    status: string;
    is_visible: boolean;
  };
  const rows: SectionRow[] = [];
  let sortOrder = 0;
  const add = (page_slug: string, section_key: string, content_en: Record<string, unknown>, content_ar: Record<string, unknown>) => {
    rows.push({ page_slug, section_key, content_en, content_ar, sort_order: sortOrder++, status: "published", is_visible: true });
  };

  // ---- Home ----
  sortOrder = 0;
  add("home", "hero", {
    badge: en.Home.hero.badge,
    titleLine1: en.Home.hero.titleLine1,
    titleLine2: en.Home.hero.titleLine2,
    description: en.Home.hero.description,
    bookAppointment: en.Home.hero.bookAppointment,
    learnMore: en.Home.hero.learnMore,
    followUs: en.Home.hero.widget.followUs,
    callUs: en.Home.hero.widget.callUs,
    image: mediaUrl("doctor-portrait-primary"),
    imageAlt: en.Home.hero.imageAlt,
  }, {
    badge: ar.Home.hero.badge,
    titleLine1: ar.Home.hero.titleLine1,
    titleLine2: ar.Home.hero.titleLine2,
    description: ar.Home.hero.description,
    bookAppointment: ar.Home.hero.bookAppointment,
    learnMore: ar.Home.hero.learnMore,
    followUs: ar.Home.hero.widget.followUs,
    callUs: ar.Home.hero.widget.callUs,
    image: mediaUrl("doctor-portrait-primary"),
    imageAlt: ar.Home.hero.imageAlt,
  });

  add("home", "videoIntro", {
    eyebrow: en.Home.videoIntro.eyebrow, title: en.Home.videoIntro.title,
    quote: en.Home.videoIntro.quote, credentials: en.Home.videoIntro.credentials,
    learnMore: en.Home.videoIntro.learnMore,
    image: mediaUrl("video-neural-mapping-tech"),
  }, {
    eyebrow: ar.Home.videoIntro.eyebrow, title: ar.Home.videoIntro.title,
    quote: ar.Home.videoIntro.quote, credentials: ar.Home.videoIntro.credentials,
    learnMore: ar.Home.videoIntro.learnMore,
    image: mediaUrl("video-neural-mapping-tech"),
  });

  add("home", "specialties", {
    eyebrow: en.Home.specialties.eyebrow, title: en.Home.specialties.title, viewAll: en.Home.specialties.viewAll,
  }, {
    eyebrow: ar.Home.specialties.eyebrow, title: ar.Home.specialties.title, viewAll: ar.Home.specialties.viewAll,
  });

  add("home", "servicesGrid", {
    eyebrow: en.Home.servicesGrid.eyebrow, title: en.Home.servicesGrid.title, keyAspects: en.Home.servicesGrid.keyAspects, bookAppointment: en.Home.servicesGrid.bookAppointment,
  }, {
    eyebrow: ar.Home.servicesGrid.eyebrow, title: ar.Home.servicesGrid.title, keyAspects: ar.Home.servicesGrid.keyAspects, bookAppointment: ar.Home.servicesGrid.bookAppointment,
  });

  add("home", "whyTrust", {
    eyebrow: en.Home.whyTrust.eyebrow, title: en.Home.whyTrust.title,
    badgeYears: en.Home.whyTrust.badgeYears, badgeLabel: en.Home.whyTrust.badgeLabel,
    image: mediaUrl("service-skull-base-surgery"), imageAlt: en.Home.whyTrust.imageAlt,
    points: en.Home.whyTrust.points,
  }, {
    eyebrow: ar.Home.whyTrust.eyebrow, title: ar.Home.whyTrust.title,
    badgeYears: ar.Home.whyTrust.badgeYears, badgeLabel: ar.Home.whyTrust.badgeLabel,
    image: mediaUrl("service-skull-base-surgery"), imageAlt: ar.Home.whyTrust.imageAlt,
    points: ar.Home.whyTrust.points,
  });

  add("home", "certificates", {
    eyebrow: en.Home.certificates.eyebrow, title: en.Home.certificates.title,
  }, {
    eyebrow: ar.Home.certificates.eyebrow, title: ar.Home.certificates.title,
  });

  add("home", "faq", { title: en.Home.faq.title }, { title: ar.Home.faq.title });

  add("home", "educationalShorts", {
    eyebrow: en.Home.educationalShorts.eyebrow, title: en.Home.educationalShorts.title, viewAll: en.Home.educationalShorts.viewAll,
  }, {
    eyebrow: ar.Home.educationalShorts.eyebrow, title: ar.Home.educationalShorts.title, viewAll: ar.Home.educationalShorts.viewAll,
  });

  add("home", "contactCta", { ...en.Home.contactCta }, { ...ar.Home.contactCta });

  // ---- About ----
  sortOrder = 0;
  add("about", "hero", {
    eyebrow: en.About.hero.eyebrow, title: en.About.hero.title, description: en.About.hero.description,
    bookAppointment: en.About.hero.bookAppointment, contactUs: en.About.hero.contactUs,
    image: mediaUrl("about-hero-background"), imageAlt: en.About.hero.imageAlt,
  }, {
    eyebrow: ar.About.hero.eyebrow, title: ar.About.hero.title, description: ar.About.hero.description,
    bookAppointment: ar.About.hero.bookAppointment, contactUs: ar.About.hero.contactUs,
    image: mediaUrl("about-hero-background"), imageAlt: ar.About.hero.imageAlt,
  });

  add("about", "introduction", {
    badgeYears: en.About.introduction.badgeYears, badgeLabel: en.About.introduction.badgeLabel,
    title: en.About.introduction.title, paragraph1: en.About.introduction.paragraph1, paragraph2: en.About.introduction.paragraph2,
    quote: en.About.introduction.quote, signatureName: en.About.introduction.signatureName, credentials: en.About.introduction.credentials,
    image: mediaUrl("about-introduction-portrait"), imageAlt: en.About.introduction.imageAlt,
  }, {
    badgeYears: ar.About.introduction.badgeYears, badgeLabel: ar.About.introduction.badgeLabel,
    title: ar.About.introduction.title, paragraph1: ar.About.introduction.paragraph1, paragraph2: ar.About.introduction.paragraph2,
    quote: ar.About.introduction.quote, signatureName: ar.About.introduction.signatureName, credentials: ar.About.introduction.credentials,
    image: mediaUrl("about-introduction-portrait"), imageAlt: ar.About.introduction.imageAlt,
  });

  add("about", "videoShowcase", {
    title: en.About.videoShowcase.title, badge: en.About.videoShowcase.badge,
    image: mediaUrl("about-video-showcase"), imageAlt: en.About.videoShowcase.imageAlt,
  }, {
    title: ar.About.videoShowcase.title, badge: ar.About.videoShowcase.badge,
    image: mediaUrl("about-video-showcase"), imageAlt: ar.About.videoShowcase.imageAlt,
  });

  add("about", "specialties", {
    title: en.About.specialties.title, description: en.About.specialties.description,
  }, {
    title: ar.About.specialties.title, description: ar.About.specialties.description,
  });

  add("about", "experience", {
    eyebrow: en.About.experience.eyebrow, title: en.About.experience.title, description: en.About.experience.description,
    certificatesTitle: en.About.experience.certificatesTitle, badges: en.About.experience.badges,
  }, {
    eyebrow: ar.About.experience.eyebrow, title: ar.About.experience.title, description: ar.About.experience.description,
    certificatesTitle: ar.About.experience.certificatesTitle, badges: ar.About.experience.badges,
  });

  add("about", "testimonials", { title: en.About.testimonials.title }, { title: ar.About.testimonials.title });

  add("about", "ctaBand", { ...en.About.ctaBand }, { ...ar.About.ctaBand });

  // ---- Services ----
  sortOrder = 0;
  add("services", "hero", {
    badge: en.Services.hero.badge, titleLine1: en.Services.hero.titleLine1, titleLine2: en.Services.hero.titleLine2,
    description: en.Services.hero.description, bookAppointment: en.Services.hero.bookAppointment, contactUs: en.Services.hero.contactUs,
    image: mediaUrl("services-hero-operating-theater"), imageAlt: en.Services.hero.imageAlt,
  }, {
    badge: ar.Services.hero.badge, titleLine1: ar.Services.hero.titleLine1, titleLine2: ar.Services.hero.titleLine2,
    description: ar.Services.hero.description, bookAppointment: ar.Services.hero.bookAppointment, contactUs: ar.Services.hero.contactUs,
    image: mediaUrl("services-hero-operating-theater"), imageAlt: ar.Services.hero.imageAlt,
  });

  add("services", "specialtiesGrid", {
    title: en.Services.specialtiesGrid.title, description: en.Services.specialtiesGrid.description,
  }, {
    title: ar.Services.specialtiesGrid.title, description: ar.Services.specialtiesGrid.description,
  });

  add("services", "treatments", {
    title: en.Services.treatments.title, overview: en.Services.treatments.overview, symptoms: en.Services.treatments.symptoms,
    diagnosisAndTreatment: en.Services.treatments.diagnosisAndTreatment, recovery: en.Services.treatments.recovery,
    patientFaqs: en.Services.treatments.patientFaqs, scheduleConsultation: en.Services.treatments.scheduleConsultation,
  }, {
    title: ar.Services.treatments.title, overview: ar.Services.treatments.overview, symptoms: ar.Services.treatments.symptoms,
    diagnosisAndTreatment: ar.Services.treatments.diagnosisAndTreatment, recovery: ar.Services.treatments.recovery,
    patientFaqs: ar.Services.treatments.patientFaqs, scheduleConsultation: ar.Services.treatments.scheduleConsultation,
  });

  add("services", "journey", {
    title: en.Services.journey.title,
    steps: en.Services.journey.steps.map((s, i) => ({ ...s, icon: patientJourneyIcons[i] })),
  }, {
    title: ar.Services.journey.title,
    steps: ar.Services.journey.steps.map((s, i) => ({ ...s, icon: patientJourneyIcons[i] })),
  });

  add("services", "whyChooseUs", {
    title: en.Services.whyChooseUs.title,
    items: en.Services.whyChooseUs.items.map((it, i) => ({ ...it, icon: whyChooseUsIcons[i] })),
  }, {
    title: ar.Services.whyChooseUs.title,
    items: ar.Services.whyChooseUs.items.map((it, i) => ({ ...it, icon: whyChooseUsIcons[i] })),
  });

  add("services", "faq", { title: en.Services.faq.title }, { title: ar.Services.faq.title });

  add("services", "bookCta", {
    badge: en.Services.bookCta.badge, titleLine1: en.Services.bookCta.titleLine1, titleLine2: en.Services.bookCta.titleLine2,
    titleHighlight: en.Services.bookCta.titleHighlight, description: en.Services.bookCta.description,
    features: en.Services.bookCta.features, bookAppointment: en.Services.bookCta.bookAppointment, whatsapp: en.Services.bookCta.whatsapp,
    experienceLabel: en.Services.bookCta.experienceLabel, experienceValue: en.Services.bookCta.experienceValue,
    image: mediaUrl("doctor-portrait-primary"), imageAlt: en.Services.bookCta.imageAlt,
  }, {
    badge: ar.Services.bookCta.badge, titleLine1: ar.Services.bookCta.titleLine1, titleLine2: ar.Services.bookCta.titleLine2,
    titleHighlight: ar.Services.bookCta.titleHighlight, description: ar.Services.bookCta.description,
    features: ar.Services.bookCta.features, bookAppointment: ar.Services.bookCta.bookAppointment, whatsapp: ar.Services.bookCta.whatsapp,
    experienceLabel: ar.Services.bookCta.experienceLabel, experienceValue: ar.Services.bookCta.experienceValue,
    image: mediaUrl("doctor-portrait-primary"), imageAlt: ar.Services.bookCta.imageAlt,
  });

  // ---- Blog ----
  sortOrder = 0;
  add("blog", "hero", {
    eyebrow: en.Blog.hero.eyebrow, title: en.Blog.hero.title, description: en.Blog.hero.description,
    exploreArticles: en.Blog.hero.exploreArticles, bookAppointment: en.Blog.hero.bookAppointment,
    image: mediaUrl("blog-hero-neural-network"), imageAlt: en.Blog.hero.imageAlt,
  }, {
    eyebrow: ar.Blog.hero.eyebrow, title: ar.Blog.hero.title, description: ar.Blog.hero.description,
    exploreArticles: ar.Blog.hero.exploreArticles, bookAppointment: ar.Blog.hero.bookAppointment,
    image: mediaUrl("blog-hero-neural-network"), imageAlt: ar.Blog.hero.imageAlt,
  });

  add("blog", "articlesGrid", {
    featuredBadge: en.Blog.featuredBadge, readFullArticle: en.Blog.readFullArticle, readArticle: en.Blog.readArticle,
  }, {
    featuredBadge: ar.Blog.featuredBadge, readFullArticle: ar.Blog.readFullArticle, readArticle: ar.Blog.readArticle,
  });

  add("blog", "knowledgeBar", { ...en.Blog.knowledgeBar }, { ...ar.Blog.knowledgeBar });
  add("blog", "contactCta", { ...en.Blog.contactCta }, { ...ar.Blog.contactCta });

  // ---- Videos ----
  sortOrder = 0;
  add("videos", "hero", { ...en.Videos.hero }, { ...ar.Videos.hero });

  add("videos", "insights", {
    title: en.Videos.insights.title, description: en.Videos.insights.description, viewAll: en.Videos.insights.viewAll,
  }, {
    title: ar.Videos.insights.title, description: ar.Videos.insights.description, viewAll: ar.Videos.insights.viewAll,
  });

  add("videos", "quote", {
    quote: en.Videos.quote.quote, name: en.Videos.quote.name, role: en.Videos.quote.role,
    image: mediaUrl("doctor-portrait-primary"), imageAlt: en.Videos.quote.imageAlt,
  }, {
    quote: ar.Videos.quote.quote, name: ar.Videos.quote.name, role: ar.Videos.quote.role,
    image: mediaUrl("doctor-portrait-primary"), imageAlt: ar.Videos.quote.imageAlt,
  });

  add("videos", "patientStories", {
    eyebrow: en.Videos.patientStories.eyebrow, title: en.Videos.patientStories.title,
    description: en.Videos.patientStories.description, badge: en.Videos.patientStories.badge,
  }, {
    eyebrow: ar.Videos.patientStories.eyebrow, title: ar.Videos.patientStories.title,
    description: ar.Videos.patientStories.description, badge: ar.Videos.patientStories.badge,
  });

  add("videos", "whyWatch", {
    title: en.Videos.whyWatch.title, description: en.Videos.whyWatch.description,
    items: en.Videos.whyWatch.items.map((it, i) => ({ ...it, icon: whyWatchIcons[i] })),
  }, {
    title: ar.Videos.whyWatch.title, description: ar.Videos.whyWatch.description,
    items: ar.Videos.whyWatch.items.map((it, i) => ({ ...it, icon: whyWatchIcons[i] })),
  });

  add("videos", "ctaBand", { ...en.Videos.ctaBand }, { ...ar.Videos.ctaBand });

  // ---- Contact ----
  sortOrder = 0;
  add("contact", "hero", {
    eyebrow: en.Contact.hero.eyebrow, title: en.Contact.hero.title, description: en.Contact.hero.description,
    sendWhatsapp: en.Contact.hero.sendWhatsapp, callNow: en.Contact.hero.callNow,
    image: mediaUrl("contact-hero-operating-room"), imageAlt: en.Contact.hero.imageAlt,
  }, {
    eyebrow: ar.Contact.hero.eyebrow, title: ar.Contact.hero.title, description: ar.Contact.hero.description,
    sendWhatsapp: ar.Contact.hero.sendWhatsapp, callNow: ar.Contact.hero.callNow,
    image: mediaUrl("contact-hero-operating-room"), imageAlt: ar.Contact.hero.imageAlt,
  });

  add("contact", "quickStrip", { addressShort: en.Contact.quickStrip.addressShort }, { addressShort: ar.Contact.quickStrip.addressShort });

  add("contact", "form", {
    title: en.Contact.form.title, nameLabel: en.Contact.form.nameLabel, namePlaceholder: en.Contact.form.namePlaceholder,
    phoneLabel: en.Contact.form.phoneLabel, phonePlaceholder: en.Contact.form.phonePlaceholder,
    conditionLabel: en.Contact.form.conditionLabel, conditionOptions: en.Contact.form.conditionOptions,
    messageLabel: en.Contact.form.messageLabel, messagePlaceholder: en.Contact.form.messagePlaceholder, submit: en.Contact.form.submit,
  }, {
    title: ar.Contact.form.title, nameLabel: ar.Contact.form.nameLabel, namePlaceholder: ar.Contact.form.namePlaceholder,
    phoneLabel: ar.Contact.form.phoneLabel, phonePlaceholder: ar.Contact.form.phonePlaceholder,
    conditionLabel: ar.Contact.form.conditionLabel, conditionOptions: ar.Contact.form.conditionOptions,
    messageLabel: ar.Contact.form.messageLabel, messagePlaceholder: ar.Contact.form.messagePlaceholder, submit: ar.Contact.form.submit,
  });

  add("contact", "infoPanel", {
    headquartersTitle: en.Contact.infoPanel.headquartersTitle, headquartersAddress: en.Contact.infoPanel.headquartersAddress,
    openInMaps: en.Contact.infoPanel.openInMaps, telephoneLabel: en.Contact.infoPanel.telephoneLabel,
    whatsappLabel: en.Contact.infoPanel.whatsappLabel, emailLabel: en.Contact.infoPanel.emailLabel, hoursLabel: en.Contact.infoPanel.hoursLabel,
    image: mediaUrl("contact-clinic-facade-map"), imageAlt: en.Contact.infoPanel.mapImageAlt,
  }, {
    headquartersTitle: ar.Contact.infoPanel.headquartersTitle, headquartersAddress: ar.Contact.infoPanel.headquartersAddress,
    openInMaps: ar.Contact.infoPanel.openInMaps, telephoneLabel: ar.Contact.infoPanel.telephoneLabel,
    whatsappLabel: ar.Contact.infoPanel.whatsappLabel, emailLabel: ar.Contact.infoPanel.emailLabel, hoursLabel: ar.Contact.infoPanel.hoursLabel,
    image: mediaUrl("contact-clinic-facade-map"), imageAlt: ar.Contact.infoPanel.mapImageAlt,
  });

  add("contact", "messageBar", {
    guidanceTitle: en.Contact.messageBar.guidanceTitle, guidanceItems: en.Contact.messageBar.guidanceItems,
    communicationTitle: en.Contact.messageBar.communicationTitle, communicationItems: en.Contact.messageBar.communicationItems,
    image: mediaUrl("doctor-portrait-primary"), portraitAlt: en.Contact.messageBar.portraitAlt,
  }, {
    guidanceTitle: ar.Contact.messageBar.guidanceTitle, guidanceItems: ar.Contact.messageBar.guidanceItems,
    communicationTitle: ar.Contact.messageBar.communicationTitle, communicationItems: ar.Contact.messageBar.communicationItems,
    image: mediaUrl("doctor-portrait-primary"), portraitAlt: ar.Contact.messageBar.portraitAlt,
  });

  // sections has a per-page upsert target (page_slug, section_key unique) —
  // seed per page so a partial re-run of one page doesn't skip the rest.
  for (const pageSlug of ["home", "about", "services", "blog", "videos", "contact"]) {
    await seedTable(
      "sections",
      rows.filter((r) => r.page_slug === pageSlug),
      { column: "page_slug", value: pageSlug }
    );
  }
}

// ---------------------------------------------------------------------------
// seo_meta (12 = 6 pages x en/ar) — from each page's existing hardcoded
// `<Page>.meta.{title,description}` (Home uses top-level Meta.default*)
// plus the literal canonical path already hardcoded in each page.tsx.
// ---------------------------------------------------------------------------
async function migrateSeo() {
  const pages: { slug: string; canonical: string; en: { title: string; description: string }; ar: { title: string; description: string } }[] = [
    { slug: "home", canonical: "/", en: { title: en.Meta.defaultTitle, description: en.Meta.defaultDescription }, ar: { title: ar.Meta.defaultTitle, description: ar.Meta.defaultDescription } },
    { slug: "about", canonical: "/about", en: en.About.meta, ar: ar.About.meta },
    { slug: "services", canonical: "/services", en: en.Services.meta, ar: ar.Services.meta },
    { slug: "blog", canonical: "/blog", en: en.Blog.meta, ar: ar.Blog.meta },
    { slug: "videos", canonical: "/videos", en: en.Videos.meta, ar: ar.Videos.meta },
    { slug: "contact", canonical: "/contact", en: en.Contact.meta, ar: ar.Contact.meta },
  ];

  const rows: Record<string, unknown>[] = [];
  for (const page of pages) {
    for (const locale of ["en", "ar"] as const) {
      const copy = page[locale];
      rows.push({
        page_slug: page.slug,
        locale,
        title: copy.title,
        description: copy.description,
        canonical_path: page.canonical,
        robots: "index,follow",
        og_title: copy.title,
        og_description: copy.description,
        og_image_id: null,
        twitter_card: "summary_large_image",
      });
    }
  }

  await seedTable("seo_meta", rows);
}

// ---------------------------------------------------------------------------
// Orchestrator with row-count assertions
// ---------------------------------------------------------------------------
async function assertCount(table: string, expected: number, filter?: { column: string; value: string }) {
  let q = supabase.from(table).select("id", { count: "exact", head: true });
  if (filter) q = q.eq(filter.column, filter.value);
  const { count } = await q;
  if (count !== expected) {
    throw new Error(`Row-count check failed for ${table}${filter ? `(${filter.value})` : ""}: expected ${expected}, got ${count}`);
  }
  console.log(`check  ${table}${filter ? `(${filter.value})` : ""}: ${count} rows ✓`);
}

async function main() {
  await loadMediaUrls();

  await migrateSpecialties();
  await assertCount("specialties", 18);

  await migrateServices();
  await assertCount("services", 10);

  await migrateTreatments();
  await assertCount("treatments", 9);

  await migrateArticles();
  await assertCount("articles", 7);

  await migrateVideos();
  await assertCount("videos", 12);

  await migrateFaqs();
  await assertCount("faqs", 13);

  await migrateTestimonials();
  await assertCount("testimonials", 6);

  await migrateCertificates();
  await assertCount("certificates", 7);

  await migrateTimelineEvents();
  await assertCount("timeline_events", 3);

  await migrateNavItems();
  await assertCount("nav_items", 6);

  await migrateSocialLinks();
  await assertCount("social_links", 6);

  await migrateSections();
  for (const pageSlug of ["home", "about", "services", "blog", "videos", "contact"]) {
    const expected = { home: 9, about: 7, services: 7, blog: 4, videos: 6, contact: 5 }[pageSlug]!;
    await assertCount("sections", expected, { column: "page_slug", value: pageSlug });
  }

  await migrateSeo();
  await assertCount("seo_meta", 12);

  console.log("\nContent migration complete.");
}

main().catch((err) => {
  console.error("CONTENT MIGRATION FAILED:", err);
  process.exit(1);
});
