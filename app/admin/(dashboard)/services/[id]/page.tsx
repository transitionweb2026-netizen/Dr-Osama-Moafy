import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ServiceForm, type ServiceWithImage } from "../ServiceForm";
import { updateService } from "../actions";

export const metadata = { title: "Edit service" };

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*, image:media(id, url, filename)")
    .eq("id", id)
    .single();

  if (!data) {
    notFound();
  }

  return (
    <ServiceForm
      action={updateService.bind(null, id)}
      service={data as unknown as ServiceWithImage}
    />
  );
}
