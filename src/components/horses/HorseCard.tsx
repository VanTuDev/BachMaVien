import { ArrowUpRight, CalendarDays, Ruler, Weight } from "lucide-react";
import { useMessages, useTranslations } from "next-intl";
import type { Horse } from "@/data/horses";
import { Chip } from "@/components/ui/Chip";
import { HorseDialog } from "./HorseDialog";
import { HorsePortrait } from "./HorsePortrait";
import { HorseProfile } from "./HorseProfile";

/** One horse: portrait, three key numbers, purposes, and a button that opens the full profile in a dialog. */
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

        {horse.purposes.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {horse.purposes.map((purpose) => (
              <li key={purpose}>
                <Chip>{t(`filters.${purpose}`)}</Chip>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto border-t border-espresso/10 pt-4">
          <HorseDialog
            label={horse.name}
            closeLabel={t("details.dismiss")}
            triggerClassName="flex w-full cursor-pointer items-center justify-between gap-3 type-label text-chestnut transition-colors hover:text-espresso"
            trigger={
              <>
                <span>{t("details.open")}</span>
                <ArrowUpRight aria-hidden className="size-4" />
              </>
            }
          >
            <HorseProfile horse={horse} />
          </HorseDialog>
        </div>
      </div>
    </article>
  );
}
