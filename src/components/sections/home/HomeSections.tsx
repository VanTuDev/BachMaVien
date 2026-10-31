import { useTranslations } from "next-intl";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { Zones } from "@/components/sections/Zones";

/** "Who we are" in two sentences. */
export function HomeAbout() {
  const t = useTranslations("home.about");

  return (
    <Section labelledBy="home-about-title">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col items-start gap-5 lg:col-span-6">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="home-about-title" className="type-headline-lg">
            {t("title")}
          </h2>
          <p className="text-muted">{t("text")}</p>
          <TextLink href="/about">{t("more")}</TextLink>
        </div>
        <Photo
          name="stable-2"
          sizes="(min-width: 1280px) 576px, (min-width: 1024px) 50vw, 100vw"
          className="shadow-warm-lg lg:col-span-6"
        />
      </div>
    </Section>
  );
}

/** "What's here": every area of the ranch as an icon tile. */
export function HomeServices() {
  const t = useTranslations("home.services");

  return (
    <Zones
      eyebrow={t("eyebrow")}
      title={t("title")}
      action={
        <ButtonLink href="/services" variant="outline">
          {t("action")}
        </ButtonLink>
      }
    />
  );
}

/** Teaser for the 3D experience page, using the aerial view as its picture. */
export function HomeExperience() {
  const t = useTranslations("home.experience");

  return (
    <Section tone="mid" labelledBy="home-experience-title">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Photo
          name="scene-aerial-wide"
          sizes="(min-width: 1280px) 640px, (min-width: 1024px) 55vw, 100vw"
          className="shadow-warm-lg lg:col-span-7"
        />
        <div className="flex flex-col items-start gap-5 lg:col-span-5">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 id="home-experience-title" className="type-headline-lg">
            {t("title")}
          </h2>
          <p className="text-muted">{t("text")}</p>
          <ButtonLink href="/experience">{t("action")}</ButtonLink>
        </div>
      </div>
    </Section>
  );
}
