"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems, siteConfig } from "@/constants/site";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`navbar-slide-in fixed top-0 left-0 right-0 z-50 w-full border-b border-outline-variant/30 transition-all duration-300 ${
        scrolled
          ? "bg-surface-container-lowest/95 shadow-xl py-3"
          : "bg-surface-container-lowest/80 py-4"
      } backdrop-blur-xl`}
    >
      <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-margin-mobile md:px-margin-desktop">
        <Link
          href="/"
          className="shrink-0 font-headline-md text-headline-md text-primary tracking-tighter uppercase"
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-lg xl:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`group relative py-1 font-label-md text-label-md transition-colors duration-[250ms] ${
                  isActive
                    ? "font-bold text-primary"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {t(item.key)}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-center rounded-full bg-primary transition-transform duration-[250ms] ease-out ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="rounded-full bg-primary px-6 py-2.5 font-headline-md text-sm text-on-primary shadow-md transition-all duration-[250ms] hover:scale-[1.03] hover:bg-primary-fixed-dim hover:text-on-primary-fixed-variant hover:shadow-[0_0_20px_rgba(0,102,107,0.35)] active:scale-[0.98]"
          >
            {t("bookAppointment")}
          </Link>
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-primary transition-transform duration-[250ms] hover:scale-110 active:scale-95"
          >
            <span className="material-symbols-outlined text-3xl transition-transform duration-300 ease-out">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="menu-drop-in border-t border-outline-variant/30 bg-surface-container-lowest px-margin-mobile py-6 xl:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative inline-block py-1 font-label-md text-label-md transition-colors duration-[250ms] ${
                      isActive
                        ? "font-bold text-primary"
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    {t(item.key)}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-center rounded-full bg-primary transition-transform duration-[250ms] ease-out ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-6 block rounded-full bg-primary px-6 py-3 text-center font-headline-md text-sm text-on-primary shadow-md transition-all duration-[250ms] active:scale-[0.98]"
          >
            {t("bookAppointment")}
          </Link>
        </nav>
      )}
    </header>
  );
}
