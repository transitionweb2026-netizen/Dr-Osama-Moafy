import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, {
                ...options,
                // Belt-and-suspenders on top of Vercel's HTTPS-only serving:
                // never let the auth cookie be sent over a plain-HTTP
                // request. Skipped in dev since http://localhost isn't
                // guaranteed to accept Secure cookies in every browser.
                secure: process.env.NODE_ENV === "production",
              })
            );
          } catch {
            // Called from a Server Component render — safe to ignore since
            // proxy.ts refreshes the session cookie on every request.
          }
        },
      },
    }
  );
}
