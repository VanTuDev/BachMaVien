import { Award, History, Medal, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/ui/PageHero";

const stats = ["feel", "members", "launch"] as const;

export function AboutHero() {
  const t = useTranslations("about.hero");

  return (
    <PageHero
      eyebrow={
        <>
          <span className="flex items-center gap-2 type-label-sm text-chestnut">
            <History aria-hidden className="size-4" />
            {t("tag")}
          </span>
          <span aria-hidden className="hidden h-px w-8 bg-chestnut/40 sm:block" />
          <span className="type-label-sm text-brass-deep">{t("year")}</span>
        </>
      }
      title={t("titleA")}
      accent={t("titleB")}
      lead={t.rich("lead", { strong: (chunks) => <strong className="font-semibold text-espresso">{chunks}</strong> })}
      aside={
        <div className="flex flex-col gap-5">
          <figure className="relative flex flex-col gap-5 rounded-sm bg-espresso p-7 text-cream shadow-warm-lg sm:p-8">
            <Medal aria-hidden className="absolute top-6 right-6 size-10 text-brass/30" />
            <figcaption className="flex items-center gap-2 type-label-sm text-brass">
              <Star aria-hidden className="size-4" />
              {t("manifestoLabel")}
            </figcaption>
            <blockquote className="font-serif text-lg leading-relaxed italic">{t("manifesto")}</blockquote>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-sand/20 pt-4 type-label-sm text-sand/75">
              <span>{t("manifestoBy")}</span>
              <span>{t("manifestoPlace")}</span>
            </div>
          </figure>
          <div className="flex items-center gap-4 rounded-sm border border-brass/40 bg-sand/40 p-5">
            <Award aria-hidden className="size-8 shrink-0 text-brass-deep" />
            <div>
              <p className="type-title">{t("researchTitle")}</p>
              <p className="text-sm text-muted">{t("researchText")}</p>
            </div>
          </div>
        </div>
      }
    >
      <dl className="grid grid-cols-3 gap-4 border-t border-espresso/15 pt-8 sm:gap-8">
        {stats.map((key) => (
          <div key={key} className="flex flex-col-reverse justify-end gap-1">
            <dt className="type-label-sm text-muted">{t(`stats.${key}.label`)}</dt>
            <dd className="font-serif text-2xl text-espresso sm:text-3xl">{t(`stats.${key}.value`)}</dd>
          </div>
        ))}
      </dl>
    </PageHero>
  );
}
