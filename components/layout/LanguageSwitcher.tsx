"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";

const labels: Record<string, string> = {
  en: "EN",
  ar: "AR",
};

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  return (
    <div
      className={`flex items-center rounded-full border border-outline-variant bg-surface-container-lowest p-1 text-label-md font-label-md ${className}`}
      role="group"
      aria-label="Language switcher"
    >
      {routing.locales.map((cur) => (
        <button
          key={cur}
          type="button"
          aria-pressed={cur === locale}
          onClick={() =>
            router.replace(
              // @ts-expect-error -- params shape depends on the current route
              { pathname, params },
              { locale: cur },
            )
          }
          className={`rounded-full px-3 py-1 transition-all duration-[250ms] ${
            cur === locale
              ? "bg-primary text-on-primary"
              : "text-on-surface-variant hover:scale-105 hover:text-primary"
          }`}
        >
          {labels[cur] ?? cur.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
