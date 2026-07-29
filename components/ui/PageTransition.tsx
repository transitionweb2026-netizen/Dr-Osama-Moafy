"use client";

import type { ReactNode } from "react";
import { usePathname } from "@/i18n/navigation";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-fade-in">
      {children}
    </div>
  );
}
