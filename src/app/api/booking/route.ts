import { NextResponse } from "next/server";
import { ticketTotal, validateBooking } from "@/lib/booking";

/**
 * Receives booking requests from the form.
 *
 * Set BOOKING_WEBHOOK_URL to forward each request as JSON to wherever the concierge team
 * works (Google Apps Script, Zapier/Make, Slack, an email relay...). Without it the request is
 * only logged, which is fine for development; in production the route answers 503 so visitors
 * are told to phone instead of believing a request was received when it was not.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: real visitors never see this field, bots usually fill it in.
  if (typeof body === "object" && body !== null && "company" in body && (body as { company?: unknown }).company) {
    return NextResponse.json({ ok: true });
  }

  const result = validateBooking(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  const locale = (body as { locale?: unknown }).locale === "en" ? "en" : "vi";
  const payload = { ...result.data, total: ticketTotal(result.data.tickets), locale, submittedAt: new Date().toISOString() };
  const webhook = process.env.BOOKING_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV === "production") {
      console.error("BOOKING_WEBHOOK_URL is not set; booking request was not delivered.");
      return NextResponse.json({ ok: false }, { status: 503 });
    }
    console.info("[booking] (no webhook configured)", payload);
    return NextResponse.json({ ok: true });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to forward booking request", error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
