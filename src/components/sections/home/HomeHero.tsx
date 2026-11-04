import type { CSSProperties } from "react";
import { Clock, MapPin, Route } from "lucide-react";
import { useTranslations } from "next-intl";
import { bookingHref } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";

/**
 * The brand cover banner is the hero. It is shown whole at its own ratio and its brick-red ground
 * flows straight into the call-to-action band below, so the two read as one poster.
 */
export function HomeHero() {
  const t = useTranslations("home");
  const { open, close, ridingMorning, ridingAfternoon } = siteConfig.hours;

  const info = [
    { Icon: Clock, label: t("info.open"), value: t("info.openValue", { open, close }) },
    { Icon: Route, label: t("info.riding"), value: `${ridingMorning} · ${ridingAfternoon}` },
    { Icon: MapPin, label: t("info.place"), value: t("info.placeValue") },
  ];

  return (
    <section aria-labelledby="home-title" className="bg-brick text-cream">
      <h1 id="home-title" className="sr-only">
        {t("hero.srTitle")} {t("hero.titleA")} {t("hero.titleB")}
      </h1>

      <Photo name="banner-slogan" framed={false} priority sizes="100vw" />

      <Container className="flex flex-col items-start justify-between gap-6 py-8 lg:flex-row lg:items-center lg:py-10">
        <div style={{ "--d": 1 } as CSSProperties} className="enter flex max-w-xl flex-col gap-3">
          <p className="type-label-sm text-brass-light">{t("hero.badge")}</p>
          <p className="type-lead text-cream">{t("hero.lead")}</p>
        </div>
        <div style={{ "--d": 2 } as CSSProperties} className="enter flex flex-wrap gap-4">
          <ButtonLink href={bookingHref} variant="brass">
            {t("hero.ctaPrimary")}
          </ButtonLink>
          <ButtonLink href="#tickets" variant="outline-light" icon={false}>
            {t("hero.ctaSecondary")}
          </ButtonLink>
        </div>
      </Container>

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
