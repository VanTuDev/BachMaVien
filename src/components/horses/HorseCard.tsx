import { CalendarDays, ChevronDown, Ruler, Weight } from "lucide-react";
import { useMessages, useTranslations } from "next-intl";
import type { Horse } from "@/data/horses";
import { Chip } from "@/components/ui/Chip";
import { HorsePortrait } from "./HorsePortrait";

const detailFields = ["color", "marks", "appearance", "temperament", "health", "training", "role", "suitable"] as const;

/** One horse: portrait, three key numbers, purposes, and the full profile tucked into a native <details>. */
export function HorseCard({ horse }: { horse: Horse }) {
  const t = useTranslations("horses");
  const profile: Record<string, string | undefined> = useMessages().horses.horses[horse.key];

  const facts = [
    { Icon: Ruler, label: t("facts.height"), value: `${horse.heightCm} cm` },
    { Icon: Weight, label: t("facts.weight"), value: `${horse.weightKg} kg` },
    { Icon: CalendarDays, label: t("facts.born"), value: String(horse.born) },
  ];

  return (
    <article
      id={horse.key}
      aria-labelledby={`${horse.key}-name`}
      className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-sm bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-warm-lg"
    >
      <HorsePortrait horse={horse} sizes="(min-width: 1280px) 384px, (min-width: 768px) 45vw, 100vw" />

      <div className="flex flex-1 flex-col gap-4 p-6">
        <header className="flex flex-col gap-1">
          <h3 id={`${horse.key}-name`} className="type-headline-md">
            {horse.name}
          </h3>
          <p className="type-label-sm text-chestnut">{profile.breed}</p>
        </header>

        <p className="min-h-[3.2rem] text-muted">{profile.tagline}</p>

        <dl className="grid grid-cols-3 gap-2 rounded-sm bg-surface-mid p-3 text-center">
          {facts.map(({ Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <Icon aria-hidden className="size-4 text-brass-deep" />
              <dd className="font-semibold tabular-nums">{value}</dd>
              <dt className="type-label-sm !tracking-wider text-muted">{label}</dt>
            </div>
          ))}
        </dl>

        <ul className="flex flex-wrap gap-2">
          {horse.purposes.map((purpose) => (
            <li key={purpose}>
              <Chip>{t(`filters.${purpose}`)}</Chip>
            </li>
          ))}
        </ul>

        <details className="group/details mt-auto border-t border-espresso/10 pt-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 type-label text-chestnut transition-colors hover:text-espresso [&::-webkit-details-marker]:hidden">
            <span className="group-open/details:hidden">{t("details.open")}</span>
            <span className="hidden group-open/details:inline">{t("details.close")}</span>
            <ChevronDown aria-hidden className="size-4 transition-transform duration-300 group-open/details:rotate-180" />
          </summary>

          <dl className="mt-4 flex flex-col gap-4 text-sm">
            <ProfileRow label={t("fields.source")} value={t(`sources.${horse.source}`)} />
            <ProfileRow label={t("fields.sex")} value={t(`sex.${horse.sex}`)} />
            {detailFields.map((field) =>
              profile[field] ? <ProfileRow key={field} label={t(`fields.${field}`)} value={profile[field]!} /> : null,
            )}
          </dl>
        </details>
      </div>
    </article>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="type-label-sm text-chestnut">{label}</dt>
      <dd className="text-muted">{value}</dd>
    </div>
  );
}
