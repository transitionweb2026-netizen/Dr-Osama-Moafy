"use client";

import { useEditorLocale, type EditorLocale } from "./LocaleTabsContext";

const TABS: { value: EditorLocale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic" },
];

export function LocaleTabs() {
  const { locale, setLocale } = useEditorLocale();

  return (
    <div
      role="tablist"
      aria-label="Content language"
      className="inline-flex rounded-lg border border-admin-border bg-admin-surface-alt p-1"
    >
      {TABS.map((tab) => (
        <button
          key={tab.value}
          type="button"
          role="tab"
          aria-selected={locale === tab.value}
          onClick={() => setLocale(tab.value)}
          className={`rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors ${
            locale === tab.value
              ? "bg-admin-accent text-admin-accent-contrast"
              : "text-admin-muted hover:text-admin-text"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
