export function FormCard({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-admin-border bg-admin-surface">
      <div className="border-b border-admin-border px-5 py-4">
        <h2 className="text-base font-semibold text-admin-text">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-admin-muted">{description}</p>}
      </div>
      <div className="flex flex-col gap-5 px-5 py-5">{children}</div>
      {footer && (
        <div className="flex items-center justify-end gap-3 border-t border-admin-border px-5 py-4">
          {footer}
        </div>
      )}
    </div>
  );
}
