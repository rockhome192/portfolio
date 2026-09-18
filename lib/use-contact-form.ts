"use client";

import { useState } from "react";
import { contactSchema, toFieldErrors, type ContactInput } from "./contact-schema";

/**
 * Everything the contact form does that is not markup.
 *
 * Pulled out of ContactForm.tsx when the pixel page arrived, because the two
 * forms look nothing alike and behave identically. Copying the submit handler
 * into the second one would have meant two places to fix the day the API route
 * changes its error shape — and the one that was not being looked at would be
 * the one a stranger actually uses.
 */

export type ContactStatus = "idle" | "submitting" | "success" | "error";

const EMPTY: ContactInput = { name: "", email: "", message: "", website: "" };

export function useContactForm() {
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [formError, setFormError] = useState<string>("");

  function set<K extends keyof ContactInput>(key: K, v: string) {
    setValues((s) => ({ ...s, [key]: v }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    // Client-side validation with the SAME schema the server uses.
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(toFieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (res.ok) {
        setStatus("success");
        setValues(EMPTY);
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (res.status === 422 && data.fieldErrors) setErrors(data.fieldErrors);
      setFormError(data.error || "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setFormError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  return {
    values,
    errors,
    status,
    formError,
    submitting: status === "submitting",
    set,
    onSubmit,
    reset: () => setStatus("idle"),
  };
}
