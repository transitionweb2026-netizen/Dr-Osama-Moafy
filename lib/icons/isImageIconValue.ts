// Every `icon` field in the CMS stores either a Material Symbols icon name
// (e.g. "medical_services") or, once an admin uploads a custom icon, the
// public URL of that image — one plain text column, two possible meanings.
// This is the single place that tells them apart.
export function isImageIconValue(value: string | null | undefined): value is string {
  if (!value) return false;
  return value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/");
}
