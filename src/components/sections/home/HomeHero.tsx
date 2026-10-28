import type { CSSProperties } from "react";
import Image from "next/image";
import { Clock, Compass } from "lucide-react";
import { useTranslations } from "next-intl";
import { bookingHref } from "@/data/navigation";
import { getImage } from "@/data/images";
import { siteConfig } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const metricKeys = ["ratio", "breed", "safety", "location"] as const;

export function HomeHero() {
  const t = useTranslations("home");
  const tImg = useTranslations("images");
  const hero = getImage("hero");

  return (
    <section aria-labelledby="home-title" className="bg-espresso text-cream">
      {/* On phones the photo sits above the copy at its full 16:9 ratio; from `lg` the copy overlays it. */}
      <div className="relative overflow-hidden lg:h-[min(56.25vw,calc(100svh-5rem))] lg:min-h-[36rem]">
        <Image
          src={hero.src}
          width={hero.width}
          height={hero.height}
          alt={tImg("hero")}
          priority
          sizes="100vw"
          className="kenburns block h-auto w-full lg:h-full lg:object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-gradient-to-t from-espresso/90 via-espresso/25 via-50% to-transparent lg:block"
        />
        <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-r from-espresso/55 via-transparent to-transparent lg:block" />

        <div className="lg:absolute lg:inset-0 lg:flex lg:flex-col lg:justify-between">
          <Container className="enter flex flex-wrap items-center justify-between gap-3 pt-6 lg:pt-8">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center rounded-xs bg-espresso/70 px-3 py-1 type-label-sm text-brass backdrop-blur-sm">
                {t("hero.badge")}
              </span>
              <span className="hidden rounded-xs bg-espresso/60 px-3 py-1 text-xs text-sand backdrop-blur-sm md:inline">
                {t("hero.note")}
              </span>
            </p>
            <p className="flex items-center gap-2 rounded-xs bg-espresso/70 px-3 py-1 text-xs font-semibold text-sand backdrop-blur-sm">
              <Clock aria-hidden className="size-3.5 text-brass" />
              {t("hero.hours", { open: siteConfig.hours.open, close: siteConfig.hours.close })}
            </p>
          </Container>

          <Container className="flex flex-col items-start gap-6 pt-10 pb-14 lg:pb-16">
            <p
              style={{ "--d": 2 } as CSSProperties}
              className="enter flex items-center gap-3 type-label text-brass [text-shadow:0_1px_10px_rgb(26_17_11/0.8)]"
            >
              <span aria-hidden className="h-0.5 w-10 bg-brass" />
              {t("hero.eyebrow")}
            </p>
            <div style={{ "--d": 3 } as CSSProperties} className="enter max-w-4xl">
              <h1 id="home-title" className="type-display text-cream [text-shadow:0_2px_24px_rgb(26_17_11/0.55)]">
                <span className="sr-only">{t("hero.srTitle")} </span>
                {t("hero.titleA")} <em className="text-brass">{t("hero.titleB")}</em>
              </h1>
              <p className="type-lead mt-5 max-w-2xl text-sand [text-shadow:0_1px_12px_rgb(26_17_11/0.6)]">{t("hero.lead")}</p>
            </div>
            <div style={{ "--d": 5 } as CSSProperties} className="enter flex flex-wrap gap-4 pt-2">
              <ButtonLink href={bookingHref} variant="brass">
                {t("hero.ctaPrimary")}
              </ButtonLink>
              <ButtonLink href="/services" variant="outline-light" icon={<Compass aria-hidden className="size-4 shrink-0" />}>
                {t("hero.ctaSecondary")}
              </ButtonLink>
            </div>
          </Container>
        </div>
      </div>

      <div className="border-t border-brass/20 bg-ink">
        <Container>
          <dl className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {metricKeys.map((key) => (
              <div key={key} className="flex flex-col gap-1.5 border-l border-brass/40 pl-4">
                <dt className="type-label-sm text-brass">{t(`metrics.${key}.label`)}</dt>
                <dd className="flex flex-col gap-1.5">
                  <span className="type-title text-cream">{t(`metrics.${key}.title`)}</span>
                  <span className="text-sm text-sand/70">{t(`metrics.${key}.text`)}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
