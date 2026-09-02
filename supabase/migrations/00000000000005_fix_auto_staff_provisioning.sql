-- ============================================================================
-- SECURITY FIX: new auth.users signups no longer automatically receive a
-- `profiles` row.
--
-- Why: is_staff() (used by nearly every RLS write policy in this schema)
-- returns true for ANY row in `profiles`, regardless of role. The
-- on_auth_user_created trigger auto-inserted a profiles row (role defaulting
-- to 'editor') for every new auth.users row, with no way to distinguish an
-- admin deliberately provisioning a new staff member from a stranger calling
-- the public signUp() API with only the anon key. Confirmed empirically:
-- a self-registered account was immediately granted full CMS write access.
--
-- Fix: stop auto-creating profiles rows on signup. Existing profiles (your
-- current admin/editor accounts) are untouched — this only changes what
-- happens for FUTURE auth.users inserts.
--
-- Provisioning a new staff member from now on:
--   1. Create their auth account (Supabase Dashboard -> Authentication ->
--      Add user, or supabase.auth.admin.createUser() server-side).
--   2. As an existing admin, insert their profiles row, e.g.:
--        insert into public.profiles (id, email, display_name, role)
--        values ('<their-auth-user-id>', '<their-email>', '<name>', 'editor');
--      (RLS's profiles_admin_insert policy requires this to run as an admin.)
-- ============================================================================

drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
