import { useTranslations } from "next-intl";
import type { ImageName } from "@/data/images";
import { CheckList } from "@/components/ui/CheckList";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/Button";

/** Message key, photo and destination for each pillar. */
const pillars: { key: "basics" | "wildWest" | "photo"; image: ImageName; href: string }[] = [
  { key: "basics", image: "safety-4", href: "/services#horse-basics" },
  { key: "wildWest", image: "stable-6", href: "/services#wild-west" },
  { key: "photo", image: "team-2", href: "/services#photo-tour" },
];

export function HomePillars() {
  const t = useTranslations("home.pillars");

  return (
    <Section tone="low" labelledBy="home-pillars-title">
      <SectionHeader id="home-pillars-title" align="split" eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

      <ul className="reveal-stagger grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {pillars.map(({ key, image, href }) => (
          <li key={key} className="flex">
            <article className="group flex w-full flex-col overflow-hidden rounded-sm bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-warm-lg">
              <div className="relative">
                <Photo name={image} framed={false} sizes="(min-width: 1280px) 384px, (min-width: 768px) 45vw, 100vw" className="bg-sand" />
                <span className="absolute top-4 left-4 rounded-xs bg-espresso/85 px-3 py-1 type-label-sm text-brass backdrop-blur-sm">
                  {t(`items.${key}.tag`)}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-6 p-7">
                <div className="flex flex-col gap-3">
                  <h3 className="type-headline-sm text-espresso">{t(`items.${key}.title`)}</h3>
                  <p className="text-muted">{t(`items.${key}.text`)}</p>
                  <CheckList items={[t(`items.${key}.point1`), t(`items.${key}.point2`)]} className="pt-2" />
                </div>
                <TextLink href={href} className="justify-between border-t border-espresso/10 pt-4 [&>span]:no-underline">
                  {t(`items.${key}.link`)}
                </TextLink>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
