import { useTranslations } from "next-intl";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const cards = [
  { key: "strategy", image: "team-1", index: "01 / 02" },
  { key: "operations", image: "team-2", index: "02 / 02" },
] as const;

export function AboutCollective() {
  const t = useTranslations("about.collective");

  return (
    <Section tone="low" labelledBy="about-collective-title">
      <SectionHeader id="about-collective-title" align="split" eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

      <ul className="reveal-stagger grid gap-8 lg:grid-cols-2">
        {cards.map(({ key, image, index }) => (
          <li key={key}>
            <article className="group flex h-full flex-col overflow-hidden rounded-sm bg-surface shadow-sm">
              <Photo name={image} framed={false} sizes="(min-width: 1280px) 580px, (min-width: 1024px) 45vw, 100vw" />
              <div className="flex flex-col gap-3 p-7">
                <p className="flex items-center justify-between gap-4 type-label-sm text-chestnut">
                  <span>{t(`cards.${key}.tag`)}</span>
                  <span className="text-muted">{index}</span>
                </p>
                <h3 className="type-headline-sm">{t(`cards.${key}.title`)}</h3>
                <p className="text-muted">{t(`cards.${key}.text`)}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <Photo name="team-banner" sizes="(min-width: 1280px) 1216px, 100vw" className="mt-8 shadow-warm-lg" />
    </Section>
  );
}
