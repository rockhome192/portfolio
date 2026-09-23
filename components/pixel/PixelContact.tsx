"use client";

import { useEffect, useRef } from "react";
import { PixelSection } from "./PixelSection";
import { useContactForm } from "@/lib/use-contact-form";
import { contact } from "@/lib/projects";

/**
 * POST OFFICE — the contact form.
 *
 * The canvas version's SEND button set `sent: true` and nothing else: it showed
 * "MESSAGE SENT!" to someone whose message had gone nowhere. This one posts to
 * /api/contact, which validates with the same zod schema, rate-limits through
 * Upstash and sends through Resend.
 *
 * Its ids are prefixed so this form and components/ContactForm.tsx can coexist
 * in the repo without two elements ever claiming the same id.
 */
export function PixelContact() {
  const { values, errors, status, formError, submitting, set, onSubmit, reset } =
    useContactForm();

  /*
    On success the whole form unmounts, taking the focused SEND button with it,
    and focus falls back to <body>. A keyboard visitor hears the confirmation
    through role="status" and then finds their next Tab starting from the top of
    the document. Move focus to the confirmation instead — the same trick
    PixelSection uses for a hash target.
  */
  const sentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (status === "success") sentRef.current?.focus();
  }, [status]);

  return (
    <PixelSection
      as="h1"
      id="contact"
      room="POST OFFICE"
      lede="Looking for a full-stack or frontend role where craft matters."
    >
      <div className="pm-two-col">
        <div className="pm-prose">
          <h2 className="pm-sr-only">How to reach me</h2>
          <a href={`mailto:${contact.email}`} className="pm-mailto">
            {contact.email}
          </a>
          <dl className="pm-facts">
            <dt>BASED</dt>
            <dd>{contact.location}</dd>
            <dt>CODE</dt>
            <dd>
              <a href={contact.github} target="_blank" rel="noreferrer" className="pm-inline-link">
                {contact.githubLabel} &gt;
              </a>
            </dd>
            <dt>CV</dt>
            <dd>
              <a href={contact.resume} className="pm-inline-link">
                resume.pdf &gt;
              </a>
            </dd>
          </dl>
        </div>

        {status === "success" ? (
          <div ref={sentRef} tabIndex={-1} role="status" className="pm-card pm-card-quiet pm-sent">
            <h3 className="pm-card-title" style={{ color: "var(--pm-lime)" }}>
              MESSAGE SENT
            </h3>
            <p className="pm-body">
              It really did send this time. I&apos;ll reply from {contact.email}.
            </p>
            <button type="button" className="pm-btn" onClick={reset}>
              SEND ANOTHER
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="pm-form">
            <h2 className="pm-sr-only">Send a message</h2>
            {/* Honeypot — hidden from humans, tempting to bots. */}
            <div aria-hidden="true" className="pm-honeypot">
              <label htmlFor="pm-website">Website (leave blank)</label>
              <input
                id="pm-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(e) => set("website", e.target.value)}
              />
            </div>

            <PixelField id="pm-name" label="YOUR NAME" error={errors.name}>
              <input
                id="pm-name"
                type="text"
                maxLength={80}
                autoComplete="name"
                className={errors.name ? "pm-input pm-input-bad" : "pm-input"}
                placeholder="Player 2"
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "pm-name-err" : undefined}
                disabled={submitting}
              />
            </PixelField>

            <PixelField id="pm-email" label="EMAIL" error={errors.email}>
              <input
                id="pm-email"
                type="email"
                maxLength={160}
                autoComplete="email"
                className={errors.email ? "pm-input pm-input-bad" : "pm-input"}
                placeholder="you@company.com"
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "pm-email-err" : undefined}
                disabled={submitting}
              />
            </PixelField>

            <PixelField id="pm-message" label="MESSAGE" error={errors.message}>
              <textarea
                id="pm-message"
                rows={5}
                maxLength={3000}
                className={errors.message ? "pm-input pm-input-bad" : "pm-input"}
                placeholder="What are you building?"
                value={values.message}
                onChange={(e) => set("message", e.target.value)}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "pm-message-err" : undefined}
                disabled={submitting}
              />
            </PixelField>

            {formError && (
              <p role="alert" className="pm-form-error">
                {formError}
              </p>
            )}

            <button type="submit" className="pm-btn pm-btn-primary" disabled={submitting}>
              {submitting ? "SENDING..." : "SEND >"}
            </button>
          </form>
        )}
      </div>
    </PixelSection>
  );
}

function PixelField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pm-field">
      <label htmlFor={id} className="pm-field-label">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="pm-field-error">
          {error}
        </p>
      )}
    </div>
  );
}
