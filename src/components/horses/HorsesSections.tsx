import { useMessages, useTranslations } from "next-intl";
import { horses, mascot, purposes } from "@/data/horses";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HorseCard } from "./HorseCard";
import { HorseFilter } from "./HorseFilter";
import { HorsePortrait } from "./HorsePortrait";

/** A palette of the herd for the hero: four very different coats. */
const previews = ["bong", "bi", "bach", "bao"].map((key) => horses.find((horse) => horse.key === key)!);

export function HorsesHero() {
  const t = useTranslations("horses.hero");

  return (
    <PageHero
      eyebrow={<span className="type-label-sm text-chestnut">{t("eyebrow")}</span>}
      title={t("title")}
      accent={t("accent")}
      lead={t("lead")}
      aside={
        <ul aria-hidden className="mx-auto grid max-w-sm grid-cols-2 gap-3 lg:max-w-none">
          {previews.map((horse) => (
            <li key={horse.key}>
              <HorsePortrait horse={horse} variant="mini" sizes="(min-width: 1024px) 230px, 40vw" className="rounded-sm shadow-warm" />
            </li>
          ))}
        </ul>
      }
    />
  );
}

/** Bông gets a spotlight: she is the ranch mascot. */
export function MascotSpotlight() {
  const t = useTranslations("horses");
  const profile = useMessages().horses.horses[mascot.key];

  return (
    <Section tone="mid" labelledBy="mascot-title">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <HorsePortrait
          horse={mascot}
          variant="feature"
          sizes="(min-width: 1024px) 420px, 90vw"
          className="mx-auto w-full max-w-sm rounded-sm shadow-warm-lg lg:col-span-5 lg:max-w-none"
        />
        <div className="flex flex-col items-start gap-5 lg:col-span-7">
          <Eyebrow>{t("mascot.eyebrow")}</Eyebrow>
          <h2 id="mascot-title" className="type-headline-lg">
            {t("mascot.title")}
          </h2>
          <p className="type-lead text-muted">{profile.role}</p>
          <p className="text-muted">{profile.temperament}</p>
          <ul className="flex flex-wrap gap-2">
            {mascot.purposes.map((purpose) => (
              <li key={purpose}>
                <Chip>{t(`filters.${purpose}`)}</Chip>
              </li>
            ))}
          </ul>
          <ButtonLink href={{ pathname: "/horses", hash: mascot.key }} variant="outline">
            {t("details.open")}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

export function HerdList() {
  const t = useTranslations("horses");

  return (
    <Section labelledBy="herd-title">
      <SectionHeader id="herd-title" align="center" eyebrow={t("listing.eyebrow")} title={t("listing.title")} />
      <HorseFilter
        filterLabel={t("filters.label")}
        countTemplate={t.raw("listing.count") as string}
        filters={[{ value: "all", label: t("filters.all") }, ...purposes.map((value) => ({ value, label: t(`filters.${value}`) }))]}
        items={horses.map((horse) => ({ key: horse.key, purposes: horse.purposes, node: <HorseCard horse={horse} /> }))}
      />
    </Section>
  );
}
