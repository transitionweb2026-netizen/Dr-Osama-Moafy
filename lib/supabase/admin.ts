import "server-only";
import { createClient } from "@supabase/supabase-js";

// Service-role client — bypasses Row Level Security entirely.
// Only for privileged server-side operations (e.g. inviting/creating staff
// users via supabase.auth.admin.*). Never import into client components.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
