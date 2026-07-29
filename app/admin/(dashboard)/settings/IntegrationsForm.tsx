"use client";

import { useActionState } from "react";
import { updateIntegrations, type SettingsFormState } from "./actions";
import { TextField } from "@/components/admin/form/Field";
import { SubmitButton } from "@/components/admin/form/SubmitButton";
import { FormCard } from "@/components/admin/form/FormCard";
import { FormMessage } from "@/components/admin/form/FormMessage";
import type { IntegrationSettings } from "@/types/database";

const initialState: SettingsFormState = {};

export function IntegrationsForm({ value }: { value: IntegrationSettings }) {
  const [state, formAction] = useActionState(updateIntegrations, initialState);

  return (
    <form action={formAction}>
      <FormCard
        title="Integrations"
        description="Analytics and tracking IDs. Leave blank to disable."
        footer={
          <>
            <FormMessage status={state.status} />
            <SubmitButton />
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <TextField
            name="gaId"
            label="Google Analytics ID"
            defaultValue={value.gaId}
            placeholder="G-XXXXXXXXXX"
          />
          <TextField
            name="gtmId"
            label="Google Tag Manager ID"
            defaultValue={value.gtmId}
            placeholder="GTM-XXXXXXX"
          />
          <TextField
            name="metaPixelId"
            label="Meta Pixel ID"
            defaultValue={value.metaPixelId}
            placeholder="123456789012345"
          />
        </div>
      </FormCard>
    </form>
  );
}
