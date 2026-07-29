import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TreatmentForm, type TreatmentWithImage } from "../TreatmentForm";
import { updateTreatment } from "../actions";

export const metadata = { title: "Edit treatment" };

export default async function EditTreatmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("treatments")
    .select("*, image:media(id, url, filename)")
    .eq("id", id)
    .single();

  if (!data) {
    notFound();
  }

  return (
    <TreatmentForm
      action={updateTreatment.bind(null, id)}
      treatment={data as unknown as TreatmentWithImage}
    />
  );
}
