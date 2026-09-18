"use client";

import { useContactForm } from "@/lib/use-contact-form";

// The submit handler, validation and status live in lib/use-contact-form.ts —
// the pixel page renders the same behaviour behind completely different markup.
const fieldBase =
  "w-full rounded-lg border bg-surface2 px-3.5 py-2.5 font-sans text-[15px] text-text " +
  "placeholder:text-faint outline-none transition-colors focus:border-accent";

export function ContactForm() {
  const { values, errors, status, formError, submitting, set, onSubmit, reset } =
    useContactForm();

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-border bg-surface p-6 font-mono text-sm"
      >
        <div className="flex items-center gap-2 text-ok">
          <span className="h-[7px] w-[7px] rounded-full bg-ok" />
          message sent
        </div>
        <p className="mt-2 font-sans text-[15px] text-muted">
          Thanks — I&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-4 text-faint underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-border bg-surface p-6"
    >
      {/* Honeypot — hidden from humans, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website (leave blank)</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="name" error={errors.name}>
          <input
            id="name"
            type="text"
            maxLength={80}
            className={`${fieldBase} ${errors.name ? "border-[#e06c5b]" : "border-border"}`}
            placeholder="Your name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-err" : undefined}
            disabled={submitting}
          />
        </Field>

        <Field label="email" error={errors.email}>
          <input
            id="email"
            type="email"
            maxLength={160}
            className={`${fieldBase} ${errors.email ? "border-[#e06c5b]" : "border-border"}`}
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-err" : undefined}
            disabled={submitting}
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="message" error={errors.message}>
          <textarea
            id="message"
            rows={5}
            maxLength={3000}
            className={`${fieldBase} resize-y ${errors.message ? "border-[#e06c5b]" : "border-border"}`}
            placeholder="What would you like to build?"
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-err" : undefined}
            disabled={submitting}
          />
        </Field>
      </div>

      {formError && (
        <p role="alert" className="mt-4 font-mono text-[13px] text-[#e06c5b]">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-mono text-sm font-semibold text-on-accent transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {submitting ? "sending…" : "send message"}
        {!submitting && <span className="opacity-70">↗</span>}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={label} className="mb-1.5 block font-mono text-[13px] text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${label}-err`} role="alert" className="mt-1.5 font-mono text-[12px] text-[#e06c5b]">
          {error}
        </p>
      )}
    </div>
  );
}
