import { MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { bookingHref } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

/** Closing call-to-action on the home page. */
export function CtaBand() {
  const t = useTranslations("home.cta");
  const info = useTranslations("home.info");

  return (
    <>
      <Section tone="dark" labelledBy="cta-title" className="overflow-hidden py-12 sm:py-14 lg:py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <h2 id="cta-title" className="type-headline-lg text-cream">
            {t("title")}
          </h2>
          <p className="text-sand/85">{t("text")}</p>
          <ButtonLink href={bookingHref} variant="brass">
            {t("action")}
          </ButtonLink>
          <ul className="flex flex-col items-center gap-3 text-sm text-sand/75 sm:flex-row sm:gap-8">
            <li className="flex items-center gap-2">
              <Phone aria-hidden className="size-4 text-brass" />
              <a href={siteConfig.phoneHref} className="hover:text-cream hover:underline">
                {t("hotline", { phone: siteConfig.phone })}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin aria-hidden className="size-4 text-brass" />
              <span>{info("placeValue")}</span>
            </li>
          </ul>
        </div>
      </Section>
    </>
  );
}
