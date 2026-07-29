import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import "./admin.css";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | NeuroPrecision Admin" },
  robots: { index: false, follow: false },
};

// Applies the persisted theme before paint so there's no light->dark flash.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("admin-theme");
    var theme = stored === "dark" || stored === "light"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch (e) {}
})();
`;

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="admin-root font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
