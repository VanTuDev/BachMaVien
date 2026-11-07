import { CalendarOff, Clock, MapPin, MessageCircle, Phone, Route, TicketCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/data/site";

/** Opening hours and limited-tickets note. On phones it sits above the form so guests see the hours before choosing a slot. */
export function BookingInfo({ className }: { className?: string }) {
  const t = useTranslations("booking.sidebar");
  const hours = useTranslations("shared.hours");
  const { open, close, ridingMorning, ridingAfternoon } = siteConfig.hours;

  return (
    <aside className={className}>
      <div className="flex flex-col gap-5 rounded-sm bg-espresso p-7 text-cream">
        <p className="flex items-start gap-3 text-sm text-sand/90">
          <TicketCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-brass" />
          {t("limited")}
        </p>
        <ul className="flex flex-col gap-4 border-t border-sand/20 pt-5 text-sm">
          <li className="flex items-start gap-3">
            <Clock aria-hidden className="mt-0.5 size-5 shrink-0 text-brass" />
            {hours("openValue", { open, close })}
          </li>
          <li className="flex items-start gap-3">
            <Route aria-hidden className="mt-0.5 size-5 shrink-0 text-brass" />
            <span>
              {hours("riding")}: {ridingMorning} · {ridingAfternoon}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CalendarOff aria-hidden className="mt-0.5 size-5 shrink-0 text-brass" />
            {hours("closed")}
          </li>
          <li className="flex items-start gap-3">
            <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-brass" />
            {t("place")}
          </li>
        </ul>
      </div>
    </aside>
  );
}

export function BookingContact() {
  const t = useTranslations("booking.sidebar");

  return (
    <aside>
      <div className="flex flex-col gap-4 rounded-sm border border-espresso/10 bg-surface-mid p-7">
        <p className="type-label-sm text-chestnut">{t("contact")}</p>
        <a href={siteConfig.phoneHref} className="flex items-center gap-3 font-semibold hover:text-chestnut">
          <Phone aria-hidden className="size-5 text-brass-deep" />
          {siteConfig.phone}
        </a>
        <a
          href={siteConfig.zaloHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 font-semibold hover:text-chestnut"
        >
          <MessageCircle aria-hidden className="size-5 text-brass-deep" />
          Zalo
        </a>
      </div>
    </aside>
  );
}
