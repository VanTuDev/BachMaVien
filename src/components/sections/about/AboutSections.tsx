import { Compass, PawPrint, Tent } from "lucide-react";
import { useTranslations } from "next-intl";
import { teamMembers } from "@/data/team";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const facts = [
  { key: "horses", Icon: PawPrint },
  { key: "place", Icon: Compass },
  { key: "style", Icon: Tent },
] as const;

export function AboutHero() {
  const t = useTranslations("about.hero");

  return (
    <PageHero
      eyebrow={<span className="type-label-sm text-chestnut">{t("eyebrow")}</span>}
      title={t("title")}
      accent={t("accent")}
      lead={t("lead")}
      aside={<AboutFacts />}
    />
  );
}

function AboutFacts() {
  const t = useTranslations("about.facts");

  return (
    <ul className="flex flex-col gap-4">
      {facts.map(({ key, Icon }) => (
        <li key={key} className="flex items-start gap-4 rounded-sm border border-espresso/10 bg-surface p-5 shadow-sm">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sand text-chestnut">
            <Icon aria-hidden className="size-5" />
          </span>
          <div>
            <h2 className="type-title">{t(`${key}.title`)}</h2>
            <p className="text-sm text-muted">{t(`${key}.text`)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** The two halves of the brand name, with the original brand artwork shown once. */
export function AboutName() {
  const t = useTranslations("about.name");

  return (
    <Section tone="low" labelledBy="about-name-title">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Photo
          name="brand-overview"
          sizes="(min-width: 1280px) 520px, (min-width: 1024px) 45vw, 100vw"
          className="mx-auto w-full max-w-lg shadow-warm-lg lg:col-span-5 lg:max-w-none"
        />
        <div className="flex flex-col gap-8 lg:col-span-7">
          <h2 id="about-name-title" className="type-headline-lg">
            {t("title")}
          </h2>
          <dl className="grid gap-6 sm:grid-cols-2">
            {(["bach", "vien"] as const).map((key) => (
              <div key={key} className="flex flex-col gap-2 border-l-2 border-brass pl-5">
                <dt className="type-headline-sm text-chestnut">{t(`${key}.title`)}</dt>
                <dd className="text-muted">{t(`${key}.text`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}

/** One full group photo (never split in two) and the six names with their roles. */
export function AboutTeam() {
  const t = useTranslations("about.team");

  return (
    <Section labelledBy="about-team-title">
      <SectionHeader id="about-team-title" align="center" eyebrow={t("eyebrow")} title={t("title")} description={t("note")} />
      <Photo name="team-banner" sizes="(min-width: 1280px) 1216px, 100vw" className="shadow-warm-lg" />
      <ul className="reveal-stagger mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {teamMembers.map(({ key, name, image, icon: Icon }) => (
          <li key={key}>
            <article className="flex h-full flex-col overflow-hidden rounded-sm bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-warm-lg">
              <Photo name={image} framed={false} sizes="(min-width: 1280px) 384px, (min-width: 1024px) 33vw, 50vw" />
              <div className="flex items-center gap-3 p-4">
                <span className="hidden size-10 shrink-0 place-items-center rounded-full bg-sand text-chestnut sm:grid">
                  <Icon aria-hidden className="size-5" />
                </span>
                <div>
                  <p className="type-title">{name}</p>
                  <p className="type-label-sm text-chestnut">{t(`roles.${key}`)}</p>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
