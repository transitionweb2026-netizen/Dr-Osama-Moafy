"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  label = "Save changes",
  pendingLabel = "Saving…",
}: {
  label?: string;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2 rounded-lg bg-admin-accent px-4 py-2.5 text-sm font-semibold text-admin-accent-contrast transition-opacity hover:opacity-90 disabled:opacity-60"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
