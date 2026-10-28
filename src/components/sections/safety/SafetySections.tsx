import { CircleCheck, Phone, ShieldCheck, ShieldHalf, ShieldUser, ShieldPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ImageName } from "@/data/images";
import { siteConfig } from "@/data/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";

export function SafetyHero() {
  const t = useTranslations("safety.hero");

  return (
    <PageHero
      eyebrow={
        <span className="flex items-center gap-3 type-label-sm text-chestnut">
          <ShieldCheck aria-hidden className="size-4" />
          {t("tag")}
        </span>
      }
      title={t("titleA")}
      accent={t("titleB")}
      lead={t("lead")}
      aside={
        <div className="flex flex-col gap-5">
          <Photo
            name="safety-1"
            priority
            sizes="(min-width: 1024px) 440px, 90vw"
            className="mx-auto w-full max-w-md shadow-warm-lg lg:max-w-none"
          />
          <div className="flex items-start gap-4 rounded-sm border border-brass/40 bg-sand/40 p-5">
            <ShieldPlus aria-hidden className="mt-0.5 size-7 shrink-0 text-brass-deep" />
            <div>
              <p className="type-title">{t("insuranceTitle")}</p>
              <p className="text-sm text-muted">{t("insuranceText")}</p>
            </div>
          </div>
        </div>
      }
    />
  );
}

const standards: { key: "attire" | "helmet" | "coaching"; image: ImageName; Icon: typeof CircleCheck }[] = [
  { key: "attire", image: "safety-3", Icon: CircleCheck },
  { key: "helmet", image: "safety-2", Icon: ShieldHalf },
  { key: "coaching", image: "safety-4", Icon: ShieldUser },
];

export function SafetyStandards() {
  const t = useTranslations("safety.standards");

  return (
    <Section tone="low" labelledBy="safety-standards-title">
      <h2 id="safety-standards-title" className="sr-only">
        {t("attire.title")}, {t("helmet.title")}, {t("coaching.title")}
      </h2>
      <ul className="reveal-stagger grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {standards.map(({ key, image, Icon }) => (
          <li key={key}>
            <article className="flex h-full flex-col overflow-hidden rounded-sm bg-surface shadow-sm">
              <div className="relative">
                <Photo name={image} framed={false} sizes="(min-width: 1280px) 384px, (min-width: 768px) 45vw, 100vw" />
                <span className="absolute top-4 left-4 rounded-xs bg-espresso/85 px-3 py-1 type-label-sm text-brass backdrop-blur-sm">
                  {t(`${key}.tag`)}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-7">
                <h3 className="type-headline-sm">{t(`${key}.title`)}</h3>
                <p className="text-muted">{t(`${key}.text`)}</p>
                <p className="mt-auto flex items-center justify-between border-t border-espresso/10 pt-4 type-label-sm text-chestnut">
                  {t(`${key}.footer`)}
                  <Icon aria-hidden className="size-5 text-brass-deep" />
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}

const stepKeys = ["s1", "s2", "s3", "s4"] as const;

export function SafetySteps() {
  const t = useTranslations("safety.steps");

  return (
    <Section labelledBy="safety-steps-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="safety-steps-title" className="type-headline-lg">
            {t("title")}
          </h2>
          <p className="text-muted">{t("description")}</p>

          <div className="flex flex-col gap-3 rounded-sm bg-espresso p-6 text-cream">
            <p className="flex items-center gap-2 type-label-sm text-brass">
              <Phone aria-hidden className="size-4" />
              {t("hotlineTitle")}
            </p>
            <p className="text-sm text-sand/80">{t("hotlineText")}</p>
            <a href={siteConfig.phoneHref} className="font-serif text-xl text-cream underline decoration-brass underline-offset-4">
              {siteConfig.phone}
            </a>
          </div>
        </div>

        <ol className="reveal-stagger flex flex-col divide-y divide-espresso/10 lg:col-span-7">
          {stepKeys.map((key, index) => (
            <li key={key} className="flex gap-6 py-8 first:pt-0 last:pb-0">
              <span aria-hidden className="font-serif text-4xl leading-none text-brass sm:text-5xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="type-headline-sm">{t(`items.${key}.title`)}</h3>
                <p className="text-muted">{t(`items.${key}.text`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
