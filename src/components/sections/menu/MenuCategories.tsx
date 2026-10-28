import { Star, Sunset } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { menuCategories } from "@/data/menu";
import { bookingHref } from "@/data/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Photo } from "@/components/ui/Photo";
import { Price } from "@/components/ui/Price";
import { Section } from "@/components/ui/Section";

export function MenuCategories() {
  const t = useTranslations("menu");
  const isVietnamese = useLocale() === "vi";

  return (
    <Section tone="low" labelledBy="menu-list-title">
      <h2 id="menu-list-title" className="sr-only">
        {t("poster.title")}
      </h2>

      <ul className="reveal-stagger grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {menuCategories.map(({ key, icon: Icon, image, items }) => (
          <li key={key}>
            <article aria-labelledby={`menu-${key}`} className="flex h-full flex-col overflow-hidden rounded-sm bg-surface shadow-sm">
              <Photo name={image} framed={false} sizes="(min-width: 1280px) 384px, (min-width: 768px) 45vw, 100vw" className="bg-white" />
              <div className="flex flex-1 flex-col gap-5 p-7">
                <header className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Icon aria-hidden className="size-6 shrink-0 text-chestnut" />
                    <h3 id={`menu-${key}`} className="type-headline-sm">
                      {t(`categories.${key}.title`)}
                    </h3>
                  </div>
                  <Chip>{t(`categories.${key}.tag`)}</Chip>
                </header>

                <ul className="flex flex-col divide-y divide-espresso/10">
                  {items.map((item) => {
                    const primary = isVietnamese ? item.name.vi : item.name.en;
                    const secondary = isVietnamese ? item.name.en : item.name.vi;
                    return (
                      <li key={item.id} className="flex items-start justify-between gap-4 py-3">
                        <div className="flex flex-col">
                          <span className="flex flex-wrap items-center gap-2 font-semibold">
                            {primary}
                            {item.bestSeller && (
                              <span className="inline-flex items-center gap-1 rounded-xs bg-brass px-1.5 py-0.5 type-label-sm text-espresso">
                                <Star aria-hidden className="size-3 fill-espresso" />
                                {t("hero.bestSeller")}
                              </span>
                            )}
                          </span>
                          {secondary !== primary && (
                            <span lang={isVietnamese ? "en" : "vi"} className="text-xs text-muted">
                              {secondary}
                            </span>
                          )}
                        </div>
                        <Price amount={item.price} className="shrink-0 font-semibold text-chestnut" />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </article>
          </li>
        ))}

        <li>
          <aside className="flex h-full flex-col items-start justify-between gap-6 rounded-sm bg-espresso p-8 text-cream">
            <div className="flex flex-col gap-4">
              <span className="grid size-12 place-items-center rounded-full bg-brass/15 text-brass">
                <Sunset aria-hidden className="size-6" />
              </span>
              <h3 className="type-headline-sm">{t("sunset.title")}</h3>
              <p className="text-sand/80">{t("sunset.text")}</p>
            </div>
            <ButtonLink href={bookingHref} variant="brass">
              {t("sunset.action")}
            </ButtonLink>
          </aside>
        </li>
      </ul>
    </Section>
  );
}
