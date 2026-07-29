"use client";

import { useActionState } from "react";
import { updateFooterText, type FooterFormState } from "./actions";
import { LocaleTabsProvider } from "@/components/admin/form/LocaleTabsContext";
import { LocaleTabs } from "@/components/admin/form/LocaleTabs";
import { BilingualTextField, BilingualTextareaField } from "@/components/admin/form/BilingualField";
import { SubmitButton } from "@/components/admin/form/SubmitButton";
import { FormCard } from "@/components/admin/form/FormCard";
import { FormMessage } from "@/components/admin/form/FormMessage";
import type { FooterSettings } from "@/types/database";

const initialState: FooterFormState = {};

export function FooterTextForm({ value }: { value: FooterSettings }) {
  const [state, formAction] = useActionState(updateFooterText, initialState);

  return (
    <form action={formAction}>
      <LocaleTabsProvider>
        <FormCard
          title="Footer text"
          description="Blurb, column labels, and copyright shown at the bottom of every page."
          footer={
            <>
              <FormMessage status={state.status} />
              <SubmitButton />
            </>
          }
        >
          <LocaleTabs />

          <BilingualTextareaField
            baseName="blurb"
            label="Blurb"
            defaultValueEn={value.blurbEn}
            defaultValueAr={value.blurbAr}
            rows={3}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <BilingualTextField
              baseName="quickLinksLabel"
              label="Column: Quick Links"
              defaultValueEn={value.quickLinksLabelEn}
              defaultValueAr={value.quickLinksLabelAr}
            />
            <BilingualTextField
              baseName="legalLabel"
              label="Column: Legal"
              defaultValueEn={value.legalLabelEn}
              defaultValueAr={value.legalLabelAr}
            />
            <BilingualTextField
              baseName="contactLabel"
              label="Column: Contact"
              defaultValueEn={value.contactLabelEn}
              defaultValueAr={value.contactLabelAr}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <BilingualTextField
              baseName="privacyPolicy"
              label="Privacy Policy label"
              defaultValueEn={value.privacyPolicyEn}
              defaultValueAr={value.privacyPolicyAr}
            />
            <BilingualTextField
              baseName="termsOfService"
              label="Terms of Service label"
              defaultValueEn={value.termsOfServiceEn}
              defaultValueAr={value.termsOfServiceAr}
            />
          </div>

          <BilingualTextField
            baseName="copyright"
            label="Copyright"
            defaultValueEn={value.copyrightEn}
            defaultValueAr={value.copyrightAr}
            hint="Use {year} where the current year should appear"
          />
        </FormCard>
      </LocaleTabsProvider>
    </form>
  );
}
