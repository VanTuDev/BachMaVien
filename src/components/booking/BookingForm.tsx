"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, SendHorizontal } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { packageKeys, packagePrices, type PackageKey } from "@/data/package-prices";
import { siteConfig } from "@/data/site";
import { timeSlots, todayISO, validateBooking, type BookingErrors } from "@/lib/booking";
import { cn } from "@/lib/cn";
import { formatVnd } from "@/lib/format";

type Status = "idle" | "submitting" | "success" | "error";

const controlClass =
  "w-full rounded-sm border border-espresso/20 bg-white px-4 py-3 text-base text-espresso transition-colors placeholder:italic placeholder:text-chestnut/55 focus:border-chestnut focus:outline-none focus:ring-2 focus:ring-brass/40 aria-[invalid=true]:border-danger";

function isPackageKey(value: string | null): value is PackageKey {
  return value !== null && (packageKeys as string[]).includes(value);
}

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

function Field({ id, label, hint, error, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="type-label-sm text-chestnut">
        {label}
        {required && <span aria-hidden> *</span>}
        {hint && <span className="ml-2 font-normal tracking-normal normal-case text-muted">({hint})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm text-danger">
          <CircleAlert aria-hidden className="size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function StepTitle({ number, children }: { number: number; children: ReactNode }) {
  return (
    <legend className="mb-5 flex items-center gap-3">
      <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-espresso font-serif text-sm text-brass">
        {number}
      </span>
      <span className="type-title">{children}</span>
    </legend>
  );
}

export function BookingForm() {
  const t = useTranslations("booking");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const requested = searchParams.get("package");

  const [selectedPackage, setSelectedPackage] = useState<PackageKey>(isPackageKey(requested) ? requested : "wildWest");
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const errorText = (field: keyof BookingErrors) => (errors[field] ? t(`errors.${errors[field]}`) : undefined);
  const invalid = (field: keyof BookingErrors) => (errors[field] ? true : undefined);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "");

    const result = validateBooking({
      package: selectedPackage,
      date: value("date"),
      slot: value("slot"),
      adults: value("adults"),
      children: value("children"),
      costume: data.get("costume") === "on",
      pickup: data.get("pickup") === "on",
      name: value("name"),
      phone: value("phone"),
      email: value("email"),
      notes: value("notes"),
    });

    if (!result.ok) {
      setErrors(result.errors);
      const firstField = ["date", "name", "phone", "email"].find((field) => field in result.errors);
      if (firstField) (form.elements.namedItem(firstField) as HTMLElement | null)?.focus();
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
      className="flex flex-col gap-10 rounded-sm bg-surface p-6 shadow-warm sm:p-10"
    >
      {/* Honeypot: hidden from people, tempting for bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset>
        <StepTitle number={1}>{t("form.step1")}</StepTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="date" label={t("form.date")} error={errorText("date")} required>
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
            <select id="slot" name="slot" defaultValue="sunset" className={controlClass}>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {t(`form.slots.${slot}`)}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </fieldset>

      <fieldset>
        <StepTitle number={2}>{t("form.step2")}</StepTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          {packageKeys.map((key) => (
            <label
              key={key}
              className={cn(
                "flex cursor-pointer flex-col gap-1.5 rounded-sm border bg-white p-4 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brass",
                selectedPackage === key ? "border-espresso bg-sand/40" : "border-espresso/20 hover:border-chestnut",
              )}
            >
              <input
                type="radio"
                name="package"
                value={key}
                checked={selectedPackage === key}
                onChange={() => setSelectedPackage(key)}
                className="sr-only"
              />
              <span className="type-title">{t(`packages.${key}.name`)}</span>
              <span className="text-sm text-muted">{t(`packages.${key}.description`)}</span>
              <span className="mt-1 font-semibold text-chestnut tabular-nums">{formatVnd(packagePrices[key], locale)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <StepTitle number={3}>{t("form.step3")}</StepTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="adults" label={t("form.adults")}>
            <select id="adults" name="adults" defaultValue="2" className={controlClass}>
              {(["1", "2", "3", "4"] as const).map((n) => (
                <option key={n} value={n}>
                  {t(`form.adultsOptions.${n}`)}
                </option>
              ))}
            </select>
          </Field>
          <Field id="children" label={t("form.children")}>
            <select id="children" name="children" defaultValue="0" className={controlClass}>
              {(["0", "1", "2"] as const).map((n) => (
                <option key={n} value={n}>
                  {t(`form.childrenOptions.${n}`)}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <p className="type-label-sm text-chestnut">{t("form.addons")}</p>
          {(["costume", "pickup"] as const).map((name) => (
            <label key={name} className="flex cursor-pointer items-start gap-3 text-sm">
              <input type="checkbox" name={name} defaultChecked={name === "costume"} className="mt-0.5 size-5 shrink-0 accent-espresso" />
              <span>{name === "costume" ? t("form.addonCostume") : t("form.addonPickup")}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <StepTitle number={4}>{t("form.step4")}</StepTitle>
        <div className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label={t("form.name")} error={errorText("name")} required>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder={t("form.namePlaceholder")}
                aria-invalid={invalid("name")}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={controlClass}
              />
            </Field>
            <Field id="phone" label={t("form.phone")} error={errorText("phone")} required>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                placeholder={t("form.phonePlaceholder")}
                aria-invalid={invalid("phone")}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={controlClass}
              />
            </Field>
          </div>
          <Field id="email" label={t("form.email")} error={errorText("email")} required>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder={t("form.emailPlaceholder")}
              aria-invalid={invalid("email")}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={controlClass}
            />
          </Field>
          <Field id="notes" label={t("form.notes")} hint={t("form.notesHint")}>
            <textarea id="notes" name="notes" rows={3} placeholder={t("form.notesPlaceholder")} className={cn(controlClass, "resize-y")} />
          </Field>
        </div>
      </fieldset>

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-3 rounded-sm bg-espresso px-8 py-4 text-center type-label text-cream shadow-[0_2px_8px_rgb(48_37_31/0.15)] transition-colors hover:bg-chestnut disabled:cursor-wait disabled:opacity-70"
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
