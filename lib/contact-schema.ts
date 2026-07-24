import { z } from "zod";

// Shared between the client form and the API route so validation rules live in
// exactly one place — the server never trusts the client's copy, it re-parses.
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(80, "Name is too long."),
  email: z.email("Enter a valid email address.").max(160, "Email is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters.")
    .max(3000, "Message is too long."),
  // Honeypot: a hidden field real users never see or fill. Bots auto-fill inputs,
  // so a non-empty value here is a strong bot signal. Kept optional in the schema
  // and handled in the route (we fake success rather than reject, so bots don't
  // learn to skip it).
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

// Flatten a ZodError into { field: firstMessage } — works the same on client and
// server, and avoids the version-specific .flatten() helper.
export function toFieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in out)) out[key] = issue.message;
  }
  return out;
}
