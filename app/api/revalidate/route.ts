import "server-only";
import { revalidateTag, revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Every unstable_cache tag used across lib/content/** — see the `tags:`
// array in each fetcher. All of them are `revalidate: false` (cached
// forever until a tag is explicitly revalidated), which is normally fine
// since every admin Server Action calls revalidateTag/revalidatePath after
// writing. This route exists for the one path that doesn't go through an
// admin Server Action: a direct database write (e.g. a one-off content
// swap done from outside the running app) — without this, that write is
// correct in the database but invisible on the deployed site until
// something else happens to bust the cache.
const ALL_TAGS = [
  "articles", "sections", "specialties", "timeline_events", "testimonials",
  "certificates", "nav_items", "social_links", "seo_meta", "settings",
  "treatments", "faqs", "services", "videos",
];

// Reuses the service-role key already required for the app to run in
// production, rather than introducing a new secret that would need to be
// added to the deployment's env vars before this route could work there.
function isAuthorized(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  return !!token && token === process.env.SUPABASE_SERVICE_ROLE_KEY;
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const tags: string[] = Array.isArray(body.tags) && body.tags.length > 0 ? body.tags : ALL_TAGS;

  for (const tag of tags) revalidateTag(tag, "max");
  revalidatePath("/en", "layout");
  revalidatePath("/ar", "layout");

  return NextResponse.json({ revalidated: tags, at: new Date().toISOString() });
}
