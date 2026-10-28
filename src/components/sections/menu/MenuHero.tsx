import { Clock, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Price } from "@/components/ui/Price";

export function MenuHero() {
  const t = useTranslations("menu.hero");

  return (
    <PageHero
      eyebrow={
        <>
          <span className="type-label-sm text-chestnut">{t("tag")}</span>
          <span aria-hidden className="hidden h-px w-8 bg-chestnut/40 sm:block" />
          <span className="flex items-center gap-2 type-label-sm text-muted">
            <Clock aria-hidden className="size-4" />
            {t("place", { open: siteConfig.hours.open, close: siteConfig.hours.close })}
          </span>
        </>
      }
      title={t("titleA")}
      accent={t("titleB")}
      lead={t("lead")}
      aside={
        <figure className="mx-auto flex w-full max-w-md flex-col gap-4 lg:max-w-none">
          <div className="relative">
            <Photo name="drink-coconut-coffee" priority sizes="(min-width: 1024px) 440px, 90vw" className="shadow-warm-lg" />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4">
              <span className="inline-flex items-center gap-1.5 rounded-xs bg-espresso px-2.5 py-1 type-label-sm text-brass">
                <Star aria-hidden className="size-3.5 fill-brass" />
                {t("bestSeller")}
              </span>
              <Price amount={40_000} className="rounded-xs bg-brass px-2.5 py-1 text-sm font-bold text-espresso" />
            </div>
          </div>
          <figcaption className="flex flex-col gap-1">
            <span className="type-title">{t("signatureName")}</span>
            <span className="text-sm text-muted">{t("signatureText")}</span>
          </figcaption>
        </figure>
      }
    />
  );
}
