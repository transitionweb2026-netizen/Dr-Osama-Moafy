// Downloads every image in scripts/data/media-manifest.ts, uploads it to the
// Supabase Storage `media` bucket, and inserts a corresponding `media` row.
// Run with: npm run migrate:media
//
// Cannot import lib/supabase/admin.ts here — it's guarded by `server-only`,
// which throws unconditionally outside Next's bundler (Next replaces it with
// a no-op only inside server bundles). So the service-role client is built
// directly with @supabase/supabase-js instead.

import { createClient } from "@supabase/supabase-js";
import probe from "probe-image-size";
import * as fs from "node:fs";
import * as path from "node:path";
import { mediaManifest } from "./data/media-manifest";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set (.env.local)");
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const MAP_PATH = path.join(__dirname, "data", "media-map.json");

function loadMap(): Record<string, string> {
  if (!fs.existsSync(MAP_PATH)) return {};
  return JSON.parse(fs.readFileSync(MAP_PATH, "utf8"));
}

function saveMap(map: Record<string, string>) {
  fs.writeFileSync(MAP_PATH, JSON.stringify(map, null, 2) + "\n", "utf8");
}

async function mediaRowExists(id: string): Promise<boolean> {
  const { data } = await supabase.from("media").select("id").eq("id", id).maybeSingle();
  return Boolean(data);
}

async function migrateOne(entry: (typeof mediaManifest)[number], map: Record<string, string>) {
  const existingId = map[entry.url];
  if (existingId && (await mediaRowExists(existingId))) {
    console.log(`skip  (already migrated): ${entry.slug}`);
    return;
  }

  console.log(`fetch  ${entry.slug} ...`);
  const res = await fetch(entry.url);
  if (!res.ok) {
    throw new Error(`Failed to download ${entry.slug} (${entry.url}): HTTP ${res.status}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const dimensions = probe.sync(buffer);
  const ext = dimensions?.type ?? "jpg";
  const mime = dimensions?.mime ?? "image/jpeg";
  const storagePath = `${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("media").upload(storagePath, buffer, {
    contentType: mime,
    cacheControl: "3600",
    upsert: false,
  });
  if (uploadError) {
    throw new Error(`Upload failed for ${entry.slug}: ${uploadError.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(storagePath);

  const { data: row, error: insertError } = await supabase
    .from("media")
    .insert({
      folder_id: null,
      filename: `${entry.slug}.${ext}`,
      storage_path: storagePath,
      url: publicUrl,
      mime_type: mime,
      width: dimensions?.width ?? null,
      height: dimensions?.height ?? null,
      size_bytes: buffer.byteLength,
      alt_text_en: entry.altEn,
      alt_text_ar: entry.altAr,
      uploaded_by: null,
    })
    .select("id")
    .single();

  if (insertError || !row) {
    throw new Error(`Insert failed for ${entry.slug}: ${insertError?.message}`);
  }

  map[entry.url] = row.id;
  saveMap(map);
  console.log(
    `done   ${entry.slug} -> ${row.id} (${dimensions?.width ?? "?"}x${dimensions?.height ?? "?"}, ${(buffer.byteLength / 1024).toFixed(0)}KB)`
  );
}

async function main() {
  const map = loadMap();
  console.log(`Migrating ${mediaManifest.length} images...\n`);

  for (const entry of mediaManifest) {
    await migrateOne(entry, map);
  }

  const { count } = await supabase.from("media").select("id", { count: "exact", head: true });
  console.log(`\nDone. media table row count: ${count}`);
  if (count !== mediaManifest.length) {
    console.warn(
      `WARNING: expected ${mediaManifest.length} rows but found ${count}. Investigate before running migrate:content.`
    );
  }
}

main().catch((err) => {
  console.error("MIGRATION FAILED:", err);
  process.exit(1);
});
