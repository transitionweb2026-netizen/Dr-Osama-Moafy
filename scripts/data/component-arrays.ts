// Material Symbols icon-name strings hand-transcribed from the ~6 component
// files that hardcode them (icons have no source-of-truth data file to
// extract programmatically the way image URLs do — see
// scripts/data/media-manifest.ts for those). Each array is positionally
// matched to its corresponding messages.json items array, exactly as the
// live components consume them today.

// About.specialties.items[0..8] — sections/about/SpecialtiesCarousel.tsx
// `cards[].icon`. Only items[0..2] also carry an image (see
// specialty-minimally-invasive-spine / specialty-neuro-oncology /
// specialty-functional-neurosurgery in media-manifest.ts); items[3..8] are
// icon-only, image_id null.
export const aboutSpecialtyIcons = [
  "settings_accessibility",
  "psychology",
  "precision_manufacturing",
  "child_care",
  "face",
  "bloodtype",
  "emergency",
  "hub",
  "architecture",
];

// Services.specialtiesGrid.items[0..5] — sections/services/SpecialtiesGrid.tsx
// `icons` (icon-only collection, no images in source).
export const servicesSpecialtyIcons = [
  "oncology",
  "personal_injury",
  "psychology",
  "child_care",
  "medical_services",
  "water_drop",
];

// Home.specialties.items[0..2] — sections/home/Specialties.tsx has no icon
// array (images only for all 3 items), included for completeness of the
// specialties table across all three `placement` values.
export const homeSpecialtyIcons: (string | null)[] = [null, null, null];

// Services.journey.steps[0..6] — sections/services/PatientJourney.tsx `icons`.
export const patientJourneyIcons = [
  "event",
  "meeting_room",
  "stethoscope",
  "radiology",
  "assignment",
  "medical_information",
  "check_circle",
];

// Services.whyChooseUs.items[0..5] — sections/services/WhyChooseUs.tsx `icons`.
export const whyChooseUsIcons = [
  "history",
  "precision_manufacturing",
  "favorite",
  "biotech",
  "trending_up",
  "support_agent",
];

// Videos.whyWatch.items[0..3] — sections/videos/WhyWatch.tsx `icons`.
export const whyWatchIcons = ["verified_user", "psychology", "biotech", "stethoscope"];

// Services.treatments.items — sections/services/TreatmentsCarousel.tsx
// `detailedIds`: only these two indexes have `.details` content and get
// `has_detail = true`; the rest link straight to /contact.
export const treatmentDetailedIndexes = [0, 1];

// social_links.icon — reconciles two independent icon sources into one
// table. facebook/linkedin/youtube come from components/layout/Footer.tsx's
// `socialIcons` map (these ARE rendered from the DB value). instagram/tiktok/
// whatsapp come from sections/home/HeroContactWidget.tsx, which renders its
// own hardcoded inline SVGs regardless of this column (kept for admin-editor
// completeness only — "every icon must be editable" — not because the
// widget reads it).
export const socialLinkIcons: Record<string, string> = {
  facebook: "public",
  linkedin: "groups",
  youtube: "video_library",
  instagram: "photo_camera",
  tiktok: "music_note",
  whatsapp: "chat",
};
