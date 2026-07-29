"use client";

import { createContext, useContext, useState } from "react";

type EditorLocale = "en" | "ar";

const LocaleTabsContext = createContext<{
  locale: EditorLocale;
  setLocale: (locale: EditorLocale) => void;
} | null>(null);

export function LocaleTabsProvider({
  children,
  defaultLocale = "en",
}: {
  children: React.ReactNode;
  defaultLocale?: EditorLocale;
}) {
  const [locale, setLocale] = useState<EditorLocale>(defaultLocale);

  return (
    <LocaleTabsContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleTabsContext.Provider>
  );
}

export function useEditorLocale() {
  const ctx = useContext(LocaleTabsContext);
  if (!ctx) {
    throw new Error("useEditorLocale must be used within a LocaleTabsProvider");
  }
  return ctx;
}

export type { EditorLocale };
