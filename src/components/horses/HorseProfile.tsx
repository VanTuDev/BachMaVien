import Image from "next/image";
import { CalendarDays, Ruler, Weight } from "lucide-react";
import { useMessages, useTranslations } from "next-intl";
import type { Horse } from "@/data/horses";
import { getImage } from "@/data/images";
import { Chip } from "@/components/ui/Chip";
import { HorsePortrait } from "./HorsePortrait";

const detailFields = ["color", "marks", "appearance", "temperament", "health", "training", "role", "suitable"] as const;

/** The full profile shown inside the dialog: the whole photo on one side, everything about the horse on the other. */
export function HorseProfile({ horse }: { horse: Horse }) {
  const t = useTranslations("horses");
  const tImg = useTranslations("images");
  const profile: Record<string, string | undefined> = useMessages().horses.horses[horse.key];
  const photo = horse.image ? getImage(horse.image) : null;

  const facts = [
    { Icon: Ruler, label: t("facts.height"), value: `${horse.heightCm} cm` },
    { Icon: Weight, label: t("facts.weight"), value: `${horse.weightKg} kg` },
    { Icon: CalendarDays, label: t("facts.born"), value: String(horse.born) },
  ];

  const rows = [
    ...(profile.breedDetail ? [{ label: t("fields.breed"), value: profile.breedDetail }] : []),
    { label: t("fields.source"), value: t(`sources.${horse.source}`) },
    { label: t("fields.sex"), value: t(`sex.${horse.sex}`) },
    ...detailFields.filter((field) => profile[field]).map((field) => ({ label: t(`fields.${field}`), value: profile[field]! })),
  ];

  return (
    <div className="grid max-h-[92dvh] overflow-y-auto overscroll-contain lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:overflow-hidden">
      <div className="flex items-center justify-center bg-sand/60 lg:max-h-[92dvh]">
        {photo ? (
          <Image
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt={tImg(horse.image!)}
            sizes="(min-width: 1024px) 480px, 100vw"
            className="h-auto max-h-[60dvh] w-full object-contain lg:max-h-[92dvh]"
          />
        ) : (
          <HorsePortrait horse={horse} variant="feature" sizes="(min-width: 1024px) 480px, 100vw" className="w-full" />
        )}
      </div>

      <div className="flex flex-col gap-5 p-6 sm:p-8 lg:max-h-[92dvh] lg:overflow-y-auto lg:overscroll-contain">
        <header className="flex flex-col gap-1 pr-10">
          <h2 className="type-headline-lg">{horse.name}</h2>
          <p className="type-label-sm text-chestnut">{profile.breed}</p>
        </header>

        <p className="type-lead text-muted">{profile.tagline}</p>

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

        <dl className="flex flex-col divide-y divide-espresso/10 border-t border-espresso/10 text-sm">
          {rows.map(({ label, value }) => (
            <div key={label} className="grid gap-1 py-3 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
              <dt className="type-label-sm pt-0.5 text-chestnut">{label}</dt>
              <dd className="text-muted">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
