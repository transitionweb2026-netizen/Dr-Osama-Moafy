"use client";

import { useActionState } from "react";
import { updateCookieBanner, type SettingsFormState } from "./actions";
import { SwitchField } from "@/components/admin/form/Field";
import { SubmitButton } from "@/components/admin/form/SubmitButton";
import { FormCard } from "@/components/admin/form/FormCard";
import { FormMessage } from "@/components/admin/form/FormMessage";
import { LocaleTabsProvider } from "@/components/admin/form/LocaleTabsContext";
import { LocaleTabs } from "@/components/admin/form/LocaleTabs";
import { BilingualTextareaField } from "@/components/admin/form/BilingualField";
import type { CookieBannerSettings } from "@/types/database";

const initialState: SettingsFormState = {};

export function CookieBannerForm({ value }: { value: CookieBannerSettings }) {
  const [state, formAction] = useActionState(updateCookieBanner, initialState);

  return (
    <form action={formAction}>
      <FormCard
        title="Cookie banner"
        description="Shown to first-time visitors when enabled."
        footer={
          <>
            <FormMessage status={state.status} />
            <SubmitButton />
          </>
        }
      >
        <SwitchField name="enabled" label="Show cookie banner" defaultChecked={value.enabled} />

        <LocaleTabsProvider>
          <LocaleTabs />
          <div className="mt-4">
            <BilingualTextareaField
              baseName="text"
              label="Banner text"
              defaultValueEn={value.textEn}
              defaultValueAr={value.textAr}
              rows={3}
            />
          </div>
        </LocaleTabsProvider>
      </FormCard>
    </form>
  );
}
