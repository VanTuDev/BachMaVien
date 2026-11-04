import type { CSSProperties } from "react";
import Image from "next/image";
import { Clock, MapPin, Route } from "lucide-react";
import { useTranslations } from "next-intl";
import { getImage } from "@/data/images";
import { bookingHref } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Cinematic cover: the galloping herd at sunrise with the brand mark, slogan and booking buttons laid over it.
 * On phones the photo sits on top at its own ratio and the copy follows on the brand-red band.
 */
export function HomeHero() {
  const t = useTranslations("home");
  const tImg = useTranslations("images");
  const cover = getImage("hero");
  const logo = getImage("logo-white");
  const { open, close, ridingMorning, ridingAfternoon } = siteConfig.hours;

  const info = [
    { Icon: Clock, label: t("info.open"), value: t("info.openValue", { open, close }) },
    { Icon: Route, label: t("info.riding"), value: `${ridingMorning} · ${ridingAfternoon}` },
    { Icon: MapPin, label: t("info.place"), value: t("info.placeValue") },
  ];

  return (
    <section aria-labelledby="home-title" className="bg-brick text-cream">
      <div className="relative overflow-hidden lg:h-[min(52vw,calc(100svh-5rem))] lg:min-h-[30rem]">
        <Image
          src={cover.src}
          width={cover.width}
          height={cover.height}
          alt={tImg("hero")}
          priority
          sizes="100vw"
          className="kenburns block h-auto w-full lg:h-full lg:object-cover lg:object-[50%_55%]"
        />
        <div aria-hidden className="absolute inset-0 hidden bg-linear-to-r from-ink/85 via-ink/45 via-45% to-transparent lg:block" />
        <div aria-hidden className="absolute inset-0 hidden bg-linear-to-t from-brick/90 via-transparent via-40% to-transparent lg:block" />

        <div className="lg:absolute lg:inset-0 lg:flex lg:items-center">
          <Container className="flex flex-col items-start gap-5 py-10 lg:py-0">
            <div style={{ "--d": 1 } as CSSProperties} className="enter flex items-center gap-4">
              <Image src={logo.src} width={logo.width} height={logo.height} alt="" className="size-16 shrink-0 object-contain lg:size-20" />
              <p className="type-label-sm text-brass-light">{t("hero.badge")}</p>
            </div>
            <h1
              id="home-title"
              style={{ "--d": 2 } as CSSProperties}
              className="enter type-display max-w-4xl text-cream [text-shadow:0_2px_24px_rgb(26_17_11/0.55)]"
            >
              <span className="sr-only">{t("hero.srTitle")} </span>
              {t("hero.titleA")} <em className="text-brass-light not-italic">{t("hero.titleB")}</em>
            </h1>
            <p
              style={{ "--d": 3 } as CSSProperties}
              className="enter type-lead max-w-md text-balance text-cream [text-shadow:0_1px_12px_rgb(26_17_11/0.6)]"
            >
              {t("hero.lead")}
            </p>
            <div style={{ "--d": 4 } as CSSProperties} className="enter flex flex-wrap gap-4 pt-1">
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

      <div className="border-t border-cream/15 bg-brick-deep">
        <Container>
          <dl className="grid gap-6 py-6 md:grid-cols-3">
            {info.map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-brass-light" />
                <div>
                  <dt className="type-label-sm text-brass-light">{label}</dt>
                  <dd className="text-sm text-cream">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
