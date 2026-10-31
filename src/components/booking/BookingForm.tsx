"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, SendHorizontal } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { isTicketKey, ticketKeys, ticketPrices, type TicketKey } from "@/data/tickets";
import { siteConfig } from "@/data/site";
import { maxTicketsPerType, ticketTotal, timeSlots, todayISO, validateBooking, type BookingErrors, type BookingField } from "@/lib/booking";
import { cn } from "@/lib/cn";
import { formatVnd } from "@/lib/format";

type Status = "idle" | "submitting" | "success" | "error";
type Quantities = Record<TicketKey, string>;

const controlClass =
  "w-full rounded-sm border border-espresso/20 bg-white px-4 py-3 text-base text-espresso transition-colors placeholder:italic placeholder:text-chestnut/55 focus:border-chestnut focus:outline-none focus:ring-2 focus:ring-brass/40 aria-[invalid=true]:border-danger";

function Field({
  id,
  label,
  hint,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="type-label-sm text-chestnut">
        {label}
        {required && <span aria-hidden> *</span>}
        {hint && <span className="ml-2 font-normal tracking-normal text-muted normal-case">({hint})</span>}
      </label>
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="flex items-center gap-1.5 text-sm text-danger">
      <CircleAlert aria-hidden className="size-4 shrink-0" />
      {message}
    </p>
  );
}

export function BookingForm() {
  const t = useTranslations("booking");
  const names = useTranslations("shared.tickets.names");
  const locale = useLocale();
  const requested = useSearchParams().get("ticket");

  // Quantities are typed in by the guest (the number of tickets is limited, so no preset list). A ticket chosen on another page starts at 1.
  const [quantities, setQuantities] = useState<Quantities>(() => ({
    visit: "",
    cowboy: "",
    realCowboy: "",
    ...(isTicketKey(requested) ? { [requested]: "1" } : {}),
  }));
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const total = ticketTotal({
    visit: Number(quantities.visit) || 0,
    cowboy: Number(quantities.cowboy) || 0,
    realCowboy: Number(quantities.realCowboy) || 0,
  });

  const message = (field: BookingField) => (errors[field] ? t(`errors.${errors[field]}`) : undefined);
  const invalid = (field: BookingField) => (errors[field] ? true : undefined);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "");

    const result = validateBooking({
      date: value("date"),
      slot: value("slot"),
      tickets: { visit: quantities.visit, cowboy: quantities.cowboy, realCowboy: quantities.realCowboy },
      name: value("name"),
      phone: value("phone"),
      email: value("email"),
      notes: value("notes"),
    });

    if (!result.ok) {
      setErrors(result.errors);
      const first = (["date", "tickets", "name", "phone", "email"] as const).find((field) => field in result.errors);
      const target = first === "tickets" ? "visit" : first;
      if (target) (form.elements.namedItem(target) as HTMLElement | null)?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...result.data, locale, company: value("company") }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("success");
      setQuantities({ visit: "", cowboy: "", realCowboy: "" });
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-5 rounded-sm border border-brass/40 bg-sand/40 p-8 sm:p-10">
        <CircleCheck aria-hidden className="size-10 text-brass-deep" />
        <div className="flex flex-col gap-2">
          <h3 className="type-headline-sm">{t("success.title")}</h3>
          <p className="text-muted">{t("success.text")}</p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="type-label text-chestnut underline decoration-brass underline-offset-[6px] hover:text-espresso"
        >
          {t("success.again")}
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label={t("form.legend")}
      className="flex flex-col gap-8 rounded-sm bg-surface p-6 shadow-warm sm:p-10"
    >
      {/* Honeypot: hidden from people, tempting for bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="date" label={t("form.date")} error={message("date")} required>
          <input
            id="date"
            name="date"
            type="date"
            required
            ref={(element) => {
              if (element) element.min = todayISO();
            }}
            aria-invalid={invalid("date")}
            aria-describedby={errors.date ? "date-error" : undefined}
            className={controlClass}
          />
        </Field>
        <Field id="slot" label={t("form.slot")}>
          <select id="slot" name="slot" defaultValue="morning" className={controlClass}>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {t(`form.slots.${slot}`)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset aria-describedby={errors.tickets ? "tickets-error" : undefined}>
        <legend className="type-label-sm mb-1 text-chestnut">
          {t("form.tickets")}
          <span aria-hidden> *</span>
        </legend>
        <p className="mb-4 text-sm text-muted">{t("form.ticketsHint")}</p>
        <div className="flex flex-col gap-3">
          {ticketKeys.map((key) => (
            <div key={key} className="flex items-center justify-between gap-4 rounded-sm border border-espresso/15 bg-white p-4">
              <label htmlFor={key} className="flex flex-col">
                <span className="type-title">{names(key)}</span>
                <span className="text-sm font-semibold text-chestnut tabular-nums">{formatVnd(ticketPrices[key], locale)}</span>
              </label>
              <input
                id={key}
                name={key}
                type="number"
                inputMode="numeric"
                min={0}
                max={maxTicketsPerType}
                placeholder="0"
                value={quantities[key]}
                onChange={(event) => setQuantities((current) => ({ ...current, [key]: event.target.value }))}
                aria-label={t("form.quantity", { name: names(key) })}
                aria-invalid={invalid("tickets")}
                className={cn(controlClass, "!w-24 shrink-0 text-center")}
              />
            </div>
          ))}
        </div>
        <FieldError id="tickets-error" message={message("tickets")} />
        <p className="mt-4 flex items-baseline justify-between gap-4 border-t border-espresso/10 pt-4">
          <span className="type-label-sm text-chestnut">{t("form.total")}</span>
          <span className="font-serif text-2xl text-espresso tabular-nums">{formatVnd(total, locale)}</span>
        </p>
      </fieldset>

      <div className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="name" label={t("form.name")} error={message("name")} required>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-invalid={invalid("name")}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={controlClass}
            />
          </Field>
          <Field id="phone" label={t("form.phone")} error={message("phone")} required>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              aria-invalid={invalid("phone")}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={controlClass}
            />
          </Field>
        </div>
        <Field id="email" label={t("form.email")} hint={t("form.optional")} error={message("email")}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={invalid("email")}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={controlClass}
          />
        </Field>
        <Field id="notes" label={t("form.notes")} hint={t("form.optional")}>
          <textarea id="notes" name="notes" rows={3} placeholder={t("form.notesPlaceholder")} className={cn(controlClass, "resize-y")} />
        </Field>
      </div>

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="btn-shine inline-flex items-center justify-center gap-3 rounded-sm bg-espresso px-8 py-4 text-center type-label text-cream shadow-[0_2px_8px_rgb(48_37_31/0.15)] transition-colors hover:bg-chestnut disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : <SendHorizontal aria-hidden className="size-4" />}
          {submitting ? t("form.submitting") : t("form.submit")}
        </button>
        <p className="text-sm text-muted">{t("form.note")}</p>
        <div aria-live="polite">
          {status === "error" && (
            <p className="flex items-start gap-2 rounded-sm bg-red-50 p-4 text-sm text-danger">
              <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
              {t("errors.submit", { phone: siteConfig.phone })}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
