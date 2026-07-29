import { ArticleForm } from "../ArticleForm";
import { createArticle } from "../actions";

export const metadata = { title: "New article" };

export default function NewArticlePage() {
  return <ArticleForm action={createArticle} />;
}
