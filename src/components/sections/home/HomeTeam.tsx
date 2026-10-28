import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const cards = [
  { key: "leadership", image: "team-1" },
  { key: "trainers", image: "team-2" },
] as const;
const valueKeys = ["value1", "value2", "value3"] as const;

export function HomeTeam() {
  const t = useTranslations("home.team");

  return (
    <Section tone="mid" labelledBy="home-team-title">
      <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
        <SectionHeader id="home-team-title" eyebrow={t("eyebrow")} title={t("title")} className="mb-0 sm:mb-0 md:max-w-2xl" />
        <ButtonLink href="/about" className="shrink-0 self-start md:self-auto">
          {t("action")}
        </ButtonLink>
      </div>

      <ul className="reveal-stagger grid gap-8 lg:grid-cols-2">
        {cards.map(({ key, image }) => (
          <li key={key}>
            <article className="flex h-full flex-col overflow-hidden rounded-sm bg-surface shadow-sm">
              <Photo name={image} framed={false} sizes="(min-width: 1280px) 580px, (min-width: 1024px) 45vw, 100vw" />
              <div className="flex flex-col gap-4 p-7">
                <p className="type-label-sm text-chestnut">{t(`cards.${key}.tag`)}</p>
                <h3 className="type-headline-sm">{t(`cards.${key}.title`)}</h3>
                <p className="text-muted">{t(`cards.${key}.text`)}</p>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-1 text-sm font-semibold">
                  {valueKeys.map((valueKey) => (
                    <li key={valueKey} className="flex items-center gap-2">
                      <span aria-hidden className="size-2 rounded-full bg-brass" />
                      {t(`cards.${key}.${valueKey}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
