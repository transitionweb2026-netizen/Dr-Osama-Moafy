import { createClient } from "@supabase/supabase-js";

// Cookie-free client for use inside unstable_cache-wrapped functions —
// lib/supabase/server.ts's client calls cookies() from next/headers, which
// throws outside a request scope (i.e. inside the cache wrapper).
export function createAnonClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}
