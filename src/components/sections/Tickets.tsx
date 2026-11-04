import { Flame } from "lucide-react";
import { useTranslations } from "next-intl";
import { ticketPrices, tickets } from "@/data/tickets";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Photo } from "@/components/ui/Photo";
import { Price } from "@/components/ui/Price";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

/** The three wristband tickets with price and what each includes. Shared by the home and services pages. */
export function Tickets() {
  const t = useTranslations("shared.tickets");

  return (
    <Section id="tickets" tone="low" labelledBy="tickets-title">
      <SectionHeader id="tickets-title" align="center" eyebrow={t("eyebrow")} title={t("title")} description={t("note")} />

      <ul className="reveal-stagger grid items-stretch gap-6 lg:grid-cols-3">
        {tickets.map(({ key, image, featured, include }) => (
          <li key={key} className="flex">
            <article
              className={cn(
                "relative flex w-full flex-col overflow-hidden rounded-sm bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-warm-lg",
                featured && "ring-2 ring-brass",
              )}
            >
              <Photo name={image} framed={false} sizes="(min-width: 1280px) 384px, (min-width: 1024px) 33vw, 100vw" className="bg-white" />
              <div className="flex flex-1 flex-col gap-6 p-7">
                <div className="flex flex-col gap-2">
                  {featured && (
                    <span className="inline-flex items-center gap-1.5 self-start rounded-xs bg-brass px-2.5 py-1 type-label-sm text-espresso">
                      <Flame aria-hidden className="size-3.5" />
                      {t("popular")}
                    </span>
                  )}
                  <h3 className="type-headline-sm">{t(`names.${key}`)}</h3>
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <Price amount={ticketPrices[key]} className="text-3xl font-bold text-espresso" />
                    <span className="text-sm text-muted">{t("perPerson")}</span>
                  </p>
                </div>
                <CheckList items={include.map((item) => t(`include.${item}`))} />
                <ButtonLink
                  href={{ pathname: "/booking", query: { ticket: key } }}
                  variant={featured ? "primary" : "outline"}
                  className="mt-auto"
                >
                  {t("book")}
                </ButtonLink>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
