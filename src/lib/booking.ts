import { siteConfig } from "@/data/site";
import { ticketKeys, ticketPrices, type TicketKey } from "@/data/tickets";

/** Shared by the booking form (instant feedback) and the API route (the real check). */
export const timeSlots = ["morning", "afternoon"] as const;
export type TimeSlot = (typeof timeSlots)[number];

export const maxTicketsPerType = 99;

export type BookingPayload = {
  date: string;
  slot: TimeSlot;
  tickets: Record<TicketKey, number>;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

export type BookingErrorCode = "required" | "date" | "closed" | "tickets" | "phone" | "email";
export type BookingField = "date" | "tickets" | "name" | "phone" | "email";
export type BookingErrors = Partial<Record<BookingField, BookingErrorCode>>;

type Result = { ok: true; data: BookingPayload } | { ok: false; errors: BookingErrors };

const phonePattern = /^\+?[0-9][0-9\s().-]{7,17}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function quantity(value: unknown) {
  const n = typeof value === "number" ? value : Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(n) ? Math.min(Math.max(Math.trunc(n), 0), maxTicketsPerType) : 0;
}

/** Local calendar date as YYYY-MM-DD (what <input type="date"> produces). */
export function todayISO() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

/** Whether a YYYY-MM-DD date falls on the weekly closing day (Monday). */
export function isClosedDay(date: string) {
  return new Date(`${date}T00:00:00`).getDay() === siteConfig.hours.closedWeekday;
}

export function ticketTotal(tickets: Record<TicketKey, number>) {
  return ticketKeys.reduce((sum, key) => sum + tickets[key] * ticketPrices[key], 0);
}

export function validateBooking(input: unknown): Result {
  const raw = (input ?? {}) as Record<string, unknown>;
  const rawTickets = (raw.tickets ?? {}) as Record<string, unknown>;
  const errors: BookingErrors = {};

  const data: BookingPayload = {
    date: text(raw.date, 10),
    slot: (timeSlots as readonly string[]).includes(text(raw.slot)) ? (text(raw.slot) as TimeSlot) : "morning",
    tickets: { visit: quantity(rawTickets.visit), cowboy: quantity(rawTickets.cowboy), realCowboy: quantity(rawTickets.realCowboy) },
    name: text(raw.name, 120),
    phone: text(raw.phone, 30),
    email: text(raw.email, 160),
    notes: text(raw.notes, 1000),
  };

  if (!data.date) errors.date = "required";
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || data.date < todayISO()) errors.date = "date";
  else if (isClosedDay(data.date)) errors.date = "closed";

  if (ticketTotal(data.tickets) === 0) errors.tickets = "tickets";

  if (!data.name) errors.name = "required";

  if (!data.phone) errors.phone = "required";
  else if (!phonePattern.test(data.phone)) errors.phone = "phone";

  if (data.email && !emailPattern.test(data.email)) errors.email = "email";

  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, data };
}
