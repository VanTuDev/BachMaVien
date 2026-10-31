import { CalendarOff, Clock, Coffee, Route } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/data/site";
import { Section } from "@/components/ui/Section";

/** Opening hours as short rows plus the closed day. */
export function Hours() {
  const t = useTranslations("shared.hours");
  const { open, close, ridingMorning, ridingAfternoon } = siteConfig.hours;

  const rows = [
    { Icon: Clock, label: t("open"), value: t("openValue", { open, close }) },
    { Icon: Route, label: t("riding"), value: `${ridingMorning}  ·  ${ridingAfternoon}` },
    { Icon: Coffee, label: t("cafe"), value: t("cafeValue", { open, close }) },
    { Icon: CalendarOff, label: t("closed"), value: null },
  ];

  return (
    <Section tone="dark" className="py-12 sm:py-14 lg:py-16" labelledBy="hours-title">
      <h2 id="hours-title" className="type-headline-md mb-8 text-cream">
        {t("title")}
      </h2>
      <dl className="reveal-stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map(({ Icon, label, value }) => (
          <div key={label} className="flex items-start gap-4 border-l border-brass/40 pl-4">
            <Icon aria-hidden className="mt-1 size-5 shrink-0 text-brass" />
            <div>
              <dt className="type-label-sm text-brass">{label}</dt>
              {value && <dd className="mt-1 text-cream">{value}</dd>}
            </div>
          </div>
        ))}
      </dl>
    </Section>
  );
}
