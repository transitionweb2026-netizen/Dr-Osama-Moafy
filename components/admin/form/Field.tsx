"use client";

const inputClass =
  "w-full rounded-lg border border-admin-border bg-admin-bg px-3 py-2 text-sm text-admin-text outline-none focus:border-admin-accent";

function FieldShell({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-admin-text">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-admin-muted">{hint}</p>}
    </div>
  );
}

export function TextField({
  name,
  label,
  defaultValue,
  placeholder,
  type = "text",
  hint,
  required,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  placeholder?: string;
  type?: "text" | "url" | "email" | "tel";
  hint?: string;
  required?: boolean;
}) {
  return (
    <FieldShell label={label} hint={hint} htmlFor={name}>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className={inputClass}
      />
    </FieldShell>
  );
}

export function NumberField({
  name,
  label,
  defaultValue,
  hint,
  min,
}: {
  name: string;
  label: string;
  defaultValue?: number | null;
  hint?: string;
  min?: number;
}) {
  return (
    <FieldShell label={label} hint={hint} htmlFor={name}>
      <input
        id={name}
        name={name}
        type="number"
        min={min}
        defaultValue={defaultValue ?? undefined}
        className={inputClass}
      />
    </FieldShell>
  );
}

export function TextareaField({
  name,
  label,
  defaultValue,
  placeholder,
  hint,
  rows = 4,
  required,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  placeholder?: string;
  hint?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <FieldShell label={label} hint={hint} htmlFor={name}>
      <textarea
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        rows={rows}
        className={`${inputClass} resize-y`}
      />
    </FieldShell>
  );
}

export function SelectField({
  name,
  label,
  defaultValue,
  options,
  hint,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
  hint?: string;
}) {
  return (
    <FieldShell label={label} hint={hint} htmlFor={name}>
      <select id={name} name={name} defaultValue={defaultValue} className={inputClass}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

export function SwitchField({
  name,
  label,
  defaultChecked = true,
  hint,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
  hint?: string;
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-lg border border-admin-border bg-admin-bg px-3 py-2.5">
      <span>
        <span className="block text-sm font-medium text-admin-text">{label}</span>
        {hint && <span className="block text-xs text-admin-muted">{hint}</span>}
      </span>
      <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
        <input
          type="checkbox"
          name={name}
          value="true"
          defaultChecked={defaultChecked}
          className="peer sr-only"
        />
        <span className="absolute inset-0 rounded-full bg-admin-border transition-colors peer-checked:bg-admin-accent" />
        <span className="absolute left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  );
}
