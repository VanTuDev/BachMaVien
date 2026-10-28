import { Award, BadgeCheck, Quote, TreePine } from "lucide-react";
import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/Button";

const stats = [
  { key: "horses", Icon: Award },
  { key: "area", Icon: TreePine },
  { key: "standard", Icon: BadgeCheck },
] as const;

export function HomeBrand() {
  const t = useTranslations("home.brand");

  return (
    <Section labelledBy="home-brand-title">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="home-brand-title" className="type-headline-lg">
            {t("title")}
          </h2>
          <p className="text-muted">{t("p1")}</p>
          <p className="text-muted">{t("p2")}</p>

          <ul className="reveal-stagger grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
            {stats.map(({ key, Icon }) => (
              <li key={key} className="flex flex-col items-center gap-2 rounded-sm bg-surface-mid p-4 text-center">
                <Icon aria-hidden className="size-6 text-chestnut" />
                <span className="type-title">{t(`stats.${key}.value`)}</span>
                <span className="type-label-sm text-muted">{t(`stats.${key}.label`)}</span>
              </li>
            ))}
          </ul>

          <TextLink href="/about" className="self-start">
            {t("more")}
          </TextLink>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-7">
          <figure className="flex flex-col gap-4">
            <Photo name="stable-2" sizes="(min-width: 1280px) 640px, (min-width: 1024px) 55vw, 100vw" className="shadow-warm-lg" />
            <figcaption className="flex flex-col gap-1">
              <span className="type-label-sm text-chestnut">{t("imageCaptionTitle")}</span>
              <span className="text-sm text-muted">{t("imageCaption")}</span>
            </figcaption>
          </figure>

          <blockquote className="flex items-start gap-4 rounded-sm bg-sand/40 p-6">
            <Quote aria-hidden className="mt-1 size-7 shrink-0 text-brass-deep" />
            <p className="italic">{t("quote")}</p>
          </blockquote>
        </div>
      </div>
    </Section>
  );
}
