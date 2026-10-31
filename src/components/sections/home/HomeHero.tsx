import type { CSSProperties } from "react";
import Image from "next/image";
import { Clock, MapPin, Route } from "lucide-react";
import { useTranslations } from "next-intl";
import { bookingHref } from "@/data/navigation";
import { getImage } from "@/data/images";
import { siteConfig } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function HomeHero() {
  const t = useTranslations("home");
  const tImg = useTranslations("images");
  const hero = getImage("hero");
  const { open, close, ridingMorning, ridingAfternoon } = siteConfig.hours;

  const info = [
    { Icon: Clock, label: t("info.open"), value: t("info.openValue", { open, close }) },
    { Icon: Route, label: t("info.riding"), value: `${ridingMorning} · ${ridingAfternoon}` },
    { Icon: MapPin, label: t("info.place"), value: t("info.placeValue") },
  ];

  return (
    <section aria-labelledby="home-title" className="bg-espresso text-cream">
      {/* On phones the photo sits above the copy at its full 16:9 ratio; from `lg` the copy overlays it. */}
      <div className="relative overflow-hidden lg:h-[min(56.25vw,calc(100svh-5rem))] lg:min-h-[34rem]">
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

        <div className="lg:absolute lg:inset-0 lg:flex lg:flex-col lg:justify-end">
          <Container className="flex flex-col items-start gap-6 py-10 lg:pb-16">
            <p
              style={{ "--d": 1 } as CSSProperties}
              className="enter inline-flex items-center rounded-xs bg-espresso/70 px-3 py-1 type-label-sm text-brass-light backdrop-blur-sm"
            >
              {t("hero.badge")}
            </p>
            <div style={{ "--d": 2 } as CSSProperties} className="enter max-w-4xl">
              <h1 id="home-title" className="type-display text-cream [text-shadow:0_2px_24px_rgb(26_17_11/0.6)]">
                <span className="sr-only">{t("hero.srTitle")} </span>
                {t("hero.titleA")} <em className="font-bold text-brass-light not-italic">{t("hero.titleB")}</em>
              </h1>
              <p className="type-lead mt-4 max-w-xl text-sand [text-shadow:0_1px_12px_rgb(26_17_11/0.7)]">{t("hero.lead")}</p>
            </div>
            <div style={{ "--d": 4 } as CSSProperties} className="enter flex flex-wrap gap-4 pt-2">
              <ButtonLink href={bookingHref} variant="brass">
                {t("hero.ctaPrimary")}
              </ButtonLink>
              <ButtonLink href="#tickets" variant="outline-light" icon={false}>
                {t("hero.ctaSecondary")}
              </ButtonLink>
            </div>
          </Container>
        </div>
      </div>

      <div className="border-t border-brass/20 bg-ink">
        <Container>
          <dl className="grid gap-6 py-6 md:grid-cols-3">
            {info.map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-brass" />
                <div>
                  <dt className="type-label-sm text-brass">{label}</dt>
                  <dd className="text-sm text-sand">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
