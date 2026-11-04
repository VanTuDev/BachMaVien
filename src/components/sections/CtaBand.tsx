import { useTranslations } from "next-intl";
import { bookingHref } from "@/data/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

/** Closing call-to-action on the home page: one slim row. Contact details live in the footer right below. */
export function CtaBand() {
  const t = useTranslations("home.cta");

  return (
    <Section tone="dark" labelledBy="cta-title" size="slim">
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center sm:gap-8">
        <div className="flex flex-col gap-1">
          <h2 id="cta-title" className="type-headline-md text-cream">
            {t("title")}
          </h2>
          <p className="text-sm text-sand/80">{t("text")}</p>
        </div>
        <ButtonLink href={bookingHref} variant="brass" className="shrink-0">
          {t("action")}
        </ButtonLink>
      </div>
    </Section>
  );
}
