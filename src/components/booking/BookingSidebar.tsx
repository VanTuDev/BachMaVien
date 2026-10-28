import { CalendarClock, Camera, Coffee, HardHat, MapPin, UserCheck, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/data/site";

const benefits: { key: "coach" | "gear" | "drink" | "photo"; Icon: LucideIcon }[] = [
  { key: "coach", Icon: UserCheck },
  { key: "gear", Icon: HardHat },
  { key: "drink", Icon: Coffee },
  { key: "photo", Icon: Camera },
];

export function BookingSidebar() {
  const t = useTranslations("booking.sidebar");

  return (
    <aside className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 rounded-sm bg-espresso p-8 text-cream">
        <h2 className="type-headline-sm">{t("benefitsTitle")}</h2>
        <ul className="flex flex-col gap-4">
          {benefits.map(({ key, Icon }) => (
            <li key={key} className="flex items-start gap-3 text-sm text-sand/85">
              <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-brass" />
              <span>{t(`benefits.${key}`)}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 border-t border-sand/20 pt-5">
          <p className="type-label-sm text-brass">{t("policyTitle")}</p>
          <p className="text-sm text-sand/80">{t("policyText")}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-sm border border-espresso/10 bg-surface-mid p-8">
        <p className="flex items-center gap-2 type-label-sm text-chestnut">
          <MapPin aria-hidden className="size-4" />
          {t("locationTag")}
        </p>
        <h3 className="type-headline-sm">{t("locationTitle")}</h3>
        <p className="text-sm text-muted">{t("locationText")}</p>
        <p className="mt-2 flex items-center justify-between gap-4 border-t border-espresso/10 pt-4 text-sm">
          <span className="flex items-center gap-2 text-muted">
            <CalendarClock aria-hidden className="size-4" />
            {t("hoursLabel")}
          </span>
          <span className="font-semibold">{t("hoursValue", { open: siteConfig.hours.open, close: siteConfig.hours.close })}</span>
        </p>
      </div>
    </aside>
  );
}
