import { Compass, PawPrint, Tent } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const pillars = [
  { key: "welfare", Icon: PawPrint },
  { key: "wildWest", Icon: Tent },
  { key: "heritage", Icon: Compass },
] as const;

export function AboutVision() {
  const t = useTranslations("about.vision");

  return (
    <Section tone="low" labelledBy="about-vision-title">
      <SectionHeader id="about-vision-title" align="center" eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

      <ul className="reveal-stagger grid gap-6 md:grid-cols-3">
        {pillars.map(({ key, Icon }) => (
          <li key={key}>
            <article className="flex h-full flex-col gap-4 rounded-sm border border-espresso/10 bg-surface p-8">
              <span className="grid size-12 place-items-center rounded-full bg-sand text-chestnut">
                <Icon aria-hidden className="size-6" />
              </span>
              <h3 className="type-headline-sm">{t(`pillars.${key}.title`)}</h3>
              <p className="text-sm text-muted">{t(`pillars.${key}.text`)}</p>
              <p className="mt-auto border-t border-espresso/10 pt-4 type-label-sm text-brass-deep">{t(`pillars.${key}.tag`)}</p>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
