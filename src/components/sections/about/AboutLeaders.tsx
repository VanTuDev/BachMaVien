import { useTranslations } from "next-intl";
import { teamMembers } from "@/data/team";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function AboutLeaders() {
  const t = useTranslations("about.leaders");

  return (
    <Section labelledBy="about-leaders-title">
      <SectionHeader id="about-leaders-title" align="center" eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

      <ul className="reveal-stagger grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map(({ key, name, image, icon: Icon }) => (
          <li key={key}>
            <article className="flex h-full flex-col overflow-hidden rounded-sm bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-warm-lg">
              <div className="relative">
                <Photo name={image} framed={false} sizes="(min-width: 1280px) 384px, (min-width: 768px) 45vw, 100vw" />
                <span className="absolute top-4 left-4 rounded-xs bg-espresso/85 px-3 py-1 type-label-sm text-brass backdrop-blur-sm">
                  {t(`members.${key}.tag`)}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-7">
                <div className="flex items-center justify-between gap-4 type-label-sm text-chestnut">
                  <span>{t(`members.${key}.role`)}</span>
                  <Icon aria-hidden className="size-5 text-brass-deep" />
                </div>
                <h3 className="type-headline-sm">{name}</h3>
                <p className="text-sm text-muted">{t(`members.${key}.text`)}</p>
                <dl className="mt-auto flex flex-col gap-2 border-t border-espresso/10 pt-4 text-sm">
                  <div className="flex flex-wrap justify-between gap-x-4">
                    <dt className="text-muted">{t(`members.${key}.focus1Label`)}</dt>
                    <dd className="font-semibold text-chestnut">{t(`members.${key}.focus1`)}</dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-x-4">
                    <dt className="text-muted">{t(`members.${key}.focus2Label`)}</dt>
                    <dd className="font-semibold text-chestnut">{t(`members.${key}.focus2`)}</dd>
                  </div>
                </dl>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
