import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NavItemForm } from "../NavItemForm";
import { updateNavItem } from "../actions";
import type { NavItemRow } from "@/types/database";

export const metadata = { title: "Edit navigation item" };

export default async function EditNavItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("nav_items").select("*").eq("id", id).single();

  if (!data) {
    notFound();
  }

  return <NavItemForm action={updateNavItem.bind(null, id)} item={data as NavItemRow} />;
}
