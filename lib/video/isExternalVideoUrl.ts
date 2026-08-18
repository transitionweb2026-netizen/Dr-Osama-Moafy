const EXTERNAL_VIDEO_HOSTS = [
  "facebook.com",
  "youtube.com",
  "youtu.be",
  "instagram.com",
  "tiktok.com",
  "vimeo.com",
];

// A directly uploaded video (our own Supabase Storage URL, or any other
// direct file link) can be played inline with a <video> tag. A link to a
// social platform's watch page cannot — it only makes sense as an outbound
// link, so callers use this to decide which one to render.
export function isExternalVideoUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    const { hostname } = new URL(url);
    return EXTERNAL_VIDEO_HOSTS.some((host) => hostname === host || hostname.endsWith(`.${host}`));
  } catch {
    return false;
  }
}
