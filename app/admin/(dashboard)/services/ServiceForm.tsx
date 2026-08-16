"use client";

import { useActionState } from "react";
import { LocaleTabsProvider } from "@/components/admin/form/LocaleTabsContext";
import { LocaleTabs } from "@/components/admin/form/LocaleTabs";
import { BilingualTextField, BilingualTextareaField } from "@/components/admin/form/BilingualField";
import { SelectField } from "@/components/admin/form/Field";
import { ImagePicker } from "@/components/admin/form/ImagePicker";
import { IconPicker } from "@/components/admin/form/IconPicker";
import { SubmitButton } from "@/components/admin/form/SubmitButton";
import { FormCard } from "@/components/admin/form/FormCard";
import { FormMessage } from "@/components/admin/form/FormMessage";
import type { ServiceRow } from "@/types/database";
import type { ServiceFormState } from "./actions";

export interface ServiceWithImage extends ServiceRow {
  image: { id: string; url: string; filename: string } | null;
}

export function ServiceForm({
  action,
  service,
}: {
  action: (prevState: ServiceFormState, formData: FormData) => Promise<ServiceFormState>;
  service?: ServiceWithImage;
}) {
  const [state, formAction] = useActionState(action, {} as ServiceFormState);

  return (
    <form action={formAction}>
      <LocaleTabsProvider>
        <FormCard
          title={service ? "Edit service" : "New service"}
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
            defaultValueEn={service?.title_en}
            defaultValueAr={service?.title_ar}
            required
          />
          <BilingualTextareaField
            baseName="description"
            label="Short description (shown on the grid card)"
            defaultValueEn={service?.description_en}
            defaultValueAr={service?.description_ar}
            rows={2}
          />
          <BilingualTextareaField
            baseName="overview"
            label="Overview (shown in the detail popup)"
            defaultValueEn={service?.overview_en}
            defaultValueAr={service?.overview_ar}
            rows={4}
          />
          <BilingualTextareaField
            baseName="key_points"
            label="Key points (one per line)"
            defaultValueEn={service?.key_points_en?.join("\n")}
            defaultValueAr={service?.key_points_ar?.join("\n")}
            rows={4}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ImagePicker name="image_id" label="Card image" defaultMedia={service?.image} />
            <div className="flex flex-col gap-4">
              <IconPicker
                name="icon"
                label="Icon (fallback if no image)"
                defaultValue={service?.icon}
                placeholder="neurology"
              />
              <SelectField
                name="status"
                label="Status"
                defaultValue={service?.status ?? "draft"}
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
