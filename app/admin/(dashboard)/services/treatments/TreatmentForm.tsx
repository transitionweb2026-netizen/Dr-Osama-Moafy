"use client";

import { useActionState } from "react";
import { LocaleTabsProvider } from "@/components/admin/form/LocaleTabsContext";
import { LocaleTabs } from "@/components/admin/form/LocaleTabs";
import { BilingualTextField, BilingualTextareaField } from "@/components/admin/form/BilingualField";
import { SelectField, SwitchField } from "@/components/admin/form/Field";
import { ImagePicker } from "@/components/admin/form/ImagePicker";
import { SubmitButton } from "@/components/admin/form/SubmitButton";
import { FormCard } from "@/components/admin/form/FormCard";
import { FormMessage } from "@/components/admin/form/FormMessage";
import type { TreatmentRow } from "@/types/database";
import type { TreatmentFormState } from "./actions";

export interface TreatmentWithImage extends TreatmentRow {
  image: { id: string; url: string; filename: string } | null;
}

export function TreatmentForm({
  action,
  treatment,
}: {
  action: (prevState: TreatmentFormState, formData: FormData) => Promise<TreatmentFormState>;
  treatment?: TreatmentWithImage;
}) {
  const [state, formAction] = useActionState(action, {} as TreatmentFormState);

  return (
    <form action={formAction}>
      <LocaleTabsProvider>
        <FormCard
          title={treatment ? "Edit treatment" : "New treatment"}
          description="Powers the Treatments carousel and its detail popup on the Services page."
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
            defaultValueEn={treatment?.title_en}
            defaultValueAr={treatment?.title_ar}
            required
          />
          <BilingualTextareaField
            baseName="description"
            label="Short description (shown on the carousel card)"
            defaultValueEn={treatment?.description_en}
            defaultValueAr={treatment?.description_ar}
            rows={2}
          />
          <BilingualTextareaField
            baseName="overview"
            label="Overview (popup intro)"
            defaultValueEn={treatment?.overview_en}
            defaultValueAr={treatment?.overview_ar}
            rows={3}
          />
          <BilingualTextareaField
            baseName="symptoms"
            label="Symptoms (one per line)"
            defaultValueEn={treatment?.symptoms_en?.join("\n")}
            defaultValueAr={treatment?.symptoms_ar?.join("\n")}
            rows={4}
          />
          <BilingualTextareaField
            baseName="diagnosis"
            label="Diagnosis"
            defaultValueEn={treatment?.diagnosis_en}
            defaultValueAr={treatment?.diagnosis_ar}
            rows={3}
          />
          <BilingualTextareaField
            baseName="treatment"
            label="Treatment"
            defaultValueEn={treatment?.treatment_en}
            defaultValueAr={treatment?.treatment_ar}
            rows={3}
          />
          <BilingualTextareaField
            baseName="recovery"
            label="Recovery"
            defaultValueEn={treatment?.recovery_en}
            defaultValueAr={treatment?.recovery_ar}
            rows={3}
          />
          <BilingualTextareaField
            baseName="faq"
            label="FAQ"
            defaultValueEn={treatment?.faq_en}
            defaultValueAr={treatment?.faq_ar}
            rows={3}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ImagePicker name="image_id" label="Image" defaultMedia={treatment?.image} />
            <div className="flex flex-col gap-4">
              <SwitchField
                name="has_detail"
                label="Has detail popup"
                defaultChecked={treatment?.has_detail ?? true}
              />
              <SelectField
                name="status"
                label="Status"
                defaultValue={treatment?.status ?? "draft"}
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
