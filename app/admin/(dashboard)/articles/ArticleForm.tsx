"use client";

import { useActionState } from "react";
import { LocaleTabsProvider } from "@/components/admin/form/LocaleTabsContext";
import { LocaleTabs } from "@/components/admin/form/LocaleTabs";
import { BilingualTextField, BilingualTextareaField } from "@/components/admin/form/BilingualField";
import { TextField, SelectField, SwitchField } from "@/components/admin/form/Field";
import { ImagePicker } from "@/components/admin/form/ImagePicker";
import { SubmitButton } from "@/components/admin/form/SubmitButton";
import { FormCard } from "@/components/admin/form/FormCard";
import { FormMessage } from "@/components/admin/form/FormMessage";
import type { ArticleRow } from "@/types/database";
import type { ArticleFormState } from "./actions";

export interface ArticleWithCover extends ArticleRow {
  cover_image: { id: string; url: string; filename: string } | null;
}

export function ArticleForm({
  action,
  article,
}: {
  action: (prevState: ArticleFormState, formData: FormData) => Promise<ArticleFormState>;
  article?: ArticleWithCover;
}) {
  const [state, formAction] = useActionState(action, {} as ArticleFormState);

  return (
    <form action={formAction}>
      <LocaleTabsProvider>
        <FormCard
          title={article ? "Edit article" : "New article"}
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
            defaultValueEn={article?.title_en}
            defaultValueAr={article?.title_ar}
            required
          />
          <TextField
            name="slug"
            label="URL slug"
            defaultValue={article?.slug}
            placeholder="leaving-blank-uses-the-english-title"
            hint="Used in the article URL. Leave blank to generate from the English title."
          />
          <BilingualTextareaField
            baseName="excerpt"
            label="Excerpt (shown on cards)"
            defaultValueEn={article?.excerpt_en}
            defaultValueAr={article?.excerpt_ar}
            rows={2}
          />
          <BilingualTextareaField
            baseName="body"
            label="Body"
            defaultValueEn={article?.body_en}
            defaultValueAr={article?.body_ar}
            rows={10}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <BilingualTextField
              baseName="category"
              label="Category"
              defaultValueEn={article?.category_en}
              defaultValueAr={article?.category_ar}
            />
            <BilingualTextField
              baseName="read_time"
              label="Read time"
              defaultValueEn={article?.read_time_en}
              defaultValueAr={article?.read_time_ar}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ImagePicker
              name="cover_image_id"
              label="Cover image"
              defaultMedia={article?.cover_image}
            />
            <div className="flex flex-col gap-4">
              <SelectField
                name="status"
                label="Status"
                defaultValue={article?.status ?? "draft"}
                options={[
                  { value: "draft", label: "Draft (hidden from site)" },
                  { value: "published", label: "Published" },
                ]}
              />
              <SwitchField
                name="is_featured"
                label="Featured article"
                defaultChecked={article?.is_featured ?? false}
                hint="Shown in the highlighted spot at the top of the Articles page"
              />
            </div>
          </div>
        </FormCard>
      </LocaleTabsProvider>
    </form>
  );
}
