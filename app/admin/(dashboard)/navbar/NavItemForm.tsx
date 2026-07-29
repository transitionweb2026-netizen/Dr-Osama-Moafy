"use client";

import { useActionState } from "react";
import { LocaleTabsProvider } from "@/components/admin/form/LocaleTabsContext";
import { LocaleTabs } from "@/components/admin/form/LocaleTabs";
import { BilingualTextField } from "@/components/admin/form/BilingualField";
import { TextField, SwitchField } from "@/components/admin/form/Field";
import { SubmitButton } from "@/components/admin/form/SubmitButton";
import { FormCard } from "@/components/admin/form/FormCard";
import { FormMessage } from "@/components/admin/form/FormMessage";
import type { NavItemRow } from "@/types/database";
import type { NavItemFormState } from "./actions";

export function NavItemForm({
  action,
  item,
}: {
  action: (prevState: NavItemFormState, formData: FormData) => Promise<NavItemFormState>;
  item?: NavItemRow;
}) {
  const [state, formAction] = useActionState(action, {} as NavItemFormState);

  return (
    <form action={formAction}>
      <LocaleTabsProvider>
        <FormCard
          title={item ? "Edit navigation item" : "New navigation item"}
          footer={
            <>
              <FormMessage status={state.status} />
              <SubmitButton />
            </>
          }
        >
          <LocaleTabs />
          <BilingualTextField
            baseName="label"
            label="Label"
            defaultValueEn={item?.label_en}
            defaultValueAr={item?.label_ar}
            required
          />
          <TextField
            name="href"
            label="Link"
            defaultValue={item?.href}
            placeholder="/services"
            hint="A path on this site (e.g. /services) or a full URL"
            required
          />
          <SwitchField
            name="is_visible"
            label="Visible in navbar"
            defaultChecked={item?.is_visible ?? true}
          />
        </FormCard>
      </LocaleTabsProvider>
    </form>
  );
}
