import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ImageName } from "@/data/images";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { Price } from "@/components/ui/Price";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function MenuTeaser() {
  const t = useTranslations("services.menuTeaser");

  return (
    <Section tone="mid" labelledBy="menu-teaser-title">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col items-start gap-6 lg:col-span-7">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="menu-teaser-title" className="type-headline-lg">
            {t("title")}
          </h2>
          <p className="max-w-xl text-muted">{t("text")}</p>
          <ButtonLink href="/menu">{t("action")}</ButtonLink>
        </div>

        <figure className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          <Photo name="drink-coconut-coffee" sizes="(min-width: 1024px) 440px, 80vw" className="shadow-warm-lg" />
          <figcaption className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4">
            <span className="inline-flex items-center gap-1.5 rounded-xs bg-espresso px-2.5 py-1 type-label-sm text-brass">
              <Star aria-hidden className="size-3.5 fill-brass" />
              {t("badge")}
            </span>
            <Price amount={40_000} className="rounded-xs bg-brass px-2.5 py-1 text-sm font-bold text-espresso" />
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}

const tickets: ImageName[] = ["ticket-visit-the-farm", "ticket-cowboy", "ticket-real-cowboy"];

export function TicketsStrip() {
  const t = useTranslations("services.tickets");

  return (
    <Section labelledBy="tickets-title">
      <SectionHeader id="tickets-title" align="center" eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <ul className="mx-auto flex max-w-4xl flex-col gap-4">
        {tickets.map((name) => (
          <li key={name}>
            <Photo name={name} sizes="(min-width: 1024px) 896px, 100vw" className="shadow-sm" />
          </li>
        ))}
      </ul>
    </Section>
  );
}

const gallery: { name: ImageName; featured?: boolean }[] = [
  { name: "stable-2", featured: true },
  { name: "stable-5" },
  { name: "stable-6" },
  { name: "safety-3" },
  { name: "safety-2" },
  { name: "stable-1" },
  { name: "stable-4" },
  { name: "brand-3" },
  { name: "brand-2" },
];

export function Gallery() {
  const t = useTranslations("services.gallery");

  return (
    <Section tone="low" labelledBy="gallery-title">
      <SectionHeader id="gallery-title" align="split" eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <ul className="reveal-stagger grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {gallery.map(({ name, featured }) => (
          <li key={name} className={featured ? "col-span-2 row-span-2" : undefined}>
            <Photo
              name={name}
              sizes={
                featured
                  ? "(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
                  : "(min-width: 1280px) 290px, (min-width: 1024px) 25vw, 50vw"
              }
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
