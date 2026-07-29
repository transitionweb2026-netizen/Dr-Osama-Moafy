import type { SectionFieldInput, SectionFieldType } from "./sectionsActions";

function inferType(value: unknown): SectionFieldType {
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
    const type = inferType(sample);
    return {
      key,
      type,
      en: toRaw(type, contentEn[key]),
      ar: toRaw(type, contentAr[key]),
    };
  });
}
