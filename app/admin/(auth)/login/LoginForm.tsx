"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin";
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form
      action={formAction}
      className="w-full max-w-[24rem] rounded-2xl border border-admin-border bg-admin-surface p-8 shadow-sm"
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="material-symbols-outlined flex h-10 w-10 items-center justify-center rounded-full bg-admin-accent text-admin-accent-contrast">
          shield_person
        </span>
        <div>
          <h1 className="text-lg font-semibold text-admin-text">Osama Mowafy Neurosurgery Admin</h1>
          <p className="text-sm text-admin-muted">Sign in to manage site content</p>
        </div>
      </div>

      <input type="hidden" name="next" value={next} />

      <div className="mb-4">
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-admin-text">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-lg border border-admin-border bg-admin-bg px-3 py-2 text-sm text-admin-text outline-none focus:border-admin-accent"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-admin-text">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-lg border border-admin-border bg-admin-bg px-3 py-2 text-sm text-admin-text outline-none focus:border-admin-accent"
        />
      </div>

      {state.error && (
        <p
          role="alert"
          className="mb-4 rounded-lg bg-admin-danger-container px-3 py-2 text-sm text-admin-danger"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-admin-accent px-4 py-2.5 text-sm font-semibold text-admin-accent-contrast transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
