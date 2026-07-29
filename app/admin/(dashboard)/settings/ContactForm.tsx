"use client";

import { useActionState } from "react";
import { updateContact, type SettingsFormState } from "./actions";
import { TextField, TextareaField } from "@/components/admin/form/Field";
import { SubmitButton } from "@/components/admin/form/SubmitButton";
import { FormCard } from "@/components/admin/form/FormCard";
import { FormMessage } from "@/components/admin/form/FormMessage";
import type { ContactSettings } from "@/types/database";

const initialState: SettingsFormState = {};

export function ContactForm({ value }: { value: ContactSettings }) {
  const [state, formAction] = useActionState(updateContact, initialState);

  return (
    <form action={formAction}>
      <FormCard
        title="Contact information"
        description="Used across the navbar, footer, contact widgets, and contact page."
        footer={
          <>
            <FormMessage status={state.status} />
            <SubmitButton />
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField name="phone" label="Phone (display)" defaultValue={value.phone} type="tel" />
          <TextField
            name="whatsapp"
            label="WhatsApp (display)"
            defaultValue={value.whatsapp}
            type="tel"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            name="whatsappNumber"
            label="WhatsApp number (digits only, for wa.me links)"
            defaultValue={value.whatsappNumber}
            hint="No + or spaces, e.g. 201002345678"
          />
          <TextField name="email" label="Email" defaultValue={value.email} type="email" />
        </div>
        <TextareaField
          name="addressLine"
          label="Address"
          defaultValue={value.addressLine}
          rows={2}
        />
        <TextField name="hours" label="Office hours" defaultValue={value.hours} />
        <TextField
          name="mapsEmbedUrl"
          label="Google Maps embed URL"
          defaultValue={value.mapsEmbedUrl}
          type="url"
          hint="Optional — used for an embedded map on the Contact page"
        />
      </FormCard>
    </form>
  );
}
