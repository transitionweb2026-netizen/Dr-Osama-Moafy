import type { SectionFieldInput, SectionFieldType } from "./sectionsActions";

function inferType(key: string, value: unknown): SectionFieldType {
  // Matches the `image`/`imageAlt` convention pickSection() reshapes into
  // `{ url, alt }` for components — give it an upload control, not a raw
  // text box for pasting URLs.
  if (key === "image" && (value === undefined || typeof value === "string")) {
    return "image";
  }
  if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
    return "array";
  }
  if (typeof value === "string") {
    return "string";
  }
  return "json";
}

function toRaw(type: SectionFieldType, value: unknown): string {
  if (value === undefined) return "";
  if (type === "array") {
    return Array.isArray(value) ? value.join("\n") : "";
  }
  if (type === "json") {
    return value === null ? "" : JSON.stringify(value, null, 2);
  }
  return typeof value === "string" ? value : "";
}

export function deriveSectionFields(
  contentEn: Record<string, unknown>,
  contentAr: Record<string, unknown>
): SectionFieldInput[] {
  const keys = Array.from(new Set([...Object.keys(contentEn), ...Object.keys(contentAr)]));

  return keys.map((key) => {
    const sample = contentEn[key] !== undefined ? contentEn[key] : contentAr[key];
    const type = inferType(key, sample);
    return {
      key,
      type,
      en: toRaw(type, contentEn[key]),
      ar: toRaw(type, contentAr[key]),
    };
  });
}
