import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ArticleForm, type ArticleWithCover } from "../ArticleForm";
import { updateArticle } from "../actions";

export const metadata = { title: "Edit article" };

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("*, cover_image:media(id, url, filename)")
    .eq("id", id)
    .single();

  if (!data) {
    notFound();
  }

  return (
    <ArticleForm
      action={updateArticle.bind(null, id)}
      article={data as unknown as ArticleWithCover}
    />
  );
}
