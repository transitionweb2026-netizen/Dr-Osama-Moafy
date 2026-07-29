import { VideoForm } from "../VideoForm";
import { createVideo } from "../actions";

export const metadata = { title: "New video" };

export default function NewVideoPage() {
  return <VideoForm action={createVideo} />;
}
