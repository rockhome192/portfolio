import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, toFieldErrors } from "@/lib/contact-schema";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // 1. Parse the body defensively — a malformed request shouldn't 500.
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // 2. Re-validate on the server. Never trust the client's validation.
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form fields.", fieldErrors: toFieldErrors(parsed.error) },
      { status: 422 },
    );
  }
  const { name, email, message, website } = parsed.data;

  // 3. Honeypot: only bots fill the hidden field. Return a fake success so the
  //    bot believes it worked and doesn't adapt.
  if (website && website.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 4. Rate limit per IP (skipped automatically if Upstash isn't configured).
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const limit = await checkRateLimit(ip);
  if (limit && !limit.success) {
    return NextResponse.json(
      { error: "Too many messages — please try again in a few minutes." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  // 5. Send the email via Resend.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form is not configured: missing RESEND_API_KEY or CONTACT_TO_EMAIL.");
    return NextResponse.json(
      { error: "The contact form isn't configured yet — please email me directly." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.emails.send({
      // Resend's shared sender works until you verify your own domain.
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to,
      replyTo: email, // reply straight to the sender from your inbox
      subject: `Portfolio contact — ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Couldn't send your message. Please try again." }, { status: 502 });
    }
  } catch (err) {
    console.error("Resend threw:", err);
    return NextResponse.json({ error: "Couldn't send your message. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
