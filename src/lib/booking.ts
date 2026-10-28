import { packageKeys, type PackageKey } from "@/data/package-prices";

/** Shared by the booking form (instant feedback) and the API route (the real check). */
export const timeSlots = ["morning", "noon", "sunset"] as const;
export type TimeSlot = (typeof timeSlots)[number];

export type BookingPayload = {
  package: PackageKey;
  date: string;
  slot: TimeSlot;
  adults: string;
  children: string;
  costume: boolean;
  pickup: boolean;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

export type BookingErrorCode = "required" | "date" | "phone" | "email";
export type BookingErrors = Partial<Record<keyof BookingPayload, BookingErrorCode>>;

type Result = { ok: true; data: BookingPayload } | { ok: false; errors: BookingErrors };

const phonePattern = /^\+?[0-9][0-9\s().-]{7,17}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Local calendar date as YYYY-MM-DD (what <input type="date"> produces). */
export function todayISO() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function validateBooking(input: unknown): Result {
  const raw = (input ?? {}) as Record<string, unknown>;
  const errors: BookingErrors = {};

  const data: BookingPayload = {
    package: ((packageKeys as readonly string[]).includes(text(raw.package)) ? text(raw.package) : "") as PackageKey,
    date: text(raw.date, 10),
    slot: (timeSlots as readonly string[]).includes(text(raw.slot)) ? (text(raw.slot) as TimeSlot) : "sunset",
    adults: ["1", "2", "3", "4"].includes(text(raw.adults)) ? text(raw.adults) : "2",
    children: ["0", "1", "2"].includes(text(raw.children)) ? text(raw.children) : "0",
    costume: raw.costume === true,
    pickup: raw.pickup === true,
    name: text(raw.name, 120),
    phone: text(raw.phone, 30),
    email: text(raw.email, 160),
    notes: text(raw.notes, 1000),
  };

  if (!data.package) errors.package = "required";
  if (!data.name) errors.name = "required";

  if (!data.date) errors.date = "required";
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || data.date < todayISO()) errors.date = "date";

  if (!data.phone) errors.phone = "required";
  else if (!phonePattern.test(data.phone)) errors.phone = "phone";

  if (!data.email) errors.email = "required";
  else if (!emailPattern.test(data.email)) errors.email = "email";

  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, data };
}
