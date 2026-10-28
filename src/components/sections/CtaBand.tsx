import { MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { bookingHref } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";

/** Closing call-to-action reused at the bottom of the home page. Copy lives in `home.cta`. */
export function CtaBand() {
  const t = useTranslations("home.cta");

  return (
    <>
      <Section tone="dark" labelledBy="cta-title" className="overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-brass/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-chestnut/20 blur-3xl" />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
          <Eyebrow tone="dark">{t("eyebrow")}</Eyebrow>
          <h2 id="cta-title" className="type-display text-cream">
            {t("title")}
          </h2>
          <p className="type-lead max-w-2xl text-sand/85">{t("text")}</p>

          <div className="flex w-full max-w-3xl flex-col items-center justify-between gap-6 rounded-sm bg-sand/10 p-6 text-left backdrop-blur-md sm:flex-row sm:p-8">
            <div className="flex flex-col gap-1">
              <span className="type-title text-cream">{t("cardTitle")}</span>
              <span className="text-sm text-sand/75">{t("cardText")}</span>
            </div>
            <ButtonLink href={bookingHref} variant="brass" className="w-full shrink-0 sm:w-auto">
              {t("action")}
            </ButtonLink>
          </div>

          <ul className="flex flex-col items-center gap-3 text-sm text-sand/75 sm:flex-row sm:gap-8">
            <li className="flex items-center gap-2">
              <Phone aria-hidden className="size-4 text-brass" />
              <a href={siteConfig.phoneHref} className="hover:text-cream hover:underline">
                {t("hotline", { phone: siteConfig.phone })}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin aria-hidden className="size-4 text-brass" />
              <span>{t("location")}</span>
            </li>
          </ul>
        </div>
      </Section>

      {/* Full-width illustrated horizon, shown at its natural ratio. */}
      <Photo name="banner-slogan" framed={false} sizes="100vw" className="bg-cream" />
    </>
  );
}
