"use client";

import { useActionState } from "react";
import { LocaleTabsProvider } from "@/components/admin/form/LocaleTabsContext";
import { LocaleTabs } from "@/components/admin/form/LocaleTabs";
import { BilingualTextField, BilingualTextareaField } from "@/components/admin/form/BilingualField";
import { TextField, SelectField } from "@/components/admin/form/Field";
import { ImagePicker } from "@/components/admin/form/ImagePicker";
import { VideoFilePicker } from "@/components/admin/form/VideoFilePicker";
import { SubmitButton } from "@/components/admin/form/SubmitButton";
import { FormCard } from "@/components/admin/form/FormCard";
import { FormMessage } from "@/components/admin/form/FormMessage";
import type { VideoRow } from "@/types/database";
import type { VideoFormState } from "./actions";

export interface VideoWithThumbnail extends VideoRow {
  thumbnail: { id: string; url: string; filename: string } | null;
}

export function VideoForm({
  action,
  video,
}: {
  action: (prevState: VideoFormState, formData: FormData) => Promise<VideoFormState>;
  video?: VideoWithThumbnail;
}) {
  const [state, formAction] = useActionState(action, {} as VideoFormState);

  return (
    <form action={formAction}>
      <LocaleTabsProvider>
        <FormCard
          title={video ? "Edit video" : "New video"}
          footer={
            <>
              <FormMessage status={state.status} />
              <SubmitButton />
            </>
          }
        >
          <LocaleTabs />

          <BilingualTextField
            baseName="title"
            label="Title"
            defaultValueEn={video?.title_en}
            defaultValueAr={video?.title_ar}
            required
          />
          <TextField
            name="slug"
            label="URL slug"
            defaultValue={video?.slug}
            placeholder="leaving-blank-uses-the-english-title"
            hint="Used in the video's detail page URL. Leave blank to generate from the English title."
          />
          <BilingualTextareaField
            baseName="description"
            label="Description"
            defaultValueEn={video?.description_en}
            defaultValueAr={video?.description_ar}
            rows={3}
          />
          <BilingualTextField
            baseName="category"
            label="Category"
            defaultValueEn={video?.category_en}
            defaultValueAr={video?.category_ar}
          />

          <TextField
            name="duration"
            label="Duration"
            defaultValue={video?.duration}
            placeholder="4:32"
          />
          <VideoFilePicker name="video_url" label="Video" defaultValue={video?.video_url} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ImagePicker
              name="thumbnail_id"
              label="Thumbnail"
              defaultMedia={video?.thumbnail}
            />
            <div className="flex flex-col gap-4">
              <SelectField
                name="placement"
                label="Placement"
                defaultValue={video?.placement ?? "insights"}
                options={[
                  { value: "insights", label: "Videos page — Surgical Insights" },
                  { value: "patient_stories", label: "Videos page — Patient Stories" },
                  { value: "home", label: "Home page — Educational Shorts" },
                ]}
              />
              <SelectField
                name="status"
                label="Status"
                defaultValue={video?.status ?? "draft"}
                options={[
                  { value: "draft", label: "Draft (hidden from site)" },
                  { value: "published", label: "Published" },
                ]}
              />
            </div>
          </div>
        </FormCard>
      </LocaleTabsProvider>
    </form>
  );
}
