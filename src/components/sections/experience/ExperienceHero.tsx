import type { CSSProperties } from "react";
import Image from "next/image";
import { Box, Clapperboard } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getImage } from "@/data/images";
import { tourStops, tourViewCount } from "@/data/tour";

const metricKeys = ["stops", "views", "video"] as const;
const metricCount = { stops: tourStops.length, views: tourViewCount, video: 0 };

export function ExperienceHero() {
  const t = useTranslations("experience.hero");
  const tImg = useTranslations("images");
  const hero = getImage("scene-aerial-wide");

  return (
    <section aria-labelledby="experience-title" className="bg-espresso text-cream">
      {/* Same pattern as the home hero: photo above the copy on phones, copy over the photo from `lg`. */}
      <div className="relative overflow-hidden lg:h-[min(56.25vw,calc(100svh-5rem))] lg:min-h-[34rem]">
        <Image
          src={hero.src}
          width={hero.width}
          height={hero.height}
          alt={tImg("scene-aerial-wide")}
          priority
          sizes="100vw"
          className="kenburns block h-auto w-full lg:h-full lg:object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-gradient-to-t from-espresso/92 via-espresso/30 via-55% to-transparent lg:block"
        />
        <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-r from-espresso/60 via-transparent to-transparent lg:block" />

        <div className="lg:absolute lg:inset-0 lg:flex lg:flex-col lg:justify-between">
          <Container className="enter flex flex-wrap items-center gap-3 pt-6 lg:pt-8">
            <span className="inline-flex items-center gap-2 rounded-xs bg-espresso/70 px-3 py-1 type-label-sm text-brass backdrop-blur-sm">
              <Box aria-hidden className="size-3.5" />
              {t("badge")}
            </span>
            <span className="hidden rounded-xs bg-espresso/60 px-3 py-1 text-xs text-sand backdrop-blur-sm md:inline">{t("note")}</span>
          </Container>

          <Container className="flex flex-col items-start gap-6 pt-10 pb-14 lg:pb-16">
            <p
              style={{ "--d": 2 } as CSSProperties}
              className="enter flex items-center gap-3 type-label text-brass [text-shadow:0_1px_10px_rgb(26_17_11/0.8)]"
            >
              <span aria-hidden className="h-0.5 w-10 bg-brass" />
              {t("eyebrow")}
            </p>
            <div style={{ "--d": 3 } as CSSProperties} className="enter max-w-4xl">
              <h1 id="experience-title" className="type-display text-cream [text-shadow:0_2px_24px_rgb(26_17_11/0.55)]">
                <span className="sr-only">{t("srTitle")} </span>
                {t("titleA")} <em className="text-brass">{t("titleB")}</em>
              </h1>
              <p className="type-lead mt-5 max-w-2xl text-sand [text-shadow:0_1px_12px_rgb(26_17_11/0.6)]">{t("lead")}</p>
            </div>
            <div style={{ "--d": 5 } as CSSProperties} className="enter flex flex-wrap gap-4 pt-2">
              <ButtonLink href="#tour" variant="brass" icon={<Box aria-hidden className="size-4 shrink-0" />}>
                {t("ctaPrimary")}
              </ButtonLink>
              <ButtonLink href="#video" variant="outline-light" icon={<Clapperboard aria-hidden className="size-4 shrink-0" />}>
                {t("ctaSecondary")}
              </ButtonLink>
            </div>
          </Container>
        </div>
      </div>

      <div className="border-t border-brass/20 bg-ink">
        <Container>
          <dl className="grid grid-cols-3 gap-4 py-7 sm:gap-10 sm:py-8">
            {metricKeys.map((key) => (
              <div key={key} className="flex flex-col gap-1 border-l border-brass/40 pl-4">
                <dd className="order-1 font-serif text-2xl text-cream sm:text-3xl">
                  {t(`metrics.${key}.value`, { count: metricCount[key] })}
                </dd>
                <dt className="order-2 type-label-sm text-brass">{t(`metrics.${key}.label`)}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
