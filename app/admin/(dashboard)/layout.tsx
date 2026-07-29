import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/supabase/profile";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentProfile();

  if (!session) {
    redirect("/admin/login");
  }

  return <AdminShell profile={session.profile}>{children}</AdminShell>;
}
