export type Locale = "en" | "ar";

// Every table stores bilingual fields as `<field>_en`/`<field>_ar` — this
// picks the requested locale's variant and drops the suffix.
export function pickBilingual(row: Record<string, unknown>, locale: Locale, keys: string[]) {
  const out: Record<string, unknown> = {};
  for (const key of keys) out[key] = row[`${key}_${locale}`];
  return out;
}

export interface MediaRef {
  id: string;
  url: string;
  alt_text_en: string;
  alt_text_ar: string;
}

export interface PickedImage {
  url: string;
  alt: string;
}

export function pickImage(media: MediaRef | null | undefined, locale: Locale): PickedImage | null {
  if (!media) return null;
  return { url: media.url, alt: locale === "en" ? media.alt_text_en : media.alt_text_ar };
}

// sections.content_en/content_ar are arbitrary JSONB — this picks the
// requested locale's object and, for the `image`/`imageAlt` convention used
// throughout the content migration, reshapes to { image: { url, alt } }.
export function pickSection(
  sections: Record<string, { content_en: Record<string, unknown>; content_ar: Record<string, unknown> }>,
  key: string,
  locale: Locale
): Record<string, unknown> {
  const row = sections[key];
  if (!row) return {};
  const content = (locale === "en" ? row.content_en : row.content_ar) as Record<string, unknown>;
  const { image, imageAlt, ...rest } = content;
  if (typeof image === "string") {
    return { ...rest, image: { url: image, alt: imageAlt } };
  }
  return content;
}
