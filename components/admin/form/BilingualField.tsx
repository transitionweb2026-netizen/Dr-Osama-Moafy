"use client";

import { useEditorLocale } from "./LocaleTabsContext";
import { TextField, TextareaField } from "./Field";

// Note: these never set the native `required` attribute — a `required`
// input hidden behind `display:none` (the inactive locale tab) can block
// form submission in some browsers without showing any visible error.
// Required bilingual fields are validated server-side in the Server Action.

export function BilingualTextField({
  baseName,
  label,
  defaultValueEn,
  defaultValueAr,
  hint,
  required,
}: {
  baseName: string;
  label: string;
  defaultValueEn?: string | null;
  defaultValueAr?: string | null;
  hint?: string;
  required?: boolean;
}) {
  const { locale } = useEditorLocale();
  const displayLabel = required ? `${label} *` : label;

  return (
    <div>
      <div className={locale === "en" ? "block" : "hidden"}>
        <TextField
          name={`${baseName}_en`}
          label={`${displayLabel} (English)`}
          defaultValue={defaultValueEn}
          hint={hint}
        />
      </div>
      <div dir="rtl" className={locale === "ar" ? "block" : "hidden"}>
        <TextField
          name={`${baseName}_ar`}
          label={`${displayLabel} (Arabic)`}
          defaultValue={defaultValueAr}
          hint={hint}
        />
      </div>
    </div>
  );
}

export function BilingualTextareaField({
  baseName,
  label,
  defaultValueEn,
  defaultValueAr,
  hint,
  rows = 4,
  required,
}: {
  baseName: string;
  label: string;
  defaultValueEn?: string | null;
  defaultValueAr?: string | null;
  hint?: string;
  rows?: number;
  required?: boolean;
}) {
  const { locale } = useEditorLocale();
  const displayLabel = required ? `${label} *` : label;

  return (
    <div>
      <div className={locale === "en" ? "block" : "hidden"}>
        <TextareaField
          name={`${baseName}_en`}
          label={`${displayLabel} (English)`}
          defaultValue={defaultValueEn}
          hint={hint}
          rows={rows}
        />
      </div>
      <div dir="rtl" className={locale === "ar" ? "block" : "hidden"}>
        <TextareaField
          name={`${baseName}_ar`}
          label={`${displayLabel} (Arabic)`}
          defaultValue={defaultValueAr}
          hint={hint}
          rows={rows}
        />
      </div>
    </div>
  );
}
