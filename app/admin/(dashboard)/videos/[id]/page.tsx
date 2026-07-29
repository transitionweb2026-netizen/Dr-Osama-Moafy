import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { VideoForm, type VideoWithThumbnail } from "../VideoForm";
import { updateVideo } from "../actions";

export const metadata = { title: "Edit video" };

export default async function EditVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("videos")
    .select("*, thumbnail:media(id, url, filename)")
    .eq("id", id)
    .single();

  if (!data) {
    notFound();
  }

  return (
    <VideoForm action={updateVideo.bind(null, id)} video={data as unknown as VideoWithThumbnail} />
  );
}
