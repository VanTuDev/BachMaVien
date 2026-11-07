import Image from "next/image";
import { CalendarDays, Ruler, Weight } from "lucide-react";
import { useMessages, useTranslations } from "next-intl";
import type { Horse } from "@/data/horses";
import { getImage } from "@/data/images";
import { Chip } from "@/components/ui/Chip";
import { HorsePortrait } from "./HorsePortrait";

/** Longer written sections, in reading order. Short facts (breed, source, sex) become tiles above them. */
const storyFields = ["color", "marks", "appearance", "temperament", "health", "training", "role"] as const;

/**
 * Profile shown inside the dialog. Soft layout: the whole photo floats on a blurred copy of itself,
 * short facts are rounded tiles, and the long text reads as paragraphs instead of a table.
 */
export function HorseProfile({ horse }: { horse: Horse }) {
  const t = useTranslations("horses");
  const tImg = useTranslations("images");
  const profile: Record<string, string | undefined> = useMessages().horses.horses[horse.key];
  const photo = horse.image ? getImage(horse.image) : null;
  const photoSizes = "(min-width: 1024px) 480px, 100vw";

  const facts = [
    { Icon: Ruler, label: t("facts.height"), value: `${horse.heightCm} cm` },
    { Icon: Weight, label: t("facts.weight"), value: `${horse.weightKg} kg` },
    { Icon: CalendarDays, label: t("facts.born"), value: String(horse.born) },
  ];

  const tiles = [
    { label: t("fields.breed"), value: profile.breedDetail ?? profile.breed },
    { label: t("fields.source"), value: t(`sources.${horse.source}`) },
    { label: t("fields.sex"), value: t(`sex.${horse.sex}`) },
  ];

  return (
    <div className="grid max-h-[92dvh] overflow-y-auto overscroll-contain lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:overflow-hidden">
      <div className="relative isolate flex items-center justify-center overflow-hidden bg-sand/70 p-4 sm:p-6 lg:max-h-[92dvh]">
        {photo ? (
          <>
            {/* Blurred copy of the photo as a soft backdrop, so the picture never sits on a flat empty block. */}
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="480px"
              aria-hidden
              className="-z-10 scale-125 object-cover opacity-70 blur-2xl saturate-125"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-cream/25 via-transparent to-espresso/15" />
            <Image
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={tImg(horse.image!)}
              sizes={photoSizes}
              className="h-auto max-h-[56dvh] w-full rounded-2xl object-contain shadow-warm-lg ring-1 ring-white/50 lg:max-h-[80dvh]"
            />
          </>
        ) : (
          <HorsePortrait horse={horse} variant="feature" sizes={photoSizes} className="w-full rounded-2xl shadow-warm-lg" />
        )}
      </div>

      <div className="flex flex-col gap-6 bg-linear-to-b from-surface to-cream p-6 sm:p-9 lg:max-h-[92dvh] lg:overflow-y-auto lg:overscroll-contain">
        <header className="flex flex-col gap-2 pr-12">
          <p className="type-label-sm text-brass-deep">{profile.breed}</p>
          <h2 className="type-headline-lg">{horse.name}</h2>
          <p className="text-lg leading-relaxed text-muted">{profile.tagline}</p>
        </header>

        <dl className="grid grid-cols-3 gap-3">
          {facts.map(({ Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1 rounded-2xl bg-sand/45 px-2 py-4 text-center">
              <Icon aria-hidden className="size-4 text-brass-deep" />
              <dd className="font-bold tabular-nums">{value}</dd>
              <dt className="type-label-sm !tracking-wider text-muted">{label}</dt>
            </div>
          ))}
        </dl>

        {horse.purposes.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {horse.purposes.map((purpose) => (
              <li key={purpose}>
                <Chip className="!rounded-full !px-3.5 !py-1.5">{t(`filters.${purpose}`)}</Chip>
              </li>
            ))}
          </ul>
        )}

        <dl className="grid gap-3 sm:grid-cols-2">
          {tiles.map(({ label, value }, index) => (
            <div key={label} className={`rounded-2xl border border-espresso/8 bg-white/70 px-4 py-3 ${index === 0 ? "sm:col-span-2" : ""}`}>
              <dt className="type-label-sm text-chestnut">{label}</dt>
              <dd className="mt-1 text-sm">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-5">
          {storyFields
            .filter((field) => profile[field])
            .map((field) => (
              <section key={field} className="flex flex-col gap-1.5">
                <h3 className="type-label-sm flex items-center gap-2 text-chestnut !font-sans">
                  <span aria-hidden className="size-1.5 rounded-full bg-brass" />
                  {t(`fields.${field}`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{profile[field]}</p>
              </section>
            ))}
        </div>

        {profile.suitable && (
          <section className="rounded-2xl bg-sand/55 p-5">
            <h3 className="type-label-sm text-chestnut !font-sans">{t("fields.suitable")}</h3>
            <p className="mt-1.5 leading-relaxed">{profile.suitable}</p>
          </section>
        )}
      </div>
    </div>
  );
}
