"use client";

import { useActionState } from "react";
import { updateBranding, type SettingsFormState } from "./actions";
import { TextField } from "@/components/admin/form/Field";
import { ImagePicker } from "@/components/admin/form/ImagePicker";
import { SubmitButton } from "@/components/admin/form/SubmitButton";
import { FormCard } from "@/components/admin/form/FormCard";
import { FormMessage } from "@/components/admin/form/FormMessage";
import type { BrandingSettings } from "@/types/database";

const initialState: SettingsFormState = {};

export function BrandingForm({ value }: { value: BrandingSettings }) {
  const [state, formAction] = useActionState(updateBranding, initialState);

  return (
    <form action={formAction}>
      <FormCard
        title="Branding"
        description="Site name, doctor name, tagline, and core brand assets."
        footer={
          <>
            <FormMessage status={state.status} />
            <SubmitButton />
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField name="siteName" label="Site name" defaultValue={value.siteName} />
          <TextField name="doctorName" label="Doctor name" defaultValue={value.doctorName} />
        </div>
        <TextField name="tagline" label="Tagline" defaultValue={value.tagline} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <ImagePicker
            name="logoUrl"
            label="Logo"
            valueField="url"
            defaultMedia={value.logoUrl ? { id: "", url: value.logoUrl, filename: "logo" } : null}
          />
          <ImagePicker
            name="faviconUrl"
            label="Favicon"
            valueField="url"
            defaultMedia={
              value.faviconUrl ? { id: "", url: value.faviconUrl, filename: "favicon" } : null
            }
          />
          <ImagePicker
            name="ogImageUrl"
            label="Social share image (OG)"
            valueField="url"
            defaultMedia={
              value.ogImageUrl ? { id: "", url: value.ogImageUrl, filename: "og-image" } : null
            }
          />
        </div>
      </FormCard>
    </form>
  );
}
